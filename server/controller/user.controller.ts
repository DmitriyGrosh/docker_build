import { Response, Request, NextFunction } from 'express';

import { userService } from '../service';
import log from '../logger'

export const createRegistrationHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, name, password} = req.body;

		const userData = await userService.registration(email, password, name);
		res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

		return res.json(userData);
	} catch (e) {
		log.error(e);
	}
};
