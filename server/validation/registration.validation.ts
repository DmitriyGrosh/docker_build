import * as yup from 'yup';

export const registrationValidation = yup.object().shape({
	email: yup
		.string()
		.required('Email is required')
		.email(),
	name: yup
		.string()
		.required('Name is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(6, 'Password is too short - should be 6 chars minimum.')
		.matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

// export type RegistrationValidation = yup.InferType<typeof registrationValidation>