import { ReactNode } from 'react';

interface Props {
  children?: ReactNode | undefined;
}

const Content = ({ children }: Props) => {
  return <div className="mx-auto w-full max-w-7xl grow">{children}</div>;
};

export default Content;
