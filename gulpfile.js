/**
 * @namespace gulpfile
 * @requires node_modules/gulp
 */
const gulp          = require('gulp'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    cssnano         = require('cssnano'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    rename          = require('gulp-rename');


const paths = {
    src: {
        path:   'src',
        sass:   'src/scss',
        static: 'src/static',
        css:    'src/static/css',
        js:     'src/static/js'
    },
    dist: {
        path:   'dist',
        js:     'dist/js'
    },
    example: {
        js:     'example/js',
        dist:   'example/dist'
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
        .pipe(sass()).on('error', sass.logError)
        .pipe(postcss(plugins))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.src.css))
}

const compile = gulp.parallel([compileStyle]);
compile.description = 'compile all sources';
exports.compile = compile;