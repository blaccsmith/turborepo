import createRouter from '@/backend/utils/createRouter';
import postRoute from './postRoute';

export const appRouter = createRouter().merge('post.', postRoute);
export type AppRouter = typeof appRouter;
