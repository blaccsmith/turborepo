'use client';

import { classNames } from '@/lib/classnames';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

interface Props {
  upvote?: boolean;
  topicId: number;
}

export default function VoteButton({ upvote, topicId }: Props) {
  return (
    <>
      <button
        type="button"
        className={classNames(
          upvote ? 'hover:bg-brand-purple-500 hover:text-white ' : 'hover:bg-gray-200 ',
          'relative inline-flex items-center rounded border border-transparent bg-white p-1 text-sm font-medium text-gray-500 transition-all focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500',
        )}
      >
        <span className="sr-only">{upvote ? 'Upvote' : 'Downvote'}</span>
        {upvote ? (
          <ChevronUpIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
