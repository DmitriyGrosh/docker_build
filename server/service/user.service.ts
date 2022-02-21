import bcrypt from 'bcrypt';
import config from 'config';
import * as uuid from 'uuid';

import { UserModel } from '../models';
import mailService from './mail.service';
import tokenService from './token.service';
import { UserDto}  from '../dtos';
import { refreshTokenValidate } from '../validation';
import { IUser } from '../models/user.model';

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
	};

	public async activate(activationLink: string) {
		const user = await UserModel.findOne({ activationLink });
		if (!user) {
			throw new Error('Неактивная ссылка активации');
		}

		user.isActivated = true;
		await user.save();
	};

	public async login(email: string, password: string): Promise<IRegistration> {
		const user = await UserModel.findOne({ email });

		if (!user) {
			throw new Error(`Пользователя с таким ${email} не существует`)
		}

		const isEqualPassword = await bcrypt.compare(password, user.password);

		if (!isEqualPassword) {
			throw new Error(`Некорректный пароль`);
		}

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	};

	public async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken);

		return token;
	}

	public async refresh(refreshToken: string): Promise<IRegistration> {
		if (!refreshToken) {
			throw new Error('Пользователь не авторизован');
		}

		const userData = refreshTokenValidate(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);

		if (!userData || !tokenFromDb) {
			throw new Error('Пользователь не авторизован');
		}

		const user = await UserModel.findById((userData as IUser & { id: string }).id);

		if (!user) {
			throw new Error('Пользователь не авторизован');
		}

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	public async getUsers() {
		const users = await UserModel.find();

		return users;
	}
}

const userService = new UserService();

export default userService;
