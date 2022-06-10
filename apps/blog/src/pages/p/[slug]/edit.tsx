import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { createSSGHelpers } from '@trpc/react/ssg';
import { GetServerSideProps } from 'next';
import safeJsonStringify from 'safe-json-stringify';
import { InferQueryOutput, transformer, trpc } from '@/lib/trpc';
import PostForm from '@/components/orgnaisms/PostForm';
import Layout from '@/components/molecules/SearchLayout';
import { appRouter } from '@/backend/routers';
import { createContext } from '@/backend/utils/context';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const ssg = createSSGHelpers({ router: appRouter, ctx: await createContext(), transformer });

  const queryRes = await ssg.fetchQuery('post.detail', {
    slug: params?.slug as string,
  });

  const post = JSON.parse(safeJsonStringify(queryRes));
  return { props: { post } };
};

type PostDetail = {
  post: InferQueryOutput<'post.detail'>;
};

const EditPostPage = ({ post }: PostDetail) => {
  const { data: session } = useSession();
  const router = useRouter();
  const editPostMutation = trpc.useMutation('post.edit', {
    onError: error => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });

  const postBelongsToUser = post.author.id === session?.user.id;

  return (
    <>
      <Head>
        <title>Edit {post.title} - Beam</title>
      </Head>

      {postBelongsToUser ? (
        <>
          <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Edit &quot;{post.title}&quot;
          </h1>

          <div className="my-6 text-white">
            <PostForm
              isSubmitting={editPostMutation.isLoading}
              defaultValues={{
                title: post.title,
                tags: post.tags.map(el => el.tag.id),
                content: post.content,
              }}
              backTo={`/p/${post.slug}`}
              onSubmit={values => {
                editPostMutation.mutate(
                  {
                    id: post.id,
                    data: { ...values },
                  },
                  {
                    onSuccess: ({ slug }) => router.push(`/p/${slug}`),
                  },
                );
              }}
            />
          </div>
        </>
      ) : (
        <div>You don&apos;t have permissions to edit this post.</div>
      )}
    </>
  );
};

EditPostPage.auth = true;

EditPostPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditPostPage;
