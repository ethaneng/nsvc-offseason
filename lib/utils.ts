import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import useSupabaseOnServer from './hooks/useSupabaseOnServer';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
