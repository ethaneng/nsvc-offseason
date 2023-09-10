import * as z from 'zod';

const capitalRegex = new RegExp('[A-Z]');

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export const registerFormSchema = z
	.object({
		email: z.string().email(),
		password: z
			.string()
			.min(8, { message: 'Password must be atleast 8 characters.' })
			.regex(capitalRegex, { message: 'Password must contain a capital letter.' }),
		confirmPassword: z.string(),
	})
	.refine(
		(values) => {
			return values.password === values.confirmPassword;
		},
		{
			message: 'Passwords do not match',
			path: ['confirmPassword'],
		}
	);
