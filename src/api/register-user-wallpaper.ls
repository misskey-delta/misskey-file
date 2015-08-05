require! {
	fs
	'../config'
	'../utils/save-file': save-file
}

module.exports = (req, res) ->
	passkey = req.body['passkey']
	image-name = req.body['image-name']
	user-id = req.body['user-id']
	if passkey == config.passkey
		if (Object.keys req.files).length == 1 =>
			path = req.files.image.path
			image = fs.read-file-sync path
			fs.unlink path
			save-file "user-contents/user/#user-id/wallpaper/#image-name" image .then do
				->
					res.status 200
					res.send!
				(err) ->
					res.status 500
					res.send!
		else
			res.status 400
			res.send!
	else
		res.status 400
		res.send!