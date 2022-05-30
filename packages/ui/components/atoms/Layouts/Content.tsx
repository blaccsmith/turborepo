import { PropsWithChildren } from 'react';

const Content = ({ children }: PropsWithChildren<{}>) => {
  return <div className="mx-auto w-full max-w-7xl grow px-6 md:px-8">{children}</div>;
};

export default Content;
