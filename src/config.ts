export const homeDirPath = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
export const configDirName = '.misskey';
export const configFileName = 'file.json';
export const configDirectoryPath = `${homeDirPath}/${configDirName}`;
export const configPath = `${configDirectoryPath}/${configFileName}`;

export default loadConfig();

function loadConfig(): IConfig {
	'use strict';
	try {
		return <IConfig>require(configPath);
	} catch (e) {
		return null;
	}
}

export interface IConfig {
	passkey: string;
	port: {
		internal: number;
		http: number;
		https: number;
	};
	https: {
		enable: boolean;
		keyPath: string;
		certPath: string;
	};
	url: string;
	storagePath: string;
}
