import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as mkdirp from 'mkdirp';
import config from '../config';

module.exports = (req: express.Request, res: express.Response) => {
	const passkey: string = req.body['passkey'];
	if (passkey === config.passkey) {
		if (Object.keys(req.files).length === 1) {
			const file: Express.Multer.File = req.files['file'];
			const tmppath: string = file.path;
			const fileName: string = file.originalname;
			const fileBuffer: Buffer = fs.readFileSync(tmppath);
			fs.unlink(tmppath);

			const publicPath: string = `usercontents/${generateRandom()}/${fileName}`;
			const privatePath: string = `${config.storagePath}/${publicPath}`;
			mkdirp(path.dirname(privatePath), (mkdirErr: any) => {
				if (mkdirErr !== null) {
					console.error(mkdirErr);
					res.sendStatus(500);
				} else {
					fs.writeFile(privatePath, fileBuffer, (writeFileErr: NodeJS.ErrnoException) => {
					if (writeFileErr !== null) {
						console.error(writeFileErr);
						res.sendStatus(500);
					} else {
						console.log(`Registered: ${privatePath}`);
						res.send(publicPath);
					}
				});
				}
			});
		} else {
			res.sendStatus(400);
		}
	} else {
		res.sendStatus(400);
	}
};

function generateRandom(): string {
	'use strict';
	const chars: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_';
	var rnd: string = '';
	for (var i: number = 0; i < 64; i++) {
		rnd += chars[Math.floor(Math.random() * chars.length)];
	}
	return rnd;
}
