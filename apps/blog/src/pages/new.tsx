import Head from 'next/head';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import PostForm from '@/components/orgnaisms/PostForm';
import { trpc } from '@/lib/trpc';
import { useSession } from 'next-auth/react';

const New = () => {
  const router = useRouter();
  const { data: userData } = useSession();

  const addPostMutation = trpc.useMutation('post.add', {
    onError: error => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });

  return (
    <>
      <Head>
        <title>New Post - BLACC</title>
      </Head>

      <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">New post</h1>

      <div className="my-6 text-white">
        <PostForm
          isSubmitting={addPostMutation.isLoading}
          defaultValues={{
            title: '',
            tags: [],
            content: '',
          }}
          backTo="/"
          onSubmit={values => {
            addPostMutation.mutate(
              { ...values },
              {
                onSuccess: async (data: any) => {
                  const feedData = {
                    title: values.title,
                    author: userData?.user?.name || '',
                    description: values.title,
                    slug: data.slug,
                  };

                  await fetch('/api/rss', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(feedData),
                  });

                  router.push(`/p/${data.slug}`);
                },
              },
            );
          }}
        />
      </div>
    </>
  );
};

export default New;
