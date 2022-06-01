import superjson from 'superjson';
import createRouter from '@/backend/utils/createRouter';
import postRoute from './postRoute';

export const appRouter = createRouter().transformer(superjson).merge('post.', postRoute);
export type AppRouter = typeof appRouter;
