import jwt from 'jsonwebtoken';
import config from 'config';

import { TokenModel } from '../models';

class TokenService {
	public generateTokens(payload: any): { refreshToken: string, accessToken: string } {
		const accessToken = jwt.sign(payload, config.get('secretAccessKey'), { expiresIn: '15s' });
		const refreshToken = jwt.sign(payload, config.get('secretRefreshKey'), { expiresIn: '30d' });

		return {
			refreshToken,
			accessToken
		}
	};

	public async saveToken(userId: string, refreshToken: string) {
		const tokenData = await TokenModel.findOne({ user: userId });

		if (tokenData) {
			tokenData.refreshToken = refreshToken;

			return tokenData.save();
		}

		const token = TokenModel.create({ user: userId, refreshToken });

		return token;
	};

	public removeToken(refreshToken: string) {
		const tokenData = TokenModel.deleteOne({ refreshToken });

		return tokenData;
	};

	public findToken(refreshToken: string) {
		const tokenData = TokenModel.findOne({ refreshToken });

		return tokenData;
	};
}

const tokenService = new TokenService();

export default tokenService;