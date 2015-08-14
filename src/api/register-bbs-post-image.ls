require! {
	'../utils/request-processor': rpu
}

module.exports = (req, res) ->
	image-name = req.body['image-name']
	user-id = req.body['user-id']
	rpu req, res, "user-contents/user/#user-id/bbs-post/#image-name"
