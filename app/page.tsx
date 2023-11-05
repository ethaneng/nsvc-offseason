import EventsList from '@/components/EventsList';
import useSupabaseOnServer from '@/lib/hooks/useSupabaseOnServer';
import { Suspense } from 'react';

export default async function Home() {
	const supabase = useSupabaseOnServer();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	return (
		<main className="flex h-full w-full flex-col justify-center items-center">
			<Suspense fallback={<p>Loading</p>}>
				<EventsList />
			</Suspense>
			{user && <p>{JSON.stringify(user)}</p>}
			{user && <p>{JSON.stringify(error)}</p>}
		</main>
	);
}
