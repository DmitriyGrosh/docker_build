import { Express } from 'express';

import { validateDto } from '../dtos';
import { createRegistrationHandler, activateUserHandler, loginHandler } from '../controller';
import { registrationValidation, loginValidation } from '../validation';

const router = (app: Express) => {
	app.post('/api/registration', validateDto(registrationValidation), createRegistrationHandler);
	app.post('/api/login', validateDto(loginValidation), loginHandler);
	// app.post('/api/logout');
	app.get('/api/activate/:link', activateUserHandler);
	// app.get('/api/refresh', (req: Request, res: Response ) => {
	// 	res.send('Hello World');
	// });

};

export default router;
