/* eslint-disable jsx-a11y/anchor-has-content */
import Link, { LinkProps } from 'next/link';
import * as React from 'react';
import { buttonClasses, ButtonVariant } from './Button';

type ButtonLinkProps = {
  variant?: ButtonVariant;
  responsive?: boolean;
} & Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> &
  LinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      href,
      as,
      replace,
      scroll,
      shallow,
      passHref,
      prefetch,
      locale,
      className,
      variant = 'primary',
      responsive,
      ...rest
    },
    forwardedRef,
  ) => (
    <Link
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
      locale={locale}
    >
      <a
        {...rest}
        ref={forwardedRef}
        className={buttonClasses({ className, variant, responsive })}
      />
    </Link>
  ),
);

ButtonLink.displayName = 'ButtonLink';

export default ButtonLink;
