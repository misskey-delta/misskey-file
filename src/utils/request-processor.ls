require! {
	fs
	'../config'
	'./save-file': save-file
}

module.exports = (req, res, save-path) ->
	passkey = req.body['passkey']
	if passkey == config.passkey
		if (Object.keys req.files).length == 1 =>
			path = req.files.image.path
			image = fs.read-file-sync path
			fs.unlink path
			save-file save-path, image .then do
				(saved-path) ->
					res.send saved-path
				(err) ->
					res.status 500
					res.send!
		else
			res.status 400
			res.send!
	else
		res.status 400
		res.send!