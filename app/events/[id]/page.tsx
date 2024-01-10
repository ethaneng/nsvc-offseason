import useSupabaseOnServer from '@/lib/hooks/useSupabaseOnServer';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react';
import moment from 'moment';
import RegistrationCard from '@/components/EventRegistration/RegistrationCard';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRegistrationsForEvent } from '@/lib/serverActions';

type Props = {
	params: {
		id: number;
	};
};

async function page({ params }: Props) {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const supabase = useSupabaseOnServer();

	// Lookup Event Data from DB
	const { data: event, error: eventError } = await supabase.from('Event').select('*').eq('id', params.id).limit(1);

	if (eventError) {
		console.error(eventError);
		return <p>Something went wrong fetching data for this event. Please try again.</p>;
	}

	// No event with given id found
	if (event.length === 0) {
		console.log('Tried to view event with id ' + params.id + '. Navigating back to home page.');
		notFound();
	}

	// Format time string to remove seconds
	const time =
		new Date(event[0].date).toLocaleTimeString().substring(0, 4) +
		new Date(event[0].date).toLocaleTimeString().substring(7);

	// Lookup registration types from DB
	const { data: registrationTypes, error: regoError } = await supabase
		.from('Registration_Type')
		.select('*')
		.eq('event_id', event[0].id);

	if (regoError) {
		return <p>Something went wrong fetching the registration types for this event. Please try again later.</p>;
	}

	// Lookup registered members from DB
	const { data: registeredMembers, error: memberError } = await supabase
		.from('event_registrations')
		.select('*')
		.eq('event_id', event[0].id);

	if (memberError) {
		console.error(regoError);
		return <p>Something went wrong fetching the registered members for this event. Please try again later.</p>;
	}

	return (
		<section>
			<h1 className="text-2xl font-bold">{event[0].title}</h1>
			<div className="flex justify-between text-muted-foreground">
				<div className="flex gap-1 items-center">
					<MapPin size={20} />
					<span>{event[0].location}</span>
				</div>
				<div className="flex gap-4">
					<div className="flex gap-1 items-center">
						<Calendar size={20} />
						<span>{moment(event[0].date).format('MMMM Do YYYY')}</span>
					</div>
					<div className="flex gap-1 items-center">
						<Clock size={20} />
						<span>{time}</span>
					</div>
				</div>
			</div>
			<p className="mt-4">{event[0].description}</p>

			<h2 className="text-lg text-muted-foreground my-4">Registrations</h2>

			<div className="grid grid-cols-2 gap-4">
				<div className="col-span-1 flex flex-col gap-2">
					{registrationTypes?.length > 0 ? (
						registrationTypes.map((regoType) => (
							<RegistrationCard
								event_id={event[0].id}
								registrationType={regoType}
								key={regoType.id}
							/>
						))
					) : (
						<p>No registrations currently available</p>
					)}
				</div>
				<Card className="col-span-1">
					<CardHeader>
						<CardTitle className="flex justify-between">
							<span>Current Registrations</span>
							<div>{getRegistrationsForEvent(event[0].id)}</div>
						</CardTitle>
						<CardDescription>Currently signed up members</CardDescription>
						<div>
							{registrationTypes.map((regoType) => {
								const members = registeredMembers.filter(
									(member) => member.registration_type_id == regoType.id
								);

								if (members.length === 0) return;

								return (
									<ul key={regoType.id}>
										<h3 className="font-semibold">{regoType.name}:</h3>
										{members.map((member) => (
											<li
												className="font-light text-sm"
												key={member.user_id}
											>
												- {member.first_name} {member.last_name}
											</li>
										))}
									</ul>
								);
							})}
						</div>
					</CardHeader>
				</Card>
			</div>
		</section>
	);
}

export default page;
