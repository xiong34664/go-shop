/**
 * Created by Administrator on 2018/6/22 14:38.
 */

'use strict';

$(function () {
    /*用户登录
    * 接口地址
    * /user/login
    * */
    $("#loginBtn").on("click", function () {
        var check = true;
        mui(".my-login input").each(function () {
            if (!this.value || this.value.trim() === "") {
                var label = this.previousElementSibling;
                mui.toast(label.innerText + "不允许为空");
                check = false;
                return false;
            }
        }); //校验通过，继续执行业务逻辑
        if (check) {
            $.ajax({
                url: "/user/login",
                type: "post",
                data: $(".my-login").serialize(),
                beforeSend:function(){
                    mui(this).button('loading');
                }.bind(this),
                success: function (res) {
                    if (res.error) {
                        mui.toast(res.message);
                        mui(this).button('reset');
                    } else {
                        if (res.success) {
                            mui.toast("登录成功");
                            setTimeout(function () {
                                location.href = "user.html"
                            }, 2000);
                        }
                    }
                }.bind(this)
            })
        } else {
            return false;
        }
    })
});