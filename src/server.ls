################################
# Core Server
################################

require! {
	fs
	https
	express
	jade
	multer
	'body-parser'
	'./config'
}

# Init express
app = express!
app.disable \x-powered-by
app.use body-parser.urlencoded {+extended}
app.use multer!

app.all '*' (req, res, next) ->
	console.log 'kyoppie'
	next!

app.post '/register-user-icon' (req, res) -> (require './api/register-user-icon') req, res
app.post '/register-status-image' (req, res) -> (require './api/register-status-image') req, res

app.listen config.port
