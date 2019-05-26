const gulp = require('gulp');
const flatten = require('gulp-flatten');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const sass = require('gulp-sass');
const replace = require('gulp-replace');
const imagemin = require('gulp-imagemin');

const font = { src: './vendor/**/*.{ttf,woff,woff2,eot,svg}', dest: './src/assets/dist/font' };
const img = { src: './vendor/**/*img/*', dest: './src/assets/dist/img' };
const css = { src: './src/assets/sass/*.sass', dest: './src/assets/dist/css' };
const distDir = './src/assets/dist';

var vendorJs = [
    './vendor/MDBootstrap/js/jquery-3.4.0.min.js',
    './vendor/MDBootstrap/js/bootstrap.min.js',
    './vendor/MDBootstrap/js/popper.min.js',
    './vendor/MDBootstrap/js/mdb.min.js',
    './src/assets/js/custom.js',
]

var vendorCss = [
    './vendor/MDBootstrap/css/bootstrap.min.css',
    './src/assets/css/compiled-4.8.1.min.css',
]

gulp.task('js', () => {
    return gulp.src(vendorJs)
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(distDir + '/js'))
})

gulp.task('css', () => {
    return gulp.src(vendorCss)
        .pipe(cssmin())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(distDir + '/css'))
})

gulp.task('sass', function () {
    return gulp.src(css.src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(css.dest));
})

gulp.task('fonts', () => {
    return gulp.src(font.src)
        .pipe(flatten())
        .pipe(gulp.dest(font.dest));
});

gulp.task('images', () => {
    return gulp.src(img.src)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest(img.dest));
});

gulp.task('clean-client-cache', () => {
    const version = new Date().getTime();
    return gulp.src('./src/index.html')
        .pipe(replace(/\/assets\/dist\/css\/style.css/g, `/assets/dist/css/style.css?v=${version}`))
        .pipe(replace(/\/assets\/dist\/css\/vendor.css/g, `/assets/dist/css/vendor.css?v=${version}`))
        .pipe(replace(/\/assets\/dist\/js\/vendor.js/g, `/assets/dist/js/vendor.js?v=${version}`))
        .pipe(gulp.dest('./src/'));
});

gulp.task('dev', gulp.series('js', 'css', 'sass', 'fonts'));
gulp.task('prod', gulp.series('js', 'css', 'sass', 'fonts', 'clean-client-cache'));