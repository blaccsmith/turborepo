import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { hyphenate } from 'utils';
import createRouter from '@/backend/utils/createRouter';
import { markdownToHtml } from '@/lib/editor';

const userRoute = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED' });
    return next();
  })
  .mutation('add', {
    input: z.object({
      title: z.string().min(1),
      content: z.string().min(1),
    }),
    async resolve({ ctx, input }) {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          slug: hyphenate(input.title),
          contentHtml: markdownToHtml(input.content),
          author: {
            connect: {
              id: ctx.session!.user.id,
            },
          },
        },
      });
      return post;
    },
  })
  .mutation('like', {
    input: z.number(),
    async resolve({ input: id, ctx }) {
      await ctx.prisma.likedPosts.create({
        data: {
          post: {
            connect: {
              id,
            },
          },
          user: {
            connect: {
              id: ctx.session!.user.id,
            },
          },
        },
      });

      return id;
    },
  })
  .mutation('unlike', {
    input: z.number(),
    async resolve({ input: id, ctx }) {
      await ctx.prisma.likedPosts.delete({
        where: {
          postId_userId: {
            postId: id,
            userId: ctx.session!.user.id,
          },
        },
      });

      return id;
    },
  })
  .query('feed', {
    input: z
      .object({
        take: z.number().min(1).max(50).optional(),
        skip: z.number().min(1).optional(),
        authorId: z.string().optional(),
      })
      .optional(),
    async resolve({ input, ctx }) {
      const take = input?.take ?? 50;
      const skip = input?.skip;
      const where = {
        hidden: undefined,
        // hidden: ctx.isUserAdmin ? undefined : false,
        authorId: input?.authorId,
      };

      const posts = await ctx.prisma.post.findMany({
        take,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
        where,
        select: {
          id: true,
          title: true,
          contentHtml: true,
          createdAt: true,
          hidden: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          likedBy: {
            orderBy: {
              createdAt: 'asc',
            },
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });

      const postCount = await ctx.prisma.post.count({
        where,
      });

      return {
        posts,
        postCount,
      };
    },
  });

export default userRoute;
