import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import createRouter from '@/backend/utils/createRouter';

const userRoute = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED' });
    return next();
  })
  .query('getUserById', {
    input: z.object({ id: z.string() }),
    async resolve({ input }) {
      // Uncomment this snippet if connecting to a real database
      //
      // const user = await ctx.prisma.user.findUnique({
      // 	where: { id: input.id },
      // });

      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${input.id}`);
      const user = await res.json();
      return { success: true, user };
    },
  });

export default userRoute;