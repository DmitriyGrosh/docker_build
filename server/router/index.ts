import { Express, Request, Response } from 'express';

import { createRegistrationHandler, activateUserHandler } from '../controller/user.controller';

const router = (app: Express) => {
	app.post('/api/registration', createRegistrationHandler);
	// app.post('/api/login');
	// app.post('/api/logout');
	app.get('/api/activate/:link', activateUserHandler);
	// app.get('/api/refresh', (req: Request, res: Response ) => {
	// 	res.send('Hello World');
	// });

};

export default router;
