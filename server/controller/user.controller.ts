import { Response, Request, NextFunction } from 'express';
import config from 'config';

import { userService } from '../service';
import log from '../logger'

export const createRegistrationHandler = async (req: Request, res: Response) => {
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

export const loginHandler = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const userData = await userService.login(email, password);

		res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

		return res.json(userData);
	} catch (e: any) {
		res.status(401).send(e.message);
		log.error(e);
	}
};

export const logoutHandler = async (req: Request, res: Response) => {
	try {
		const { refreshToken } = req.cookies;

		userService.logout(refreshToken);
		res.clearCookie('refreshToken');

		res.sendStatus(200);
	} catch (e: any) {
		res.status(401).send(e.message);
		log.error(e);
	}
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
	try {
		const { refreshToken } = req.cookies;

		const userData = await userService.refresh(refreshToken);

		res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

		return res.json(userData);
	} catch (e: any) {
		res.status(401).send(e.message);
		log.error(e);
	}
};

export const getUsersHandler = async (req: Request, res: Response) => {
	try {
		const users = await userService.getUsers();

		return res.json(users);
	} catch (e: any) {
		res.status(401).send(e.message);
		log.error(e);
	}
};
