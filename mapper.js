"use strict"
var path= require("path")
var sep= new RegExp(path.sep, "g")

function _len(path){
	var segments= path.match(sep)
	return segments && segments.length || 0
}

function mapper(){
	var dirMap= {},
	  depths= []
	function acceptFile(file){
	
		var rel= path.relative(file.base, file.path),
		  dir= path.dirname(rel),
		  named= file.named|| path.basename(file.path),
		  len= _len(dir)
		console.log('entry', dir, named, len)

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
		console.log(dirMap)
		console.log(depths)
		console.log()
	}
	acceptFile.dirMap= dirMap
	acceptFile.depths= depths
	return acceptFile
}

module.exports= mapper
