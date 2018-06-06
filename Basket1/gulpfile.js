var gulp = require('gulp'); // Сам Gulp
var sass = require('gulp-sass');
var uglifyJs = require('gulp-uglifyjs');
var uglify = require('gulp-uglify-es').default;
var browserSync = require('browser-sync');
var csso = require('gulp-csso');
var babel = require('gulp-babel');
// Ещё расширения для gulp
/**
 * gulp-imagemin : Минификация изображений
 * gulp-concat : Склейка группы файлов в 1 файл
 * gulp-htmlmin : Минификация HTML
 * gulp-rename : Переименование выбранных файлов
 * gulp-csso : Минификация CSS
 * del : Для Node.js модуль удаления
 * gulp-babel : Модуль преобразования JS ES6 в ES5
 * gulp-if : Фильтрует файлы по условию
 * gulp-useref : Модуль анализирует HTML код и выхватывает подключенные файлы
 */

// Конфигурация
var config = {
    app:'./app',
    dest:'./dest'
};

/**
 * Gulp - 4 метода
 * 1) task - Объявляет новую задачу
 * 2) src - Выбор файлов для преобразования
 * 3) dest - Размещение итоговых файлов в директории
 * 4) watch - Метод отслеживания изменений
 */

gulp.task('test',function () {
    console.log('Gulp Работает!');
});

gulp.task('img', [], function () {
    gulp.src(config.app+ '/images/**.jpg')
        .pipe(gulp.dest(config.dest + '/images'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass',function () {
    gulp.src(config.app+ '/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('csso',function () {
    gulp.src(config.dest+ '/css/**/*.css')
        .pipe(csso())
        .pipe(gulp.dest(config.dest + '/css'))
        .pipe(browserSync.reload({stream:true}));
});
/**
 * Работа с JS
 */
gulp.task('js', [], function () {
    gulp.src(config.app+ '/js/**.js')
        .pipe(babel({
        	presets: ['es2015']
        }))
        .pipe(uglifyJs())
        .pipe(gulp.dest(config.dest + '/js'))
        .pipe(browserSync.reload({stream:true}));
});

/*
gulp.task('uglify', function () {
    gulp.src(config.dest+ '/js/**.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.dest + '/js'))
        .pipe(browserSync.reload({stream:true}));
});
*/

// пакетные файлы

gulp.task('packagejs',function () {
    gulp.src(config.app+ '/packages/**.js')
        .pipe(gulp.dest(config.dest + '/packages'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('packagecss',function () {
    gulp.src(config.app+ '/packages/**/*.css')
        .pipe(gulp.dest(config.dest + '/packages'))
        .pipe(browserSync.reload({stream:true}));
});

/**
 * Работа с HTML
 */

gulp.task('html',function () {
    gulp.src(config.app+ '/**/*.html')
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});

// json- файл

gulp.task('json',function () {
    gulp.src(config.app+ '/**/*.json')
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});

/**
 * Отслеживание изменений
 */
gulp.task('watch',function () {
    gulp.watch(config.app + '/sass/**/*.sass',['sass']);
    gulp.watch(config.app + '/js/**/*.js',['js']);
    gulp.watch(config.app + '/**/*.html',['html']);
    gulp.watch(config.app + '/images/*.jpg',['img']);
    gulp.watch(config.app + '/*.json',['json']);
});

gulp.task('server',function () {
    browserSync({
        server:{
            baseDir:config.dest,
            index : "basket.html"
        }
    });
});

// Задача по умолчанию
gulp.task('default',['test', 'img', 'sass', 'csso', 'js', 'packagejs', 'packagecss', 'html', 'json', 'watch', 'server'],function () {
    console.log('Выполнено!');
});