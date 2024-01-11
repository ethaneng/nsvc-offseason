'use client';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button, ButtonProps } from '../ui/button';

type Props = { triggerText?: string; buttonProps?: ButtonProps };

function AuthDialog({ triggerText, buttonProps }: Props) {
	const [showSignIn, setShowSignIn] = useState(true);
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button {...buttonProps}>{triggerText ?? 'Sign In'}</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-center">{showSignIn ? 'Sign In' : 'Create An Account'}</DialogTitle>
				</DialogHeader>
				<Tabs
					onValueChange={() => setShowSignIn(!showSignIn)}
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
	);
}

export default AuthDialog;
