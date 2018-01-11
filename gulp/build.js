'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function() {
    return gulp.src([
        path.join(conf.paths.src, '/app/**/*.html'),
        path.join(conf.paths.tmp, '/serve/app/**/*.html')
    ])
        .pipe($.htmlmin({
            removeEmptyAttributes: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: 'FinancialManager',
            root: 'app'
        }))
        .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function() {
    var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), {
        read: false
    });
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join(conf.paths.tmp, '/partials'),
        addRootSlash: false
    };

    var htmlFilter = $.filter('.tmp/serve/*.html', {
        restore: true
    });
    var jsFilter = $.filter('.tmp/serve/**/*.js', {
        restore: true
    });
    var cssFilter = $.filter('.tmp/serve/**/*.css', {
        restore: true
    });

    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe($.useref())
        .pipe(jsFilter)
        //.pipe($.sourcemaps.init())
        .pipe($.uglify({mangle: false,compress: true}))
        //.pipe($.rev())
        //.pipe($.sourcemaps.write('maps'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        //.pipe($.sourcemaps.init())
        .pipe($.replace('../../bower_components/bootstrap-stylus/fonts/', '../fonts/'))
        .pipe($.cssnano())
        //.pipe($.rev())
        //.pipe($.sourcemaps.write('maps'))
        .pipe(cssFilter.restore)
        .pipe($.revReplace())
        .pipe(htmlFilter)
        .pipe($.htmlmin({
            removeEmptyAttributes: true,
            removeAttributeQuotes: true,
            collapseBooleanAttributes: true,
            collapseWhitespace: true
        }))
        .pipe(htmlFilter.restore)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe($.size({
            title: path.join(conf.paths.dist, '/'),
            showFiles: true
        }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function() {
    return gulp.src($.mainBowerFiles().concat('bower_components/bootstrap-stylus/fonts/*'))
        .pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function() {
    var fileFilter = $.filter(function(file) {
        return file.stat.isFile();
    });
    
    return gulp.src([
        path.join(conf.paths.src, '/**/*'),
        path.join('!' + conf.paths.src, '/**/*.{html,css,js,styl}')
    ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function() {
    return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')]);
});

gulp.task('build', ['clean', 'html', 'fonts', 'other'],function(){
    //uedit其他文件载入dist
    gulp.src('bower_components/ueditor/dist/utf8-php/**/*')
    .pipe(gulp.dest(path.join(conf.paths.dist, '/scripts')));

    //config配置打入dist
    gulp.src('src/config.js')
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));

    //serve下面的所有js打入dist
    // gulp.src('.tmp/serve/**/*.js')
    // .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
    
    //将select2中的图片打包到styles文件夹下
    gulp.src(['bower_components/select2/*.png','bower_components/select2/*.gif'])
    .pipe(gulp.dest(path.join(conf.paths.dist, '/styles/')));
    

    return gulp.src('.tmp/serve/**/*.chunk.js')
    .pipe($.uglify({mangle: false , compress: true}))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));

    // //把mock打入app的js,最后存入script文件夹中
    // return gulp.src([
    //     path.join(conf.paths.mock, '/**/*.js'),
    //     path.join(conf.paths.dist, '/scripts/app.js')
    // ])
    // .pipe($.concat({
    //     path:'app.js'
    // }))
    // .pipe(gulp.dest(path.join(conf.paths.dist, '/scripts')));
});



gulp.task('build-dev', ['clean', 'html', 'fonts', 'other'], function() {
    //uedit其他文件载入dist
    gulp.src('bower_components/ueditor/dist/utf8-php/**/*')
    .pipe(gulp.dest(path.join(conf.paths.dist, '/scripts')));

    //config配置打入dist
    gulp.src('src/config.js')
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));

    //serve下面的所有js打入dist
    gulp.src('.tmp/serve/**/*.js')
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));

    //把mock打入app的js,最后存入script文件夹中
    return gulp.src([
        path.join(conf.paths.mock, '/**/*.js'),
        path.join(conf.paths.dist, '/scripts/app.js')
    ])
    .pipe($.concat({
        path:'app.js'
    }))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/scripts')));
});
