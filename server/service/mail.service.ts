import nodemailer, { Transporter } from 'nodemailer';
import config from 'config';

class MailService {
	public transporter: Transporter

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: config.get('smtpGmailHost'),
			port: config.get('smtpGmailPort'),
			secure: false,
			auth: {
				user: config.get('smtpUser'),
				pass: config.get('smtpPassword'),
			},
		});
	}

	public async sendActivationMail(to: string, link: string) {
		await this.transporter.sendMail({
			from: config.get('smtpUser'),
			to,
			subject: `активация аккаунта на ${config.get('apiUrl')}`,
			text: '',
			html:
				`
				<div>
					<h1>Для активации перейдите по ссылке</h1>
					<a href="${link}">${link}</a>
				</div>
				`,
		});
	}

};

const mailService = new MailService();

export default mailService;
