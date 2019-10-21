const { src, dest, task } = require('gulp');
const { series } = require('gulp');

// 每次压缩前先删除dist目录
const clean = require('gulp-clean');

function delFile(cb) {
    // 删除dist目录下所有文件
    src('dist', { allowEmpty: true })
        .pipe(clean());
    cb();
};

// 压缩canvasTools.js文件
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function gulpSrc(cb) {
    // 压缩canvasTools.js
    src('src/canvasTools.js')
        .pipe(rename({ extname: '.min.js' }))
        .pipe(babel())
        .pipe(uglify())
        .pipe(dest('dist/'));
    cb();
}

// series顺序执行: 先删除再压缩
exports.default = series(delFile, gulpSrc);