import { classNames } from 'utils';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import Link, { LinkProps } from 'next/link';
import * as React from 'react';

export var Menu = ({ children }: { children: React.ReactNode }) => (
    <HeadlessMenu as="div" className="relative inline-flex">
      {children}
    </HeadlessMenu>
  )

export const MenuButton = HeadlessMenu.Button;

export var MenuItems = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
    <Transition
      as={React.Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <HeadlessMenu.Items
        className={classNames(
          'bg-primary divide-primary absolute right-0 top-full z-10 mt-2 origin-top-right divide-y rounded border shadow-lg focus:outline-none',
          className ?? '',
        )}
      >
        {children}
      </HeadlessMenu.Items>
    </Transition>
  )

export var MenuItemsContent = ({ children }: { children: React.ReactNode }) => <div className="py-2">{children}</div>

const NextLink = ({
  href,
  children,
  ...rest
}: Omit<React.ComponentPropsWithoutRef<'a'>, 'href'> & LinkProps) => (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )

function menuItemClasses({ active, className }: { active: boolean; className?: string }) {
  return classNames(
    active ? 'bg-secondary' : '',
    'block w-full text-left px-4 py-2 text-sm text-primary transition-colors',
    className ?? '',
  );
}

export var MenuItemLink = ({
  className,
  href,
  children,
}: {
  className?: string;
  href: string;
  children: React.ReactNode;
}) => (
    <HeadlessMenu.Item>
      {({ active }: { active: boolean }) => (
        <NextLink href={href} className={menuItemClasses({ active, className })}>
          {children}
        </NextLink>
      )}
    </HeadlessMenu.Item>
  )

export var MenuItemButton = ({
  className,
  children,
  onClick,
}: {
  className?: string;
  children: React.ReactNode;
  onClick: () => void;
}) => (
    <HeadlessMenu.Item>
      {({ active }: { active: boolean }) => (
        <button type="button" className={menuItemClasses({ active, className })} onClick={onClick}>
          {children}
        </button>
      )}
    </HeadlessMenu.Item>
  )
