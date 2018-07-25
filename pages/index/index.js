
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
      dataList: {}
    })
  }
})
