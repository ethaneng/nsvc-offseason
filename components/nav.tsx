'use client';

import React, { useEffect, useState } from 'react';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModeToggle } from './dark-mode-toggle';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import useSupabaseOnClient from '@/lib/hooks/useSupabaseOnClient';
import { User } from '@supabase/supabase-js';
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

function Nav() {
	const [showSignIn, setShowSignIn] = useState(true);
	const [user, setUser] = useState<null | User>(null);
	const supabase = useSupabaseOnClient();
	const router = useRouter();

	useEffect(() => {
		supabase.auth.getUser().then(({ data, error }) => {
			if (error) {
				console.error(error);
				return;
			}
			setUser(data.user);
		});
	});
	return (
		<div className="flex justify-between px-8 py-4">
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
				{!user && (
					<NavigationMenuItem className={navigationMenuTriggerStyle()}>
						<Dialog>
							<DialogTrigger>Sign In</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle className="text-center">
										{showSignIn ? 'Sign In' : 'Create An Account'}
									</DialogTitle>
								</DialogHeader>
								<Tabs
									onValueChange={(value) => setShowSignIn(!showSignIn)}
									defaultValue="Sign In"
								>
									<div className="relative">
										<TabsList className="absolute w-[400px] left-1/2 -translate-x-1/2 -top-28">
											<TabsTrigger
												className="w-full"
												value="Sign In"
											>
												Sign In
											</TabsTrigger>
											<TabsTrigger
												className="w-full"
												value="Register"
											>
												Register
											</TabsTrigger>
										</TabsList>
									</div>
									<TabsContent value="Sign In">
										<LoginForm />
									</TabsContent>
									<TabsContent value="Register">
										<RegisterForm />
									</TabsContent>
								</Tabs>
							</DialogContent>
						</Dialog>
					</NavigationMenuItem>
				)}
				{user && (
					<DropdownMenu>
						<DropdownMenuTrigger>
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
									supabase.auth.signOut();
									router.refresh();
								}}
							>
								Sign Out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
				<ModeToggle></ModeToggle>
			</div>
		</div>
	);
}

export default Nav;
