import { classNames } from 'utils';

type PostSummarySkeletonProps = {
  hideAuthor?: boolean;
};

const PostSummarySkeleton = ({ hideAuthor }: PostSummarySkeletonProps) => (
  <div className="animate-pulse">
    <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
    <div
      className={classNames(
        'flex items-center justify-between gap-4',
        hideAuthor ? 'mt-2' : 'mt-6',
      )}
    >
      <div className="flex items-center gap-4">
        {!hideAuthor && <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />}
        <div className="flex-1">
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          {!hideAuthor && <div className="mt-2 h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />}
        </div>
      </div>
    </div>
    <div className="mt-7 space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 h-5 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="col-span-1 h-5 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="h-5 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
    </div>
  </div>
);

export default PostSummarySkeleton;
