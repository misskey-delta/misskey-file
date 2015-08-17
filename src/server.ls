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

app.post '/register-application-icon' (req, res) -> (require './api/register-application-icon') req, res
app.post '/register-user-icon' (req, res) -> (require './api/register-user-icon') req, res
app.post '/register-user-banner' (req, res) -> (require './api/register-user-banner') req, res
app.post '/register-user-wallpaper' (req, res) -> (require './api/register-user-wallpaper') req, res
app.post '/register-status-image' (req, res) -> (require './api/register-status-image') req, res
app.post '/register-talk-message-image' (req, res) -> (require './api/register-talk-message-image') req, res
app.post '/register-bbs-post-image' (req, res) -> (require './api/register-bbs-post-image') req, res
app.post '/register-bbs-thread-eyecatch' (req, res) -> (require './api/register-bbs-thread-eyecatch') req, res
app.post '/delete-user-icon' (req, res) -> (require './api/delete-user-icon') req, res

app.listen config.port
