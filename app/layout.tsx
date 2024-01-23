import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import Nav from '@/components/Navigation/nav';

const DmSans = DM_Sans({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
	title: 'NSVC Events',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			suppressHydrationWarning={true}
			lang="en"
		>
			<body className={DmSans.className + ' w-full h-full'}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
				>
					<div className="flex flex-col h-screen">
						<div className="px-4 border-b border-muted z-10 bg-background w-scre">
							<Nav />
						</div>
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
