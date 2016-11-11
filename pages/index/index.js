//index.js
//获取应用实例
var app = getApp();
var api = require('../../utils/api.js');

Page({
    data: {
        type: ['影院热映', '即将上映', '豆瓣电影Top250'],
        inTheaters: [],
        comingSoon: [],
        topHead: []
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../list/list'
        })
    },
    onLoad: function() {
        console.log('onLoad');

        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 0
        });

        this.inTheaters();
        this.comingSoon();
        this.topHead();
    },
    listView: function(event) {
        var viewType = event.currentTarget.dataset.type;
        wx.navigateTo({
            url: '../list/list?type=' + viewType
        });
    },
    inTheaters: function() {
        // 影院热映
        //
        var that = this;
        var viewType = 'in_theaters';
        this.requestData(that,viewType);
    },
    comingSoon: function() {
        // 即将上映
        //
        var that = this;
        var viewType = 'coming_soon';
        this.requestData(that,viewType);
    },
    topHead: function() {
        // top250
        //
        var that = this;
        var viewType = 'top250';
        this.requestData(that,viewType);
    },
    requestData: function(that, viewType) {
        // https请求
        console.log(viewType);
        wx.request({
            url: api.host + '/' + viewType,
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                // 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
                var sliceData = res.data.subjects.slice(0,9);
                switch (viewType) {
                    case 'in_theaters':
                        that.setData({
                            inTheaters: sliceData
                        });
                        break;
                    case 'coming_soon':
                        that.setData({
                            comingSoon: sliceData
                        });
                        break;
                    case 'top250':
                        that.setData({
                            topHead: sliceData
                        });
                        break;
                }

                wx.hideToast();
            },
            fail: function() {
                // 接口调用失败
                switch (viewType) {
                    case 'in_theaters':
                        console.error('in_theaters request fail:请求时间超时或...');
                        break;
                    case 'coming_soon':
                        console.error('coming_soon request fail:请求时间超时或...');
                        break;
                    case 'top250':
                        console.error('top250 request fail:请求时间超时或...');
                        break;
                }
            },
            complete: function() {
                // 接口调用结束的回调函数（调用成功、失败都会执行）
            }
        });
    }
})
