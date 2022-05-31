import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from '@/backend/routers';

const trpc = createReactQueryHooks<AppRouter>();

export default trpc;
