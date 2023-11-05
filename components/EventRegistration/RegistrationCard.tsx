import React from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Tables } from '@/types/supabase';
import { Button } from '../ui/button';
import useSupabaseOnServer from '@/lib/hooks/useSupabaseOnServer';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import LoginForm from '../LoginForm';
import AuthDialog from '../AuthDialog';
import { RegisterCardButton, UnregisterCardButton } from './RegistrationCardButtons';
import { getParticipantsForRegistration } from '@/lib/serverActions';

type Props = { registrationType: Tables<'Registration_Type'>; event_id: number };

async function RegistrationCard({ registrationType: rego, event_id }: Props) {
	const supabase = useSupabaseOnServer();
	const {
		data: { session },
		error: sessionError,
	} = await supabase.auth.getSession();
	if (sessionError) {
		console.error(sessionError);
		return <p>Something went wrong fetching data for the current user. Please try again later.</p>;
	}

	const participants = getParticipantsForRegistration(rego.id);

	let hasRegisteredAnotherType = false;
	let hasRegisteredThisType = false;

	if (session) {
		const { data, error } = await supabase
			.from('event_registrations')
			.select('*')
			.eq('event_id', event_id)
			.eq('user_id', session.user.id);

		if (error) {
			console.error(error);
			return <p>Something went wrong fetching data for this registration type. Please try again later.</p>;
		}
		if (data.length > 0) {
			if (data[0].registration_type_id === rego.id) {
				hasRegisteredThisType = true;
			} else {
				hasRegisteredAnotherType = true;
			}
		}
	}

	function NotLoggedInButton() {
		return <AuthDialog triggerText="Register" />;
	}

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex justify-between items-start">
						<span>{rego.name}</span>
						<span className="text-base text-muted-foreground">{participants}</span>
					</CardTitle>
					<CardDescription>{rego.description}</CardDescription>
				</CardHeader>
				<CardFooter>
					{!session && <NotLoggedInButton />}
					{session && hasRegisteredThisType && (
						<UnregisterCardButton
							rego_id={rego.id}
							user_id={session.user.id}
						/>
					)}
					{session && !hasRegisteredAnotherType && !hasRegisteredThisType && (
						<RegisterCardButton
							rego_id={rego.id}
							user_id={session.user.id}
						/>
					)}
					{hasRegisteredAnotherType && (
						<Button
							disabled
							variant={'outline'}
						>
							Already Registered
						</Button>
					)}
				</CardFooter>
			</Card>
		</>
	);
}

export default RegistrationCard;
