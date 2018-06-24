/**
 * Created by Administrator on 2018/6/23 10:35.
 */

'use strict';

$.ajax({
    url:"/employee/checkRootLogin",
    async : false,
    success:function (res) {
        if (res.success) {
            location.href = "user.html"
        }
    }
});

$(function () {
    /**
     * 登录
     * 获取登录按钮添加点击事件
     * 获取用户输入的用户名和密码
     * /employee/employeeLogin
     */
    $("#loginBtn").on("click",function () {
        var flag = true;
        $(".form-control").trigger("change");
        $(".form-group").each(function () {
            if(!$(this).is('.has-success')){
                flag = false;
            }
        });
        if (flag) {
            $.ajax({
                url:"/employee/employeeLogin",
                type:"post",
                data : $(".login-form").serialize(),
                success:function(res){
                    if(res.success){
                        location.href = "user.html"
                    }else{

                    }
                }
            })
        }
    });
    $(".form-control").on("change",function () {
        if($.trim($(this).val())) {
            $(this).parents(".form-group").removeClass("has-error").addClass("has-success");
            $(this).parents(".form-group").find(".glyphicon").removeClass("glyphicon-remove").addClass("glyphicon-ok");
        }else {
            $(this).parents(".form-group").removeClass("has-success").addClass("has-error");
            $(this).parents(".form-group").find(".glyphicon").removeClass("glyphicon-ok").addClass("glyphicon-remove");
        }
    });

});