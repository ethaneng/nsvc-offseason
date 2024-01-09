'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import useSupabaseOnClient from '@/lib/hooks/useSupabaseOnClient';
import { useRouter } from 'next/navigation';
import { Loader2Icon, LoaderIcon } from 'lucide-react';

export function RegisterCardButton({ rego_id, user_id }: { rego_id: number; user_id: string }) {
	const supabase = useSupabaseOnClient();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	async function register() {
		setLoading(true);
		const { error } = await supabase
			.from('Participant')
			.insert([{ registration_type: rego_id, user_id }])
			.select();

		if (error) {
			console.error(error);
		}
		router.refresh();
	}
	return (
		<Button
			disabled={loading}
			onClick={register}
		>
			Register{' '}
			{loading && (
				<span>
					<Loader2Icon
						size={16}
						className="ml-2 animate-spin"
					/>
				</span>
			)}
		</Button>
	);
}

export function UnregisterCardButton({ rego_id, user_id }: { rego_id: number; user_id: string }) {
	const supabase = useSupabaseOnClient();
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	async function unregister() {
		setLoading(true);
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
			Unregister{' '}
			{loading && (
				<span>
					<Loader2Icon
						size={16}
						className="ml-2 animate-spin"
					/>
				</span>
			)}
		</Button>
	);
}
