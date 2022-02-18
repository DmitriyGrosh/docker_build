import { ObjectSchema } from 'yup';
import { Response, Request, NextFunction } from 'express';

import log from '../logger';

const validateDto = <T extends {}>(schema: ObjectSchema<T>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedBody = await schema.validate(req.body);
			req.body = validatedBody
			next();
		} catch (e: any) {
			res.status(401).send(e.message);
			log.error(e);
		}
	};
};

export default validateDto;
