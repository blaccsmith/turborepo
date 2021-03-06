/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { GetStaticProps, NextPage } from 'next';
import RSS from 'rss';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SearchIcon, PlusIcon } from '@heroicons/react/outline';
import NextLink from 'ui/components/atoms/NextLink';
import { Tag } from '@prisma/client';
import { sluggy } from 'utils';
import { useEffect, useState } from 'react';
import { writeFile } from 'fs/promises';
import { InferQueryOutput, InferQueryPathAndInput, trpc } from '@/lib/trpc';
import { PostSummaryProps } from '@/components/molecules/PostSummary';
import { getQueryPaginationInput, Pagination } from '@/components/molecules/Pagination';
import PostSummarySkeleton from '@/components/atoms/Skeletons/PostSummarySkeleton';
import PostTag from '@/components/atoms/PostTag';
import PostTagSkeleton from '@/components/atoms/Skeletons/PostTagSkeleton';
import SearchDialog from '@/components/molecules/SearchDialog';

const POSTS_PER_PAGE = 20;

const PostSummary = dynamic<PostSummaryProps>(
  () => import('@/components/molecules/PostSummary').then(mod => mod.PostSummary),
  { ssr: false },
);

type PostsFromFeed = InferQueryOutput<'post.feed'>['posts'];

const RSSPath = process.env.NODE_ENV === 'production' ? '../feed.xml' : './public/feed.xml';
const baseURL =
  process.env.NODE_ENV === 'production' ? 'https://blog.blacc.xyz' : 'http://localhost:3000';

export const getStaticProps: GetStaticProps = async () => {
  const {
    result: {
      data: { json },
    },
  } = await fetch(`${baseURL}/api/trpc/post.feed`).then(resp => resp.json());

  const { posts }: InferQueryOutput<'post.feed'> = json;

  const feed = new RSS({
    title: 'BLACC',
    site_url: 'https://blog.blacc.xyz/',
    feed_url: 'https://blog.blacc.xyz/feed.xml',
    description: 'BLACC Posts',
  });

  posts?.forEach(({ title, author, createdAt, slug }) => {
    feed.item({
      title,
      description: `${title} by ${author.name}`,
      url: `https://blog.blacc.xyz/p/${slug}`,
      author: author.name as string,
      date: createdAt,
    });
  });

  await writeFile(RSSPath, feed.xml({ indent: true }), { flag: 'w+' });
  return { props: { posts: [] } };
};

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<PostsFromFeed | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const currentPageNumber = router.query.page ? Number(router.query.page) : 1;
  const utils = trpc.useContext();
  const feedQueryPathAndInput: InferQueryPathAndInput<'post.feed'> = [
    'post.feed',
    getQueryPaginationInput(POSTS_PER_PAGE, currentPageNumber),
  ];
  const feedQuery = trpc.useQuery(feedQueryPathAndInput);
  const { data: tags, isLoading: loadingTags } = trpc.useQuery(['tag.list']);

  useEffect(() => {
    if (router.query.tag && feedQuery.data) {
      const postsWithTag = feedQuery.data.posts.filter(post =>
        post.tags.some(el => sluggy(el.tag.name) === router.query.tag),
      );

      setPosts(postsWithTag);
    } else setPosts(null);
  }, [router, feedQuery.data]);

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
                {(posts ?? feedQuery.data!.posts)?.map(post => (
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
