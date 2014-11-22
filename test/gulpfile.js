"use strict"

var gulp = require("gulp")
var IndexCreation= require('../gulp-index-creation')

function fixture(){
	var fixtureStream= gulp.src("fixture/**/*.js")
	fixture= (function fixture(){
		return fixtureStream
	})
	return fixtureStream
}

gulp.task("fixture", function(){
	return fixture()
	.pipe(IndexCreation())
	.pipe(gulp.dest("dist/fixture"))
})

gulp.task("default", ["fixture"])
