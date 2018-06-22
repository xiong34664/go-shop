/**
 * Created by Administrator on 2018/6/22 15:20.
 */
/*获取登录信息*/
var userInfo = null;

$.ajax({
    url: "/user/queryUserMessage",
    async: false,
    success: function (res) {
        if (res.error && res.error === 400) {
            location.href = "login.html";
        } else {
            userInfo = res;
        }
    }
});

$(function () {
    $("#logoutBtn").on("tap", function () {
        $.ajax({
            url: "/user/logout",
            success: function (res) {
                if (res.success) {
                    mui.toast("退出登录成功");
                    setTimeout(function () {
                        location.href = "index.html"
                    }, 1500)
                } else {
                    mui.toast("退出失败")
                }
            }
        });
    });

    var html = template("userInfo",userInfo);
    $(".user-info").html(html)
});
