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
	firstName: z.string().min(2, 'First name must be at least 2 characters.'),
	lastName: z.string().min(2, 'Last name must be at least 2 characters.'),
});

export const registrationTypeSchema = z.object({
	name: z.string().min(2, 'Registration name must be at least 2 characters.'),
  amount: z.coerce.number().min(1, 'There must at least one registration of this type available.'),
  description: z.string()
});

export const newEventSchema = z.object({
	title: z.string().min(4, 'Event title must be at least 4 characters.'),
	description: z.string(),
	date: z.date().refine((date) => date > new Date(), {message: 'Date must be in the future.'}),
	time: z.string().min(5,'Please use the hh:mm format (i.e 09:30).'),
	location: z.string().min(3, 'Location name must be at least 4 characters.'),
	price: z.string().optional(),
	duration: z.string().optional(),
	registrationTypes: z.array(registrationTypeSchema).min(1),
});
