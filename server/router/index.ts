import { Express } from 'express';

import { validateDto } from '../dtos';
import { createRegistrationHandler, activateUserHandler } from '../controller';
import { registrationValidation } from '../validation';

const router = (app: Express) => {
	app.post('/api/registration', validateDto(registrationValidation), createRegistrationHandler);
	// app.post('/api/login');
	// app.post('/api/logout');
	app.get('/api/activate/:link', activateUserHandler);
	// app.get('/api/refresh', (req: Request, res: Response ) => {
	// 	res.send('Hello World');
	// });

};

export default router;
