import * as fs from 'fs';
import * as express from 'express';
import config from '../config';

module.exports = (req: express.Request, res: express.Response) => {
	const passkey: string = req.body['passkey'];
	if (passkey === config.passkey) {
		const path: string = req.body['path'];
		if (path.indexOf('..') > -1) {
			return res.sendStatus(400);
		}
		deleteFolderRecursive(`${config.storagePath}/${path}/../`);
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
};

function deleteFolderRecursive(path: string): void {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file) => {
			const curPath = `${path}/${file}`;
			if (fs.statSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}