'use client';
import useSupabaseOnClient from '@/lib/hooks/useSupabaseOnClient';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function ProtectedContent({ children }: React.PropsWithChildren) {
	const supabase = useSupabaseOnClient();
	const router = useRouter();
	useEffect(() => {
		async function checkAuth() {
			const {
				data: { session },
				error,
			} = await supabase.auth.getSession();

			if (error) {
				console.error(error);
				router.replace('/');
			}

			if (session === null) {
				router.replace('/');
			}
		}
		checkAuth();
	});
	return <>{children}</>;
}

export default ProtectedContent;
