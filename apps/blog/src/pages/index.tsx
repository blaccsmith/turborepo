/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { InferQueryPathAndInput, trpc } from '@/lib/trpc';
import { PostSummaryProps } from '@/components/molecules/PostSummary';
import { getQueryPaginationInput, Pagination } from '@/components/molecules/Pagination';
import PostSummarySkeleton from '@/components/atoms/Skeletons/PostSummarySkeleton';
import PostTag from '@/components/atoms/PostTag';
import { SearchIcon, PlusIcon } from '@heroicons/react/outline';
import NextLink from 'ui/components/atoms/NextLink';
import { Tag } from '@prisma/client';
import { sluggy } from 'utils';

const POSTS_PER_PAGE = 20;

const PostSummary = dynamic<PostSummaryProps>(
  () => import('@/components/molecules/PostSummary').then(mod => mod.PostSummary),
  { ssr: false },
);

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const currentPageNumber = router.query.page ? Number(router.query.page) : 1;
  const utils = trpc.useContext();
  const feedQueryPathAndInput: InferQueryPathAndInput<'post.feed'> = [
    'post.feed',
    getQueryPaginationInput(POSTS_PER_PAGE, currentPageNumber),
  ];
  const feedQuery = trpc.useQuery(feedQueryPathAndInput);
  const { data: tags } = trpc.useQuery(['tag.list']);

  const likeMutation = trpc.useMutation(['post.like'], {
    onMutate: async likedPostId => {
      await utils.cancelQuery(feedQueryPathAndInput);

      const previousQuery = utils.getQueryData(feedQueryPathAndInput);

      if (previousQuery) {
        utils.setQueryData(feedQueryPathAndInput, {
          ...previousQuery,
          posts: previousQuery.posts.map(post =>
            post.id === likedPostId
              ? {
                  ...post,
                  likedBy: [
                    ...post.likedBy,
                    {
                      user: { id: session!.user.id, name: session!.user.name },
                    },
                  ],
                }
              : post,
          ),
        });
      }

      return { previousQuery };
    },
    onError: (err, id, context: any) => {
      if (context?.previousQuery) {
        utils.setQueryData(feedQueryPathAndInput, context.previousQuery);
      }
    },
  });
  const unlikeMutation = trpc.useMutation(['post.unlike'], {
    onMutate: async unlikedPostId => {
      await utils.cancelQuery(feedQueryPathAndInput);

      const previousQuery = utils.getQueryData(feedQueryPathAndInput);

      if (previousQuery) {
        utils.setQueryData(feedQueryPathAndInput, {
          ...previousQuery,
          posts: previousQuery.posts.map(post =>
            post.id === unlikedPostId
              ? {
                  ...post,
                  likedBy: post.likedBy.filter(item => item.user.id !== session!.user.id),
                }
              : post,
          ),
        });
      }

      return { previousQuery };
    },
    onError: (err, id, context: any) => {
      if (context?.previousQuery) {
        utils.setQueryData(feedQueryPathAndInput, context.previousQuery);
      }
    },
  });

  if (feedQuery.isError) {
    return <div>Error: {feedQuery.error.message}</div>;
  }

  const handleTagClick = (tag: Omit<Tag, 'createdAt' | 'updatedAt'>) => {
    if (router.query.sort === sluggy(tag.name)) router.push('/', undefined, { shallow: true });
    else router.push(`/?sort=${sluggy(tag.name)}`, undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>The BLACC Blog</title>
      </Head>

      <div className="flow-root">
        <div className="mt-6 mb-12">
          <h1 className=" mb-6 text-4xl font-black text-white md:text-5xl">The BLACC Blog</h1>
          <div className="flex items-center justify-between space-x-4">
            <div className="scrollbar-hide flex min-h-[50px] items-center justify-start space-x-2 overflow-x-auto pr-2">
              {tags?.map(tag => (
                <PostTag
                  key={tag.id}
                  tag={tag}
                  isSelected={router.query.sort === sluggy(tag.name)}
                  onClick={handleTagClick}
                />
              ))}
            </div>
            <div className="flex items-center justify-start space-x-2">
              <button className="focus-ring flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-[#424242] bg-transparent text-[#9E9E9E] transition-all hover:border-white hover:text-white">
                <SearchIcon className="h-3 w-3" />
              </button>
              <NextLink
                href="/new"
                className="focus-ring flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-[#424242] bg-transparent text-[#9E9E9E] transition-all hover:border-white hover:text-white"
              >
                <PlusIcon className="h-3 w-3" />
              </NextLink>
            </div>
          </div>
        </div>
        <ul className="divide-primary divide-y divide-[#424242]">
          {feedQuery.isLoading ? (
            [...Array(3)].map((_, idx) => (
              <li key={idx} className="py-9">
                <PostSummarySkeleton />
              </li>
            ))
          ) : feedQuery.data!.postCount === 0 ? (
            <div className="text-secondary rounded border py-20 px-10 text-center">
              There are no published posts to show yet.
            </div>
          ) : (
            <div className="flow-root">
              <ul className="divide-primary divide-y divide-[#424242]">
                {feedQuery.data!.posts?.map(post => (
                  <li key={post.id} className="py-9">
                    <PostSummary
                      post={post}
                      onLike={() => {
                        likeMutation.mutate(post.id);
                      }}
                      onUnlike={() => {
                        unlikeMutation.mutate(post.id);
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {feedQuery.data && (
            <Pagination
              itemCount={feedQuery.data.postCount}
              itemsPerPage={POSTS_PER_PAGE}
              currentPageNumber={currentPageNumber}
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default Home;
