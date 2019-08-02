## 微信小程序图片合成组件

------

实现原理: 利用微信小程序canvas API把文字和图片进行合成，用wx.canvasToTempFilePath()返回图片地址再保存至相册。

### 如何使用

> git clone 本组件。

> 在待使用页面json文件中注册该组件。

> 在页面中引入该组件，并传入绘制的参数

``` javascript
.json 文件中
{
    "usingComponents": {
       "share-image": "/components/share_image/share_image"
    }
}

.wxml 文件
<share-image 
    drawDataList="{{dataList}}">
</share-image>

```
------

## 参数对应格式

```javascript
dataList: {
    canvasData:{
      type: 'image',
      url: '',
      top: 0,
      left: 0,
      width: 750,
      height: 1334,
      comment: '背景图',
      btnText: '保存至相册'
    },
    content: [{
      type: 'image',
      url: '',
      top: 136,
      left: 100,
      shape: 'square',
      width: 290,
      height: 186,
      comment: '头像'
    }, {
      type: 'text',
      content: '白山羊',
      top: 336,
      left: 100,
      fontSize: 40,
      lineHeight: 40,
      color: '#f00',
      textAlign: 'left',
      weight: 'bold',
      maxWidth: 287
    }]
  }
```

### 参数说明
> canvasData
canvas相关参数配置

| 参数    | 类型   |  默认值  |  必填  |  说明 |
| :----: | :-----:  | :----:  |  :--: |  :---: |
| type   | String |   image  |  是  |  文件类型， 这里为背景图，默认image |
| url    |   String   |  ''  |  是   |  图片地址  |
| top    |  Number  |  0  |  否   |  图像的左上角在可视区域上 Y 轴的位置, 单位px  |
| left    | Number   |  0  |  否   |    图像的左上角在可视区域上 X 轴的位置, 单位px  |
| width    |  Number  |  750  |  否  |   画布的宽度, 单位px  |
| height    |  Number  |  1334  | 否   |  画布的高度, 单位px   |
| comment    |  String  | '背景图'   |  否   |   图片描述  |
| btnText    |  String  |  '保存至相册'  |  是  |   生成按钮文字  |

> content 

绘制内容参数

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| :---: | :---: | :---:| :----: | :---: |
| type  | String  | ''  | 是  |   绘制的类型，可选image和text  |
| shape  | String  | 'square'  | 否  |   绘制图片的形状, square 方形， circle 圆形  |
| url  | String  | ''  |  - |   图片地址， type为image必填  |
| content  | String  | ''  | -   |  文本内容， type为text必填  |
| top  | Number  | 0  |  否  |  图像的左上角在目标画布上 Y 轴的位置, 单位px  |
| left | NUmber  |  0 |  否  |   图像的左上角在目标画布上 X 轴的位置, 单位px|
| width  | Number  | 100  | 否  |   绘制图片的宽度,单位px  |
| height  | Number  | 100  | 否   |  绘制图片的高度, 单位px  |
| comment  | String  | ''  |  否  |  绘制图片的说明  |
| fontSize  | Number  | 32  |  否 |   文本字体大小,单位px  |
| lineHeight  | Number  | 32  |  否  |  文本行高, 单位px  |
| color  | String  | '#FFFFFF '  |  否  |   文本字体颜色  |
| textAlign  | String  | 'center'  |  否  |  文本水平对齐方式, 可选left, center, right  |
| weight  | String  | 'normal'  |  否  |  文本字体粗细  |
| maxWidth  | Number  | 600  |  否  |  文本限制的最大宽度，单位px  |

 注： 上述单位都是参照设计稿而来，正常情况下我们拿到的设计稿尺寸为750 * 1334，可直接按设计稿上尺寸配置参数.

---

### 后续
欢迎大佬们来拍砖，有问题欢迎提issue，感觉好用的欢迎star哦~
