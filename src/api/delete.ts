import * as fs from 'fs';
import * as express from 'express';
import config from '../config';
const rmrf = require('rimraf');

module.exports = (req: express.Request, res: express.Response) => {
	const passkey: string = req.body['passkey'];
	if (passkey === config.passkey) {
		const path: string = req.body['path'];
		if (path.indexOf('..') > -1) {
			return res.sendStatus(400);
		}
		const a = path.split('/');
		a.pop()
		const resolvedPath = `${config.storagePath}/${a.join('/')}`;
		console.log(`DELETE: ${resolvedPath}`);
		rmrf(resolvedPath, {
			disableGlob: true
		}, (err: any) => {
			if (err !== null) {
				console.error(err);
				return res.sendStatus(500);
			}
			res.sendStatus(200);
		});
	} else {
		res.sendStatus(400);
	}
};
