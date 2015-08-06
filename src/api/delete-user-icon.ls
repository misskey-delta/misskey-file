require! {
	fs
	'../config'
	'../utils/delete-file': delete-file
}

module.exports = (req, res) ->
	passkey = req.body['passkey']
	image-name = req.body['image-name']
	user-id = req.body['user-id']
	if passkey == config.passkey
		delete-file "user-contents/user/#user-id/icon/#image-name" .then do
			->
				res.status 200
				res.send!
			(err) ->
				res.status 500
				res.send!
	else
		res.status 400
		res.send!