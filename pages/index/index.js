//index.js
//获取应用实例
var app = getApp();
var api = require('../../utils/api.js');

Page({
    data: {

    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../list/list'
        })
    },
    onLoad: function() {
        console.log('onLoad')
        var that = this;
    },
    listView: function(event) {
        var viewType = event.currentTarget.dataset.type;
        wx.navigateTo({
            url: '../list/list?type=' + viewType
        });
    }
})
