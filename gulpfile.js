/* styles paths */
var customScssSRC = './build/scss/**/*.scss';
var vendorCss = './bower_components/ng-img-crop/compile/minified/ng-img-crop.css';
var styleDest     = './src/css';

/* js paths  */
var vendorJsSRC = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-ui-router/release/angular-ui-router.min.js',
    './bower_components/ng-img-crop/compile/minified/ng-img-crop.js'
];
var vendorJsFile = 'vendors';
var vendorCssFile = 'vendors';
var customJsSRC = './build/js/*.js';
var jsDest       = './src/js/';

/* custom and vendor styles and scripts */
var foldersToClean = [
    './src/css/*',
    './src/js/*'
];

/* html to watch */
var templatesToWatch = [
    './templates/*.html',
    './*.html'
];


/**
* Load Plugins.
* Load gulp plugins and assing them semantic names.
*/
var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');
var rename          = require('gulp-rename');
var livereload      = require('gulp-livereload');
var del             = require('del');


/**
 * Task: clean old styles ans scripts
 * Clean former styles and scripts before loading another compilation
 */
 gulp.task('clean', function () {
   return del(foldersToClean);
 });


/**
* Task: custom styles
* Compiles Sass, Autoprefixes it and Minifies CSS.
*/
gulp.task('custom-styles', function () {
    gulp.src( customScssSRC )
    .pipe( sass( {
        errLogToConsole: true,
        outputStyle: 'compressed', //['compressed | nested | expanded']
        precision: 10
    }))
    .pipe( autoprefixer(
        'last 2 versions',
        '> 5%'
    ))
    .pipe( gulp.dest( styleDest ) )
    .pipe( rename({
        suffix: ".min"
    }))
    .pipe( gulp.dest( styleDest ) )
    .pipe( livereload() );
});


/**
* Task: vendor styles
*/
gulp.task('vendor-styles', function () {
    gulp.src( vendorCss )
    // .pipe( concat( vendorCssFile + '.css' ) )
    .pipe( gulp.dest( styleDest ) )
    .pipe( rename({
        basename: vendorCssFile,
        suffix: ".min"
    }))
    .pipe( gulp.dest( styleDest ) )
    .pipe( livereload() );
});



/**
* Task: vendor scripts
* Concatenate and uglify vendor JS scripts.
*/
gulp.task( 'vendor-scripts', function() {
    gulp.src( vendorJsSRC )
    .pipe( concat( vendorJsFile + '.js' ) )
    .pipe( gulp.dest( jsDest ) )
    .pipe( rename({
        basename: vendorJsFile,
        suffix: ".min",
        extname: ".js"
    }))
    .pipe( uglify() )
    .pipe( gulp.dest( jsDest ) )
    .pipe(livereload());
});


/**
* Task: custom scripts
* Copy custom scripts to src.
*/
gulp.task( 'custom-scripts', function() {
    gulp.src( customJsSRC )
    .pipe( gulp.dest( jsDest ) )
    .pipe(livereload());
});


/**
* Task: expose html files
* Watch templates.
*/
gulp.task( 'watch-templates', function() {
    gulp.src( templatesToWatch ).pipe(livereload());
});



/**
* Task: watch
* Watch modification on scss and js files.
*/
gulp.task( 'watch', function() {
    livereload.listen();

    gulp.watch(['build/scss/**/*.scss'], ['custom-styles']);
    gulp.watch(['build/js/*.js'], ['custom-scripts']);
    gulp.watch(templatesToWatch, ['watch-templates']);
});



/**
* Default Tasks.
* Register all tasks and load all
*/
gulp.task( 'default', [ 'clean', 'custom-styles', 'vendor-styles', 'custom-scripts', 'vendor-scripts', 'watch' ]);
