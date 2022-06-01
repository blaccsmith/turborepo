import createRouter from '@/backend/utils/createRouter';
import postRoute from './postRoute';
import superjson from 'superjson';

export const appRouter = createRouter().transformer(superjson).merge('post.', postRoute);
export type AppRouter = typeof appRouter;
