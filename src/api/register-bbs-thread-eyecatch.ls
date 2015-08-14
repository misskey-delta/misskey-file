require! {
	'../utils/request-processor': rpu
}

module.exports = (req, res) ->
	image-name = req.body['image-name']
	rpu req, res, "bbs-eyecatch/#image-name"
