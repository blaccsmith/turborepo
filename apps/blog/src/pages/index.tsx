import type { NextPage } from 'next';
import { useSession, signOut, signIn } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import trpc from '@/lib/trpc';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { query } = useRouter();
  const { data: session, status } = useSession();
  const { data } = trpc.useQuery(['user.getUserById', { id: (query.id as string) || '1' }]);

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn('github')}>Sign in</button>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js TRPC Template</title>
        <meta name="description" content="TRPC Template for Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-3xl font-bold">{data?.user?.name}</h1>
        <p>{data?.user?.email}</p>
        <button onClick={() => signOut()}>Signout</button>
      </div>
    </div>
  );
};

export default Home;
