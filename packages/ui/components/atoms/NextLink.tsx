import Link from 'next/link';
import { PropsWithChildren } from 'react';

type LinkProps = {
  href: string;
  className?: string;
};

export default function NextLink({ href, children, className }: PropsWithChildren<LinkProps>) {
  return (
    <Link href={href} passHref>
      <a className={className}>{children}</a>
    </Link>
  );
}
