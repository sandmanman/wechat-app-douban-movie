
// 电影列表
//

var app = getApp();
var api = require('../../utils/api.js');

Page({
    data: {
        list: {},
        title: '豆瓣电影',
        loadingHidden: false,
        loadingText: '加载中'
    },
    onLoad: function() {
        //loading: true
        // 页面初始化 options为页面跳转所带来的参数

        var that = this;
        var apiURL = api.topHead;
        // https请求
        wx.request({
            url: apiURL,
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                // 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
                that.setData({
                    list: res.data.subjects
                });
                //console.log(res.data.subjects);

                that.setData({
                    loadingHidden: true,
                    loadingText: ''
                });

                // 页面标题调用
                var pageTitle = res.data.title;
                wx.setNavigationBarTitle({
                    title: pageTitle
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
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    },
    loadingChange: function() {
        // loading
        this.setData({
            loadingHidden: false,
            loadingText: '加载中'
        });
    }
});
