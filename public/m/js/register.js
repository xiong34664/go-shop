/**
 * Created by Administrator on 2018/6/22 11:24.
 */

'use strict';

/*注册*/

$(function () {
    $("#regBtn").on("tap", function () {
        var check = true;
        mui(".my-login input").each(function () {
            if (!this.value || this.value.trim() === "") {
                var label = this.previousElementSibling;
                mui.toast(label.innerText + "不允许为空");
                check = false;
                return false;

            }
            if (this.type === "tel" && this.value.length < 11) {
                mui.toast("请输入合法手机号");
                check = false;
                return false;
            }
        }); //校验通过，继续执行业务逻辑
        if (check) {

            if ($("input[name='password']").val() !== $("input[name='againPass']").val()) {
                mui.toast('两次输入密码不同!');
                return false;
            }
            $.ajax({
                url: "/user/register",
                type:'post',
                data:$(".my-login").serialize(),
                success:function (res) {
                    if(res.success){
                        setTimeout(function () {
                            location.href = "login.html";
                        },2000)
                    }else{
                        mui.toast("验证码错误");
                    }

                }
            })
        }
    });


    /*获取验证码
    * 
    * 接口地址
    * /user/vCode
    * */

    $("#getCode").on("tap", function () {
        $.ajax({
            url: "/user/vCode",
            success: function (res) {
                console.log(res.vCode);
            }
        })
    })

});