/**
 * @namespace gulpfile
 * @requires node_modules/gulp
 */
const gulp          = require('gulp'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    // browserSync     = require('browser-sync').create(),
    del             = require('del'),
    cssnano         = require('cssnano'),
    gulpif          = require('gulp-if'),
    // imagemin        = require('gulp-imagemin'),
    minimist        = require('minimist'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    es              = require('event-stream'),
    rename          = require('gulp-rename'),
    template        = require('gulp-md-template'),
    todo            = require('gulp-todo'),
    run             = require('gulp-run-command').default,
    sequence        = require('run-sequence'),
    svn             = require('gulp-svn2'),
    fs              = require('fs');


const paths = {
    src: {
        path: 'src',
        sass: 'src/scss',
        static: 'src/static',
        css: 'src/static/css',
        js: 'src/static/js'
    },
    dist: {
        path: 'dist',
        js: 'dist/js'
    },
    example: {
        js: 'example/js',
        dist: 'example/dist'
    }
}

const support = 'last 2 versions';

const compileStyle = () => {
    let plugins = [
        autoprefixer({ browsers: support }),
        cssnano({
            preset: ['default', {
                discardComments: { removeAll: true },
            }]
        }),
    ];

    return gulp.src(`${paths.src.sass}/main.scss`)
        .pipe(sourcemaps.init())
        // Use sass with the files found, and log any errors
        .pipe(sass()).on('error', sass.logError)
        .pipe(postcss(plugins))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        // What is the destination for the compiled file?
        .pipe(gulp.dest(paths.src.css))
}

const compile = gulp.parallel([compileStyle])
compile.description = 'compile all sources'
exports.compile = compile

// const serve = gulp.series(compile)
// serve.description = 'serve compiled source on local server at port 3000'

// const defaultTasks = gulp.parallel(serve, watch)

// export {
//     compile,
//     server
// }
  
// export default defaultTasks