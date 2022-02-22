import { Express } from 'express';

import { validateDto } from '../dtos';
import {
	createRegistrationHandler,
	activateUserHandler,
	loginHandler,
	logoutHandler,
	refreshTokenHandler,
	getUsersHandler,
} from '../controller';
import { registrationValidation, loginValidation } from '../validation';
import authMiddleware from '../middleware/auth.middleware';

const router = (app: Express) => {
	app.post('/api/registration', validateDto(registrationValidation), createRegistrationHandler);
	app.post('/api/login', validateDto(loginValidation), loginHandler);
	app.get('/api/logout', logoutHandler);
	app.get('/api/activate/:link', activateUserHandler);
	app.get('/api/refresh', refreshTokenHandler);
	app.get('/api/users', authMiddleware, getUsersHandler);
	app.get('/api', (req, res) => {
		res.send('Hello world')
	})

};

export default router;
