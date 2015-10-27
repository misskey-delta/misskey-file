import * as express from 'express';
import * as multer from 'multer';
import * as bodyParser from 'body-parser';
import config from './config';

const app: express.Express = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

app.post('/register', (req: express.Request, res: express.Response) => {
	require('./api/register')(req, res);
});
app.post('/delete', (req: express.Request, res: express.Response) => {
	require('./api/delete')(req, res);
});

app.listen(config.port.internal);
