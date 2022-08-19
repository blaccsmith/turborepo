/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-bind */
// import { trpc } from '@/lib/trpc';
import { Switch } from '@headlessui/react';
import { matchSorter } from 'match-sorter';
import * as React from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useQuery } from 'react-query';
import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import getCaretCoordinates from 'textarea-caret';
import TextareaMarkdown, { TextareaMarkdownRef } from 'textarea-markdown-editor';
import { ItemOptions, useItemList } from 'use-item-list';
import { classNames } from 'utils/helpers';
import { getSuggestionData, handleUploadImages, markdownToHtml } from '@/lib/editor';
import browserEnv from '@/env/browser';
import { BoldIcon, ItalicIcon, LinkIcon, ListIcon } from '@/components/atoms/Icons';
import HtmlView from '@/components/atoms/HtmlView';
import toast from 'react-hot-toast';

type MarkdownEditorProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onTriggerSubmit?: () => void;
} & Omit<
  TextareaAutosizeProps,
  'value' | 'onChange' | 'onKeyDown' | 'onInput' | 'onPaste' | 'onDrop'
>;

type SuggestionResultType = {
  label: string;
  value: string;
};

type SuggestionPosition = {
  top: number;
  left: number;
};

type SuggestionType = 'mention' | 'emoji';

type SuggestionState = {
  isOpen: boolean;
  type: SuggestionType | null;
  position: SuggestionPosition | null;
  triggerIdx: number | null;
  query: string;
};

type SuggestionActionType =
  | {
      type: 'open';
      payload: {
        type: SuggestionType;
        position: SuggestionPosition;
        triggerIdx: number;
        query: string;
      };
    }
  | { type: 'close' }
  | { type: 'updateQuery'; payload: string };

function suggestionReducer(state: SuggestionState, action: SuggestionActionType) {
  switch (action.type) {
    case 'open':
      return {
        isOpen: true,
        type: action.payload.type,
        position: action.payload.position,
        triggerIdx: action.payload.triggerIdx,
        query: action.payload.query,
      };
    case 'close':
      return {
        isOpen: false,
        type: null,
        position: null,
        triggerIdx: null,
        query: '',
      };
    case 'updateQuery':
      return { ...state, query: action.payload };
    default:
      throw new Error();
  }
}

const TOOLBAR_ITEMS = [
  {
    commandTrigger: 'bold',
    icon: <BoldIcon className="h-4 w-4" />,
    name: 'Bold',
  },
  {
    commandTrigger: 'italic',
    icon: <ItalicIcon className="h-4 w-4" />,
    name: 'Italic',
  },
  {
    commandTrigger: 'unordered-list',
    icon: <ListIcon className="h-4 w-4" />,
    name: 'Unordered List',
  },
  {
    commandTrigger: 'link',
    icon: <LinkIcon className="h-4 w-4" />,
    name: 'Link',
  },
];

const MarkdownPreview = ({ markdown }: { markdown: string }) => (
  <div className="mt-8 border-b pb-6">
    {markdown ? <HtmlView html={markdownToHtml(markdown)} /> : <p>Nothing to preview</p>}
  </div>
);

const SuggestionResult = ({
  useItem,
  suggestionResult,
}: {
  useItem: ({ ref, text, value, disabled }: ItemOptions) => {
    id: string;
    index: number;
    highlight: () => void;
    select: () => void;
    selected: any;
    useHighlighted: () => Boolean;
  };
  suggestionResult: SuggestionResultType;
}) => {
  const ref = React.useRef<HTMLLIElement>(null);
  const { id, highlight, select, useHighlighted } = useItem({
    ref,
    value: suggestionResult,
  });
  const highlighted = useHighlighted();

  return (
    <li
      ref={ref}
      id={id}
      onMouseEnter={highlight}
      onClick={select}
      role="option"
      aria-selected={highlighted ? 'true' : 'false'}
      className={classNames(
        'cursor-pointer px-4 py-2 text-left text-sm transition-colors ',
        highlighted ? 'bg-brand-purple-600 text-white' : 'text-primary',
      )}
    >
      {suggestionResult.label}
    </li>
  );
};

