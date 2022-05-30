import Link from 'next/link';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function NextLink({ href, children, className }: Props) {
  return (
    <Link href={href} passHref>
      <a className={className}>{children}</a>
    </Link>
  );
}
