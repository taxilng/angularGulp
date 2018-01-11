'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');
var gulpWebpack = require('webpack-stream');
var plumber = require('gulp-plumber');
var $ = require('gulp-load-plugins')();
var HappyPack = require('happypack');

function webpackWrapper(watch, test, callback) {

    var webpackOptions = {
        watch: watch,
        module: {
            loaders: [{
                test: require.resolve('../src/app/extra/mock.angular.js'),
                loader: 'exports'
            }, {
                test: /\.styl$/,
                loader: 'happypack/loader?id=styl'
            }, {
                test: /\.css$/,
                loader: 'happypack/loader?id=css'
            }, {
                test: /\.html$/,
                loader: 'happypack/loader?id=html'
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?]?.*)?$/,
                loader: 'happypack/loader?id=font'
            }, {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?name=assets/images/[name].[ext]' //limit=8192&
            }],
            noParse: [
                /[\/\\]bower_components[\/\\]angular[\/\\]angular\.js$/,
                /[\/\\]bower_components[\/\\]moment[\/\\]moment\.js$/,
                /[\/\\]node_modules[\/\\]lodash[\/\\]lodash\.js$/
            ]
        },
        output: {
            path: path.resolve(__dirname, './build'),
            filename: 'app.js',
            chunkFilename: '[name].chunk.js'
        },
        resolve: {
            root: [
                path.resolve('./bower_components'),
                path.resolve('./src/app/components/ui'),
                // path.resolve('./src/app/components/biz'),
                // path.resolve('./src/app/components/bizUI'),
                path.resolve('./src/app/components/common')
            ],
            modulesDirectories:[
                'node_modules'
            ],
            extensions: [ '','.js', '.styl', '.css']
        },
        cache: true,
        plugins: [
            new HappyPack({
                id: 'styl',
                loaders: ['style-loader!css-loader!stylus-loader'],
                threads:4
            }),
            new HappyPack({
                id: 'font',
                loaders: ['file?name=assets/fonts/[name].[ext]'],
                threads:2
            }),
            new HappyPack({
                id: 'html',
                loaders: ['html'],
                threads:4
            }),
            new HappyPack({
                id: 'css',
                loaders: ['style-loader!css-loader'],
                threads:2
            })

        ]
    };

    if (watch) {
        webpackOptions.devtool = 'inline-source-map';
    }

    var webpackChangeHandler = function(err, stats) {

        $.util.log(stats.toString({
            colors: $.util.colors.supportsColor,
            chunks: false,
            hash: false,
            version: false
        }));
        browserSync.reload();
        if (watch) {
            watch = false;
            callback();
        }
    };

    var sources = [path.join(conf.paths.src, '/app/index.module.js')];

    if (test) {
        sources.push(path.join(conf.paths.src, '/app/**/*.spec.js'));
    }

    return gulp.src(sources)
        .pipe(plumber())
        .pipe(gulpWebpack(webpackOptions, null, webpackChangeHandler))
        .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve/app')));
}

gulp.task('scripts', function() {
    return webpackWrapper(false, false);
});

gulp.task('scripts:watch', ['scripts'], function(callback) {
    return webpackWrapper(true, false, callback);
});

gulp.task('scripts:test', function() {
    return webpackWrapper(false, true);
});

gulp.task('scripts:test-watch', ['scripts'], function(callback) {
    return webpackWrapper(true, true, callback);
});
