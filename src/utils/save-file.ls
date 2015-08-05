require! {
	fs
	path
	mkdirp
	'../config'
}

module.exports = (save-path, image-data) ->
	resolve, reject <- new Promise!
	
	resolved-save-path = "/usr/share/nginx/html/contents/#save-path"

	mkdirp (path.dirname resolved-save-path), (err) ->
		fs.write-file resolved-save-path, image-data, (err) ->
			if err
				console.log err
				reject err
			else
				resolve!