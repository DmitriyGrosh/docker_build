import jwt from 'jsonwebtoken';
import config from 'config';
import {IUser } from "../models/user.model";

type ReturnValue = IUser | string | jwt.JwtPayload | null;

export const accessTokenValidate = (token: string): ReturnValue => {
	try {
		const userData = jwt.verify(token, config.get('secretAccessKey'));

		return userData;
	} catch (e) {
		return null;
	}
};

export const refreshTokenValidate = (token: string): ReturnValue => {
	try {
		const userData = jwt.verify(token, config.get('secretRefreshKey'));

		return userData;
	} catch (e) {
		return null;
	}
};
