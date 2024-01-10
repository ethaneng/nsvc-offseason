import EventsList from '@/components/EventsList/EventsList';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default async function Home() {
	return (
		<main className="flex h-full w-full flex-col justify-center items-center">
			<Suspense fallback={<Loader2 size={32} />}>
				<EventsList />
			</Suspense>
		</main>
	);
}
