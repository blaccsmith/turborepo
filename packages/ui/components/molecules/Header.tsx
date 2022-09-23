import { useSession, signOut, signIn, SessionProvider } from 'next-auth/react';
import Image from 'next/image';
import { Session } from 'next-auth';
import NextLink from '../atoms/NextLink';
import Avatar from '../atoms/Avatar';
import logo from '../../assets/logo_clear.png';
import LockIcon from '../atoms/Icons/LockIcon';

interface Props {
  showAuth?: boolean;
  session: Session | null | undefined;
}

const Auth = () => {
  const { data: session, status } = useSession();
  const notSignedIn = status === 'loading' || !session;

  return (
    <div>
      <div className="peer cursor-pointer" onClick={() => (notSignedIn ? signIn() : signOut())}>
        {notSignedIn ? (
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-400">
            <LockIcon className="h-3 w-3 text-gray-400" />
          </div>
        ) : (
          <Avatar size={6} user={session.user} />
        )}
      </div>
      <button className="bg-brand-purple-500/10 absolute right-6 bottom-1 min-w-fit cursor-default rounded-md px-2 py-1 text-xs opacity-0 shadow-md transition-all peer-hover:bottom-0 peer-hover:opacity-100 md:right-8">
        {notSignedIn ? 'Sign in' : 'Sign out'}
      </button>
    </div>
  );
};

const Header = ({ showAuth, session }: Props) => (
  <div className="bg-brand-black/50 sticky top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between p-6 text-white  backdrop-blur-lg md:p-8">
    <NextLink href="/" className="flex items-center space-x-4">
      <>
        <Image src={logo} width={24} height={24} className="rounded-full" alt="BLACC Logo" />
        <span className="hidden text-xl font-medium md:inline-block">
          The Black Coder Community
        </span>
        <span className="inline-block text-xl font-medium md:hidden">BLACC</span>
      </>
    </NextLink>

    <ul className="flex items-center space-x-6">
      <NextLink href="https://blacc.xyz">Home</NextLink>
      <NextLink href="https://blog.blacc.xyz">Blog</NextLink>
      {showAuth && (
        <SessionProvider>
          <Auth />
        </SessionProvider>
      )}
    </ul>
  </div>
);

export default Header;
