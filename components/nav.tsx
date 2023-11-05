'use client';
import React, { useEffect, useState } from 'react';
import {
	NavigationMenu,
	NavigationMenuItem,
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
import useSupabaseOnClient from '@/lib/hooks/useSupabaseOnClient';
import { Session } from '@supabase/supabase-js';

function Nav() {
	const supabase = useSupabaseOnClient();
	const router = useRouter();

	const [session, setSession] = useState<null | Session>(null);

	useEffect(() => {
		supabase.auth
			.getSession()
			.then((data) => {
				if (data.data.session) {
					setSession(data.data.session);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<div className="flex justify-between py-4">
			<NavigationMenu>
				<NavigationMenuList>
					<NavigationMenuItem className={navigationMenuTriggerStyle()}>
						<NavigationMenuLink href="/">NSVC Offseason</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className={navigationMenuTriggerStyle()}>
						<NavigationMenuLink href="/">Current Events</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div className="flex items-center gap-4">
				{!session && <AuthDialog buttonProps={{ variant: 'ghost' }} />}
				{session && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant={'ghost'}
								size={'icon'}
							>
								<UserIcon />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Profile</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
							<DropdownMenuItem
								className="cursor-pointer"
								onClick={() => {
									supabase.auth
										.signOut()
										.then(() => {
											router.refresh();
										})
										.catch((error) => {
											console.error(error);
										});
								}}
							>
								Sign Out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
				<ModeToggle />
			</div>
		</div>
	);
}

export default Nav;
