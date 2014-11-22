"use strict"
var Buffer= require("buffer").Buffer,
  File= require("vinyl")

function IndexFactory(ctx, mapper){
	return function(dir){
		var files= mapper.dirMap[dir],
		  index= ["module.exports={"],
		  first= true

		for(var i= 0; i< files.length; ++i){
			var file= files[i]
			if(file.endsWith("/index.js"))
				return
			if(file.endsWith(".js"))
				file= file.substring(0, file.length-3)
			index.push(
				first? "": ",",
				"\n\"",
				file,
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
		ctx.push(index)
	}	
	
}

module.exports= IndexFactory
