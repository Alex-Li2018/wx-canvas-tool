// 普通canvas绘图工具类

// umd适配多种引入方式
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['CanvasTool'], factory);
    } else if (typeof exports === 'object' && typeof module === 'object') {
        // Node, CommonJS之类的
        module.exports = factory();
    } else {
        // 浏览器全局变量(root 即 window)
        root.CanvasTool = factory();
    }
}(window, function() {
    // 方法
    const textBreakline = Symbol('textBreakline');
    const validateRlues = Symbol('validateRlues');
    const letterSpacingText = Symbol('letterSpacingText');
    const setFillStyle = Symbol('setFillStyle');
    const setStrokeStyle = Symbol('setStrokeStyle');
    const setFontSize = Symbol("setFontSize");

    class CanvasTool {
        constructor(ctx, scale) {
            this.ctx = ctx;
            this.scale = scale || 1;
        }

        /**
         * 画菱形
         * @param {Object} rhombObj 传入菱形的参数
         * sx: 开始的x轴
         * sy: 开始的y轴
         * cx: 中心位置的x轴
         * cy: 中心位置的y轴
         * width: 宽度
         * height: 高度
         * bgColor: 背景色
         */
        rhomb(rhombObj) {
            let { sx, sy, cx, cy, width, height, bgColor } = rhombObj;
            // 参数校验规则
            let ruleMap = new Map([
                [sx, { type: 'number', param: 'sx' }],
                [sy, { type: 'number', param: 'sy' }],
                [cx, { type: 'number', param: 'cx' }],
                [cy, { type: 'number', param: 'cy' }],
                [width, { type: 'number', param: 'width' }],
                [height, { type: 'number', param: 'height' }],
                [bgColor, { type: 'string', param: 'bgColor' }]
            ]);
            this[validateRlues](ruleMap);

            // 设置默认值
            sx = sx || 0;
            sy = sy || 0;
            cx = cx || 0;
            cy = cy || 0;
            bgColor = bgColor || '#fff';

            this.ctx.translate(cx, cy);
            this.ctx.rotate(45 * Math.PI / 180);
            // 修正画布坐标
            this.ctx.translate(-cx, -cy);
            this.ctx.fillStyle = bgColor;
            this.ctx.fillRect(sx, sy, width, height);
            this.ctx.save();
        }

        /**
         * 画直线
         * @param { Object } lineObj 传入的直线对象
         * line 画直线
         * sx: 开始x轴
         * sy: 开始y轴
         * ex: 结束x轴
         * ey: 结束y轴
         * strokeWidth: 线宽
         * strokeStyle: 线条样式
         */
        line(lineObj) {
            // 获取传入的文本对象
            let { sx, sy, ex, ey, strokeWidth, strokeStyle } = lineObj;
            // 参数校验规则
            let ruleMap = new Map([
                [sx, { type: 'number', param: 'sx' }],
                [sy, { type: 'number', param: 'sy' }],
                [ex, { type: 'number', param: 'ex' }],
                [ey, { type: 'number', param: 'ey' }],
                [strokeWidth, { type: 'number', param: 'strokeWidth' }],
                [strokeStyle, { type: 'string', param: 'strokeStyle' }]
            ]);
            this[validateRlues](ruleMap);

            // 设置默认值
            sx = sx || 0;
            sy = sy || 0;
            ex = ex || 100;
            ey = ey || 100;
            strokeStyle = strokeStyle || '#000';
            strokeWidth = strokeWidth || 2;

            this.ctx.beginPath();
            this.ctx.moveTo(sx, sy);
            this.ctx.lineTo(ex, ey);
            this[setStrokeStyle](strokeWidth, strokeStyle);
            this.ctx.stroke();
        }

        /**
         * 画三角形
         * @param { Object } triangleObj 传入的三角形对象
         */
        triangle(triangleObj) {
            // 获取传入的三角形对象
            let { fx, fy, sx, sy, tx, ty, stroke, strokeWidth, strokeStyle, fill, bgColor } = triangleObj;

            // 参数校验规则
            let ruleMap = new Map([
                [fx, { type: 'number', param: 'fx' }],
                [fy, { type: 'number', param: 'fy' }],
                [sx, { type: 'number', param: 'sx' }],
                [sy, { type: 'number', param: 'sy' }],
                [tx, { type: 'number', param: 'tx' }],
                [ty, { type: 'number', param: 'ty' }],
                [strokeWidth, { type: 'number', param: 'strokeWidth' }],
                [bgColor, { type: 'string', param: 'bgColor' }],
                [strokeStyle, { type: 'string', param: 'strokeStyle' }],
                [stroke, { type: 'boolean', param: 'stroke' }],
                [fill, { type: 'boolean', param: 'fill' }]
            ]);
            this[validateRlues](ruleMap);

            // 设置默认值
            fx = fx || 0;
            fy = fy || 0;
            bgColor = bgColor || '#fff';
            strokeStyle = strokeStyle || '#000';
            fill = fill || false;
            strokeWidth = strokeWidth || 1;
            this.ctx.beginPath();
            this.ctx.moveTo(fx, fy);
            this.ctx.lineTo(sx, sy);
            this.ctx.lineTo(tx, ty);
            // 填充颜色
            fill && (
                this[setFillStyle](bgColor),
                this.ctx.fill()
            );
            stroke && (
                this[setStrokeStyle](strokeWidth, strokeStyle),
                this.ctx.stroke()
            );
        }

        /**
         * rect 绘制矩形的方法
         * @param { Object } rectObj 传入的矩形对象
         * x 页面x轴的坐标
         * y 页面y轴的坐标
         * width 矩形的宽度
         * height 矩形的高度
         * bgColor 矩形的背景色
         * fill 是否填充
         * strokeStyle 填充边框的颜色
         * stroke 是否需要边框
         */
        rect(rectObj) {
            // 获取传入的文本对象
            let { x, y, width, height, bgColor, fill, stroke, strokeStyle, strokeWidth } = rectObj;
            // 参数校验规则
            let ruleMap = new Map([
                [x, { type: 'number', param: 'x' }],
                [y, { type: 'number', param: 'y' }],
                [width, { type: 'number', param: 'width' }],
                [height, { type: 'number', param: 'height' }],
                [strokeWidth, { type: 'number', param: 'strokeWidth' }],
                [bgColor, { type: 'string', param: 'bgColor' }],
                [strokeStyle, { type: 'string', param: 'strokeStyle' }],
                [stroke, { type: 'boolean', param: 'stroke' }],
                [fill, { type: 'boolean', param: 'fill' }]
            ]);
            this[validateRlues](ruleMap);

            // 设置默认值
            x = x || 0;
            y = y || 0;
            bgColor = bgColor || '#fff';
            strokeStyle = strokeStyle || '#000';
            fill = fill || false;
            strokeWidth = strokeWidth || 1;

            this.ctx.rect(x, y, width, height);
            fill && (
                this[setFillStyle](bgColor),
                this.ctx.fill()
            );
            stroke && (
                this[setStrokeStyle](strokeWidth, strokeStyle),
                this.ctx.strokeRect(x, y, width + strokeWidth, height + strokeWidth)
            );
        }

        /**
         * 绘制圆角矩形
         * @param {number} x 圆角矩形选区的左上角 x坐标
         * @param {number} y 圆角矩形选区的左上角 y坐标
         * @param {number} w 圆角矩形选区的宽度
         * @param {number} h 圆角矩形选区的高度
         * @param {number} r 圆角的半径
         * @memberof CanvasTool
         */
        roundRect(roundRectObj) {
            let { x, y, width: w, height: h, r, bgColor } = roundRectObj;
            // 参数校验规则
            let ruleMap = new Map([
                [x, { type: 'number', param: 'x' }],
                [y, { type: 'number', param: 'y' }],
                [w, { type: 'number', param: 'width' }],
                [h, { type: 'number', param: 'height' }],
                [r, { type: 'number', param: 'r' }],
                [bgColor, { type: 'string', param: 'bgColor' }]
            ]);
            this[validateRlues](ruleMap);
            // 开始绘制
            this.ctx.beginPath();
            this[setFillStyle](bgColor),
                // 左上角
                this.ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);

            // border-top
            this.ctx.moveTo(x + r, y);
            this.ctx.lineTo(x + w - r, y);
            this.ctx.lineTo(x + w, y + r);
            // 右上角
            this.ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);

            // border-right
            this.ctx.lineTo(x + w, y + h - r);
            this.ctx.lineTo(x + w - r, y + h);
            // 右下角
            this.ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);

            // border-bottom
            this.ctx.lineTo(x + r, y + h);
            this.ctx.lineTo(x, y + h - r);
            // 左下角
            this.ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);

            // border-left
            this.ctx.lineTo(x, y + r);
            this.ctx.lineTo(x + r, y);

            this.ctx.fill();
        };

        /**
         * square 绘制正方形的方法
         * @param { Object } squareObj 传入的圆形对象
         * 参数同矩形的参数一致,只需要传入width就可以了
         */
        square(squareObj) {
            squareObj.height = squareObj.width;
            this.rect(squareObj);
        }

        /**
         * arc 绘制圆形的方法
         * @param { Object } arcObj 传入的圆形对象
         * x 圆心的x轴
         * y 圆心的y轴
         * r 半径
         * sAngle 开始弧度
         * eAngle 终止弧度
         * counterclockwise 弧度方向是否是逆时针
         * fill 是否填充
         * storke 是有边框
         * bgColor 背景色
         * strokeStyle 边框色
         */
        arc(arcObj) {
            let { x, y, r, sAngle, eAngle, counterclockwise, fill, bgColor, strokeStyle, strokeWidth, storke } = arcObj;
            // 参数校验规则
            let ruleMap = new Map([
                [x, { type: 'number', param: 'x' }],
                [y, { type: 'number', param: 'y' }],
                [r, { type: 'number', param: 'r' }],
                [sAngle, { type: 'number', param: 'sAngle' }],
                [eAngle, { type: 'number', param: 'eAngle' }],
                [strokeWidth, { type: 'number', param: 'strokeWidth' }],
                [counterclockwise, { type: 'number', param: 'counterclockwise' }],
                [fill, { type: 'boolean', param: 'fill' }],
                [storke, { type: 'boolean', param: 'storke' }],
                [bgColor, { type: 'string', params: 'bgColor' }],
                [strokeStyle, { type: 'string', params: 'strokeStyle' }],
            ]);
            this[validateRlues](ruleMap);

            // 设置默认值
            x = x || 0;
            y = y || 0;
            sAngle = sAngle || 0;
            eAngle = eAngle || 0;
            fill = fill || false;
            bgColor = bgColor || '#000';

            this.ctx.beginPath();
            this.ctx.arc(x, y, r, sAngle * Math.PI, eAngle * Math.PI, counterclockwise);
            // 圆的边框暂时不生效
            storke && (
                this[setStrokeStyle](strokeWidth, strokeStyle),
                this.ctx.stroke()
            );
            fill && (
                this[setFillStyle](bgColor),
                this.ctx.fill()
            );
        }

        /**
         * 绘制圆形头像
         * @param img 图片资源
         * @param opts 参数
         * @param beforeFn 函数钩子
         * @param afterFn 函数钩子
         */
        circleAvatar(circleAvatarObj) {
            let { img, opts, beforeFn, afterFn } = circleAvatarObj;
            let { x, y, r } = opts;
            // 参数校验规则
            let ruleMap = new Map([
                [x, { type: 'number', param: 'x' }],
                [y, { type: 'number', param: 'y' }],
                [r, { type: 'number', param: 'r' }]
            ]);
            this[validateRlues](ruleMap);

            (isFunction(beforeFn)) && beforeFn();

            this.drawCircle({
                x,
                y,
                r
            });
            ctx.clip();
            ctx.drawImage(img, x, y, r);
            ctx.restore();

            (isFunction(afterFn)) && afterFn();
            return this;
        }

        /**
         * text 绘制文本的方法 
         * text 文本
         * x 页面x轴坐标
         * y 页面y轴坐标
         * width 文本的最大宽度
         * color 颜色
         * fontSize 字号
         * align 对其方式
         * textBaseline 文本的基线
         * wrap 是否换行
         * lineHeight 行高
         * letterSpacing 字间距
         */
        text(textObj) {
            // 获取传入的文本对象
            let { text, color, fontSize, fontStyle, align, x, y, width, textBaseline, wrap, lineHeight, letterSpacing } = textObj;
            // 参数校验规则
            let ruleMap = new Map([
                [text, { type: 'string', param: 'text' }],
                [color, { type: 'string', param: 'color' }],
                [textBaseline, { type: 'string', param: 'textBaseline' }],
                [align, { type: 'string', param: 'align' }],
                [fontStyle, { type: 'string', param: 'fontStyle' }],
                [fontSize, { type: 'number', param: 'fontSize' }],
                [x, { type: 'number', param: 'x' }],
                [y, { type: 'number', param: 'y' }],
                [width, { type: 'number', param: 'width' }],
                [lineHeight, { type: 'number', param: 'lineHeight' }],
                [letterSpacing, { type: 'number', param: 'letterSpacing' }],
                [wrap, { type: 'boolean', param: 'wrap' }],
            ]);
            this[validateRlues](ruleMap);

            // 设置默认值
            color = color || '';
            fontSize = fontSize || 16;
            align = align || 'center';
            x = x || 0;
            y = y || 0;
            width = width || 0;
            wrap = wrap || false; // 默认不换行
            letterSpacing = letterSpacing || 0;

            // 绘图
            this[setFillStyle](color);
            this[setFontSize](fontSize * this.scale);
            this.ctx.textAlign = align;
            textBaseline && (this.ctx.setTextBaseline = textBaseline);
            !wrap && !letterSpacing && this.ctx.fillText(text, x, y, width);
            wrap && this[textBreakline](text, x, y, width, lineHeight);
            letterSpacing && this[letterSpacingText](text, align, x, y, letterSpacing);
        }

        // -------私有属性--------
        /**
         * 设置填充颜色
         */
        [setFillStyle](fillStyle) {
            this.ctx.fillStyle = fillStyle;
        }

        /**
         * 设置边框颜色 / 宽度
         */
        [setStrokeStyle](strokeWidth, strokeStyle) {
            this.ctx.lineWidth = strokeWidth;
            this.ctx.strokeStyle = strokeStyle;
        }

        /**
         * 设置字体大小
         */
        [setFontSize](fontSize, fontStyle = "Microsoft YaHei") {
            console.log(fontSize, fontStyle);
            this.ctx.font = `${fontSize}px ${fontStyle}`;
        }

        /**
         * textBreakline 文本换行功能,支持行高
         * @param {String} text 文本
         * @param {Number} x 页面x轴的位置
         * @param {Number} y 页面y轴的位置
         * @param {Number} maxWidth 最大宽度
         * @param {Number} lineHeight 行高
         */
        [textBreakline](text, x, y, maxWidth, lineHeight) {
            // 字符分隔为数组
            let arrText = text.split('');
            let line = '';

            for (let n = 0; n < arrText.length; n++) {
                let testLine = line + arrText[n];
                let metrics = this.ctx.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    this.ctx.fillText(line, x, y);
                    line = arrText[n];
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            this.ctx.fillText(line, x, y);
        }

        /**
         * 文本支持字间距
         * @param {String} text 文本
         * @param {Number} x 页面x轴的位置
         * @param {Number} y 页面y轴的位置
         * @param {Number} letterSpacing 字间距
         */
        [letterSpacingText](text, textAlign, x, y, letterSpacing) {
            let context = this.ctx;

            // let canvas = context.canvas;
            // if (!letterSpacing && canvas) {
            //     letterSpacing = parseFloat(window.getComputedStyle(canvas).letterSpacing);
            // }
            // if (!letterSpacing) {
            //     return this.fillText(text, x, y);
            // }

            let arrText = text.split('');
            let align = textAlign || 'left';

            // 这里仅考水平排列
            let originWidth = context.measureText(text).width;
            // 应用letterSpacing占据宽度
            let actualWidth = originWidth + letterSpacing * (arrText.length - 1);
            // 根据水平对齐方式确定第一个字符的坐标
            if (align == 'center') {
                x = x - actualWidth / 2;
            } else if (align == 'right') {
                x = x - actualWidth;
            }

            // 临时修改为文本左对齐
            context.textAlign = 'left';
            // 开始逐字绘制
            arrText.forEach(function(letter) {
                let letterWidth = context.measureText(letter).width;
                context.fillText(letter, x, y);
                // 确定下一个字符的横坐标
                x = x + letterWidth + letterSpacing;
            });
            // 对齐方式还原
            context.textAlign = align;
        }

        // 校验功能
        [validateRlues](ruleMap) {
            try {
                for (let [key, val] of ruleMap.entries()) {
                    if (key && typeof key != val.type) {
                        throw new Error(val.param + '的参数类型错误,要求是' + val.type + '类型');
                        // 把所有参数都校验一遍
                        continue;
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
    }
    // 暴露公共方法
    return CanvasTool;
}));