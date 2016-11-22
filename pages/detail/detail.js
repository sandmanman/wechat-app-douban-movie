// 电影详细
//

var app = getApp();
var api = require('../../utils/util.js');

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
            apiURL = api.movieSubject + movieID;

        // https请求
        wx.request({
            url: apiURL,
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                // 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}

                // 页面标题设为电影名
                wx.setNavigationBarTitle({
                    title: res.data.title
                });

                wx.hideToast();

                if ( res.data.code === 5000 ) {
                    wx.showModal({
                        title: '提示',
                        content: '豆瓣电影未收录该部影片',
                        confirmText: '返回',
                        success: function(res) {
                            if (res.confirm) {
                                wx.navigateBack();
                            }
                        }
                    });
                    return;
                } else {
                    that.setData({
                        detail: res.data,
                        title: res.data.title,
                    });
                }

                if ( res.data.rating.average === 0 ) {
                    that.setData({
                        ratingHidden: true
                    });
                }

            },
            fail: function() {
                // 接口调用失败
                console.error('detail request fail:请求时间超时或...');
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
            }
        });
    },
    onReady: function(){
        wx.setNavigationBarTitle({
            title: this.data.title
        });
    }
});
