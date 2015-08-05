################################
# Core Server
################################

require! {
	fs
	https
	express
	jade
	'./config'
}

# Init express
app = express!
app.disable \x-powered-by

app.all '*' (req, res, next) ->
	console.log 'kyoppie'
	next!

app.post '/register-user-icon' (req, res) -> (require './api/register-user-icon') req, res
app.post '/register-status-image' (req, res) -> (require './api/register-status-image') req, res

app.listen config.port
