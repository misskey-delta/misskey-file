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
	res.send 'kyoppie'
app.listen 80
