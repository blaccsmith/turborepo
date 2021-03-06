const PostSummarySkeleton = () => (
  <div className="relative flex animate-pulse flex-col items-center justify-start space-y-4 text-left md:flex-row md:justify-between md:space-y-0">
    <div className="w-full">
      <div className="mb-2 h-5 w-5/6 rounded-md  bg-gray-500 md:w-2/5" />
      <div className="h-4 w-2/3  rounded-md bg-gray-500 md:w-1/3" />
      <div className="mt-4 h-[26px] w-1/3 rounded-md bg-gray-600" />
    </div>
    <div className="flex w-full items-center space-x-6 text-white md:w-min">
      <div className="mb-1 h-4 w-9 rounded-md bg-gray-500" />
      <div className="mb-1 h-4 w-9 rounded-md bg-gray-500" />
    </div>
  </div>
);

export default PostSummarySkeleton;
