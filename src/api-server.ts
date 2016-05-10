import * as express from 'express';
import * as multer from 'multer';
import * as bodyParser from 'body-parser';
import config from './config';

const upload = multer({ dest: 'uploads/' });

const app = express();
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({extended: true}));

app.post('/register', upload.single('file'), (req, res) => {
	require('./api/register')(req, res);
});
app.put('/rename', (req, res) => {
	require('./api/rename')(req, res);
});
app.delete('/delete', (req, res) => {
	require('./api/delete')(req, res);
});

app.listen(config.port.internal);
