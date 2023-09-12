import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function useSupabaseOnClient() {
	return createClientComponentClient();
}
