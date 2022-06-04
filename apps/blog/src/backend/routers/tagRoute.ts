import { z } from 'zod';
import createRouter from '@/backend/utils/createRouter';

const tagRouter = createRouter()
  .query('list', {
    async resolve({ ctx }) {
      const tags = await ctx.prisma.tag.findMany({
        select: { id: true, name: true },
      });
      return tags;
    },
  })
  .query('getById', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const posts = await ctx.prisma.tag.findUnique({
        where: { id: input.id },
        select: {
          posts: {},
        },
      });

      return posts;
    },
  });
export default tagRouter;
