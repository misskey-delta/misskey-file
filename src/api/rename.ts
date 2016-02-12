import * as fs from 'fs';
import * as express from 'express';
import config from '../config';

module.exports = (req: express.Request, res: express.Response) => {
	const passkey: string = req.body['passkey'];
	if (passkey === config.passkey) {
		const newName: string = req.body['new-name'];
		if (newName.indexOf('..') > -1 || newName.indexOf('/') > -1 || newName.indexOf('\\') > -1) {
			res.sendStatus(400);
		} else {
			const oldPath: string = `${config.storagePath}/${req.body['old-path']}`;
			const newPath: string =
				`${req.body['old-path'].substring(0, req.body['old-path'].lastIndexOf('/'))}/${newName}`;
			const newStoragePath: string =
				`${config.storagePath}/${newPath}`;

			fs.rename(oldPath, newStoragePath, (err: NodeJS.ErrnoException) => {
				if (err !== null) {
					console.log(err);
					res.sendStatus(500);
				} else {
					res.send(newPath);
				}
			});
		}
	} else {
		res.sendStatus(400);
	}
};
