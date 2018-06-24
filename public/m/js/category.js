/**
 * Created by Administrator on 2018/6/20 22:19.
 */

'use strict';
$(function () {
    
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        success:function (res) {
            console.log(res);
            var html = template("category", {items: res.rows});
            $(".links").html(html);
            getSecondCategory(res.rows[0].id);
        }
    });
    function aaa(res){
        console.log(res);
    }

    $(".links").on("tap","a",function () {
        var id = $(this).data("id");
        $(this).addClass("active").siblings().removeClass("active");
        getSecondCategory(id)
    });


});
function getSecondCategory(id) {
    $.ajax({
        url:"/category/querySecondCategory",
        type:"get",
        data:{
            id:id
        },
        success:function (res) {
            var html="";
            if(res.total){
                html = template("category-second", {items: res.rows});
            }else{
                html='<div class="no-results">暂无数据</div>';
            }
            $(".brand-list ").html(html);

        }
    });
}