import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as cluster from 'cluster';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from './config';

const app: express.Express = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({extended: true}));

// CORS middleware
app.use((req: express.Request, res: express.Response, next: () => void) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Credentials': 'false'
	});

	 // intercept OPTIONS method
	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});

app.get('/', (req, res) => {
	res.send('Misskeyにアップロードされたファイルを保管・配信するサーバーです。https://misskey.xyz');
});

app.get('*', (req, res) => {
	const path: string = decodeURI(req.path);
	if (path.indexOf('..') !== -1) {
		return res.status(400).send('invalid path');
	}
	if (req.query.download !== undefined) {
		res.header('Content-Disposition', 'attachment');
	}
	if (req.query.thumbnail !== undefined) {
		const tokens = path.split('/');
		const filename = tokens[tokens.length - 1];
		tokens[tokens.length - 1] = 'minified/' + filename;
		const thumbnailPath = tokens.join('/');

		res.sendFile(`${config.storagePath}/${thumbnailPath}`);
	} else {
		res.sendFile(`${config.storagePath}/${path}`);
	}
});

let server: http.Server | https.Server;
let port: number;

if (config.https.enable) {
	port = config.port.https;
	server = https.createServer({
		key: fs.readFileSync(config.https.keyPath),
		cert: fs.readFileSync(config.https.certPath)
	}, app);

	http.createServer((req, res) => {
		res.writeHead(301, {
			Location: config.url + req.url
		});
		res.end();
	}).listen(config.port.http);
} else {
	port = config.port.http;
	server = http.createServer(app);
}

server.listen(port, () => {
	const listenhost: string = server.address().address;
	const listenport: number = server.address().port;

	console.log(
		`\u001b[1;32m${cluster.worker.id} is now listening at ${listenhost}:${listenport}\u001b[0m`);
});
