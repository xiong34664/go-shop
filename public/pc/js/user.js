/**
 * Created by Administrator on 2018/6/23 11:24.
 */

'use strict';
$(function () {
    /**
     * /user/queryUser
     */

    userList(1, 10);
    $("#user_list").on("click", ".edit-btn", function () {
        var id = $(this).data("id");
        var isDelete = $(this).data("state");
        $.ajax({
            url: "/user/updateUser",
            type: "post",
            data: {
                id: id,
                isDelete: isDelete ? 0 : 1
            },
            success: function (res) {
                if (res.success) {
                    userList(1, 10);
                } else {
                    console.log("修改失败");
                }
            }
        })
    })
});

function userList(page, pageSize) {
    $.ajax({
        url: "/user/queryUser",
        data: {
            page: page,
            pageSize: pageSize
        },
        success: function (res) {
            var html = template("userInfo", {"items": res.rows})
            $("#user_list").html(html);
        }
    });
}