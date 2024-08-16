'use server';
import { newEventSchema } from '@/lib/formSchema';

import useSupabaseOnServer from './hooks/useSupabaseOnServer';
import { Tables } from '@/types/supabase';

export async function getRegistrationsForEvent(event_id: number) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
export async function createEvent(values: Zod.infer<typeof newEventSchema>, isAM: boolean) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const supabase = useSupabaseOnServer();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) {
    console.error(userError);
    throw userError;
  }
  const dateTime = values.date;
  const hours = values.time.length === 4 ? Number(values.time[0]) : Number(values.time.slice(0, 2));
  const mins = values.time.length === 4 ? Number(values.time.slice(2)) : Number(values.time.slice(3));
  dateTime.setHours(isAM ? hours : hours + 12);
  dateTime.setMinutes(mins);

  const { error: eventError, data: eventData } = await supabase
    .from('Event')
    .insert({
      title: values.title,
      description: values.description,
      date: dateTime.toISOString(),
      location: values.location,
      created_by_user_id: user!.id,
      duration_hours: values.duration ? Number(values.duration) : undefined,
      price: values.price ? Number(values.price) : undefined,
    })
    .select()
    .limit(1)
    .single();

  if (eventError) {
    console.error(eventError);
    throw eventError;
  }

  for (const type of values.registrationTypes) {
    const { error: regoError } = await supabase
      .from('Registration_Type')
      .insert({
        'event_id': eventData.id,
        'name': type.name,
        'description': type.description,
        'max_registrations': type.amount,
      })

    if (regoError) {
      console.error('ERROR: Rolling back data entries for event id: ' + eventData.id)
      
      await supabase
      .from('Registration_Type')
      .delete()
      .eq('event_id', eventData.id)

      await supabase
      .from('Event')
      .delete()
      .eq('id', eventData.id)

      console.error(regoError)
      throw regoError
    }
  }
  return eventData;
}
