import { capitalize } from 'utils';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import * as React from 'react';
import Avatar from '@/components/atoms/BlogAvatar';
import ButtonLink from '@/components/atoms/ButtonLink';
import { IconButton } from '@/components/atoms/IconButton';
import { Logo, SearchIcon } from '@/components/atoms/Icons';
import {
  Menu,
  MenuButton,
  MenuItemButton,
  MenuItemLink,
  MenuItems,
  MenuItemsContent,
} from '@/components/molecules/Menu';
import SearchDialog from '@/components/molecules/SearchDialog';

type LayoutProps = {
  children: React.ReactNode;
};

const SearchLayout = ({ children }: LayoutProps) => {
  const { data: session } = useSession();
  const { theme, themes, setTheme } = useTheme();
  const [isSearchDialogOpen, setIsSearchDialogOpen] = React.useState(false);

  return (
    <div className="mx-auto max-w-3xl px-6">
      <header className="flex items-center justify-between gap-4 py-12 md:py-20">
        <Link href="/">
          <a>
            <Logo className="text-red-light h-[34px] w-auto" />
          </a>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <IconButton
            variant="secondary"
            onClick={() => {
              setIsSearchDialogOpen(true);
            }}
          >
            <SearchIcon className="h-4 w-4" />
          </IconButton>

          <Menu>
            <MenuButton className="focus-ring group relative inline-flex rounded-full">
              <Avatar name={session!.user.name} src={session!.user.image} size="sm" />
            </MenuButton>

            <MenuItems className="w-48">
              <MenuItemsContent>
                <MenuItemLink href={`/profile/${session!.user.id}`}>Profile</MenuItemLink>
                <MenuItemButton onClick={() => signOut()}>Log out</MenuItemButton>
              </MenuItemsContent>
              <div className="bg-secondary flex items-center gap-4 rounded-b px-4 py-3">
                <label htmlFor="theme" className="text-sm">
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={theme}
                  onChange={event => {
                    setTheme(event.target.value);
                  }}
                  className="bg-primary border-secondary block w-full rounded border py-1.5 text-xs shadow-sm"
                >
                  {themes.map(el => (
                    <option key={el} value={el}>
                      {capitalize(el)}
                    </option>
                  ))}
                </select>
              </div>
            </MenuItems>
          </Menu>

          <ButtonLink href="/new">
            <span className="sm:hidden">Post</span>
            <span className="hidden shrink-0 sm:block">New post</span>
          </ButtonLink>
        </div>
      </header>

      <main>{children}</main>

      <SearchDialog
        isOpen={isSearchDialogOpen}
        onClose={() => {
          setIsSearchDialogOpen(false);
        }}
      />
    </div>
  );
};

export default SearchLayout;
