import express from 'express';
import config from 'config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import log from './logger';
import connect from './db';
import router from './router';

const port = config.get<number>('port');
const host = config.get<string>('host');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	credentials: true,
	origin: config.get('clientUrl'),
}));

app.listen(port, host, () => {
	log.info(`Server listening at http://${host}:${port}`);

	connect();

	router(app);
});
