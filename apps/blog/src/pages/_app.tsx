import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { withTRPC } from '@trpc/next';
import { SessionProvider } from 'next-auth/react';
import RootLayout from 'ui/components/atoms/Layouts/RootLayout';
import { DefaultSeo } from 'next-seo';
import { AppRouter } from '@/backend/routers';
import { transformer } from '@/lib/trpc';

function getBaseUrl() {
  if (process.browser) return ''; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <DefaultSeo
      title="The BLACC Blog"
      description="A community exemplifying black excellence and pushing the needle within tech"
      additionalLinkTags={[
        {
          rel: 'icon',
          href: `https://www.blacc.xyz/favicon.ico`,
        },
        {
          rel: 'apple-touch-icon',
          href: `https://www.blacc.xyz/logo.png`,
          sizes: '76x76',
        },
      ]}
      openGraph={{
        type: 'website',
        url: 'https://www.blacc.xyz/blog',
        title: 'BLACC',
        site_name: 'The Black Coder Community Blog',
        images: [
          {
            url: 'https://www.blacc.xyz/blog_banner.png',
            width: 800,
            height: 450,
            alt: 'BLACC Banner',
            type: 'image/png',
          },
        ],
      }}
      twitter={{
        handle: '@blaccxyz_',
        cardType: 'summary_large_image',
        site: '@blaccxyz_',
      }}
    />
    <RootLayout showAuth session={session}>
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
      transformer,
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
