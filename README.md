# canvasTools.js

**一个小型(7KB)、快捷、封装化的canvas操作工具js.**

## Features

  - 直线/三角形/矩形/正方形/圆/文本/文本换行/文本间隔
  - wx- 是操作微信小程序canvas
  - Simple API
  - No dependencies

## Set up

这是一个单文件的js,引入时只需引入canvasTools.js就可以了.

Browser:

```html
<script src='./canvasTools.js'></script>
```

[Node.js](http://nodejs.org):

```bash
$ npm install canvasTools.js
```

```javascript
const CanvasTools= require('canvasTools.js');
```

ES6 module:

```javascript
import CanvasTools from './canvasTools.mjs';
```
## Use

这个库道出了一个类, `CanvasTools`, 它接受一个`CanvasRenderingContext2D(canvas上下文)`和`scale(屏幕缩放比例)`作为参数.


    let canvasInstance = new CanvasTool(ctx) // 只传入canvas上下文作参数

    let canvasInstance = new CanvasTool(ctx, 0.5) // 多传入一个缩放比例 

画一条直线的方法.

    canvasInstance.line({
        sx: 100,
        sy: 100,
        ex: 400,
        ey: 400,
        strokeStyle: 'red',
        strokeWidth: 40
    });

画一个三角形的方法.

    canvasInstance.triangle({
        fx: 75,
        fy: 50,
        sx: 100,
        sy: 75,
        tx: 100,
        ty: 25,
        stroke: true,
        strokeStyle: 'red',
        strokeWidth: 4,
        fill: true,
        bgColor: '#000'
    });

画一个矩形/正方形的方法.

    canvasInstance.rect({
        x: 10, 
        y: 10,
        width: 100,
        height: 100,
        bgColor: 'red',
        fill: true,              // 是否填充
        stroke: true,            // 是否拥有边框
        strokeStyle: 'yellow',   // 边框颜色 
        strokeWidth: 4           // 边框宽度
    });

画一个圆角矩形的方法.

    canvasInstance.roundRect({
        x: 100 , 
        y: 100 , 
        width: 200, 
        height: 300, 
        r: 50, // 圆角的大小 
        bgColor: 'red';
    })

画一个圆的方法.

    canvasInstance.arc({         // arc画圆的方法
        x: 100,
        y: 100,
        r: 50,
        sAngle: 90,
        eAngle: 270,
        counterclockwise: false,
        fill: true,
        bgColor: 'red',
        strokeStyle: 'yellow',
        strokeWidth: 4,
        storke: true
    });

绘制文本的方法.

    canvasInstance.text({
        text: "测试文本内容",
        color: 'red',
        fontSize: 20,
        align: 'center',
        x: 100,
        y: 100,
        width: 300,
        wrap: true,              // 是否支持换行
        lineHeight: 30,
        letterSpacing: 2         // 字体间距的问题
    });

更多的特性与API请查看源码.

## package

```bash
$ npm install

$ npm run gulp (可生成压缩后的测试文件)
```

直接打开examples中的例子即可.

## Feedback

有 Bugs/comments/questions方面的问题

请直接提issue, 或者发email <a href="alexlismile@163.com">alex-li</a>给我

## Licence

[MIT](LICENCE)

