/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MailCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function page() {
	const router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.replace('/');
		}, 5000);
	}, []);
	return (
		<Alert>
			<MailCheck className="h-4 w-4" />
			<AlertTitle>Email Confirmed</AlertTitle>
			<AlertDescription>
				Thanks for confirming your email. You can now login to register for events. You will be redirected
				shortly.
			</AlertDescription>
		</Alert>
	);
}

export default page;
