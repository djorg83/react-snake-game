const gulp   = require('gulp');
const babel  = require('gulp-babel');
const inject = require("gulp-inject-file");

const babelOptions = {
	presets: ['react', 'es2016', 'stage-1']
};

gulp.task('build', () => {
    return gulp.src([
        'lib/components/*.js',
        'lib/*.js'
    ], {
        base: './lib/'
    })
        .pipe(inject({ pattern: '<Inject><filename></Inject>' }))
        .pipe(babel(babelOptions))
        .pipe(gulp.dest('dist'));
});

gulp.task('demo', ['build'], () => {
    return gulp.src('dist/**/*.*').pipe(gulp.dest('../snake/node_modules/react-snake-game/dist'));
});

gulp.task('watch', ['demo'], function() {
    gulp.watch('lib/**/*.*', ['demo'])
});

gulp.task('default', ['build']);