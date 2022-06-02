import superjson from 'superjson';
import createRouter from '@/backend/utils/createRouter';
import postRouter from './postRoute';
import commentRouter from './commentRoute';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('post.', postRouter)
  .merge('comment.', commentRouter);

export type AppRouter = typeof appRouter;
