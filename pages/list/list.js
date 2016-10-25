
// 电影列表
//

var app = getApp();
var api = require('../../utils/api.js');

Page({
    // data 页面的初始数据
    data: {
        list: {},
        title: '豆瓣电影',
        loadingHidden: false,
        loadingText: '加载中'
    },
    onLoad: function() {
        /* 监听页面加载
         * 一个页面只会调用一次
         * 参数可以获取wx.navigateTo和wx.redirectTo及<navigator/>中的 query
         */

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
                // console.log(res.data.subjects);

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
        /* 监听页面初次渲染完成
         * 一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
         * 对界面的设置如wx.setNavigationBarTitle请在onReady之后设置。
         */
    },
    onShow: function() {
        /* 监听页面显示
         * 每次打开页面都会调用一次
         */
    },
    onHide: function() {
        /* 监听页面隐藏
         * 当navigateTo或底部tab切换时调用
         */
    },
    onUnload: function() {
        /* 监听页面卸载
         * 当redirectTo或navigateBack的时候调用
         */
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
    },
    loadingChange: function() {
        // loading
        this.setData({
            loadingHidden: false,
            loadingText: '加载中'
        });
    }
});
