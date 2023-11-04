import EventsList from '@/components/EventsList';
import useSupabaseOnServer from '@/lib/hooks/useSupabaseOnServer';
import { Suspense } from 'react';

export default async function Home() {
	const supabase = useSupabaseOnServer();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Suspense fallback={<p>Loading</p>}>
				<EventsList />
			</Suspense>
			{user && <p>{JSON.stringify(user)}</p>}
		</main>
	);
}
