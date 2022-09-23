import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PencilIcon, TrashIcon, DotsHorizontalIcon } from '@heroicons/react/outline';
import NextLink from 'ui/components/atoms/NextLink';
import ModalWrapper from 'ui/components/atoms/Layouts/ModalWrapper';
import { createSSGHelpers } from '@trpc/react/ssg';
import { GetStaticPaths, GetStaticProps } from 'next';
import safeJsonStringify from 'safe-json-stringify';
import { NextSeo } from 'next-seo';
import AuthorWithDate from '@/components/atoms/AuthorWithDate';
import ButtonLink from '@/components/atoms/ButtonLink';
import HtmlView from '@/components/atoms/HtmlView';
import { Button } from '@/components/atoms/Button';
import BlogAvatar from '@/components/atoms/BlogAvatar';
import { MessageIcon } from '@/components/atoms/Icons';
import Banner from '@/components/atoms/Layout/Banner';
import Layout from '@/components/molecules/SearchLayout';
import {
  Menu,
  MenuButton,
  MenuItemButton,
  MenuItems,
  MenuItemsContent,
} from '@/components/molecules/Menu';
import MarkdownEditor from '@/components/orgnaisms/MarkdownEditor';
import { InferQueryOutput, InferQueryPathAndInput, transformer, trpc } from '@/lib/trpc';
import { createContext } from '@/backend/utils/context';

import LikeButton from '@/components/atoms/LikeButton';
import PostTag from '@/components/atoms/PostTag';
import { appRouter } from '@/backend/routers';
import updateRSS from '@/lib/rss';

function getPostQueryPathAndInput(slug: string): InferQueryPathAndInput<'post.detail'> {
  return [
    'post.detail',
    {
      slug,
    },
  ];
}
const AddCommentForm = ({ postSlug }: { postSlug: string }) => {
  const [markdownEditorKey, setMarkdownEditorKey] = React.useState(0);
  const utils = trpc.useContext();
  const addCommentMutation = trpc.useMutation('comment.add', {
    onSuccess: () => utils.invalidateQueries(getPostQueryPathAndInput(postSlug)),
    onError: error => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });
  const { control, handleSubmit, reset } = useForm<CommentFormData>();

  const onSubmit: SubmitHandler<CommentFormData> = data => {
    addCommentMutation.mutate(
      {
        postSlug,
        content: data.content,
      },
      {
        onSuccess: () => {
          reset({ content: '' });
          setMarkdownEditorKey(prevKey => prevKey + 1);
        },
      },
    );
  };

  return (
    <form className="flex-1 text-white" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="content"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <MarkdownEditor
            key={markdownEditorKey}
            value={field.value}
            onChange={field.onChange}
            onTriggerSubmit={handleSubmit(onSubmit)}
            required
            placeholder="Comment"
            minRows={4}
          />
        )}
      />
      <div className="mt-4">
        <Button
          type="submit"
          isLoading={addCommentMutation.isLoading}
          loadingChildren="Adding comment"
          className="text-white"
        >
          Add comment
        </Button>
      </div>
    </form>
  );
};

const EditCommentForm = ({
  postSlug,
  comment,
  onDone,
}: {
  postSlug: string;
  comment: InferQueryOutput<'post.detail'>['comments'][number];
  onDone: () => void;
}) => {
  const utils = trpc.useContext();
  const editCommentMutation = trpc.useMutation('comment.edit', {
    onSuccess: () => utils.invalidateQueries(getPostQueryPathAndInput(postSlug)),
    onError: error => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });
  const { control, handleSubmit } = useForm<CommentFormData>({
    defaultValues: {
      content: comment.content,
    },
  });

  const onSubmit: SubmitHandler<CommentFormData> = data => {
    editCommentMutation.mutate(
      {
        id: comment.id,
        data: {
          content: data.content,
        },
      },
      {
        onSuccess: () => onDone(),
      },
    );
  };

  return (
    <form className="flex-1 text-white" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="content"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <MarkdownEditor
            value={field.value}
            onChange={field.onChange}
            onTriggerSubmit={handleSubmit(onSubmit)}
            required
            placeholder="Comment"
            minRows={4}
            autoFocus
          />
        )}
      />
      <div className="mt-4 flex gap-4 text-white">
        <Button
          type="submit"
          isLoading={editCommentMutation.isLoading}
          loadingChildren="Updating comment"
        >
          Update comment
        </Button>
        <Button variant="secondary" onClick={onDone}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

