import Grid from '@/components/animation/Grid';
import { Button } from '@/components/ui/button';
import { Calendar, Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function page() {
	return (
		<>
			<div className="flex-1 relative justify-center items-center flex-col flex">
				<Grid />
			</div>
			<div className="absolute top-0 left-0 flex flex-col justify-center items-center w-screen h-screen">
				<h1 className="text-5xl font-bold max-w-2xl text-center">
					A Platform for <span className="text-blue-600">Training Opportunities</span> and
					<span className="text-blue-600"> Events</span>.
				</h1>
				<p className="max-w-lg text-center mt-4 text-neutral-200=">
					Ran and managed by the Northern Stars Volleyball Club. Created by Ethan Eng.
				</p>
				<Button className="mt-4 group hover:bg-blue-700 hover:text-white">
					<Link
						href={'/'}
						className="flex items-center"
					>
						Check Upcoming Events
						<Search
							size={16}
							className="ml-2 animate-bounce"
						/>
					</Link>
				</Button>
			</div>
		</>
	);
}

export default page;
