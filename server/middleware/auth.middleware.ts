import { Response, Request, NextFunction } from 'express';

import log from '../logger';
import { accessTokenValidate } from '../validation';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			throw new Error('Пользователь не авторизован');
		}

		const accessToken = authHeader.split(' ')[1];

		if (!accessToken) {
			throw new Error('Пользователь не авторизован');
		}

		const userData = accessTokenValidate(accessToken);

		if (!userData) {
			throw new Error('Пользователь не авторизован');
		}

		next();
	} catch (e: any) {
		log.error(e.message);
		res.status(401).send(e.message);
	}
};

export default authMiddleware;
