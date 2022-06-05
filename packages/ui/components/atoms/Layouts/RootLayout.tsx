import { LayoutProps } from 'types';
import Header from '../../molecules/Header';
import Content from './Content';

const RootLayout = ({ children, showAuth }: LayoutProps) => {
  return (
    <div className="bg-brand-black flex h-full min-h-screen w-screen flex-col">
      <Header showAuth={showAuth} />
      <Content>{children}</Content>
    </div>
  );
};

export default RootLayout;
