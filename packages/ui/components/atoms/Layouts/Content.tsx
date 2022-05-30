import { LayoutProps } from 'types';

const Content = ({ children }: LayoutProps) => {
  return <div className="mx-auto w-full max-w-7xl grow px-6 md:px-8">{children}</div>;
};

export default Content;
