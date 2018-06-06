var gulp = require('gulp'); // Сам Gulp
var less = require('gulp-less');
var uglifyJs = require('gulp-uglifyjs');
var browserSync = require('browser-sync');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minImg = require('gulp-imagemin');
var minHTML = require('gulp-htmlmin');
var clean = require('gulp-clean');
var order = require('gulp-order');

// Ещё расширения для gulp
/**npm install
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
    dest:'./dist'
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

/**
 * Очистка сборочной директории
 */
gulp.task('clean', function () {
    gulp.src(config.dest, {read: false})
        .pipe(clean());
});

/**
 * Перенос дополнений
 */
gulp.task('base',function(){
    gulp.src(config.app+ '/packages/**/*')
        .pipe(gulp.dest(config.dest + '/packages'));
});

/**
 * Преобразование less
 */
gulp.task('less',function () {
    gulp.src(config.app+ '/css/**/*.less')
        .pipe(order([
            "_main.less",
            '*.less'
        ]))
        .pipe(concat('style.min.less'))
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.dest + '/css'));
        // .pipe(browserSync.reload({stream:true}));
    browserSync.reload({stream:false});
});


/**
 * Работа с JS
 */
gulp.task('js',function () {
    gulp.src(config.app+ '/js/**/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglifyJs())
        .pipe(gulp.dest(config.dest + '/js'))
        .pipe(browserSync.reload({stream:true}));
});

/**
 * Работа с HTML
 */
gulp.task('html',function () {
    gulp.src(config.app+ '/**/*.html')
        .pipe(minHTML({collapseWhitespace: true}))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});

/**
 * Работа с img
 */
gulp.task('img', function(){
    gulp.src(config.app + '/images/*')
        .pipe(minImg())
        .pipe(gulp.dest(config.dest + '/images'));
});

/**
 * Отслеживание изменений
 */
gulp.task('watch',function () {
    gulp.watch(config.app + '/js/**/*.js',['js']);
    gulp.watch(config.app + '/images/*',['img']);
    gulp.watch(config.app + '/**/*.html',['html']);

    gulp.watch(config.app + '/css/**/*.less',['less']);
});

gulp.task('server',function () {
    browserSync({
        server:{
            baseDir:config.dest
        }
    });
});


// Задача по умолчанию
gulp.task('default',['test', 'base', 'img', 'less','js','html', 'watch', 'server'],function () {
    console.log('Выполнено!');
});