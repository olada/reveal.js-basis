/**
 * Author: David Olah, Cofinpro AG
 * Date: 23.11.2017, 21:48
 */
var gulp = require("gulp");
var run = require("gulp-run");
var rename = require("gulp-rename");
var clean = require("gulp-clean");

var revealjs_folder = "revealjs";
var slides_folder = "slides";

/**
 * Pipeline:
 * - Delete ./revealjs/index.html (so we can easily replace it)
 * - Copy ./slides/slides.html to ./revealjs/slides.html
 * - Rename ./revealjs/slides.html in ./revealjs/index.html
 * - Call npm start within ./revealjs (spawns webserver displaying the presentation)
 */

gulp.task("delete-default-revealjs-index-file", function() {
    console.log("Deleting ./" + revealjs_folder + "/index.html file");
    return gulp.src("./" + revealjs_folder + "/index.html")
            .pipe(clean({force: true}))
});

gulp.task("copy-slides.html", ["delete-default-revealjs-index-file"], function() {
    console.log("Copying ./ " + slides_folder + "/slides.html to ./" + revealjs_folder + "/");
    return gulp.src("./" + slides_folder + "/slides.html")
        .pipe(gulp.dest("./" + revealjs_folder + "/"));
});

gulp.task("clean-revealjs-etc-folder", function() {
    console.log("Cleaning ./" + revealjs_folder + "/etc/");
    return gulp.src("./" + revealjs_folder + "/etc/")
        .pipe(clean());
});

gulp.task("copy-images-to-revealjs-etc", ["clean-revealjs-etc-folder"], function() {
    console.log("Copying images folder from ./" + slides_folder + "/ to ./" + revealjs_folder + "/etc/");
    return gulp.src(["./" + slides_folder + "/**/*", "!./" + slides_folder + "/*"], {"base": "slides"})
        .pipe(gulp.dest("./" + revealjs_folder + "/etc/"))
});

gulp.task("rename-slides-to-index-in-revealjs-folder", ["copy-slides.html"], function() {
    console.log("Renaming ./" + revealjs_folder + "/slides.html to index.html");
    return gulp.src("./" + revealjs_folder + "/slides.html")
        .pipe(rename("index.html"))
        .pipe(gulp.dest("./" + revealjs_folder));
});

gulp.task("present", ["rename-slides-to-index-in-revealjs-folder", "copy-images-to-revealjs-etc"], function() {
    console.log("Starting local server to serve revealjs on localhost:8000");
    return run("npm --prefix ./" + revealjs_folder + " run start").exec();
});

// If changes are made to any file within the ./slides/ directory, we will make sure that our pipeline is triggered again
// That way, we only have to refresh the already running browser tab to retrieve the new presentation
var watcher = gulp.watch("./slides/**", ["rename-slides-to-index-in-revealjs-folder", "copy-images-to-revealjs-etc"]);