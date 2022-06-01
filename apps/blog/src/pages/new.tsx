import Head from 'next/head';
import PostForm from '@/components/orgnaisms/PostForm';
import { trpc } from '@/lib/trpc';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const New = () => {
  const router = useRouter();

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

      <div className="mt-6 text-white">
        <PostForm
          isSubmitting={addPostMutation.isLoading}
          defaultValues={{
            title: '',
            content: '',
          }}
          backTo="/"
          onSubmit={values => {
            addPostMutation.mutate(
              { title: values.title, content: values.content },
              {
                onSuccess: data => router.push(`/post/${data.id}`),
              },
            );
          }}
        />
      </div>
    </>
  );
};

export default New;
