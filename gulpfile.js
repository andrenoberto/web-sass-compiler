const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const del = require('del');
const runSequence = require('run-sequence').use(gulp);

/**
 * Gulp v4
 */
/*const concatTask = () => {
    return gulp.src('./src/app/!**!/!*.scss')
        .pipe(concat('components.scss'))
        .pipe(gulp.dest('./src/toCompile'));
};

const copyStylesTask = () => {
    return gulp.src('./src/styles/!**!/!*')
        .pipe(gulp.dest('./src/toCompile/styles'));
};

const sassTask = () => {
    return gulp.src('./src/toCompile/!**!/!*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./src/css'));
};

const concatCssTask = () => {
    return gulp.src('./src/css/!**!/!*.css')
        .pipe(concat('exchange.css'))
        .pipe(gulp.dest('./src/dist'));
};

const clearFoldersTask = () => {
    del(['./src/toCompile', './src/css']);
};*/

/**
 * Gulp v3
 */

gulp.task('concat', () => {
    return gulp.src('./src/app/**/*.scss')
        .pipe(concat('components.scss'))
        .pipe(gulp.dest('./src/toCompile'));
});

gulp.task('copyStyles', () => {
    return gulp.src('./src/styles/**/*')
        .pipe(gulp.dest('./src/toCompile/styles'));
});

gulp.task('sass', () => {
    return gulp.src('./src/toCompile/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('./src/css'));
});

gulp.task('concatCss', () => {
    return gulp.src('./src/css/**/*.css')
        .pipe(concat('exchange.css'))
        .pipe(gulp.dest('./src/dist'));
});

gulp.task('clearFolders', () => {
    return del(['./src/toCompile', './src/css']);
});

gulp.task('build', () => {
    runSequence('copyStyles', 'concat', 'sass', 'concatCss', 'clearFolders')
});

/**
 *  Gulp v4
 */
/*
gulp.task('default', gulp.series(copyStylesTask, concatTask, sassTask, concatCssTask, done => {
    clearFoldersTask();
    done();
}));*/

/**
 *  Gulp v3
 */
gulp.task('default', ['build']);