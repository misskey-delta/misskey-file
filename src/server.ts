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

app.get('*', (req: express.Request, res: express.Response) => {
	const path: string = decodeURI(req.path);
	if (path.indexOf('..') !== -1) {
		return res.status(400).send('invalid path');
	}
	res.sendFile(`${config.storagePath}/${path}`);
});

app.listen(config.port.http);
