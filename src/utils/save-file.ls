require! {
	fs
	'../config'
}

module.exports = (path, image-data) ->
	resolve, reject <- new Promise!

	fs.write-file "#__dirname/../../../../images/#path" data, (err) ->
		if err
			console.log err
			reject err
		else
			resolve!