'use client';

import React, { useState } from 'react';
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

function Nav() {
	const [showSignIn, setShowSignIn] = useState(true);
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
				<ModeToggle></ModeToggle>
			</div>
		</div>
	);
}

export default Nav;
