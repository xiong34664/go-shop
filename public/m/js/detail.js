/**
 * Created by Administrator on 2018/6/23 21:31.
 */

'use strict';

$(function () {
    //库存数量
    var kucunNum = 0;
    var size = null;
    var productId = null;
    var id = getParamsByUrl(location.search,'id');
    $.ajax({
        url:"/product/queryProductDetail",
        data:{
            id:id
        },
        success:function (res) {
            kucunNum = res.num;
            productId = res.id;
            $("#kucunNum span").text(kucunNum)
            var html = template("productTpl",res);
            $("#productBox").html(html);
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });
    $("#productBox").on("tap",".size span",function () {
        $(this).addClass("active").siblings().removeClass("active");
        size = $(this).text();
    });

    $("#reduce").on("tap",function () {
        var num = $("#inp").val();
        $("#inp").val(--num<1?0:num);
    });
    $("#increase").on("tap",function () {
        var num = $("#inp").val();
        $("#inp").val(++num>kucunNum?kucunNum:num);
    });


    /**
     * 添加购物车
     * /cart/addCart
     *
     * 添加成功后  提示是否跳转购物车
     */
    
    $("#addCart").on("tap",function () {
        if (!size) {
            mui.toast("请选择尺码");
            return false;
        }
        $.ajax({
            url:"/cart/addCart",
            type:"post",
            data:{
                productId:productId,
                num:$("#inp").val(),
                size:size
            },
            success:function (res) {
                if(res.success){
                    mui.confirm('添加成功,去购物车看看?', 'letao', function(e) {
                        if (e.index) {
                            location.href = "cart.html"
                        }
                    });
                }
            }
        })
    })



});