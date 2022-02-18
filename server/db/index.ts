import mongoose from "mongoose";
import config from "config";

import log from "../logger";

const connect = () => {
	const dbUri = config.get('dbUri') as string;

	return mongoose
		.connect(dbUri, {
			// @ts-ignore
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => log.info('Database connected'))
		.catch((err) => {
			log.error('db error', err);
			process.exit(1);
		});
};

export default connect;
