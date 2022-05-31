import PostForm from '@/components/orgnaisms/PostForm';
import Head from 'next/head';

export default function New() {
  return (
    <>
      <Head>
        <title>New Post</title>
      </Head>

      <h1 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">New post</h1>

      <div className="mt-6 text-white">
        <PostForm
          isSubmitting={false}
          //   isSubmitting={addPostMutation.isLoading}
          defaultValues={{
            title: '',
            content: '',
          }}
          backTo="/"
          onSubmit={(values: { title: string; content: string }) => {
            console.log({ values });

            // addPostMutation.mutate(
            //   { title: values.title, content: values.content },
            //   {
            //     onSuccess: data => router.push(`/post/${data.id}`),
            //   },
            // );
          }}
        />
      </div>
    </>
  );
}
