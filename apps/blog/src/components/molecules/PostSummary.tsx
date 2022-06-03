/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import { formatDistanceToNow } from 'date-fns';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react';
import Avatar from 'ui/components/atoms/Avatar';
import { InferQueryOutput } from '@/lib/trpc';
import { HeartFilledIcon, HeartIcon, MessageIcon } from '../atoms/Icons';
import NextLink from 'ui/components/atoms/NextLink';

export type PostSummaryProps = {
  post: InferQueryOutput<'post.feed'>['posts'][number];
  hideAuthor?: boolean;
  onLike: () => void;
  onUnlike: () => void;
};

export const PostSummary = ({ post, hideAuthor = false }: PostSummaryProps) => {
  const contentDocument = React.useMemo(
    () => new DOMParser().parseFromString(post.contentHtml, 'text/html'),
    [post.contentHtml],
  );
  //   TODO: decide on the order of the allowed tags
  //   and research on how to truncate html to a max amount of characters
  const summary = React.useMemo(() => {
    const allowedTags = ['p', 'ul', 'ol', 'h3', 'pre', 'img'];

    allowedTags.forEach(tag => {
      const element = contentDocument.body.querySelector(tag);
      if (element) {
        return element.outerHTML;
      }
    });

    return "<p>Summary couldn't be generated</p>";
  }, [contentDocument]);
  const hasMoreContent = React.useMemo(
    () => contentDocument.body.children.length > 1,
    [contentDocument],
  );

  const { data: session } = useSession();

  const isLikedByCurrentUser = Boolean(
    post.likedBy.find(item => item.user.id === session?.user.id),
  );
  const likeCount = post.likedBy.length;

  return (
    <div className="relative flex flex-col items-center justify-start space-y-4 text-left md:flex-row md:justify-between md:space-y-0">
      <div className="w-full">
        <NextLink href={`/p/${post.slug}`} className="mb-1 text-left font-bold text-white">
          {post.title}
        </NextLink>
        <div className="flex items-center">
          <p className="text-sm font-light tracking-tight text-[#bdbdbd]">
            Published{' '}
            <time dateTime={post.createdAt.toISOString()}>
              {formatDistanceToNow(post.createdAt)}
            </time>{' '}
            ago by
          </p>
          <div className="ml-1 flex items-center font-medium text-white">
            <Avatar user={post.author as Session['user']} size={5} /> {post.author.name}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center space-x-6 text-white md:w-min">
        <div className="inline-flex items-center gap-1.5">
          {isLikedByCurrentUser ? (
            <HeartFilledIcon className="h-4 w-4 text-red-500" />
          ) : (
            <HeartIcon className="h-4 w-4 text-red-500" />
          )}
          <span className="text-sm font-semibold tabular-nums">{likeCount}</span>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <MessageIcon className="h-4 w-4 text-white" />
          <span className="text-sm font-semibold tabular-nums">{post._count.comments}</span>
        </div>
      </div>
    </div>
  );
};
