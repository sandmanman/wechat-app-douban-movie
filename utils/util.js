/*
 * 格式化时间
 * @param  {Datetime} source 时间对象
 * @param  {String} format 格式
 * @return {String}        格式化过后的时间
 * https://github.com/zce/weapp-demo
 */
function formatDate(source, format) {
    const o = {
        'M+': source.getMonth() + 1, // 月份
        'd+': source.getDate(), // 日
        'H+': source.getHours(), // 小时
        'm+': source.getMinutes(), // 分
        's+': source.getSeconds(), // 秒
        'q+': Math.floor((source.getMonth() + 3) / 3), // 季度
        'f+': source.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (source.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return format
}

// 数据
var coming_soon = require('../mock/mock-coming_soon.js');
var in_theaters = require('../mock/mock-in_theaters.js');
var tophead = require('../mock/mock-tophead.js');
var tophead_next = require('../mock/mock-tophead_20.js');

// 获取数据
function requestData(url) {
    wx.request({
        url: url,
        header: {
            'content-type': 'application/json'
        },
        data: {},
        success: function(res) {
            // 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
            console.log('request success');
        },
        fail: function() {
            // 接口调用失败
            console.log('request fail');
        },
        complete: function() {
            // 接口调用结束的回调函数（调用成功、失败都会执行）
            console.log('request complete');
        }
    });
}

function getComingSoon() {
    return coming_soon.coming_soon;
}
function getInTheaters() {
    return in_theaters.in_theaters;
}
function getTophead() {
    return tophead.tophead;
}


module.exports = {
    formatDate: formatDate,
    getComingSoon: getComingSoon,
    getInTheaters: getInTheaters,
    getTophead: getTophead
}
