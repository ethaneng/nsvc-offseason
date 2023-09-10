'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { registerFormSchema } from '@/lib/formSchema';
import { register } from '@/app/_actions';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [alert, setAlert] = useState<string | null>(null);

	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	async function onSubmit(data: z.infer<typeof registerFormSchema>) {
		const result = await register(data);

		if (!result) {
			console.error('Did not return result from register attempt');
			setAlert('Something went wrong! Please try again later.');
			return;
		}

		if (result.error) {
			console.error('Error occurred during register attempt', result.error);
			setAlert(result.error.toString());
			return;
		}

		// do something on success login
		console.log('Successfully registered user');
		setAlert(null);
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
				<Button type="submit">Create Account</Button>
			</form>
		</Form>
	);
}

export default LoginForm;
