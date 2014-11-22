var path= require('path'),
  through2= require('through2')

module.exports = (function GulpIndexCreation(options){
	var seen= {}
	var stream= through2.obj(function(file, enc, cb){
		var basename= path.basename(file.path),
		  basename= path.basename(file.path),
		  dir= seen[basename]|| (seen[basename]= [])
		this.push(file)
		cb()
	}, function(){
		this.emit('end')
	})
	return stream
})
