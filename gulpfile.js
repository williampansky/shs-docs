/**
 * @namespace gulpfile
 * @requires node_modules/gulp
 */
const gulp          = require('gulp-help')(require('gulp')),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    postcss         = require('gulp-postcss'),
    autoprefixer    = require('autoprefixer'),
    browserSync     = require('browser-sync').create(),
    del             = require('del'),
    cssnano         = require('cssnano'),
    gulpif          = require('gulp-if'),
    imagemin        = require('gulp-imagemin'),
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


/**
 * @summary Variable for `--proxy` flag.
 * 
 * @name localhost
 * @type {Variable}
 * @memberof gulpfile
 * @inner
 * 
 * @description Define the localhost proxy to use when activating the `--proxy` flag,
 * this will point your BrowserSync initiation to the desired URL instead
 * of opening up a new tab window using `localhost:3000`.
 * 
 * @prop {String} localhost URL endpoint
 */
const localhost = 'documentation.html';


/**
 * @summary Various paths to use throughout the gulpfile.js process.
 * 
 * @name paths
 * @type {Object}
 * @memberof gulpfile
 * @inner
 * 
 * @prop {Object/String} theme 'src/tmpl',
 * @prop {Object/String} sass 'src/scss',
 * @prop {Object/String} css  'src/css',
 * @prop {Object/String} img 'src/img',
 * @prop {Object/String} js 'src/js',
 * @prop {Object/String} root './',
 */
const paths = {
    root:   './',
    src:    'src',
    theme:  'src/tmpl',
    sass:   'src/scss',
    css:    'src/static/css',
    img:    'src/static/img',
    js:     'src/static/js',
    test:   'test'
};

gulp.task('test', ()=> {
    console.log(paths.sass);
});

/**
 * @summary Autoprefixer browser support, used in Gulp's `sassTask()` function.
 * 
 * @name browserSupport
 * @type {Variable}
 * @memberof gulpfile
 * @inner
 * 
 * @see [Browser Queries]{@link https://github.com/ai/browserslist#queries}
 * 
 * @prop {String} last last 2 versions
 */
const support = 'last 2 versions';


/**
 * @summary Various flags to call when initiating a command-line gulp call.
 * 
 * @name developmentFlags
 * @type {Object}
 * @memberof gulpfile
 * @inner
 * 
 * @prop {Object/String} dev Pass this flag to use unminified files & sourcemaps.
 * @prop {Object/String} bs Pass this flag to initiate an instance of BrowserSync.
 * @prop {Object/String} proxy Pass this flag to use the currently defined localhost variable.
 * @prop {Variable} flags minimist(process.argv.slice(2), knownFlags);
 */
const knownFlags = {
    boolean: ['dev', 'bs'],
    string: ['proxy'],
    default: {
        dev: true,
        bs: true,
        proxy: localhost
    }
};
const flags = minimist(process.argv.slice(2), knownFlags);






/**
 * @summary Runs all gulp functions in one call.
 * 
 * @function defaultTask
 * @memberof gulpfile
 * @inner
 * 
 * @description 
 * Running the default CLI command, `gulp`, produces all the primary tasks:
 * _docs_, _sass_, _images_, _watch_.
 * 
 * ```command-line
 *  gulp
 * ```
 */
const defaultTask = ()=> {
    return sequence(
        'sass',
        'images',
        'docs',
        'watch',
        'sync'
    );
}
defaultTask.description = 'Runs all Gulp functions in one call.';
gulp.task('default', defaultTask.description, defaultTask);


/**
 * @summary Compile Sass, run PostCSS, & save to `paths.css`.
 * 
 * @function sassTask
 * @memberof gulpfile
 * @inner
 * 
 * @description
 * ```command-line
 *  gulp sass
 * ```
 */
function sassTask() {
    // postCSS plugin calls
    let plugins = [
        autoprefixer({ browsers: support }),
        cssnano({
            preset: ['default', {
                discardComments: { removeAll: true },
            }]
        }),
    ];

    return gulp.src('src/scss/**/*.scss')
        .pipe(gulpif( flags.dev, sourcemaps.init() ))
        .pipe(sass({ outputStyle: (flags.dev) ? 'expanded' : 'compressed' })
        .on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulpif( flags.dev, sourcemaps.write('./') ))
        .pipe(rename({ suffix: '.min' }))
        // .pipe(gulp.dest(paths.css))
        .pipe(gulp.dest(paths.test))
        .pipe(gulpif( flags.bs, browserSync.stream({match: '**/*.css'}) ));
}
sassTask.description = `Compile Sass, run Autoprefixer, & save to ${paths.css} directory.`;
sassTask.flags = {
    'default':  'Output style is compressed.',
    '--dev':    'Output style is expanded & uses sourcemaps.'
};
gulp.task('sass', sassTask.description, sassTask);


