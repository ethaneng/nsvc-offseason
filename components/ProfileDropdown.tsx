'use client';
import React from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { UserIcon } from 'lucide-react';
import { Button } from './ui/button';
import useSupabaseOnClient from '@/lib/hooks/useSupabaseOnClient';
import { useRouter } from 'next/navigation';

function ProfileDropdown() {
	const supabase = useSupabaseOnClient();
	const router = useRouter();
	return (
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
	);
}

export default ProfileDropdown;
