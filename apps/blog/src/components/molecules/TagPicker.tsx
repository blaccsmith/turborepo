import { trpc } from '@/lib/trpc';
import { Tag } from '@prisma/client';
import React from 'react';
import PostTag from '../atoms/PostTag';

interface Props {
  selectedTags: string[];
  handleTagClick: (tag: Omit<Tag, 'createdAt' | 'updatedAt'>) => void;
}

export default function TagPicker({ handleTagClick, selectedTags }: Props) {
  const { data: tags } = trpc.useQuery(['tag.list']);

  return (
    <div className="mt-6">
      <p className="mb-2 block font-semibold">Add tags</p>
      <div className="bg-secondary border-secondary focus-ring flex min-h-[50px] w-full items-center space-x-2 rounded p-3 text-lg font-light shadow-sm">
        {tags?.map(tag => (
          <PostTag
            key={tag.id}
            tag={tag}
            onClick={handleTagClick}
            isActive={selectedTags.includes(tag.id)}
            isSelected={selectedTags.includes(tag.id)}
          />
        ))}
      </div>
    </div>
  );
}
