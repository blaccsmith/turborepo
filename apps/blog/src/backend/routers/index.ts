import createRouter from '@/backend/utils/createRouter';
import userRoute from './userRoute';

export const appRouter = createRouter().merge('user.', userRoute);
export type AppRouter = typeof appRouter;
