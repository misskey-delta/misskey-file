require! {
	fs
	path
	'../config'
}

module.exports = (path) ->
	resolve, reject <- new Promise!
	
	resolved-path = "/usr/share/nginx/html/contents/#save-path"

	fs.unlink resolved-path, (err) ->
		if err
			console.log err
			reject err
		else
			resolve!