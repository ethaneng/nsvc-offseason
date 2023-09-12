import useSupabaseOnServer from '@/lib/hooks/useSupabaseOnServer';
import Image from 'next/image';

export default async function Home() {
	const supabase = useSupabaseOnServer();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<p>Some text</p>
			{user && <p>{JSON.stringify(user)}</p>}
		</main>
	);
}
