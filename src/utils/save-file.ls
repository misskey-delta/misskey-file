require! {
	path
	fs
	'../config'
}

module.exports = (save-path, image-data) ->
	resolve, reject <- new Promise!
	
	save-path = path.resolve "#__dirname/../../../../images/#save-path"
	console.log image-path

	fs.write-file save-path, data, (err) ->
		if err
			console.log err
			reject err
		else
			resolve!