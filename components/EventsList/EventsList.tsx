import useSupabaseOnServer from '@/lib/hooks/useSupabaseOnServer';
import React from 'react';
import { Tables } from '@/types/supabase';
import EventCard from './EventCard';

type Props = {};

async function EventsList({}: Props) {
	const supabase = useSupabaseOnServer();
	const { data, error } = await supabase.from('Event').select('*');
	if (error) {
		console.error(error);
		return <p>There was an error fetching the available events. Please try again later.</p>;
	}

	return (
		<ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-4 w-full">
			{data?.map((event: Tables<'Event'>) => (
				<EventCard
					key={event.id}
					event={event}
				/>
			))}
		</ul>
	);
}

export default EventsList;
