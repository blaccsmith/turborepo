import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import RootLayout from 'ui/components/atoms/Layouts/RootLayout';

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <SessionProvider session={session}>
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  </SessionProvider>
);

export default MyApp;
