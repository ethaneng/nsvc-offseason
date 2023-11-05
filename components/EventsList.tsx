'use server';

import useSupabaseOnServer from '@/lib/hooks/useSupabaseOnServer';
import React from 'react';
import { Tables } from '@/types/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { MapPin, CircleDollarSign, User, Calendar, Clock } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { getRegistrationsForEvent } from '@/lib/serverActions';

type Props = {};

async function EventsList({}: Props) {
	const supabase = useSupabaseOnServer();
	const { data, error } = await supabase.from('Event').select('*');

	return (
		<ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-4 w-full">
			{data?.map(async (event: Tables<'Event'>) => {
				// Format time string to remove seconds
				const time =
					new Date(event.date).toLocaleTimeString().substring(0, 4) +
					new Date(event.date).toLocaleTimeString().substring(7);

				const registrations = getRegistrationsForEvent(event.id);

				return (
					<li className="col-span-1 ">
						<article className="w-full h-full ">
							<Card className="h-full flex flex-col justify-between">
								<div>
									<CardHeader>
										<CardTitle className="flex justify-between">
											<span>{event.title}</span>
											<span className="text-muted-foreground ">
												{event.price ? '$' + event.price : 'Free'}
											</span>
										</CardTitle>
										<CardDescription className="flex flex-col gap-2 pt-2">
											<div className="flex gap-4">
												<div className="flex gap-1">
													<Calendar size={20} />
													<span>{new Date(event.date).toLocaleDateString()}</span>
												</div>
												<div className="flex gap-1">
													<Clock size={20} />
													<span>{time}</span>
												</div>
											</div>
											<div className="flex gap-1">
												<MapPin size={20} />
												<span>{event.location}</span>
											</div>
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="line-clamp-3">{event.description}</p>
									</CardContent>
								</div>
								<CardFooter className="flex justify-between items-center">
									<Link href={`/events/${event.id}`}>
										<Button>Register</Button>
									</Link>
									<div className="flex gap-1 items-center text-muted-foreground ">
										<User size={20} />
										<span>{registrations}</span>
									</div>
								</CardFooter>
							</Card>
						</article>
					</li>
				);
			})}
		</ul>
	);
}

export default EventsList;
