//index.js
//获取应用实例
var app = getApp();
var util = require('../../utils/util.js');

Page({
    data: {
        inputShowed: false,
        inputVal: "",
        inTheaters: [],
        comingSoon: [],
        tophead: []
    },
    // search bar
    //
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
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
        this.tophead();

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
        var inTheaters = util.getInTheaters();
        that.setData({
            inTheaters: inTheaters.subjects.slice(0,9)
        });

    },
    comingSoon: function() {
        // 即将上映
        //
        var that = this;
        var comingSoon = util.getComingSoon();
        that.setData({
            comingSoon: comingSoon.subjects.slice(0,9)
        });
    },
    tophead: function() {
        // top250
        //
        var that = this;
        var tophead = util.getTophead();
        that.setData({
            tophead: tophead.subjects.slice(0,9)
        });
    },
})
