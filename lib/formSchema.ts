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


export const profileFormSchema = z.object({
	email: z.string().email(),
	firstName: z.string().min(2),
	lastName: z.string().min(2)
})

export const newEventSchema = z.object({
	title: z.string().min(4),
	description: z.string(),
	date: z.date(),
	time: z.string(),
	location: z.string(),
	price: z.string().optional(),
	duration: z.string().optional()
})