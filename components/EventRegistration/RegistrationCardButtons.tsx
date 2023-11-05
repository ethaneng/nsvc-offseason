'use client';
import React from 'react';
import { Button } from '../ui/button';
import useSupabaseOnClient from '@/lib/hooks/useSupabaseOnClient';
import { useRouter } from 'next/navigation';

const supabase = useSupabaseOnClient();

export function RegisterCardButton({ rego_id, user_id }: { rego_id: number; user_id: string }) {
	const router = useRouter();

	async function register() {
		const { error } = await supabase
			.from('Participant')
			.insert([{ registration_type: rego_id, user_id }])
			.select();

		if (error) {
			console.error(error);
		}
		router.refresh();
	}
	return <Button onClick={register}>Register</Button>;
}

export function UnregisterCardButton({ rego_id, user_id }: { rego_id: number; user_id: string }) {
	const router = useRouter();

	async function unregister() {
		const { error } = await supabase
			.from('Participant')
			.delete()
			.eq('user_id', user_id)
			.eq('registration_type', rego_id);

		if (error) {
			console.error(error);
		}
		router.refresh();
	}
	return (
		<Button
			variant={'outline'}
			onClick={unregister}
		>
			Unregister
		</Button>
	);
}