const ConfirmDeleteCommentDialog = ({
  postSlug,
  commentId,
  isOpen,
  onClose,
}: {
  postSlug: string;
  commentId: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const utils = trpc.useContext();
  const deleteCommentMutation = trpc.useMutation('comment.delete', {
    onSuccess: () => utils.invalidateQueries(getPostQueryPathAndInput(postSlug)),
    onError: error => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="bg-brand-black rounded-lg border border-[#353535] px-6 py-4 text-white shadow-2xl shadow-[#282828]">
        <h1 className="text-2xl font-bold">Delete comment</h1>
        <p className="mt-6 text-[#fafafa]">Are you sure you want to delete this comment?</p>
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose} ref={cancelRef}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="!text-red-400"
            isLoading={deleteCommentMutation.isLoading}
            loadingChildren="Deleting comment"
            onClick={() => {
              deleteCommentMutation.mutate(commentId, {
                onSuccess: () => onClose(),
              });
            }}
          >
            Delete comment
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

const ConfirmDeleteDialog = ({
  postSlug,
  isOpen,
  onClose,
}: {
  postSlug: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const deletePostMutation = trpc.useMutation('post.delete', {
    onSuccess: async () => {
      await updateRSS();
    },
    onError: error => {
      toast.error(`Something went wrong: ${error.message}`);
    },
  });

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="bg-brand-black rounded-lg border border-[#353535] px-6 py-4 text-white shadow-2xl shadow-[#282828]">
        <h1 className="text-2xl font-bold">Delete post</h1>
        <p className="mt-6 text-[#fafafa]">Are you sure you want to delete this post?</p>
        <div className="mt-6 flex justify-end gap-4">
          <Button variant="secondary" onClick={onClose} ref={cancelRef}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            className="!text-red-400"
            isLoading={deletePostMutation.isLoading}
            loadingChildren="Deleting post"
            onClick={() => {
              deletePostMutation.mutate(postSlug, {
                onSuccess: () => router.push('/'),
              });
            }}
          >
            Delete post
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

const Comment = ({
  postSlug,
  comment,
}: {
  postSlug: string;
  comment: InferQueryOutput<'post.detail'>['comments'][number];
}) => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = React.useState(false);

  const commentBelongsToUser = comment.author.id === session?.user.id;

  if (isEditing) {
    return (
      <div className="flex items-start gap-4">
        <BlogAvatar name={comment.author.name!} src={comment.author.image} />
        <EditCommentForm
          postSlug={postSlug}
          comment={comment}
          onDone={() => {
            setIsEditing(false);
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <AuthorWithDate author={comment.author} date={new Date(comment.createdAt)} />
        {commentBelongsToUser && (
          <Menu>
            <MenuButton className="focus-ring flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-[#424242] bg-transparent text-[#9E9E9E] transition-all hover:border-white">
              <DotsHorizontalIcon className="h-3 w-3" />
            </MenuButton>

            <MenuItems className="w-28 border border-[#424242] text-white">
              <MenuItemsContent>
                <MenuItemButton
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  Edit
                </MenuItemButton>
                <MenuItemButton
                  className="!text-red"
                  onClick={() => {
                    setIsConfirmDeleteDialogOpen(true);
                  }}
                >
                  Delete
                </MenuItemButton>
              </MenuItemsContent>
            </MenuItems>
          </Menu>
        )}
      </div>

      <div className="mt-4 pl-11 text-white sm:pl-16">
        <HtmlView html={comment.contentHtml} className="text-white" />
      </div>

      <ConfirmDeleteCommentDialog
        postSlug={postSlug}
        commentId={comment.id}
        isOpen={isConfirmDeleteDialogOpen}
        onClose={() => {
          setIsConfirmDeleteDialogOpen(false);
        }}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  });

  const { posts } = await ssg.fetchQuery('post.feed');

  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  });

  const queryRes = await ssg.fetchQuery('post.detail', {
    slug: params?.slug as string,
  });

  const post = JSON.parse(safeJsonStringify(queryRes));

  return { props: { post } };
};

type PostDetail = {
  post: InferQueryOutput<'post.detail'>;
};

const PostPage = ({ post }: PostDetail) => {
  const { data: session } = useSession();
  const router = useRouter();
  const utils = trpc.useContext();
  const postQueryPathAndInput = getPostQueryPathAndInput(router.query.slug as string);
  const likeMutation = trpc.useMutation(['post.like'], {
    onMutate: async likedPostId => {
      await utils.cancelQuery(postQueryPathAndInput);

      const previousPost = utils.getQueryData(postQueryPathAndInput);

      if (previousPost) {
        utils.setQueryData(postQueryPathAndInput, {
          ...previousPost,
          likedBy: [
            ...previousPost.likedBy,
            { user: { id: session!.user.id, name: session!.user.name } },
          ],
        });
      }

      return { previousPost };
    },
    onError: (err, id, context: any) => {
      if (context?.previousPost) {
        utils.setQueryData(postQueryPathAndInput, context.previousPost);
      }
    },
  });
  const unlikeMutation = trpc.useMutation(['post.unlike'], {
    onMutate: async unlikedPostId => {
      await utils.cancelQuery(postQueryPathAndInput);

      const previousPost = utils.getQueryData(postQueryPathAndInput);

      if (previousPost) {
        utils.setQueryData(postQueryPathAndInput, {
          ...previousPost,
          likedBy: previousPost.likedBy.filter(item => item.user.id !== session!.user.id),
        });
      }

      return { previousPost };
    },
    onError: (err, id, context: any) => {
      if (context?.previousPost) {
        utils.setQueryData(postQueryPathAndInput, context.previousPost);
      }
    },
  });
  const [isConfirmDeleteDialogOpen, setIsConfirmDeleteDialogOpen] = React.useState(false);

  function handleDelete() {
    setIsConfirmDeleteDialogOpen(true);
  }

  const isUserAdmin = session?.user.role === 'ADMIN';
  const postBelongsToUser = post.author.id === session?.user.id;

  return (
    <>
      <Head>
        <title>{post.title} - Beam</title>
      </Head>
      <NextSeo
        title={post.title}
        description="This example uses more of the available config options."
        canonical="https://www.blacc.xyz/blog"
        openGraph={{
          url: `https://www.blog.blacc.xyz/blog/p/${post.slug}`,
          title: `${post.title}`,
          description: 'Open Graph Description',
          images: [
            {
              url: 'https://www.blacc.xyz/blog_banner.png',
              width: 800,
              height: 600,
              alt: 'BLACC Blog',
              type: 'image/png',
            },
          ],
          site_name: 'The Black Coder Community',
        }}
        twitter={{
          handle: '@blaccxyz_',
          site: '@blaccxyz_',
          cardType: 'summary_large_image',
        }}
      />
      <div className="divide-primary divide-y">
        <div className="pb-12">
          {post.hidden && (
            <Banner className="mb-6">
              This post has been hidden and is only visible to administrators.
            </Banner>
          )}

          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-tighter text-white md:text-4xl">
              {post.title}
            </h1>
            {(postBelongsToUser || isUserAdmin) && (
              <>
                <div className="flex md:hidden">
                  <Menu>
                    <MenuButton className="focus-ring flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-[#424242] bg-transparent text-[#9E9E9E] transition-all hover:border-white">
                      <DotsHorizontalIcon className="h-3 w-3" />
                    </MenuButton>

                    <MenuItems className="w-28 border border-[#424242] text-white">
                      <MenuItemsContent>
                        {postBelongsToUser && (
                          <>
                            <NextLink href={`/p/${post.slug}/edit`}>
                              <MenuItemButton onClick={() => null}>Edit</MenuItemButton>
                            </NextLink>
                            <MenuItemButton className="!text-red" onClick={handleDelete}>
                              Delete
                            </MenuItemButton>
                          </>
                        )}
                      </MenuItemsContent>
                    </MenuItems>
                  </Menu>
                </div>
                <div className="hidden md:flex md:gap-4">
                  {postBelongsToUser && (
                    <div className="flex items-center justify-start space-x-2">
                      <NextLink
                        href={`/p/${post.slug}/edit`}
                        className="focus-ring flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-[#424242] bg-transparent text-[#9E9E9E] transition-all hover:border-white hover:text-white"
                      >
                        <PencilIcon className="h-3 w-3" />
                      </NextLink>
                      <button
                        onClick={handleDelete}
                        className="focus-ring flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-full border border-[#424242] bg-transparent text-[#9E9E9E] transition-all hover:border-white hover:text-white"
                      >
                        <TrashIcon className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="mt-6">
            <AuthorWithDate author={post.author} date={post.createdAt} />
            <div className="scrollbar-hide mt-4 flex items-center justify-start space-x-2 overflow-x-auto pr-2">
              {post.tags?.map(el => (
                <PostTag key={el.tag.id} tag={el.tag} isSelected />
              ))}
            </div>
          </div>
          <HtmlView html={post.contentHtml} className="mt-8 text-white" />
          <div className="clear-both mt-6 flex gap-4">
            <LikeButton
              likedBy={post.likedBy}
              onLike={() => {
                likeMutation.mutate({ id: post.id, slug: post.slug });
              }}
              onUnlike={() => {
                unlikeMutation.mutate({ id: post.id, slug: post.slug });
              }}
            />
            <ButtonLink href={`/p/${post.slug}#comments`} variant="secondary">
              <MessageIcon className="h-4 w-4 text-[#9E9E9E]" />
              <span className="ml-1.5 text-[#9E9E9E]">{post.comments.length}</span>
            </ButtonLink>
          </div>
        </div>

        <div id="comments" className="space-y-12 pt-12">
          {post.comments.length > 0 && (
            <ul className="space-y-12">
              {post.comments.map(comment => (
                <li key={comment.id}>
                  <Comment postSlug={post.slug} comment={comment} />
                </li>
              ))}
            </ul>
          )}
          <div className="flex items-start gap-2 sm:gap-4">
            {session && (
              <>
                <span className="hidden sm:inline-block">
                  <BlogAvatar
                    name={session!.user.name as string}
                    src={session!.user.image as string}
                  />
                </span>
                <span className="inline-block sm:hidden">
                  <BlogAvatar
                    name={session!.user.name as string}
                    src={session!.user.image as string}
                    size="sm"
                  />
                </span>
              </>
            )}
            <AddCommentForm postSlug={post.slug} />
          </div>
        </div>
      </div>

      <ConfirmDeleteDialog
        postSlug={post.slug}
        isOpen={isConfirmDeleteDialogOpen}
        onClose={() => {
          setIsConfirmDeleteDialogOpen(false);
        }}
      />
    </>
  );
};

PostPage.auth = true;

PostPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

type CommentFormData = {
  content: string;
};

export default PostPage;
