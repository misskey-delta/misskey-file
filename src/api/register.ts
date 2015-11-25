import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import * as mkdirp from 'mkdirp';
const fileType = require('file-type');
const gm: any = require('gm');

import config from '../config';

module.exports = (req: express.Request, res: express.Response) => {
	const passkey: string = req.body['passkey'];
	if (passkey === config.passkey) {
		if (Object.keys(req.files).length === 1) {
			const fileId: string = req.body['file-id'];
			const file: Express.Multer.File = req.files['file'];
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

					const detectedFileType = fileType(fileBuffer);
					if (detectedFileType === null) {
						return res.send(publicPath);
					}
					switch (detectedFileType.mime) {
						case 'image/jpeg':
						case 'image/png':
						case 'image/gif':
						case 'image/webp':
						case 'image/tiff':
						case 'image/bmp':
							mkdirp(`${config.storagePath}/${fileId}/minified`, (mkdirErr: any) => {
								// サムネイル生成
								gm(privatePath)
									.resize(150, 150)
									.compress('jpeg')
									.quality('80')
									.toBuffer('jpeg', (genThumbnailErr: Error, thumbnail: Buffer) => {
										fs.writeFile(`${config.storagePath}/${fileId}/minified/${fileName}`, thumbnail,  (writeFileErr: NodeJS.ErrnoException) => {
											res.send(publicPath);
										});
								});
							});
							break;
						default:
							return res.send(publicPath);
					}
				});
			});
		} else {
			res.sendStatus(400);
		}
	} else {
		res.sendStatus(400);
	}
};
