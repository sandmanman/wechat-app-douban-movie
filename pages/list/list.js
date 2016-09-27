Page({
  data:{
    list: {}
  },
  onLoad:function(options){
    // loading: true
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
    var that = this;
    // https请求
    wx.request({
        url: 'https://api.douban.com//v2/movie/top250',
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            // 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
            //console.log(res.data.count)
            that.setData({
              list: res.data.subjects
            })
            console.log(res.data.subjects)
        },
        fail: function() {
            // 接口调用失败
        },
        complete: function() {
            // 接口调用结束的回调函数（调用成功、失败都会执行）
        }
    })
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})