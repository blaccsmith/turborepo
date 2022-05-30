import NextLink from '../atoms/NextLink';
import { useSession, signOut, signIn } from 'next-auth/react';
import Avatar from '../atoms/Avatar';

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-brand-black/50 sticky top-0 mx-auto flex w-full max-w-7xl items-center justify-between p-6 text-white  backdrop-blur-lg md:p-8">
      <div onClick={() => (session ? signOut() : signIn('github'))}>logo</div>
      <ul className="flex items-center space-x-6">
        <NextLink href="/">Home</NextLink>
        <NextLink href="/">Blog</NextLink>
        {session && <Avatar size={6} user={session.user} />}
      </ul>
    </div>
  );
};

export default Header;
