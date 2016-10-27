// 电影详细
//

var app = getApp();
var api = require('../../utils/api.js');

Page({
    data: {
        detail: [],
        title: '电影详细',
        loadingHidden: false,
        modalHidden: true,
        ratingHidden: false
    },
    onLoad: function(options) {
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

                if ( res.data.code === 5000 ) {
                    console.error(res.data.msg);
                    that.setData({
                        loadingHidden: true,
                        modalHidden: false
                    });
                    return false;
                } else {
                    that.setData({
                        detail: res.data,
                        title: res.data.title,
                        loadingHidden: true
                    });
                }

                if ( res.data.rating.average === 0 ) {
                    that.setData({
                        ratingHidden: true
                    });
                }

                // 页面标题设为电影名
                wx.setNavigationBarTitle({
                    title: res.data.title
                });
            },
            fail: function() {
                // 接口调用失败
                console.error('detail request fail:请求时间超时或...');
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
    },
    loadingChange: function() {
        // loading
        this.setData({
            loadingHidden: false
        });
    },
    modalChange: function(e) {
        // 影片不存在返回上一页
        wx.navigateBack();
    }
});
