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

	const fileId: string = req.body['file-id'];
	const tmppath: string = file.path;
	const fileName: string = file.originalname;
	const fileBuffer: Buffer = fs.readFileSync(tmppath);
	fs.unlink(tmppath);

	const publicPath: string = `${fileId}/${fileName}`;
	const privatePath: string = `${config.storagePath}/${publicPath}`;
	mkdirp(path.dirname(privatePath), (mkdirErr: any) => {
		if (mkdirErr !== null) {
			console.error(mkdirErr);
			return res.sendStatus(500);
		}
		fs.writeFile(privatePath, fileBuffer, (writeFileErr: NodeJS.ErrnoException) => {
			if (writeFileErr !== null) {
				console.error(writeFileErr);
				return res.sendStatus(500);
			}

			return res.send(publicPath);
		});
	});
};
