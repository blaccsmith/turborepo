import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import RootLayout from 'ui/components/atoms/Layouts/RootLayout';
import { DefaultSeo } from 'next-seo';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
    <SessionProvider session={session}>
    <DefaultSeo
      title="The Black Coder Community"
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
        url: 'https://www.blacc.xyz/',
        title: 'BLACC',
        site_name: 'The Black Coder Community',
        images: [
          {
            url: 'https://www.blacc.xyz/banner.png',
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
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </SessionProvider>
);

export default MyApp;
