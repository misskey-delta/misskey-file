require! {
	path
	fs
	'../config'
}

module.exports = (path, image-data) ->
	resolve, reject <- new Promise!
	
	path = path.resolve "#__dirname/../../../../images/#path"
	console.log path

	fs.write-file path, data, (err) ->
		if err
			console.log err
			reject err
		else
			resolve!