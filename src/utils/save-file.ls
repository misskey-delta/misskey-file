require! {
	fs
	path
	mkdirp
	'../config'
}

module.exports = (save-path, image-data) ->
	resolve, reject <- new Promise!
	
	server-index-path = '/usr/share/nginx/html/'
	content-path = "contents/#save-path"
	resolved-save-path = "#server-index-path#content-path"

	mkdirp (path.dirname resolved-save-path), (err) ->
		fs.write-file resolved-save-path, image-data, (err) ->
			if err
				console.log err
				reject err
			else
				resolve content-path