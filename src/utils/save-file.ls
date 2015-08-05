require! {
	fs
	'../config'
}

module.exports = (save-path, image-data) ->
	resolve, reject <- new Promise!
	
	resolved-save-path = "/usr/share/nginx/html/contents/#save-path"

	fs.write-file resolved-save-path, image-data, (err) ->
		if err
			console.log err
			reject err
		else
			resolve!