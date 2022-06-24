import * as echarts from '../../utils/ec-canvas/echarts';
var newWeight = [];
var newDate = [];
var chart = null;

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var option = {
    title: {
      text: '',
      left: 'center'
    },
    grid: {
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: "#FFAAD5",
      borderWidth: 0,
      borderRadius: 8,
      textStyle: {
        color: "white"
      },
      formatter: ' {b} \n{a} : {c} kg '
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: newDate,
    },
    yAxis: {
      x: 'center',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      name: '体重',
      type: 'line',
      smooth: true,
      data: newWeight,
      itemStyle: {
        normal: {
          color: '#FFAAD5',
          lineStyle: {
            color: '#FFAAD5'
          }
        }
      },
    }]
  };
  chart.setOption(option);
  return chart;
}
Page({
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '自定义转发标题'
        })
      }, 2000)
    })
    return {
      title: '自定义转发标题',
      path: '/pages/statistics/statistics',
      promise
    }
  },
  onShareTimeline: function () {
    return {
      title: "自定义转发标题",
      query: {
        key: value
      },
      imageUrl: ""
    }
  },
  data: {
    ec: {
      onInit: initChart
    },
    currentIndex: 0, //默认是活动项
    items: [{
      index: 0,
      title: '今年',
    }, {
      index: 1,
      title: '近半年',
    }, {
      index: 2,
      title: '最近100',
    }, {
      index: 3,
      title: '自定义',
    }],
    startdate: '开始日期', //默认起始时间  
    enddate: '结束日期', //默认结束时间
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    newWeight = [18, 36, 65, 30, 78, 40, 33],
      newDate = ['06-08', '06-09', '06-10', '06-11', '06-12', '06-13'],
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      })
  },
  bindDateChange(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      startdate: e.detail.value,
    })
  },
  bindDateChange2(e) {
    let that = this;
    console.log(e.detail.value)
    that.setData({
      enddate: e.detail.value,
    })
  },
  //点击tab时触发
  titleClick: function (e) {
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.index
    })
    switch (e.currentTarget.dataset.index) {
      case 0:
        newDate = ['06-08', '06-09', '06-10', '06-11', '06-12', '06-13']
        newWeight = [12, 36, 65, 30, 78, 40, 33],
        chart.setOption({
            xAxis: [{
              data: newDate,
            }],
            series: [{
              data: newWeight
            }]
          })
        break;
      case 1:
        newDate = ['06-08', '06-09', '06-10']
        newWeight = [10, 12, 15],
        chart.setOption({
          xAxis: [{
            data: newDate,
          }],
          series: [{
            data: newWeight
          }]
        })
        console.log(chart);
        break;
      case 2:
        newDate = ['06-11', '06-12', '06-13']
        newWeight = [56, 45, 58],
        chart.setOption({
          xAxis: [{
            data: newDate,
          }],
          series: [{
            data: newWeight
          }]
        })
        break;
      case 3:
        newDate = ['06-08', '06-09', '06-10', '06-11', '06-12']
        newWeight = [18, 36, 65, 30, 78, 40, ],
        chart.setOption({
          xAxis: [{
            data: newDate,
          }],
          series: [{
            data: newWeight
          }]
        })
        break;
    }
  },
  //  查询
  query: function () {

  },
  //  生成图片
  generatePicture: function () {

  },
})