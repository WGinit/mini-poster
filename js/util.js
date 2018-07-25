
const showToast = (title = '加载中...', icon = 'loading', duration = 60000) => {
  wx.showToast({
    title: title,
    mask: true,
    icon: icon,
    duration: duration
  })
}

const hideToast = () => {
  wx.hideToast()
}

const showModal = (title = '系统提示', str = '', showCancel = true, confirmText = '确定', fn, color = {
  cancelColor: '#999999',
  confirmColor: '#7D73C3'
}, cancelText="取消") => {
  wx.showModal({
    title: title,
    content: str,
    showCancel: showCancel,
    cancelText: cancelText,
    confirmText: confirmText,
    confirmColor: color.confirmColor,
    cancelColor: color.cancelColor,
    success: res => {
      return typeof fn == 'function' && fn(res)
    }
  })
}

// 用户授权检查
const checkPermission = (type, onSuccess, content) => {
  let that = this
  type = 'scope.' + type;
  wx.getSetting({
    success(getRes) {
      const setting = getRes.authSetting;
      if (setting[type] === false) {
        that.showModal('温馨提示', '请您授权其相关权限', false, '我知道了', res => {
          if (res.confirm) {
            wx.openSetting({
              success(openRes) {
                if (openRes.authSetting[type] === true) {
                  typeof onSuccess === 'function' && onSuccess();
                }
              }
            });
          }
        })
      } else if (setting[type] === true) {
        //如果已有授权直接执行对应动作
        typeof onSuccess === 'function' && onSuccess();
      } else {
        //如果未授权，直接执行对应动作，会自动查询授权
        typeof onSuccess === 'function' && onSuccess();
      }
    }
  })
}


module.exports = {
  showToast,
  hideToast,
  showModal,
  checkPermission
}
