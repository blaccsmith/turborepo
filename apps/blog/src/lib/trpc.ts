import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from '@/backend/routers';

export const trpc = createReactQueryHooks<AppRouter>();
