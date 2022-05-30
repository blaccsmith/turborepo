import React, { ReactNode } from 'react';
import Header from '../../molecules/Header';
import Content from './Content';

interface Props {
  children?: ReactNode | undefined;
}

const RootLayout = ({ children }: Props) => {
  return (
    <div className="bg-brand-black flex h-full min-h-screen w-screen flex-col">
      <Header />
      <Content>{children}</Content>
    </div>
  );
};

export default RootLayout;