/**
 * @summary Optimizes images in `paths.img`.
 * 
 * @function imageTask
 * @memberof gulpfile
 * @inner
 * 
 * @description
 * ```command-line
 *  gulp images
 * ```
 */
function imageTask() {
    return gulp.src(`${paths.img}/**/*.{jpg,gif,png,svg}`)
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest(paths.img));
}
imageTask.description = `Optimizes images in ${paths.img} directory.`;
gulp.task('images', imageTask.description, imageTask);


/**
 * @summary Watches files for changes.
 * 
 * @function watchTask
 * @memberof gulpfile
 * @inner
 * 
 * @description
 * ```command-line
 *  gulp watch
 * ```
 */
function watchTask() {
    // watch .scss files, recompile, & inject on save
    gulp.watch('src/**/*.scss', ['sass'])
        .on('change', event => {
            console.log(`[watchTask] ———— File ${event.path} was ${event.type}, running sassTask()...`);
        });
    
    // watch .js files, recompile, & reload on save
    gulp.watch([
        './index.js',
        './webpack.config.js',
        'src/static/js/**/*.js', 
        '!src/static/js/bundle.js', 
        '!node_modules/**/*.js', 
        '!dist/js/**/*.js'
    ], ['webpack'])
        .on('end', event => {
            console.log(`[watchTask] ———— File ${event.path} was ${event.type}, running webpack task...`);
            browserSync.reload(event);
        });
    
    // watch .html files, recompile, & reload on save
    gulp.watch('src/**/*.html', ['markdown'])
        .on('end', event => {
            console.log(`[watchTask] ———— File ${event.path} was ${event.type}, running parseMarkdown() task...`);
            browserSync.reload(event);
        });
    
    // watch .tmpl files, recompile, & reload on save
    gulp.watch('src/**/*.tmpl', ['jsdocs'])
        .on('end', event => {
            console.log(`[watchTask] ———— File ${event.path} was ${event.type}, running jsDocs task...`);
            browserSync.reload(event);
        });
}
watchTask.description = 'Watches files for changes and reloads BrowserSync if flagged.';
gulp.task('watch', watchTask.description, watchTask);


/**
 * @summary Initiates a BrowserSync instance.
 * 
 * @function syncTask
 * @memberof gulpfile
 * @inner
 * 
 * @description
 * ```command-line
 *  gulp sync
 * ```
 */
gulp.task('sync', 'Initiates a BrowserSync instance.', ()=> {
    browserSync.init({
        open: false,
        online: true,
        files: ['src/static/css/main.min.css'],
        // proxy: localhost,
        // browser: 'google chrome',
        // single: true,
        // port: 3000,
        server: {
            baseDir: 'test',
            directory: true
        }
    });
});



/**
 * @summary Builds complete documentation package 
 * using gulp-md-template and jsDoc3.
 * 
 * @function docs
 * @memberof gulpfile
 * @inner
 * 
 * @prop {Function} parseMarkdown Builds documentation.html out of all readme.md files and template.html
 * 
 * @see [Docs Gulp Plugin]{@link https://github.com/grit96/gulp-md-template}
 * 
 * @description
 * ```command-line
 *  gulp docs
 * ```
 */
const docsTask = ()=> {
    return sequence(
        'jsdocs-clear',     // clears jsdocs
        'webpack',          // runs webpack and rebuilds bundle.js
        'jsdocs',           // runs jsdocs
        'todo',             // parses @todos
        'markdown',         // builds documentation.html
    );
};
docsTask.description = 'Builds complete documentation package.';
gulp.task('docs', docsTask.description, docsTask);

/**
 * @summary Supplemental task for docs; 
 * using 'false' to hide task for gulp-help.
 * 
 * @function parseMarkdown
 * @memberof docsTask
 * @inner
 * 
 * @description
 * Builds documentation.html out of all readme.md files and template.html.
 */
