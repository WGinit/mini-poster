
Page({
  data: {
    dataList: {}
  },

  onLoad: function () {
   this.drawInit()
  },
  // 绘制数据初始化
  drawInit () {
    this.setData({
      dataList: {
        canvasData:{
          type: 'image',
          url: 'https://avatars.githubusercontent.com/u/28439412?s=48&v=4',
          top: 0,
          left: 0,
          width: 750,
          height: 1334,
          comment: '背景图',
          btnText: '保存至相册'
        },
        content: [{
          type: 'image',
          url: 'https://avatars.githubusercontent.com/u/28439412?s=48&v=4',
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
    })
  }
})
