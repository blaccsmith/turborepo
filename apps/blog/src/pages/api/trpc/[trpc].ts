import { inferProcedureOutput } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter, AppRouter } from '@/backend/routers';
import { createContext } from '@/backend/utils/context';

export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext,
	onError({ error }) {
		if (error.code === 'INTERNAL_SERVER_ERROR') {
			// send to bug reporting
			console.error('Something went wrong', error);
		}
	},
});

export type inferQueryResponse<TRouteKey extends keyof AppRouter['_def']['queries']> =
	inferProcedureOutput<AppRouter['_def']['queries'][TRouteKey]>;
