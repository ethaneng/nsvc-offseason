import useSession from '@/lib/hooks/useSession';
import Image from 'next/image';

export default async function Home() {
	const session = await useSession();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<p>Some text</p>
			{session && <p>{JSON.stringify(session)}</p>}
		</main>
	);
}
