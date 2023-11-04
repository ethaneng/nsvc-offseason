import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '../../types/supabase';

export default function useSupabaseOnClient() {
	return createClientComponentClient<Database>();
}
