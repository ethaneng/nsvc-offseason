import EventsList from '@/components/EventsList/EventsList';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default async function Home() {
	return (
		<main className="flex h-full w-full flex-col justify-start items-center gap-8 mt-8 px-24">
			<h1 className="self-start text-4xl font-semibold">Upcoming Events:</h1>
			<Suspense
				fallback={
					<Loader2
						size={32}
						className="animate-spin"
					/>
				}
			>
				<EventsList />
			</Suspense>
		</main>
	);
}
