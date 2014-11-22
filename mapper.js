var path= require("path")

var sep= new RegExp(path.sep, "g")


function depth(path){
	var segments= path.match(sep)
	return segments && segments.length || 0
}

function mapper(){
	var dirMap= {},
	  depths= []
	function acceptPath(dir, base, len){
		if(!base){
			base= path.basename(dir)
			dir= path.dirname(dir)
		}
		if(!len){
			len= depth(base)
		}

		// add into dir
		var files= dirMap[dir]|| (dirMap[dir]= [])
		if(files.indexOf(base) == -1){
			files.push(base)
		}

		// add into depths
		var depth= depths[len-1]|| (depths[len-1]= [])
		if(depth.indexOf(base) == -1){
			depth.push(base)
		}
	}
	acceptPath.dirMap= dirMap
	acceptPath.depths= depths
	return acceptPath
}

module.exports= mapper
