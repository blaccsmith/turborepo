import { classNames } from 'utils';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDebounce } from 'use-debounce';
import { ItemOptions, useItemList } from 'use-item-list';
import { InferQueryOutput, trpc } from '@/lib/trpc';
import { SearchIcon, SpinnerIcon } from '@/components/atoms/Icons';

type SearchDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SearchResult = ({
  useItem,
  result,
}: {
  useItem: ({ ref, text, value, disabled }: ItemOptions) => {
    id: string;
    index: number;
    highlight: () => void;
    select: () => void;
    selected: any;
    useHighlighted: () => Boolean;
  };
  result: InferQueryOutput<'post.search'>[number];
}) => {
  const ref = React.useRef<HTMLLIElement>(null);
  const { id, highlight, select, useHighlighted } = useItem({
    ref,
    value: result,
  });
  const highlighted = useHighlighted();

  return (
    <li ref={ref} id={id} onMouseEnter={highlight} onClick={select}>
      <Link href={`/p/${result.slug}`}>
        <a
          className={classNames(
            'bg-brand-black block cursor-pointer py-3.5 pl-10 pr-3 leading-tight transition-colors',
            highlighted && ' bg-brand-purple-400 text-white',
          )}
        >
          {result.title}
        </a>
      </Link>
    </li>
  );
};

const SearchField = ({ onSelect }: { onSelect: () => void }) => {
  const [value, setValue] = React.useState('');
  const [debouncedValue] = useDebounce(value, 1000);
  const router = useRouter();

  const feedQuery = trpc.useQuery(['post.search', { query: debouncedValue }], {
    enabled: debouncedValue.trim().length > 0,
  });

  const { moveHighlightedItem, selectHighlightedItem, useItem } = useItemList({
    onSelect: item => {
      router.push(`/p/${item.value.slug}`);
      onSelect();
    },
  });

  React.useEffect(() => {
    function handleKeydownEvent(event: KeyboardEvent) {
      const { code } = event;

      if (code === 'ArrowUp' || code === 'ArrowDown' || code === 'Enter') {
        event.preventDefault();
      }

      if (code === 'ArrowUp') {
        moveHighlightedItem(-1);
      }

      if (code === 'ArrowDown') {
        moveHighlightedItem(1);
      }

      if (code === 'Enter') {
        selectHighlightedItem();
      }
    }

    document.addEventListener('keydown', handleKeydownEvent);
    return () => {
      document.removeEventListener('keydown', handleKeydownEvent);
    };
  }, [moveHighlightedItem, selectHighlightedItem, router]);

  return (
    <div className=" text-white">
      <div className="relative ">
        <div
          className={classNames(
            'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-opacity',
            feedQuery.isLoading ? 'opacity-100' : 'opacity-0',
          )}
        >
          <SpinnerIcon className="h-4 w-4 animate-spin" />
        </div>
        <div
          className={classNames(
            'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 transition-opacity',
            feedQuery.isLoading ? 'opacity-0' : 'opacity-100',
          )}
        >
          <SearchIcon className="h-4 w-4" aria-hidden="true" />
        </div>
        <input
          type="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="Search"
          className="bg-brand-black focus-ring block w-full border-0 py-3 pl-10"
          role="combobox"
          aria-controls="search-results"
          aria-expanded
          value={value}
          onChange={event => {
            setValue(event.target.value);
          }}
        />
      </div>
      {feedQuery.data &&
        (feedQuery.data.length > 0 ? (
          <ul
            id="search-results"
            role="listbox"
            className="max-h-[286px] overflow-y-auto border-t border-t-[#424242]"
          >
            {feedQuery.data.map(result => (
              <SearchResult key={result.id} useItem={useItem} result={result} />
            ))}
          </ul>
        ) : (
          <div className="border-t py-3.5 px-3 text-center leading-tight">
            No results. Try something else
          </div>
        ))}
      {feedQuery.isError && (
        <div className="border-t py-3.5 px-3 text-center leading-tight">
          Error: {feedQuery.error.message}
        </div>
      )}
    </div>
  );
};

const SearchDialog = ({ isOpen, onClose }: SearchDialogProps) => (
  <Transition.Root show={isOpen} as={React.Fragment}>
    <Dialog as="div" className="relative z-10" onClose={onClose}>
      <Transition.Child
        as={React.Fragment}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="bg-brand-black/75 fixed inset-0 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 flex items-start justify-center overflow-hidden">
          <div className="pointer-events-none mt-[20vh] flex max-w-md ">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-50"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="pointer-events-auto w-screen px-6">
                <div className="inline-block w-full max-w-md transform overflow-hidden rounded-lg border border-[#424242] text-left align-middle shadow-xl transition-all md:mx-0">
                  <SearchField onSelect={onClose} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
);

export default SearchDialog;
