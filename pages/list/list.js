
// 电影列表
//

var app = getApp();
var util = require('../../utils/util.js');

Page({
    // data 页面的初始数据
    data: {
        list: [],
        start: 0,
        title: '豆瓣电影榜',
        ratingHidden: false,
        loadMore: {
            disabled: false,
            loading: false,
            btnText: '加载更多'
        }
    },
    onLoad: function(options) {
        /* 监听页面加载
         * 一个页面只会调用一次
         * 参数可以获取wx.navigateTo和wx.redirectTo及<navigator/>中的 query
         */
        var list;
        var type = options.type;
        var that = this;
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 0
        });

        switch (type) {
            case 'in_theaters':
                list = util.getInTheaters();
                break;
            case 'coming_soon':
                list = util.getComingSoon();
                break;
            case 'tophead':
                list = util.getTophead();
                break;

        };

        that.setData({
            ratingHidden: true,
            list: list.subjects
        });

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
    handleLoadMore: function() {
        // 点击加载更多
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
});
