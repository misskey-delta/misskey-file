import * as express from 'express';
import * as bodyParser from 'body-parser';
import config from './config';

const app: express.Express = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({extended: true}));

app.all('*', (req: express.Request, res: express.Response) => {
	res.sendFile(`${config.storagePath}/${req.path}`);
});

app.listen(config.port.http);
