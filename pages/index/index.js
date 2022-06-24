const jinrishici = require('../../utils/jinrishici')
// index.js
// 获取应用实例
const app = getApp()
// Page({
//   data: {
//     motto: 'Hello 问问World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo'),
//     canIUseGetUserProfile: false,
//     canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
//   },
//   // 事件处理函数
//   bindViewTap() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad() {
//     if (wx.getUserProfile) {
//       this.setData({
//         canIUseGetUserProfile: true
//       })
//     }
//   },
//   getUserProfile(e) {
//     // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
//     wx.getUserProfile({
//       desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
//       success: (res) => {
//         console.log(res)
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     })
//   },
//   getUserInfo(e) {
//     // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
//     console.log(e)
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
Page({
    /**
     * 页面的初始数据
     */
    data: {
        latestWeight: '',
        latestBMI: '',
        recordData: [],
        jinrishici: '',
        jinrishiciorigin: '',
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(){
        jinrishici.load(result => {
            // 下面是处理逻辑示例
            console.log(result)
            this.setData({"jinrishici": result.data.content})
            this.setData({"jinrishiciorigin": result.data.origin})
          })
        // 从本地获取数据
        this.setData({
            recordData:  wx.getStorageSync('recordData') || [],
        })
        console.log("recordData :", this.recordData)
        if (this.recordData) {
            this.setData({
                latestWeight: this.recordData[this.recordData.length - 1].weightkg,
                latestBMI: this.recordData[this.recordData.length - 1].BMI
            })
        }
    },
    //  点击按钮跳转
    gotoRecord: function () {
        wx.navigateTo({
            url: '/pages/index/record/record',
        })
    },
    editRecord: function (e) {
        console.log("没赋值前：",e)
        console.log(e);
	   const  weight = e.currentTarget.dataset.weight;
        wx.navigateTo({
            url: '/pages/index/record/record?weight=' + weight,
        })
    },
    viewExplain: function () {
        wx.navigateTo({
            url: '/pages/index/description/description',
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})