import EventsList from '@/components/EventsList/EventsList';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default async function Home() {
	return (
		<main className="container mt-8 h-full">
			<Suspense
				fallback={
        <div className='w-full h-full flex items-center justify-center'>
					<Loader2
						size={48}
						className="animate-spin"
					/>
        </div>
				}
			>
				<EventsList />
			</Suspense>
		</main>
	);
}
