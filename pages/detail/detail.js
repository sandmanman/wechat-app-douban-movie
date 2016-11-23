// 电影详细
//

var app = getApp();
var util = require('../../utils/util.js');

Page({
    data: {
        detail: [],
        title: '电影详细',
        modalHidden: true,
        ratingHidden: false
    },
    onLoad: function(options) {

        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 0
        });

        var that = this,
            movieID = options.id,
            movieTitle = options.title,
            url = 'https://api.douban.com/v2/movie/subject/'+movieID;

        wx.request({
            url: url,
            header: {
                'Content-type': 'json'
            },
            data: {},
            success: function(res) {

                wx.hideToast();

                // 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
                console.log(res);
                that.setData({
                    detail: res.data,
                    title: res.data.title	
                });

                if ( res.data.rating.average === 0 ) {
                    that.setData({
                        ratingHidden: true
                    });
                }
            },
            fail: function() {
                // 接口调用失败
                console.log('request fail');
                wx.showModal({
                    title: '提示',
                    content: '请求数据超时',
                    showCancel: false,
                    confirmText: '返回',
                    success: function(res) {
                        if (res.confirm) {
                            wx.navigateBack();
                        }
                    }
                });
            },
            complete: function() {
                // 接口调用结束的回调函数（调用成功、失败都会执行）
                console.log('request complete');
            }
        });

    },
    onReady: function(){
        wx.setNavigationBarTitle({
            title: this.data.title
        });
    }
});
