import * as yup from 'yup';

export const loginValidation = yup.object().shape({
	email: yup
		.string()
		.required('Email is required')
		.email(),
	password: yup
		.string()
		.required('Password is required')
		.min(6, 'Password is too short - should be 6 chars minimum.')
		.matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});
