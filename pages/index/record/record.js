// pages/statistics/record/record.js
//引入公共校验规则
import WxValidate from '../../../utils/validate'
let weight;
Page({
  data: {
    height: "",
    weightkg: "",
    weight: "",
    BMI: "",
    recordDate: "",
    note: "",
    oldRecordData: [],
  },
  weightkgChange(e) {
    const height = this.data.height / 100;
    this.setData({
      weight: e.detail.value * 2,
      BMI: (e.detail.value / (height * height)).toFixed(2),
    })
  },
  bindKeyInput(e) {
    this.setData({
      height: e.detail.value,
    })
  },
  onLoad(options) {
    // 实例化参数
    this.initValidate();
    this.setData({
      recordDate: this.getNowTime(),
    })

    this.weight = options ? options.weight : '';
    if (this.weight) {
      // 获取上次记录数据
      this.oldRecordData = wx.getStorageSync('recordData') || []
      this.oldRecordData.forEach((item) => {
        if (item.weight == this.weight) {
          this.setData({
            height: item.height,
            weightkg: item.weightkg,
            weight: item.weight,
            BMI: item.BMI,
            recordDate: item.recordDate,
            note: item.note,
          })
        }
      })
    }
    console.log(weight)
  },
  // 验证规则
  initValidate() {
    let rules = {
      height: {
        required: true
      },
      weightkg: {
        required: true
      },
      note: {
        required: true
      }
    };
    let message = {
      height: {
        required: "请输入身高",
      },
      weightkg: {
        required: "请输入体重",
      },
      note: {
        required: "请输入备注",
      }
    };
    this.WxValidate = new WxValidate(rules, message);
  },
  getNowTime() {
    let dateTime
    let yy = new Date().getFullYear()
    let mm = new Date().getMonth() + 1
    let dd = new Date().getDate()
    dateTime = yy + '-' + mm + '-' + dd
    return dateTime
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let result = this.WxValidate.checkForm(e.detail.value);
    if (result) {
      // 请求成功
      wx.showToast({
        title: '保存成功',
        duration: 2000,
        success() {
          setTimeout(() => {
            wx.navigateBack({
              delta: 0,
            })
          }, 2000)
        }
      })
      // 处理数据 begin
      // 获取上次记录数据
      this.oldRecordData = wx.getStorageSync('recordData') || []
      // 将数据写入本地
      this.oldRecordData.push(e.detail.value)
      console.log("oldRecordData:", this.oldRecordData)
      wx.setStorageSync('recordData', this.oldRecordData)
      // 处理数据 end
    } else {
      // 请求失败
      let msg = this.WxValidate.errorList[0].msg;
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    }
  },


  formReset(e) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  // 删除数据
  delete(e) {
    console.log('delete：', e.detail.value)
    wx.showModal({
      title: '删除',
      content: '数据删除后不可恢复，你确定要进行操作吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    })
  }
})