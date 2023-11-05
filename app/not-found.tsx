import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import React from 'react';

function notFound() {
	return (
		<Alert className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xl">
			<Terminal className="h-4 w-4" />
			<AlertTitle>404 - Resource not found.</AlertTitle>
			<AlertDescription>Whoops! Looks like the page you tried to access doesn't exist.</AlertDescription>
		</Alert>
	);
}

export default notFound;
