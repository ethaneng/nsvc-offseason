import React from 'react';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';

import { ModeToggle } from './dark-mode-toggle';
import AuthDialog from '../Auth/AuthDialog';
import useSupabaseOnServer from '@/lib/hooks/useSupabaseOnServer';
import ProfileDropdown from './ProfileDropdown';
import NavItem from './NavItem';
import Link from 'next/link';
import useServerAdmin from '@/lib/hooks/useServerAdmin';

async function Nav() {
  const supabase = useSupabaseOnServer();
  const isAdmin = await useServerAdmin()
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error(error);
    return;
  }
  return (
    <div className="flex justify-between py-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="mr-2">
            <Link
              href={'/'}
              className={'font-bold text-xl '}
            >
              Northern <span className="text-blue-500">Stars</span>
            </Link>
          </NavigationMenuItem>
          <NavItem
            label="Current Events"
            href="/home"
          />
          {isAdmin &&
            <NavItem
              label="Create"
              href="/create"
            />}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex items-center gap-4">
        {!session && <AuthDialog buttonProps={{ variant: 'ghost' }} />}
        {session && <ProfileDropdown />}
        <ModeToggle />
      </div>
    </div>
  );
}

export default Nav;
