import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import createRouter from '@/backend/utils/createRouter';
import { markdownToHtml } from '@/lib/editor';
import { hyphenate } from 'utils';

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
  });

export default userRoute;
