const { series, watch, parallel, src, dest } = require('gulp');
const webpack = require('webpack-stream');
const compiler = require('webpack');
const webpackConfig = require('./webpack.config.js');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');

const SRC = {
    JS: 'src/js/**/*.js',
    CSS: 'src/less/**/*.less'
};

const DEST = {
    JS: 'dist/js',
    CSS: 'dist/css',
};

function task_webpack() {
    return src(SRC.JS)
    .pipe(webpack(
        webpackConfig,
        compiler,
        (err, stats) => {
            if (err) console.log('Webpack', err)
            console.log(stats.toString())
        }
    ))
    .pipe(dest(DEST.JS));
}

function task_less() {
    return src(SRC.CSS)
    .pipe(less())
        .on('error', console.log.bind(console))
    .pipe(sourcemaps.write())
    .pipe(dest(DEST.CSS));
}

const build = series(task_webpack, task_less);

exports.default = function() {
    const watcher = watch('src/**/*', { events: 'all', delay: 500 }, build);
    watcher.on('change', function(path, stats) {
        console.log(`File ${path} was changed`);
    });
};

exports.build = build;