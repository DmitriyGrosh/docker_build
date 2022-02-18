import { Response, Request, NextFunction } from 'express';

import { userService } from '../service';
import log from '../logger'
import config from "config";

export const createRegistrationHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, name, password} = req.body;

		const userData = await userService.registration(email, password, name);
		res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

		return res.json(userData);
	} catch (e: any) {
		res.status(401).send(e.message);
		log.error(e);
	}
};

export const activateUserHandler = async (req: Request, res: Response) => {
	try {
		const activationLink = req.params.link;

		await userService.activate(activationLink);

		return res.redirect(config.get('clientUrl'))
	} catch (e: any) {
		res.status(401).send(e.message);
		log.error(e);
	}
};