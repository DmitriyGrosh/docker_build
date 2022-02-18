import { IUser } from "../models/user.model";

class UserDto {
	public email: string;
	public id: string;
	public isActivated: boolean;

	constructor(props: IUser & { _id: any }) {
		this.email = props.email;
		this.id = props._id;
		this.isActivated = props.isActivated;
	}
};

export default UserDto;
