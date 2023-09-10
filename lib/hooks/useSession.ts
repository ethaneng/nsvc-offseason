import { useSupabaseOnClient, useSupabaseOnServer } from './useSupabase';

export default async function useSession() {
	const supabase = useSupabaseOnServer();
	const { data, error } = await supabase.auth.getSession();
	if (error) {
		throw error;
	}
	return data.session;
}
