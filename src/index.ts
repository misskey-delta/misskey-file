import * as fs from 'fs';
import * as config from './config';

console.log('Welcome to Misskey UCS');

if (fs.existsSync(config.configPath)) {
	initServer();
} else {
	const conf: config.IConfig = config.defaultConfig;

	if (!fs.existsSync(config.configDirectoryPath)) {
		fs.mkdirSync(config.configDirectoryPath);
	}
	fs.writeFile(config.configPath, JSON.stringify(conf, null, '\t'), (writeErr: NodeJS.ErrnoException) => {
		if (writeErr) {
			console.log('configの書き込み時に問題が発生しました:');
			console.error(writeErr);
		} else {
			process.exit(0);
		}
	});
}

function initServer(): void {
	'use strict';
	require('./server');
	require('./debugServer');
}
