import { Schema, model } from 'mongoose';

import { IUser } from './user.model';

interface IToken {
	user: IUser,
	refreshToken: string,
}

const TokenSchema = new Schema<IToken>({
	user: {
		type: Schema.Types.ObjectId, ref: 'User',
	},
	refreshToken: {
		type: String,
		required: true,
	}
});

const TokenModel = model<IToken>('Token', TokenSchema);

export default TokenModel;