const SuggestionList = ({
  suggestionList,
  position,
  onSelect,
  onClose,
}: {
  suggestionList: SuggestionResultType[];
  position: SuggestionPosition;
  onSelect: (suggestionResult: SuggestionResultType) => void;
  onClose: () => void;
}) => {
  const ref = useDetectClickOutside({ onTriggered: onClose });

  const { moveHighlightedItem, selectHighlightedItem, useItem } = useItemList({
    onSelect: item => {
      onSelect(item.value);
    },
  });

  React.useEffect(() => {
    function handleKeydownEvent(event: KeyboardEvent) {
      const { code } = event;

      const preventDefaultCodes = ['ArrowUp', 'ArrowDown', 'Enter', 'Tab'];

      if (preventDefaultCodes.includes(code)) {
        event.preventDefault();
      }

      if (code === 'ArrowUp') {
        moveHighlightedItem(-1);
      }

      if (code === 'ArrowDown') {
        moveHighlightedItem(1);
      }

      if (code === 'Enter' || code === 'Tab') {
        selectHighlightedItem();
      }
    }

    document.addEventListener('keydown', handleKeydownEvent);
    return () => {
      document.removeEventListener('keydown', handleKeydownEvent);
    };
  }, [moveHighlightedItem, selectHighlightedItem]);

  return (
    <div
      ref={ref}
      className="bg-primary absolute max-h-[286px] w-56 overflow-y-auto rounded border shadow-lg"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <ul role="listbox" className="divide-primary divide-y">
        {suggestionList.map(suggestionResult => (
          <SuggestionResult
            key={suggestionResult.value}
            useItem={useItem}
            suggestionResult={suggestionResult}
          />
        ))}
      </ul>
    </div>
  );
};

const Suggestion = ({
  state,
  onSelect,
  onClose,
}: {
  state: SuggestionState;
  onSelect: (suggestionResult: SuggestionResultType) => void;
  onClose: () => void;
}) => {
  // const isMentionType = state.type === 'mention';
  const isEmojiType = state.type === 'emoji';

  const emojiListQuery = useQuery(
    'emojiList',
    async () => {
      const { gemoji } = await import('gemoji');
      return gemoji;
    },
    {
      enabled: state.isOpen && isEmojiType,
      staleTime: Infinity,
    },
  );

  //   const mentionListQuery = trpc.useQuery(['user.mentionList'], {
  //     enabled: state.isOpen && isMentionType,
  //     staleTime: 5 * 60 * 1000,
  //   });

  let suggestionList: SuggestionResultType[] = [];

  //   if (isMentionType && mentionListQuery.data) {
  //     suggestionList = matchSorter(mentionListQuery.data, state.query, {
  //       keys: ['name'],
  //     })
  //       .slice(0, 5)
  //       .map(item => ({ label: item.name!, value: item.id }));
  //   }

  if (isEmojiType && emojiListQuery.data) {
    suggestionList = matchSorter(emojiListQuery.data, state.query, {
      keys: ['names', 'tags'],
      threshold: matchSorter.rankings.STARTS_WITH,
    })
      .slice(0, 5)
      .map(item => ({
        label: `${item.emoji} ${item.names[0]}`,
        value: item.emoji,
      }));
  }

  if (!state.isOpen || !state.position || suggestionList.length === 0) {
    return null;
  }

  return (
    <SuggestionList
      suggestionList={suggestionList}
      position={state.position}
      onSelect={onSelect}
      onClose={onClose}
    />
  );
};

