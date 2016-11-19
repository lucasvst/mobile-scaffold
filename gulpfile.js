var gulp = require('gulp')
    concat = require('gulp-concat')
    sass = require('gulp-sass')
    minifyCss = require('gulp-minify-css')
    rename = require('gulp-rename')

gulp.task('default', ['build', 'watch'])

gulp.task('build', ['assets', 'html', 'vendor'])
gulp.task('watch', () => gulp.watch(['./src/**'], ['build']))

gulp.task('assets', ['sass', 'images', 'scripts'])
gulp.task('html', ['index', 'views'])
gulp.task('vendor', ['vendorCss', 'vendorJs', 'vendorFonts'])

gulp.task('sass', sassTask)
gulp.task('images', imagesTask)
gulp.task('scripts', scriptsTask)

gulp.task('index', indexTask)
gulp.task('views', viewsTask)

gulp.task('vendorCss', vendorCssTask)
gulp.task('vendorJs', vendorJsTask)
gulp.task('vendorFonts', vendorFontsTask)

function sassTask(done) {
  gulp.src('./src/scss/main.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
}

function vendorCssTask(done) {
  gulp.src([
    './bower_components/ionic/css/ionic.css'
  ])
    .pipe(concat('vendor.css'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done)
}

function vendorJsTask(done) {
  gulp.src([
    './bower_components/ionic/js/ionic.bundle.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./www/js/'))
    .on('end', done)
}

function vendorFontsTask(done) {
  gulp.src([
    './bower_components/ionic/fonts/**'
  ])
    .pipe(gulp.dest('./www/fonts/'))
    .on('end', done)
}

function imagesTask(done) {
  gulp.src('./src/img/**')
    .pipe(gulp.dest('./www/img/'))
    .on('end', done)
}

function scriptsTask(done) {
  gulp.src('./src/js/**')
    .pipe(concat('main.js'))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./www/js/'))
    .on('end', done)
}

function indexTask(done) {
  gulp.src([
    './src/index.html',
    './src/manifest.json'
  ])
    .pipe(gulp.dest('./www/'))
    .on('end', done)
}

function viewsTask(done) {
  gulp.src('./src/views/**')
    .pipe(gulp.dest('./www/templates/'))
    .on('end', done)
}
