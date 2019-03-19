const gulp = require('gulp');

//gulp top level functions

//gulp.task  - define tasks
//gulp.src = point files to use
//gulp.dest = destination to output
//gulp.watch = watch files and folders for changes

gulp.task('message', function() {
  return console.log('gulp is running..');
});
