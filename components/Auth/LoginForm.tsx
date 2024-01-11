'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loginFormSchema } from '@/lib/formSchema';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import useSupabaseOnClient from '@/lib/hooks/useSupabaseOnClient';
import { useRouter, usePathname } from 'next/navigation';

type loginData = z.infer<typeof loginFormSchema>;

function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [alert, setAlert] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const supabase = useSupabaseOnClient();
	const router = useRouter();

	const form = useForm<loginData>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function login(data: loginData) {
		const result = loginFormSchema.safeParse(data);

		if (result.success) {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: result.data.email,
				password: result.data.password,
			});

			if (error) {
				return { success: false, error: error.message };
			}

			return { success: true, data };
		} else if (result.error) {
			return { success: false, error: result.error.format() };
		}
	}

	async function onSubmit(data: loginData) {
		setLoading(true);
		const result = await login(data);

		if (!result) {
			console.error('Did not return result from login attempt');
			setAlert('Something went wrong! Please try again later.');
			return;
		}

		if (result.error) {
			console.error('Error occurred during login attempt', result.error);
			setAlert(result.error.toString());
			return;
		}

		router.refresh();
		setLoading(false);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col space-y-4"
			>
				{alert && (
					<Alert className="border-destructive">
						<AlertCircle className="h-4 w-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>{alert}</AlertDescription>
					</Alert>
				)}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<div className="relative">
									<Input
										{...field}
										type={showPassword ? 'text' : 'password'}
									/>
									<span
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-2 top-2"
									>
										{!showPassword && <Eye />}
										{showPassword && <EyeOff />}
									</span>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				<hr />
				<Button
					disabled={loading}
					type="submit"
				>
					Sign In
				</Button>
			</form>
		</Form>
	);
}

export default LoginForm;
