import NextLink from '../atoms/NextLink';

const Header = () => {
  return (
    <div className="bg-brand-black/50 sticky top-0 mx-auto flex w-full max-w-7xl items-center justify-between p-8 text-white shadow-md backdrop-blur-lg">
      <div>logo</div>
      <ul className="flex items-center space-x-6">
        <NextLink href="/">Home</NextLink>
        <NextLink href="/">Blog</NextLink>
      </ul>
    </div>
  );
};

export default Header;
