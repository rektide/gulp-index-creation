var through2= require("through2")
var mapper= require("./mapper")

function DirMapTask(){
	var mapper= mapper()
	var stream= through2.obj(function(file, enc, cb){
		mapper(file.path)
		this.push(file)
		cb()
	}, function(){
		this.emit("end")
	})
	stream.dirMap= mapper.dirMap
	stream.depths= mapper.depths
	return stream
}

module.exports= DirMapTask
