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
var tophead = require('../mock/mock-top250.js');
var tophead_next = require('../mock/mock-top250_20.js');

module.exports = {
    formatDate: formatDate
}
