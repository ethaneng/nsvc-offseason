'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertCircle, Eye, EyeOff, Loader2Icon, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { registerFormSchema } from '@/lib/formSchema';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import useSupabaseOnServer from '@/lib/hooks/useSupabaseOnClient';

type registerData = z.infer<typeof registerFormSchema>;

function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [alert, setAlert] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const supabase = useSupabaseOnServer();

	const form = useForm<registerData>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});
	async function register(data: registerData) {
		const result = registerFormSchema.safeParse(data);

		if (result.success) {
			const { data, error } = await supabase.auth.signUp({
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
	async function onSubmit(data: registerData) {
		setLoading(true);
		const result = await register(data);

		if (!result) {
			console.error('Did not return result from register attempt');
			setAlert('Something went wrong! Please try again later.');
			setLoading(false);
			return;
		}

		if (result.error) {
			console.error('Error occurred during register attempt', result.error);
			setAlert(result.error.toString());
			setLoading(false);
			return;
		}

		// do something on success login
		setAlert(null);
		setSuccess(true);
		setLoading(false);
		return;
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
				{success && (
					<Alert className="border-primary">
						<MailCheck className="h-4 w-4" />
						<AlertTitle>Success!</AlertTitle>
						<AlertDescription>
							Registration successful! Please check your email for further instruction.
						</AlertDescription>
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
							<FormMessage />
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
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
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
							<FormMessage />
						</FormItem>
					)}
				/>
				<hr />
				<Button
					disabled={success || loading || alert !== null}
					type="submit"
				>
					Create Account{' '}
					{loading && (
						<Loader2Icon
							size={16}
							className="ml-2 animate-spin"
						/>
					)}
				</Button>
			</form>
		</Form>
	);
}

export default LoginForm;
