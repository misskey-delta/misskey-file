require! {
	'../config'
	'../utils/save-file': save-file
}

module.exports = (req, res) ->
	passkey = req.body['passkey']
	image-name = req.body['image-name']
	if passkey == config.passkey]
		if (Object.keys req.files).length == 1 =>
			path = req.files.image.path
			image = fs.read-file-sync path
			save-file "user/icon/#{image-name}" image .then ->
				res.status 200
				res.send!
		else
			res.status 400
			res.send!
	else
		res.status 400
		res.send!