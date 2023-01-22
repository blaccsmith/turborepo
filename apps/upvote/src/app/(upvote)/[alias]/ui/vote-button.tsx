'use client';

import { classNames } from '@/lib/classnames';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface Props {
  upvote?: boolean;
  topicId: number;
}

const updateTopic = async (topicId: number, upvote: boolean, refresh: () => void) => {
  const res = await fetch(`/api/upvote/${topicId}`, {
    method: 'POST',
    body: JSON.stringify({ upvote }),
  });
  const data = await res.json();
  refresh();
};

export default function VoteButton({ upvote, topicId }: Props) {
  const router = useRouter();
  return (
    <>
      <button
        type="button"
        onClick={() => updateTopic(topicId, upvote ?? false, router.refresh)}
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
