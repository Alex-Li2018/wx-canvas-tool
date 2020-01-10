const path = require('path');
const fs = require('fs');
const { src, dest, task } = require('gulp');
const { series } = require('gulp');

// 每次压缩前先删除dist目录
clean();

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

// 判断dist目录是否存在(存在: 删除, 不存在不做操作)
function clean() {
    // 1.先判断是否存在
    if (!fs.existsSync(path.resolve(__dirname, 'dist'))) {
        return 1;   
    }
    deleteall(path.resolve(__dirname, 'dist'));
}

// 递归删除文件
function deleteall(path) {
	var files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) { // recurse
				deleteall(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}

// series顺序执行: 先删除再压缩
exports.default = series(gulpSrc);