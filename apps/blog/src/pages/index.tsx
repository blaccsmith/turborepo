/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SearchIcon, PlusIcon } from '@heroicons/react/outline';
import NextLink from 'ui/components/atoms/NextLink';
import { Tag } from '@prisma/client';
import { sluggy } from 'utils';
import { useEffect, useState } from 'react';
import safeJsonStringify from 'safe-json-stringify';
import { createSSGHelpers } from '@trpc/react/ssg';
import { InferQueryOutput, InferQueryPathAndInput, transformer, trpc } from '@/lib/trpc';
import { PostSummaryProps } from '@/components/molecules/PostSummary';
import { getQueryPaginationInput, Pagination } from '@/components/molecules/Pagination';
import PostTag from '@/components/atoms/PostTag';
import PostTagSkeleton from '@/components/atoms/Skeletons/PostTagSkeleton';
import SearchDialog from '@/components/molecules/SearchDialog';
import { appRouter } from '@/backend/routers';
import { createContext } from '@/backend/utils/context';

const POSTS_PER_PAGE = 20;

const PostSummary = dynamic<PostSummaryProps>(
  () => import('@/components/molecules/PostSummary').then(mod => mod.PostSummary),
  { ssr: false },
);

type PostsFromFeed = InferQueryOutput<'post.feed'>['posts'];
type FeedTags = InferQueryOutput<'tag.list'>;

export const getStaticProps: GetStaticProps = async ctx => {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  });

  const [postsRes, tags] = await Promise.all([
    ssg.fetchQuery('post.feed'),
    ssg.fetchQuery('tag.list'),
  ]);

  const posts = JSON.parse(safeJsonStringify(postsRes.posts));
  return { props: { posts, tags } };
};

const Home = ({ posts: _posts, tags: _tags }: { posts: PostsFromFeed; tags: FeedTags }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<PostsFromFeed>(_posts);
  const [showSearch, setShowSearch] = useState(false);
  const currentPageNumber = router.query.page ? Number(router.query.page) : 1;
  const utils = trpc.useContext();
  const feedQueryPathAndInput: InferQueryPathAndInput<'post.feed'> = [
    'post.feed',
    getQueryPaginationInput(POSTS_PER_PAGE, currentPageNumber),
  ];
  const { data: tags, isLoading: loadingTags } = trpc.useQuery(['tag.list']);

  useEffect(() => {
    if (router.query.tag) {
      const postsWithTag = posts.filter(post =>
        post.tags.some(el => sluggy(el.tag.name) === router.query.tag),
      );

      setPosts(postsWithTag);
    } else setPosts(_posts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

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

  const handleTagClick = (tag: Omit<Tag, 'createdAt' | 'updatedAt'>) => {
    if (router.query.tag === sluggy(tag.name)) router.push('/', undefined, { shallow: true });
    else router.push(`/?tag=${sluggy(tag.name)}`, undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>The BLACC Blog</title>
      </Head>

      <div className="flow-root">
        <SearchDialog isOpen={showSearch} onClose={() => setShowSearch(false)} />
        <div className="bg-brand-black sticky top-[78px] z-10 mb-12 pt-6 md:top-[94px]">
          <h1 className=" mb-6 text-4xl font-black text-white md:text-5xl">The BLACC Blog</h1>
          <div className="flex items-center justify-between space-x-4">
            <div className="scrollbar-hide flex min-h-[50px] items-center justify-start space-x-2 overflow-x-auto pr-2">
              {loadingTags
                ? [...Array(3)].map((_, idx) => <PostTagSkeleton key={idx} />)
                : tags?.map(tag => (
                    <PostTag
                      key={tag.id}
                      tag={tag}
                      isSelected={router.query.tag === sluggy(tag.name)}
                      onClick={handleTagClick}
                    />
                  ))}
            </div>
            <div className="flex items-center justify-start space-x-2">
              <button
                onClick={() => setShowSearch(true)}
                className="focus-ring flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-[#424242] bg-transparent text-[#9E9E9E] transition-all hover:border-white hover:text-white"
              >
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
          <div className="flow-root">
            <ul className="divide-primary divide-y divide-[#424242]">
              {posts.map(post => (
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

          {posts && (
            <Pagination
              itemCount={posts.length}
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
