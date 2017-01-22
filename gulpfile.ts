import { task, src, dest, watch } from 'gulp';
import * as ts from 'gulp-typescript';
import * as tslint from 'gulp-tslint';

const tsProject = ts.createProject('tsconfig.json', {
	typescript: require('typescript')
});

task('watch', ['build', 'lint'], () => {
	watch('./src/**/*.ts', ['build:ts', 'lint']);
});

task('build', [
	'build:ts',
	'build:copy'
]);

task('build:ts', () => {
	return tsProject.src()
		.pipe(ts(tsProject))
		.pipe(dest('./built'));
});

task('build:copy', () => {
	return src('./src/images/**/*')
		.pipe(dest('./built/images/'));
});

task('lint', () => {
	return src('./src/**/*.ts')
		.pipe(tslint({
			tslint: require('tslint'),
			fotmatter: "verbose"
		}))
		.pipe(tslint.report());
});

task('test', ['build', 'lint']);