const MarkdownEditor = ({
  label,
  value,
  minRows = 15,
  onChange,
  onTriggerSubmit,
  ...rest
}: MarkdownEditorProps) => {
  const textareaMarkdownRef = React.useRef<TextareaMarkdownRef>(null);
  const [showPreview, setShowPreview] = React.useState(false);
  const [suggestionState, suggestionDispatch] = React.useReducer(suggestionReducer, {
    isOpen: false,
    type: null,
    position: null,
    triggerIdx: null,
    query: '',
  });

  function closeSuggestion() {
    suggestionDispatch({ type: 'close' });
  }

  const handleImageUpload = async (textareaEl: HTMLTextAreaElement, files: File[]) => {
    await handleUploadImages(textareaEl, files);
  };

  return (
    <div>
      {label && <label className="mb-2 block font-semibold">{label}</label>}
      <div>
        <div className="bg-primary flex items-center justify-between gap-4 rounded  px-2 py-px">
          <div className="-ml-2 flex gap-2">
            {TOOLBAR_ITEMS.map(toolbarItem => (
              <button
                key={toolbarItem.commandTrigger}
                type="button"
                onClick={() => {
                  textareaMarkdownRef.current?.trigger(toolbarItem.commandTrigger);
                }}
                className={classNames(
                  'focus-ring inline-flex h-8 w-8 items-center justify-center rounded focus:border disabled:cursor-default disabled:opacity-50',
                  !showPreview ? 'hover:text-brand-purple transition-colors' : '',
                )}
                disabled={showPreview}
                title={toolbarItem.name}
              >
                {toolbarItem.icon}
              </button>
            ))}
          </div>

          <Switch.Group as="div" className="flex items-center">
            <Switch
              checked={showPreview}
              onChange={(_value: boolean) => {
                if (_value === false) {
                  textareaMarkdownRef.current?.focus();
                }
                setShowPreview(_value);
              }}
              className={classNames(
                showPreview ? 'bg-brand-purple-500' : 'bg-gray-300 dark:bg-gray-700',
                'focus-ring relative inline-flex h-[18px] w-8 flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out',
              )}
            >
              <span
                className={classNames(
                  showPreview ? 'translate-x-4' : 'translate-x-0.5',
                  'inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform duration-200 ease-in-out dark:bg-gray-100',
                )}
              />
            </Switch>
            <Switch.Label as="span" className="ml-2 cursor-pointer select-none text-xs">
              Preview
            </Switch.Label>
          </Switch.Group>
        </div>

        <div className={classNames('relative mt-2', showPreview ? 'sr-only' : '')}>
          <TextareaMarkdown.Wrapper
            ref={textareaMarkdownRef}
            commands={[
              {
                name: 'indent',
                enable: false,
                handler: (editor: any, event: any) => {
                  const { selection } = editor;
                  const { anchor, focus } = selection;
                  const { line, column } = anchor;
                  const { line: line2, column: column2 } = focus;
                  const start = line === line2 ? column : 0;
                  const end = line === line2 ? column2 : editor.lineText(line).length;
                  const text = editor.lineText(line).slice(start, end);
                  const indent = text.match(/^\s*/)[0];
                  const newIndent = `${indent}\t`;
                  editor.replaceRange(newIndent, { line, column: start }, { line, column: end });
                  event.preventDefault();
                },
              },
            ]}
          >
            <TextareaAutosize
              {...rest}
              value={value}
              onChange={event => {
                onChange(event.target.value);

                const { keystrokeTriggered, triggerIdx, type, query } = getSuggestionData(
                  event.currentTarget,
                );

                if (!keystrokeTriggered) {
                  if (suggestionState.isOpen) {
                    closeSuggestion();
                  }
                  return;
                }

                if (suggestionState.isOpen) {
                  suggestionDispatch({ type: 'updateQuery', payload: query });
                } else {
                  const coords = getCaretCoordinates(event.currentTarget, triggerIdx + 1);
                  suggestionDispatch({
                    type: 'open',
                    payload: {
                      type,
                      position: {
                        top: coords.top + coords.height,
                        left: coords.left,
                      },
                      triggerIdx,
                      query,
                    },
                  });
                }
              }}
              onKeyDown={event => {
                const { code, metaKey } = event;
                if (code === 'Enter' && metaKey) {
                  onTriggerSubmit?.();
                }
              }}
              onPaste={event => {
                if (browserEnv.NEXT_PUBLIC_ENABLE_IMAGE_UPLOAD) {
                  const filesArray = Array.from(event.clipboardData.files);

                  if (filesArray.length === 0) {
                    return;
                  }

                  const imageFiles = filesArray.filter(file => /image/i.test(file.type));

                  if (imageFiles.length === 0) {
                    return;
                  }

                  event.preventDefault();

                  toast.promise(handleImageUpload(event.currentTarget, imageFiles), {
                    loading: 'Uploading image...',
                    success: 'Image uploaded',
                    error: 'Image upload failed',
                  });
                }
              }}
              onDrop={event => {
                if (browserEnv.NEXT_PUBLIC_ENABLE_IMAGE_UPLOAD) {
                  const filesArray = Array.from(event.dataTransfer.files);

                  if (filesArray.length === 0) {
                    return;
                  }

                  const imageFiles = filesArray.filter(file => /image/i.test(file.type));

                  if (imageFiles.length === 0) {
                    return;
                  }

                  event.preventDefault();

                  toast.promise(handleImageUpload(event.currentTarget, imageFiles), {
                    loading: 'Uploading image...',
                    success: 'Image uploaded',
                    error: 'Image upload failed',
                  });
                }
              }}
              className="bg-secondary border-secondary focus-ring block w-full rounded p-3 shadow-sm"
              minRows={minRows}
            />
          </TextareaMarkdown.Wrapper>

          <Suggestion
            state={suggestionState}
            onSelect={(suggestionResult: SuggestionResultType) => {
              const preSuggestion = value.slice(0, suggestionState.triggerIdx!);
              const postSuggestion = value.slice(textareaMarkdownRef.current?.selectionStart);

              let suggestionInsertion = '';

              if (suggestionState.type === 'mention') {
                suggestionInsertion = `[${suggestionResult.label}](/profile/${suggestionResult.value})`;
              }

              if (suggestionState.type === 'emoji') {
                suggestionInsertion = suggestionResult.value;
              }

              const newEditorValue = `${preSuggestion}${suggestionInsertion} ${postSuggestion}`;

              onChange(newEditorValue);
              closeSuggestion();

              setTimeout(() => {
                const caretPosition = newEditorValue.length - postSuggestion.length;

                textareaMarkdownRef.current?.focus();
                textareaMarkdownRef.current?.setSelectionRange(caretPosition, caretPosition);
              }, 0);
            }}
            onClose={closeSuggestion}
          />
        </div>

        {showPreview && <MarkdownPreview markdown={value} />}
      </div>
    </div>
  );
};

export default MarkdownEditor;
