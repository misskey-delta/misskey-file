import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as mkdirp from 'mkdirp';
const fileType = require('file-type');
const gm: any = require('gm');

import config from '../config';

module.exports = (req: express.Request, res: express.Response) => {
	const passkey: string = req.body['passkey'];
	const file: Express.Multer.File = (<any>req).file;

	if (passkey !== config.passkey) {
		return res.sendStatus(400);
	}
	if (file === undefined || file === null) {
		return res.sendStatus(400);
	}

	const fileId = req.body['file-id'];
	const tmppath = file.path;
	const fileName = file.originalname;
	const fileBuffer = fs.readFileSync(tmppath);
	fs.unlink(tmppath);

	if (fileName.indexOf('..') > -1) {
		return res.sendStatus(400);
	}

	const publicPath = `${fileId}/${fileName}`;
	const privatePath = `${config.storagePath}/${publicPath}`;
	mkdirp(path.dirname(privatePath), mkdirErr => {
		if (mkdirErr !== null) {
			console.error(mkdirErr);
			return res.sendStatus(500);
		}
		fs.writeFile(privatePath, fileBuffer, writeFileErr => {
			if (writeFileErr !== null) {
				console.error(writeFileErr);
				return res.sendStatus(500);
			}

			return res.send(publicPath);
		});
	});
};
