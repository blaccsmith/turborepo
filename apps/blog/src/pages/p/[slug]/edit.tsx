import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { trpc } from '@/lib/trpc';
import PostForm from '@/components/orgnaisms/PostForm';
import Layout from '@/components/molecules/SearchLayout';
import updateRSS from '@/lib/rss';

const EditPostPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const postQuery = trpc.useQuery(['post.detail', { slug: router.query.slug as string }]);
  const editPostMutation = trpc.useMutation('post.edit', {
    onError: error => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });

  if (postQuery.data) {
    const postBelongsToUser = postQuery.data.author.id === session!.user.id;

    return (
      <>
        <Head>
          <title>Edit {postQuery.data.title} - Beam</title>
        </Head>

        {postBelongsToUser ? (
          <>
            <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Edit &quot;{postQuery.data.title}&quot;
            </h1>

            <div className="my-6 text-white">
              <PostForm
                isSubmitting={editPostMutation.isLoading}
                defaultValues={{
                  title: postQuery.data.title,
                  tags: postQuery.data.tags.map(el => el.tag.id),
                  content: postQuery.data.content,
                }}
                backTo={`/p/${postQuery.data.slug}`}
                onSubmit={values => {
                  editPostMutation.mutate(
                    {
                      id: postQuery.data.id,
                      data: { ...values },
                    },
                    {
                      onSuccess: async ({ slug }) => {
                        await updateRSS();
                        router.push(`/p/${slug}`);
                      },
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
  }

  if (postQuery.isError) {
    return <div>Error: {postQuery.error.message}</div>;
  }

  return (
    <div className="animate-pulse">
      <div className="h-9 w-3/4 rounded bg-gray-500" />
      <div className="mt-7">
        <div>
          <div className="h-5 w-10 rounded bg-gray-500" />
          <div className="border-secondary mt-2 h-[42px] rounded border" />
        </div>
        <div className="mt-6">
          <div className="h-5 w-10 rounded bg-gray-500" />
          <div className="border-secondary mt-2 h-9 rounded border" />
          <div className="border-secondary mt-2 h-[378px] rounded border" />
        </div>
      </div>
      <div className="mt-9 flex gap-4">
        <div className="h-button w-[92px] rounded-full bg-gray-500" />
        <div className="h-button border-secondary w-20 rounded-full border" />
      </div>
    </div>
  );
};

EditPostPage.auth = true;

EditPostPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default EditPostPage;
