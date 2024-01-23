'use client';
import ProtectedContent from '@/components/ProtectedContent';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
/* eslint-disable react-hooks/rules-of-hooks */
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { profileFormSchema } from '@/lib/formSchema';
import useSupabaseOnClient from '@/lib/hooks/useSupabaseOnClient';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, UserResponse } from '@supabase/supabase-js';
import { AlertCircleIcon, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type profileFormData = z.infer<typeof profileFormSchema>;

function page() {
	const supabase = useSupabaseOnClient();
	const [user, setUser] = useState<undefined | User>();
	const [alert, setAlert] = useState(false);
	const form = useForm<profileFormData>({
		resolver: zodResolver(profileFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
		},
	});

	useEffect(() => {
		async function getProfileData() {
			const {
				data: { user },
				error: userError,
			} = await supabase.auth.getUser();
			if (userError || !user) {
				console.error(userError);
				return;
			}
			setUser(user);

			const { data, error } = await supabase.from('Users').select('*').eq('id', user.id);
			if (error) {
				console.error(error);
				return;
			}

			// Set profile form data from the data in the db
			// If no data stored in the db set as empty
			form.reset({
				email: user.email!,
				firstName: data[0].first_name ?? '',
				lastName: data[0].last_name ?? '',
			});
		}

		getProfileData();
	}, [form, supabase]);

	async function onSubmit(values: profileFormData) {
		const { data, error } = await supabase
			.from('Users')
			.update({ first_name: values.firstName, last_name: values.lastName })
			.eq('id', user!.id);

		if (error) {
			console.error(error);
			setAlert(true);
			return;
		}
		return;
	}

	return (
		<ProtectedContent>
			<div className="px-24 mt-8">
				<Card>
					<CardHeader>
						<CardTitle>Profile Settings</CardTitle>
					</CardHeader>

					<CardContent>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="flex flex-col gap-4"
							>
								{alert && (
									<Alert className="border-destructive">
										<AlertCircleIcon />
										<AlertTitle className="ml-2">Oops! Something went wrong</AlertTitle>
										<AlertDescription className="ml-2">
											An error occurred when trying to update your profile information. Please try
											again later.
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
								></FormField>
								<FormField
									control={form.control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								></FormField>
								<FormField
									control={form.control}
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								></FormField>
								<Button
									disabled={!form.formState.isDirty || alert || form.formState.isSubmitting}
									type="submit"
								>
									Update Settings
									{form.formState.isSubmitting && (
										<Loader2Icon
											size={16}
											className="animate-spin ml-2"
										/>
									)}
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</ProtectedContent>
	);
}

export default page;
