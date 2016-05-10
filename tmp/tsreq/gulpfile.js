/// <reference path="./typings/bundle.d.ts" />
"use strict";
var gulp_1 = require('gulp');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});
gulp_1.task('watch', ['build', 'lint'], function () {
    gulp_1.watch('./src/**/*.ts', ['build:ts', 'lint']);
});
gulp_1.task('build', ['build:ts']);
gulp_1.task('build:ts', function () {
    return tsProject.src()
        .pipe(ts(tsProject))
        .pipe(gulp_1.dest('./built'));
});
gulp_1.task('lint', function () {
    return gulp_1.src('./src/**/*.ts')
        .pipe(tslint({
        tslint: require('tslint')
    }))
        .pipe(tslint.report('verbose'));
});
gulp_1.task('test', ['build', 'lint']);
