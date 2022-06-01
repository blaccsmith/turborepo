import { classNames } from 'utils';
import * as React from 'react';

type BannerProps = {
  children: React.ReactNode;
  className?: string;
};

const Banner = ({ children, className }: BannerProps) => (
  <div
    className={classNames(
      'bg-yellow-light border-yellow-light rounded border p-6 font-semibold leading-snug',
      className ?? '',
    )}
  >
    {children}
  </div>
);

export default Banner;
