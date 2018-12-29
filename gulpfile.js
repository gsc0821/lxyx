var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
gulp.task('minsass', function() {
    return gulp.src('./zy/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./zy/css'))
});
gulp.task('webserver', function() {
    return gulp.src('./')
        .pipe(webserver({
            port: 3000,
            open: true,
            middleware: function(req, res, next) {
                // res.end(require('fs').readFileSync(require('path').join(__dirname, "public", "index.html")))
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return res.end();
                }
                if (pathname === '/') {
                    res.end(fs.readFileSync(path.join(__dirname, "zy", "index.html")));
                }
                var extname = path.extname(pathname);
                if (extname) {
                    res.end(fs.readFileSync(path.join(__dirname, "zy", pathname)));
                } else {
                    // if (pathname === '/list') {
                    //     var data = JSON.parse(fs.readFileSync(path.join(__dirname, "zy", "data.json")));
                    //     res.end(JSON.stringify({ data: data }));
                    // }
                }
            }
        }))
});