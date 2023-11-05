import React from 'react';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuItemWithStyles,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { ModeToggle } from './dark-mode-toggle';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import AuthDialog from './AuthDialog';
import useSupabaseOnServer from '@/lib/hooks/useSupabaseOnServer';
import ProfileDropdown from './ProfileDropdown';

async function Nav() {
	const supabase = useSupabaseOnServer();

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
					<NavigationMenuItemWithStyles>
						<NavigationMenuLink href="/">NSVC Offseason</NavigationMenuLink>
					</NavigationMenuItemWithStyles>
					<NavigationMenuItemWithStyles>
						<NavigationMenuLink href="/">Current Events</NavigationMenuLink>
					</NavigationMenuItemWithStyles>
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
