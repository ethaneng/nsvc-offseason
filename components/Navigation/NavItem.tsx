'use client';
import { NavigationMenuLink } from '@radix-ui/react-navigation-menu';
import React from 'react';
import { NavigationMenuItemWithStyles } from '../ui/navigation-menu';
import { usePathname } from 'next/navigation';

function NavItem({ label, href }: { label: string; href: string }) {
	const path = usePathname();
	return (
		<NavigationMenuItemWithStyles className={path === href ? 'bg-muted/70' : ''}>
			<NavigationMenuLink href={href}>{label}</NavigationMenuLink>
		</NavigationMenuItemWithStyles>
	);
}

export default NavItem;
