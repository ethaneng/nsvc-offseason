import useSupabaseOnServer from '@/lib/hooks/useSupabaseOnServer';
import React from 'react';
import { Tables } from '@/types/supabase';
import EventCard from './EventCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Props = {};

async function EventsList({}: Props) {
	const supabase = useSupabaseOnServer();
	const { data: upcomingEvents, error: upcomingError } = await supabase
		.from('Event')
		.select('*')
		 .gte('date', new Date().toISOString())
		.order('date', { ascending: true });
	const { data: pastEvents, error: pastError } = await supabase
		.from('Event')
		.select('*')
		 .lte('date', new Date().toISOString())
		.order('date', { ascending: false });

	return (
		<Tabs
			defaultValue="Upcoming Events"
			className="relative"
		>
			<TabsList className="absolute z-10 top-2 right-0">
				<TabsTrigger value="Upcoming Events">Upcoming Events</TabsTrigger>
				<TabsTrigger value="Past Events">Past Events</TabsTrigger>
			</TabsList>
			<TabsContent
				value="Upcoming Events"
				className="flex flex-col justify-start gap-4"
			>
				<h1 className="font-semibold text-4xl mt-0">Upcoming Events:</h1>
				<hr />
				{upcomingError && <p>There was an error fetching the available events. Please try again later.</p>}
				{!upcomingError && (
					<ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-4 w-full">
						{!upcomingEvents?.length && <p className="text-center">No upcoming events available.</p>}
						{upcomingEvents?.map((event: Tables<'Event'>) => (
							<EventCard
								key={event.id}
								event={event}
							/>
						))}
					</ul>
				)}
			</TabsContent>

			<TabsContent
				value="Past Events"
				className="flex flex-col gap-4 justify-start relative -top-2"
			>
				<h1 className="font-semibold text-4xl mt-0">Past Events:</h1>
				<hr />
				{pastError && <p>There was an error fetching the available events. Please try again later.</p>}
				{!pastError && (
					<ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-4 w-full">
						{!pastEvents?.length && <p className="text-center">No past events available.</p>}
						{pastEvents?.map((event: Tables<'Event'>) => (
							<EventCard
								key={event.id}
								event={event}
							/>
						))}
					</ul>
				)}
			</TabsContent>
		</Tabs>
	);
}

export default EventsList;
