
// 电影列表
//

var app = getApp();
var api = require('../../utils/api.js');

Page({
    // data 页面的初始数据
    data: {
        list: [],
        start: 0,
        title: '豆瓣电影榜',
        hidden: false,
        display: 'none',
        loadMore: {
            disabled: false,
            loading: false,
            btnText: '加载更多'
        }
    },
    handleLoadMore: function(that, targetStart) {
        /*
         * 请求数据
        */
        var apiURL = api.topHead;
        wx.request({
            url: apiURL + '?start=' + targetStart,
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                // 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
                that.setData({
                    list: that.data.list.concat(res.data.subjects),
                    title: res.data.title,
                    hidden: true,
                    display: 'block',
                    loadMore: {
                        loading: false,
                        disabled: false,
                        btnText: '加载更多'
                    }
                });
                // console.log(res.data.subjects);
                if ( res.data.title !== null ) {
                    wx.setNavigationBarTitle({
                        title: res.data.title
                    });
                }

            },
            fail: function() {
                // 接口调用失败
                console.error('request fail:请求时间超时或...');
            },
            complete: function() {
                // 接口调用结束的回调函数（调用成功、失败都会执行）
            }
        });
    },
    onLoad: function() {
        /* 监听页面加载
         * 一个页面只会调用一次
         * 参数可以获取wx.navigateTo和wx.redirectTo及<navigator/>中的 query
         */
        var that = this;
        this.handleLoadMore(that, this.data.start);
    },
    onReady: function() {
        /* 监听页面初次渲染完成
         * 一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。
         * 对界面的设置如wx.setNavigationBarTitle请在onReady之后设置。
         */
        wx.setNavigationBarTitle({
            title: this.data.title
        });
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
    movieSubject: function(event) {
        // 跳转到电影详细页
        //
        var movieID = event.currentTarget.dataset.id,
            movieTile = event.currentTarget.dataset.title;
        wx.navigateTo({
            url: '../detail/detail?id=' + movieID + '&title=' + movieTile
        });
    },
    loadMoreTap: function() {
        // 点击加载更多
        //
        var that = this;
        if ( this.data.start !== 240 ) {
            that.setData({
                loadMore: {
                    loading: true,
                    disabled: false,
                    btnText: ''
                }
            });

            this.handleLoadMore(that, that.data.start += 20);
        } else {
            that.setData({
                loadMore: {
                    disabled: true,
                    loading: false,
                    btnText: '数据加载完了'
                }
            });
            console.warn('数据加载完了');
        }
    },
    loadingChange: function() {
        // loading
        this.setData({
            hidden: false
        });
    }
});
