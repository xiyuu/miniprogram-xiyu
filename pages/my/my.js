Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    items: [{
      index: 0,
      title: '社区论坛',
      desc: '疑惑问题，反馈一下',
    }, {
      index: 1,
      title: '打赏作者',
      desc: '体验不错，鼓励一下',
    }, {
      index: 2,
      title: '赞助视频',
      desc: '随手点击，支持一下',
    }, {
      index: 3,
      title: '设置',
      desc: '社区论坛',
    }]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  panel(e) {
    //获取到当前点击元素的下标
    const index = e.currentTarget.dataset.index;
    switch (index) {
      // 任务
      case 0:
        // 跳转至用户反馈平台
        wx.openEmbeddedMiniProgram({
          appId: "wx8abaf00ee8c3202e",
          extraData: {
            // 把1368数字换成你的产品ID，否则会跳到别的产品
            // id : "1368",
            id: "wxd7ce12eb44cc64ac",
            // 自定义参数，具体参考文档
            customData: {
              // clientInfo: `iPhone OS 10.3.1 / 3.2.0.43 / 0`,
            }
          }
        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/my/authorsrc/authorsrc',
        })
        break;
      case 2:
        break;
      case 3:
        wx.navigateTo({
          url: '/pages/my/setting/setting',
        })
        break;
    }
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})