const parseMarkdown = ()=> {
    console.log(`
    [docsTask] ———— Parsing Markdown (.md) files and compiling to ./documentation.html file...
    `);

    return gulp.src(`./src/template.html`)
        .pipe(template(`./test/markdown`))
        .pipe(rename('readme.html'))
        .pipe(gulp.dest('./test/dist'));
};
parseMarkdown.description = 'Builds complete documentation package.';
gulp.task('markdown', false, parseMarkdown);




/**
 * @summary Parses JavaScript files and creates 
 * docs/dist/js/*.html documentation files.
 * 
 * @function jsDocs
 * @memberof gulpfile
 * @inner
 * 
 * @prop {Function} jsdocs-clear deletes all files in docs/dist/js dir
 * @prop {Function} jsdocs-svn adds all files in docs/dist/js to svn
 * 
 * @see [JSDoc]{@link http://usejsdoc.org/index.html}
 * 
 * @description
 * ```command-line
 *  gulp jsdocs
 * ```
 */
gulp.task('jsdocs', 
    'Parses JavaScript files and creates dist/js/*.html documentation files.', 
    run('npm run jsdoc')
);

/**
 * @summary Supplemental task for jsDocs; 
 * using 'false' to hide task fro gulp-help.
 * 
 * @function jsdocsTask_clear
 * @memberof jsDocs
 * @inner
 * 
 * @description
 * Deletes all files in docs/dist/js dir.
 */
const jsdocsTask_clear = ()=> {
    console.log(`
    [docsTask] ———— Clearing old jsDoc files...
    `);

    // -- globbing pattern to match everything inside the `docs/dist/js` folder
    del([
        'test/dist/**/*',
        'test/documentation.html'
    ]);
};
jsdocsTask_clear.description = 'Deletes all files in docs/dist/js directory.';
gulp.task('jsdocs-clear', false, jsdocsTask_clear);

/**
 * @summary Supplemental task for jsDocs; 
 * using 'false' to hide task fro gulp-help.
 * 
 * @function jsdocsTask_svn
 * @memberof jsDocs
 * @inner
 * 
 * @description
 * Adds all files in docs/dist/js to SVN.
 */
const jsdocsTask_svn = ()=> {
    console.log(`
    [docsTask] ———— Adding new jsDoc files to SVN...
    `);

    // -- svn add --force --depth infinity on docs/dist/js folder
    return svn.addSync(paths.docs + 'dist/**/*', {
        args: '--force --depth infinity'
    }, (err) => {
        if (err) throw err
    });
};
jsdocsTask_svn.description = 'Adds all files in docs/dist/js to SVN.';
gulp.task('jsdocs-svn', false, jsdocsTask_svn);




/**
 * @summary Generates a TODO.md from `@todo` & `@fixme` comment tags.
 * 
 * @function todo
 * @memberof gulpDocs
 * @inner
 * 
 * @see [Gulp-Todo]{@link https://github.com/pgilad/gulp-todo}
 * 
 * @description
 * ```command-line
 *  gulp todo
 * ```
 */
const todoTask = ()=> {
    console.log(`
    [docsTask] ———— Parsing @todo & @fixme source-code comment annotations...
    `);

    return gulp.src([
        // include the following directories:
        'src/**/*.js',
        'gulpfile.js',
        'webpack.config.js',
        
        // exlude the following directories:
        '!node_modules/**/*.js',
    ])
    .pipe(todo())
    .pipe(gulp.dest(`./test/markdown`));
    // -> Will output a TODO.md with your todos
};
todoTask.description = 'Generates a TODO.md from @todo & @fixme source-code comment tags.';
gulp.task('todo', todoTask.description, todoTask);




/**
 * @summary Parses JavaScript files and creates 
 * docs/dist/js/*.html documentation files.
 * 
 * @function webpack
 * @memberof gulpfile
 * @inner
 * 
 * @prop {Function} jsdocs-clear deletes all files in docs/dist/js dir
 * @prop {Function} jsdocs-svn adds all files in docs/dist/js to svn
 * 
 * @see [JSDoc]{@link http://usejsdoc.org/index.html}
 * 
 * @description
 * ```command-line
 *  gulp webpack
 * ```
 */
gulp.task('webpack', 
    'Bundles everything via Webpack.', 
    run('npm run build')
);