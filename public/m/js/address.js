/**
 * Created by Administrator on 2018/6/22 20:23.
 */

'use strict';

$(function () {

    /**
     * 获取用户存储的收货地址
     * /address/queryAddress
     */
    $.ajax({
        url: "/address/queryAddress",
        success: function (res) {
            var html = template("addressList", {"items": res});
            $("#adressBox").html(html);
        }
    });

    $("#adressBox").on("tap", ".edit-btn", function () {

    });
    $("#adressBox").on("tap", ".del-btn", function () {
        var li = $(this).parents("li");
        mui.confirm("确认要删除吗?", function (message) {
            // 确认删除
            if (message.index === 1) {
                $.ajax({
                    url: "/address/deleteAddress",
                    type: "post",
                    data: {id: li.data("id")},
                    success: function (res) {
                        if (res.success) {
                            li.remove();
                            mui.toast("删除成功");
                        } else {
                            mui.toast("删除失败");
                        }
                    }.bind(this)
                })
            } else {
                mui.swipeoutClose(li[0]);
            }
        })
    });
    $("#adressBox").on("tap", ".edit-btn", function () {
        var id = $(this).parents("li").data("id");
        location.href = "addAddress.html?isEdit="+id;

    });
});