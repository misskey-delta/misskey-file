require! {
	fs
	'../config'
	'../utils/request-processor': rpu
}

module.exports = (req, res) ->
	image-name = req.body['image-name']
	user-id = req.body['user-id']
	rpu req, res, "application-icon/#image-name"
