"use strict"
var path= require("path")
var sep= new RegExp(path.sep, "g")

function _len(path){
	var segments= path.match(sep)
	return segments && segments.length || 0
}

/**
  Mapper is a reader which creates two data-structures-
  dirMap looks up a directory path and returns all contents of that directory
  depths records all known directories, indexed by the depth of that directory
*/
function mapper(){
	var dirMap= {},
	  depths= []
	function acceptFile(file){
		var rel= path.relative(file.base, file.path),
		  dir= path.dirname(rel),
		  named= file.named|| path.basename(file.path),
		  len= _len(dir)

		if(named == "index.js"){
			// add into parent's depth
			named= path.basename(dir)+path.sep+"index.js"
			dir= path.dirname(dir)
		}

		// add into dir
		var files= dirMap[dir]|| (dirMap[dir]= [])
		if(files.indexOf(named) == -1){
			files.push(named)
		}

		// add into depths
		var depth= depths[len]|| (depths[len]= [])
		if(depth.indexOf(dir) == -1){
			depth.push(dir)
		}
	}
	acceptFile.dirMap= dirMap
	acceptFile.depths= depths
	return acceptFile
}

module.exports= mapper
