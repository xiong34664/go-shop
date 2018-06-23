/**
 * Created by Administrator on 2018/6/22 8:57.
 */

'use strict';

$(function () {
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
    });

   $("body").on("tap","a",function () {
       mui.openWindow({
           url:this.href
       });
   });
   $("body").on("tap",".mui-icon-arrowleft",function () {
       window.history.back()
   });
    // 页面滚动区域
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005
    });

});

/**
 *
 * @param {string} url  链接
 * @param {string} name  要获取的参数名
 * @return {string} value 参数名称对应打参数值
 */
function getParamsByUrl(url, name) {
    var parms = url.substr(url.indexOf('?') + 1);

    var parm = parms.split("&");

    for (var i in parm) {
        var str = parm[i].split("=");
        if(str[0] === name){
            return str[1];
        }
    }
    return null;
}