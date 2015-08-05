require! {
	path
	fs
	'../config'
}

module.exports = (path, image-data) ->
	resolve, reject <- new Promise!
	
	image-path = path.resolve "#__dirname/../../../../images/#path"
	console.log image-path

	fs.write-file image-path, data, (err) ->
		if err
			console.log err
			reject err
		else
			resolve!