// 微信canvas绘图工具类
const textBreakline = Symbol('textBreakline')

export class CanvasTool {
    constructor(ctx, scale) {
        this.ctx = ctx;
        this.scale = scale || 1;
    }

    /**
     * textTool 绘制文本的方法 
     * text 文本
     * x 页面x轴坐标
     * y 页面y轴坐标
     * width 文本的最大宽度
     * color 颜色
     * fontSize 字号
     * align 对其方式
     * textBaseline 文本的基线
     */
    textTool(textObj) {
        // 获取传入的文本对象
        let { text, color, fontSize, align, x, y, width, textBaseline } = textObj;
        // 参数校验规则
        let ruleMap = new Map([
            [text, 'String'],
            [color, 'String'],
            [textBaseline, 'String']
            [align, 'String'],
            [fontSize, 'Number'],
            [x, 'Number'],
            [y, 'Number'],
            [width, 'Number'],
        ]);
        for (let [key, val] in ruleMap.entries()) {
            if (key && typeof key != val) {
                throw new Error(key + '参数错误,要求是' + val);
                break;
            }
        }
        // 设置默认值
        color = color || '';
        fontSize = fontSize || 16;
        align = align || 'center';
        x = x || 0;
        y = y || 0;
        width = width || 0;
        // 绘图
        this.ctx.setFillStyle(color);
        this.ctx.setFontSize(fontSize * this.scale);
        this.ctx.setTextAlign(align);
        this.ctx.fillText(text, x, y, width);
        textBaseline && this.ctx.setTextBaseline(textBaseline);
    }

    // 文本换行功能
    [textBreakline]() {

    }
};