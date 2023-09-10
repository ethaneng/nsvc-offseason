'use server';

import { z } from 'zod';
import { loginFormSchema, registerFormSchema } from '@/lib/formSchema';
import { useSupabaseOnServer } from '@/lib/hooks/useSupabase';

type loginData = z.infer<typeof loginFormSchema>;
type registerData = z.infer<typeof registerFormSchema>;

const supabase = useSupabaseOnServer();

export async function login(data: loginData) {
	const result = loginFormSchema.safeParse(data);

	if (result.success) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email: result.data.email,
			password: result.data.password,
		});

		if (error) {
			return { success: false, error: error.message };
		}

		return { success: true, data };
	} else if (result.error) {
		return { success: false, error: result.error.format() };
	}
}

export async function register(data: registerData) {
	const result = registerFormSchema.safeParse(data);

	if (result.success) {
		const { data, error } = await supabase.auth.signUp({
			email: result.data.email,
			password: result.data.password,
		});

		if (error) {
			return { success: false, error: error.message };
		}

		return { success: true, data };
	} else if (result.error) {
		return { success: false, error: result.error.format() };
	}
}
