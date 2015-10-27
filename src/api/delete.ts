import * as fs from 'fs';
import * as express from 'express';
import config from '../config';

module.exports = (req: express.Request, res: express.Response) => {
	const passkey: string = req.body['passkey'];
	if (passkey === config.passkey) {
		const path: string = req.body['path'];
		fs.unlink(path, (err: NodeJS.ErrnoException) => {
			if (err !== null) {
				console.log(err);
				res.sendStatus(500);
			} else {
				res.sendStatus(200);
			}
		});
	} else {
		res.sendStatus(400);
	}
};
