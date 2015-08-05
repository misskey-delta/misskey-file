require! {
	path
	fs
	'../config'
}

module.exports = (save-path, image-data) ->
	resolve, reject <- new Promise!
	
	resolved-save-path = path.resolve "#__dirname/../../../../images/#save-path"

	fs.write-file resolved-save-path, image-data, (err) ->
		if err
			console.log err
			reject err
		else
			resolve!