require! {
	fs
	'../config'
}

module.exports = (path, image-data) ->
	resolve, reject <- new Promise!

	fs.write-file "#__dirname/../../../../images/#path" data (err) ->
		if err then throw err
		resolve!