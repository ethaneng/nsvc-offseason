import EventsList from '@/components/EventsList/EventsList';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default async function Home() {
	return (
		<main className="container mt-8">
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
