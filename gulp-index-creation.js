"use strict"
var through2= require("through2")
var IndexFactory= require('./index-factory'),
  Mapper= require("./mapper")

function DirMapTask(){
	if(this instanceof DirMapTask)
		throw new 'Do not instantiate an instance of gulp-index-creation'

	var mapper= Mapper()
	var stream= through2.obj(function(file, enc, cb){
		mapper(file)
		this.push(file)
		cb()
	}, function(){
		var indexer= IndexFactory(this, mapper)
		for(var i= mapper.depths.length- 1; i>= 0; --i){
			console.log('at', i, mapper.depths[i])
			var depth= mapper.depths[i]
			for(var j= 0; j< depth.length; ++j){
				indexer(depth[j])
			}
		}
		this.emit("end")
	})
	stream.dirMap= mapper.dirMap
	stream.depths= mapper.depths
	return stream
}

module.exports= DirMapTask
