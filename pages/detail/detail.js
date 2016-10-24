// 电影详细
//

var app = getApp();
var api = require('../../utils/api.js');

Page({
    data: {
        detail: {},
        loadingHidden: false,
        loadingText: '加载中'
    },
    onLoad: function(options) {
        var that = this;
        var movidID = options.id;
        var apiURL = api.movieSubject + movidID;

        // https请求
        wx.request({
            url: apiURL,
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                // 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
                that.setData({
                    detail: res.data
                });
                //console.log(res.data);

                that.setData({
                    loadingHidden: true,
                    loadingText: ''
                });
            },
            fail: function() {
                // 接口调用失败
            },
            complete: function() {
                // 接口调用结束的回调函数（调用成功、失败都会执行）
            }
        });
    },
    onReady: function(){
        // 页面渲染完成
        var movieTitle = this.data.detail.title;
        wx.setNavigationBarTitle({
            title: movieTitle
        });
    },
    loadingChange: function() {
        // loading
        this.setData({
            loadingHidden: false,
            loadingText: '加载中'
        });
    }
});
