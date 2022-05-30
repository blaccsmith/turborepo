import { PropsWithChildren } from 'react';

const Content = ({ children }: PropsWithChildren<{}>) => {
  return <div className="mx-auto w-full max-w-7xl grow">{children}</div>;
};

export default Content;
