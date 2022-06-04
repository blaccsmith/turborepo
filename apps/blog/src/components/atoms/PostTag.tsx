import { Tag } from '@prisma/client';
import React from 'react';
import { classNames } from 'utils';

interface Props {
  tag: Omit<Tag, 'createdAt' | 'updatedAt'>;
  isActive?: boolean;
  isSelected?: boolean;
  onClick?: (tag: Omit<Tag, 'createdAt' | 'updatedAt'>) => void;
}

export default function PostTag({ tag, isSelected, isActive, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(tag)}
      className={classNames(
        isSelected
          ? 'bg-brand-purple-400 border-transparent text-white'
          : 'hover:text-brand-purple-400 hover:border-brand-purple-400  border-[#424242] bg-transparent text-[#9E9E9E]',
        'focus-ring inline-flex cursor-pointer items-center rounded-md border px-3 py-0.5 text-sm transition-all',
      )}
    >
      {isActive && (
        <svg
          className={classNames(
            isSelected ? 'text-white' : 'text-brand-purple-400',
            '-ml-0.5 mr-1.5 h-2 w-2',
          )}
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx={4} cy={4} r={3} />
        </svg>
      )}
      {tag.name}
    </button>
  );
}
