/**
 * components: canvas海报生成
 * author: Wginit
 * created Time: 2018-7-25
 * Email: wginit@yeah.net
 *
 */
const app = getApp();
const { util } = app

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    drawDataList: {
      type: Object,
      value: {},
      observer(value) {
        if(JSON.stringify(value) != "{}") {
          this.initData(value)
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    canvasData: {},
    qrcodeSrc: '',
    boxWidth: '',
    boxHeight: '',
    drawList: [],
    drawData: [],
    customData: {
      imageList: [],
      textList: []
    }
  },

  ready () {
   this.ctx = wx.createCanvasContext('image', this)
   this.drawImgInit()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 数据初始化
    initData (value) {
      let { boxWidth, boxHeight, canvasData, drawList} = this.data
      canvasData = value.canvasData || ''
      drawList = value.content || ''
      boxWidth = value.canvasData.width || 750
      boxHeight = value.canvasData.height || 1334
      canvasData.width = parseInt(canvasData.width / 2) || 375
      canvasData.height = parseInt(canvasData.height / 2) || 667
      this.setData({
        boxWidth,
        boxHeight,
        canvasData,
        drawList
      })
    },
    drawImgInit() {
      let that= this
      let { canvasData, drawList, customData } = that.data
      let imageList = customData.imageList
      let textList = customData.textList
      // 分离图片和文字
      if (drawList.length) {
        drawList.forEach((item, index) => {
          switch(item.type) {
            case 'image':
              imageList.push(item)
              break;
            case 'text':
              textList.push(item)
              break;
          }
        })
      }
      canvasData.width = parseInt(canvasData.width * 2) || 750
      canvasData.height = parseInt(canvasData.height * 2) || 1334
      imageList.unshift(canvasData)
      // 下载图片到本地后
      for (let i in imageList) {
        imageList[i].left = parseInt(imageList[i].left / 2) || 0
        imageList[i].top = parseInt(imageList[i].top / 2) || 0
        imageList[i].width = parseInt(imageList[i].width / 2) || 100
        imageList[i].height = parseInt(imageList[i].height / 2) || 100
        that.downLoadImg(imageList[i] && imageList[i].url, imageList[i].comment).then(res => {
          imageList[i].url = res
        }, err => {
          util.hideToast()
          if (err) {
            util.showModal('错误提示', err, false)
          }
        })
      }
      for (let i in textList) {
        textList[i].left = parseInt(textList[i].left / 2) || 0
        textList[i].top = parseInt(textList[i].top / 2) || 0
        textList[i].fontSize = parseInt(textList[i].fontSize / 2) || 16
        textList[i].lineHeight = parseInt(textList[i].lineHeight / 2) || 16
        textList[i].maxWidth = parseInt(textList[i].maxWidth / 2) || 300
      }
      that.data.drawData = [...imageList, ...textList]
      // 进行绘制
      that.beginDraw()
    },
    downLoadImg (imgurl, msg) {
      return new Promise((resolve, reject) => {
        if (!imgurl) {
          reject()
        } else {
          util.showToast(msg + '下载中...')
          wx.downloadFile({
            url: imgurl,
            complete: function (res) {
              if (res.statusCode === 200) {
                util.hideToast()
                resolve(res.tempFilePath)
              } else {
                util.hideToast()
                reject(new Error('downloadFail fail'))
              }
            }
          })
        }
      })
    },
    // 裁剪圆形头像
    circleImg(params) {
      const { url, left, top, width} = params
      let r = parseInt(width / 2) // 半径
      this.ctx.save()
      let d =2 * r
      let cx = left + r
      let cy = top + r
      this.ctx.arc(cx, cy, r, 0, 2 * Math.PI)
      this.ctx.clip()
      this.ctx.drawImage(url, left, top, d, d)
      this.ctx.restore()
    },
    drawImg (params) {
      let that = this
      const { url = '', top = 0, left = 0, width = 50, height = 50, shape='square'} = params
      if (params.shape == 'circle') {
        that.circleImg(params)
      }
      else {
        that.ctx.drawImage(url, left, top, width, height)
      }
    },
    // 绘制文字
    fillText(params) {
      const { fontSize = 16, color = '#FFFFFF', content, left = 0, top = 0, textAlign = 'center', lineHeight = 16, maxLineNum = 2, maxWidth = 300, weight ='normal'} = params
      let arrText = content.split('')
      let line = '', _top = top, lineNum = 1, testLine = ''
      this.ctx.setFillStyle(color)
      this.ctx.setTextAlign(textAlign)
      this.ctx.font ='normal '+ weight + ' ' + fontSize + 'px ' + 'sans-serif'
      for (let i = 0; i < arrText.length; i++) {
        testLine += [arrText[i]]
        let testWidth = this.ctx.measureText(testLine).width || 0
        if (testWidth > maxWidth) {
          // if (lineNum === maxLineNum) { 最多显示多少行，暂时去掉此限制
          //   if (i !== arrText.length) {
          //     testLine = testLine.substring(0, testLine.length - 1) + '...'
          //     this.ctx.fillText(testLine, left, _top, maxWidth)
          //     testLine = ''
          //     break
          //   }
          // }
          this.ctx.fillText(testLine, left, _top, maxWidth)
          testLine = ''
          _top += lineHeight
          // lineNum ++
        }
      }
      this.ctx.fillText(testLine, left, _top, maxWidth)
    },
    // 开始绘制
    beginDraw(){
      let that = this
      let { drawData, customData } = that.data
      let imgIndex = 0
      for (let i in drawData) {
        switch (drawData[i].type) {
          case 'image':
            that.drawImg({
              ...drawData[i]
            })
            imgIndex++
            break;
          case 'text':
            that.fillText({
              ...drawData[i]
            })
            break;
        }
      }
      that.ctx.draw()
    },
    saveImage() {
      let that= this
      util.showToast('生成中...')
      wx.canvasToTempFilePath({
        canvasId: 'image',
        fileType: 'jpg',
        success(res) {
          util.hideToast()
          util.checkPermission('writePhotosAlbum', () => {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success(res) {
                util.showModal('保存至相册', '图片成功保存至本地相册', false)
              }
            })
          }, '保存图片需要权限，请提供保存到相册的权限。');
        }, fail(err) {
          util.hideToast()
          util.showModal('错误提示', err, false)
        }
      }, that)
    }
  }
})
