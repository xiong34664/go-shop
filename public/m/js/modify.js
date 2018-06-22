/**
 * Created by Administrator on 2018/6/22 19:10.
 */

'use strict';

$(function () {
    /**
     * 修改密码
     * 1.获取修改密码按钮并添加点击事件
     * 2.获取用户输入信息
     * 3.对用户输入的信息做校验
     * 4.调用修改密码接口(/user/vCodeForUpdatePassword) 实现修改密码
     * 5.跳转回登录界面
     */
    
    $("#modifyBtn").on("tap",function () {
        var check = true;
        mui(".my-login input").each(function () {
            if (!this.value || this.value.trim() === "") {
                var label = this.previousElementSibling;
                mui.toast(label.innerText + "不允许为空");
                check = false;
                return false;

            }
        }); //校验通过，继续执行业务逻辑
        if(check){
            if ($("input[name='newPassword']").val() !== $("input[name='sureNewPass']").val()) {
                mui.toast('两次输入的新密码不一致!');
                return false;
            }
            $.ajax({
                url: "/user/updatePassword",
                type:'post',
                data:$(".my-login").serialize(),
                beforeSend:function(){
                    mui(this).button('loading');
                }.bind(this),
                success:function (res) {
                    if(res.success){
                        mui.toast("修改密码成功");
                        setTimeout(function () {
                            location.href = "login.html";
                        },2000)
                    }else{
                        mui.toast(res.message);
                        mui(this).button('reset');
                    }

                }.bind(this)
            })
        }
    })

    $("#getCode").on("tap", function () {
        $.ajax({
            url: "/user/vCodeForUpdatePassword",
            success: function (res) {
                console.log(res.vCode);
            }
        })
    })
});