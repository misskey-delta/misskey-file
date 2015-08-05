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

app.get '/' (req, res) ->
	res.send 'kyoppie'

app.post '/register-user-icon' (req, res) -> (require './api/register-user-icon') req, res
app.post '/register-status-image' (req, res) -> (require './api/register-status-image') req, res

app.listen config.port
