import { Express } from 'express';

import { validateDto } from '../dtos';
import {
	createRegistrationHandler,
	activateUserHandler,
	loginHandler,
	logoutHandler,
	refreshTokenHandler
} from '../controller';
import { registrationValidation, loginValidation } from '../validation';

const router = (app: Express) => {
	app.post('/api/registration', validateDto(registrationValidation), createRegistrationHandler);
	app.post('/api/login', validateDto(loginValidation), loginHandler);
	app.get('/api/logout', logoutHandler);
	app.get('/api/activate/:link', activateUserHandler);
	app.get('/api/refresh', refreshTokenHandler);

};

export default router;
