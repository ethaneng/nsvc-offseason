import { createClient } from '@supabase/supabase-js';

export function useSupabaseOnServer() {
	// Create a single supabase client for interacting with your database
	const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_PUBLIC_URL as string, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
			detectSessionInUrl: false,
		},
	});
	return supabase;
}

export function useSupabaseOnClient() {
	const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_PUBLIC_URL as string);
	return supabase;
}
