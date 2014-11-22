"use strict"
var through2= require("through2")
var IndexFactory= require("./index-factory"),
  Mapper= require("./mapper")

/**
  Pipe all files through and, if no index.js is found in a directory,
  create it, pointing to the assets in the directory.
*/
function DirMapTask(){
	if(this instanceof DirMapTask)
		throw new "Do not instantiate an instance of gulp-index-creation"

	var mapper= Mapper()
	var stream= through2.obj(function(file, enc, cb){
		// map
		mapper(file)
		// pass through ok
		this.push(file)
		cb()
	}, function(){
		var indexer= IndexFactory(this, mapper)
		// depth first
		for(var i= mapper.depths.length- 1; i>= 0; --i){
			var depth= mapper.depths[i]
			// all dirs at depth
			for(var j= 0; j< depth.length; ++j){
				// make/emit dir's index
				// & install to parent
				indexer(depth[j])
			}
		}
		// now done
		this.emit("end")
	})
	stream.mapper= mapper
	return stream
}

module.exports= DirMapTask
