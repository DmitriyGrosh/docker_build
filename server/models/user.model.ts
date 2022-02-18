import { Schema, model } from 'mongoose';

export interface IUser {
	name: string;
	password: string;
	email: string;
	isActivated: boolean;
	activationLink: string;
}

const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isActivated: {
		type: Boolean,
		default: false,
	},
	activationLink: {
		type: String,
	},
});

const UserModel = model<IUser>('User', UserSchema);

export default UserModel;