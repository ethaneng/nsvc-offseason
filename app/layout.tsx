import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from '@/components/nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'NSVC Events',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			suppressHydrationWarning={true}
			lang="en"
		>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
				>
					<div className="flex flex-col h-screen w-screen max-w-[1900px] px-24 mx-auto">
						<Nav />
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
