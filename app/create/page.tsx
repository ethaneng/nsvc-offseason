/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import ProtectedContent from '@/components/ProtectedContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/date-picker';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { newEventSchema } from '@/lib/formSchema';
import { createEvent } from '@/lib/serverActions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

function page() {
	const [isAM, setIsAM] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	const router = useRouter();
	const form = useForm<z.infer<typeof newEventSchema>>({
		resolver: zodResolver(newEventSchema),
	});
	function onSubmit(values: z.infer<typeof newEventSchema>) {
		setSubmitting(true);
		try {
			createEvent(values, isAM).then(() => {
				setSubmitting(false);
				router.push('/');
			});
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<ProtectedContent>
			<Card>
				<CardHeader>
					<CardTitle>New Event</CardTitle>
					<CardDescription>Enter the information for your new event below.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid grid-cols-12 gap-x-4"
						>
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem className="col-span-8">
										<FormLabel>
											Event Name
											<sup className="text-muted">*</sup>
										</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="price"
								render={({ field }) => (
									<FormItem className="col-span-2">
										<FormLabel>
											Price <span className="text-muted-foreground">($)</span>
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
											/>
										</FormControl>
										<FormDescription></FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="duration"
								render={({ field }) => (
									<FormItem className="col-span-2">
										<FormLabel>
											Duration <span className="text-muted-foreground">(h)</span>
										</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription></FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem className="col-span-12 mb-2">
										<FormLabel>
											Description<sup className="text-muted">*</sup>
										</FormLabel>
										<FormControl>
											<Textarea {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="location"
								render={({ field }) => (
									<FormItem className="col-span-6">
										<FormLabel>
											Location<sup className="text-muted">*</sup>
										</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription></FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="date"
								render={({ field }) => (
									<div className="col-span-3">
										<DatePicker field={field} />
									</div>
								)}
							/>
							<FormField
								control={form.control}
								name="time"
								render={({ field }) => (
									<FormItem className="col-span-3">
										<FormLabel>
											Time <span className="text-muted-foreground">(hh:mm)</span>
										</FormLabel>
										<FormControl>
											<div className="relative">
												<Input {...field} />
												<button
													onClick={() => setIsAM(!isAM)}
													type="button"
													className="hover:bg-muted text-[8px] p-1 border border-muted rounded-sm absolute top-1/2 -translate-y-1/2 right-2"
												>
													{isAM ? 'AM' : 'PM'}
												</button>
											</div>
										</FormControl>
										<FormDescription></FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="col-span-4 mt-2"
								disabled={submitting}
							>
								Create
								{submitting && (
									<Loader2Icon
										size={16}
										className="animate-spin"
									/>
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</ProtectedContent>
	);
}

export default page;
