import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';
import toast from 'react-hot-toast';
import { Cursor } from 'textarea-markdown-editor';
import uploadImage from '@/lib/cloudinary';

export function markdownToHtml(markdown: string) {
  return DOMPurify.sanitize(marked.parse(markdown, { breaks: true, headerIds: true }));
}

export function handleUploadImages(textareaEl: HTMLTextAreaElement, files: File[]) {
  return new Promise((resolve, reject) => {
    const cursor = new Cursor(textareaEl);

    files.forEach(async file => {
      try {
        const uploadedImage = await uploadImage(file);
        resolve(true);
        cursor.insert(
          `<img width="${
            uploadedImage.dpi >= 144 ? Math.round(uploadedImage.width / 2) : uploadedImage.width
          }" alt="${uploadedImage.originalFilename}" src="${uploadedImage.url}">`,
        );
      } catch (error: any) {
        toast.error(`Error uploading image: ${error.message}`);
        reject(error);
      }
    });
  });
}

export function getSuggestionData(textareaEl: HTMLTextAreaElement): {
  keystrokeTriggered: boolean;
  triggerIdx: number;
  type: 'mention' | 'emoji';
  query: string;
} {
  const positionIndex = textareaEl.selectionStart;
  const textBeforeCaret = textareaEl.value.slice(0, positionIndex);

  const tokens = textBeforeCaret.split(/\s/);
  const lastToken = tokens[tokens.length - 1];

  const triggerIdx = textBeforeCaret.endsWith(lastToken)
    ? textBeforeCaret.length - lastToken.length
    : -1;

  const maybeTrigger = textBeforeCaret[triggerIdx];
  const mentionKeystrokeTriggered = maybeTrigger === '@';
  const emojiKeystrokeTriggered = maybeTrigger === ':';
  const keystrokeTriggered = mentionKeystrokeTriggered || emojiKeystrokeTriggered;
  const type = mentionKeystrokeTriggered ? 'mention' : 'emoji';

  const query = textBeforeCaret.slice(triggerIdx + 1);

  return {
    keystrokeTriggered,
    triggerIdx,
    type,
    query,
  };
}
