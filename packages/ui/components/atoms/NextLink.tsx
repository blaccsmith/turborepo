import Link from 'next/link';
import { LayoutProps } from 'types';

interface LinkProps extends LayoutProps {
  href: string;
  className?: string;
}

export default function NextLink({ href, children, className }: LinkProps) {
  return (
    <Link href={href} passHref>
      <a className={className}>{children}</a>
    </Link>
  );
}
