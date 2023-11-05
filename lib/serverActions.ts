'use server';

import useSupabaseOnServer from './hooks/useSupabaseOnServer';
import { Tables } from '@/types/supabase';

export async function getRegistrationsForEvent(event_id: number) {
	const supabase = useSupabaseOnServer();
	// Get all associated registration types for the event
	const { data: registrationTypes, error: registrationTypesError } = await supabase
		.from('Registration_Type')
		.select('*')
		.eq('event_id', event_id);

	if (registrationTypesError) {
		console.error(registrationTypesError);
		return;
	}

	// Total the max number of registrations from each registration type
	const maxRegistrations = registrationTypes?.reduce((acc, current) => acc + current.max_registrations, 0);

	// Get all the participants associated to each registration type
	let participants: Tables<'Participant'>[] = [];

	if (!registrationTypes) return;

	for (let i = 0; i < registrationTypes.length; i++) {
		const { data, error: registrationsError } = await supabase
			.from('Participant')
			.select('*')
			.eq('registration_type', registrationTypes[i].id);

		if (registrationsError) {
			console.error(registrationsError);
			return;
		}

		if (data !== null && data.length > 0) participants = participants.concat(data);
	}

	return `${participants.length}/${maxRegistrations}`;
}
export async function getParticipantsForRegistration(rego_id: number) {
	const supabase = useSupabaseOnServer();
	// Get all associated registration types for the event
	const { data: registrationTypes, error: registrationTypesError } = await supabase
		.from('Registration_Type')
		.select('*')
		.eq('id', rego_id);

	if (registrationTypesError) {
		console.error(registrationTypesError);
		return;
	}

	// Total the max number of registrations from each registration type
	const maxRegistrations = registrationTypes[0].max_registrations;

	// Get all the participants associated to each registration type
	const { data: participants, error } = await supabase
		.from('Participant')
		.select('*')
		.eq('registration_type', rego_id);

	if (error) {
		console.error(error);
		return `?/${maxRegistrations}`;
	}
	return `${participants.length}/${maxRegistrations}`;
}
