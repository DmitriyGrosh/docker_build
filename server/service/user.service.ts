import bcrypt from 'bcrypt';
import config from 'config';
import * as uuid from 'uuid';

import { UserModel } from '../models';
import mailService from './mail.service';
import tokenService from './token.service';
import UserDto from '../dtos/user.dto';

interface IRegistration {
	refreshToken: string;
	accessToken: string;
	user: UserDto
}
class UserService {
	public async registration(email: string, password: string, name: string): Promise<IRegistration> {
		const candidate =  await UserModel.findOne({ email });

		if (candidate) {
			throw new Error(`Пользователь с ткаим ${email} уже существует`);
		}

		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();
		const link = `${config.get('apiUrl')}/api/activate/${activationLink}`;
		const user = await UserModel.create({ name, email, password: hashPassword, activationLink });

		await mailService.sendActivationMail(email, link);

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}
}

const userService = new UserService();

export default userService;
