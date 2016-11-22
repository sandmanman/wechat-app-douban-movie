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
            movieTitle = options.title;

    },
    onReady: function(){
        wx.setNavigationBarTitle({
            title: this.data.title
        });
    }
});
