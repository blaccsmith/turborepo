import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import { AppRouter } from '@/backend/routers';
import RootLayout from 'ui/components/atoms/Layouts/RootLayout';

function getBaseUrl() {
  if (process.browser) return ''; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  </SessionProvider>
);

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
