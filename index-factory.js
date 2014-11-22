"use strict"
var Buffer= require("buffer").Buffer,
  File= require("vinyl"),
  path= require("path")

/**
  IndexFactory creates an `index.js` file for a directory and adds the index.js file to the parent
*/
function IndexFactory(ctx, mapper){
	return function(dir){
		var files= mapper.dirMap[dir],
		  index= ["module.exports={"],
		  first= true

		for(var i= 0; i< files.length; ++i){
			var file= files[i],
			  named = path.dirname(file)
			if(named == ".")
				named= file
			index.push(
				first? "": ",",
				"\n\"",
				named,
				"\":require(\"./",
				file,
				"\")")
		}
		index.push("}")
		index= index.join("")
		index= new Buffer(index)

		index= new File({
			path: dir+"/index.js",
			size: index.length,
			contents: index
		})
		mapper(index)
		ctx.push(index)
	}	
	
}

module.exports= IndexFactory
