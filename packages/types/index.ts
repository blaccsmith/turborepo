import { Session } from 'next-auth';
import { ReactNode } from 'react';

export type ThisType = {
  name: string;
};

export type AnotherType = {
  label: string;
};

export type LayoutProps = {
  showAuth?: boolean;
  session?: Session | null | undefined;
  children: ReactNode;
};
