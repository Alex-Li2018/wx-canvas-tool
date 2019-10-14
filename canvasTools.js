// 微信canvas绘图工具类
const textBreakline = Symbol('textBreakline');
const validateRlues = Symbol('validateRlues');
const letterSpacingText = Symbol('letterSpacingText');

export default class CanvasTool {
    constructor(ctx, scale) {
        this.ctx = ctx;
        this.scale = scale || 1;
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
        let { x, y, width, height, bgColor, fill, stroke, strokeStyle } = rectObj;
        // 参数校验规则
        let ruleMap = new Map([
            [x, { type: 'number', param: 'x' }],
            [y, { type: 'number', param: 'y' }],
            [width, { type: 'number', param: 'width' }],
            [height, { type: 'number', param: 'height' }],
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

        this.ctx.rect(x, y, width, height);
        fill && (
            this.ctx.setFillStyle(bgColor),
            this.ctx.fill()
        );
        stroke && (
            this.ctx.setStrokeStyle(strokeStyle),
            this.ctx.stroke()
        );
    }

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
        let { x, y, r, sAngle, eAngle, counterclockwise, fill, bgColor, strokeStyle, storke } = arcObj;
        // 参数校验规则
        let ruleMap = new Map([
            [x, { type: 'number', param: 'x' }],
            [y, { type: 'number', param: 'y' }],
            [r, { type: 'number', param: 'r' }],
            [sAngle, { type: 'number', param: 'sAngle' }],
            [eAngle, { type: 'number', param: 'eAngle' }],
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
        storke && (
            this.ctx.setStrokeStyle(strokeStyle),
            this.ctx.stroke()
        );
        fill && (
            this.ctx.setFillStyle(bgColor),
            this.ctx.fill()
        );
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
        let { text, color, fontSize, align, x, y, width, textBaseline, wrap, lineHeight, letterSpacing } = textObj;
        // 参数校验规则
        let ruleMap = new Map([
            [text, { type: 'string', param: 'text' }],
            [color, { type: 'string', param: 'color' }],
            [textBaseline, { type: 'string', param: 'textBaseline' }],
            [align, { type: 'string', param: 'align' }],
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
        this.ctx.setFillStyle(color);
        this.ctx.setFontSize(fontSize * this.scale);
        this.ctx.setTextAlign(align);
        textBaseline && this.ctx.setTextBaseline(textBaseline);
        !wrap && !letterSpacing && this.ctx.fillText(text, x, y, width);
        wrap && this[textBreakline](text, x, y, width, lineHeight);
        letterSpacing && this[letterSpacingText](text, align, x, y, letterSpacing);
    }

    // 绘制
    darw() {
        this.ctx.darw();
    }

    // -------私有属性--------
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
        context.setTextAlign('left');
        // 开始逐字绘制
        arrText.forEach(function(letter) {
            let letterWidth = context.measureText(letter).width;
            context.fillText(letter, x, y);
            // 确定下一个字符的横坐标
            x = x + letterWidth + letterSpacing;
        });
        // 对齐方式还原
        context.setTextAlign(align);
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