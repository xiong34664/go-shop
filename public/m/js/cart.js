/**
 * Created by Administrator on 2018/6/24 11:09.
 */

'use strict';

var html = "", page = 1, count = 0, data = [], size = 0, num = 0, that = null;

$(function () {


    mui.init({
        pullRefresh: {
            container: "#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    $("#cart_lists").on("change", "input[type='checkbox']", function () {
        setAmount()
    }).on("tap", ".edit-btn", function () {
        var li = $(this).parents("li");
        var id = li.data("id");
        var curr = null;
        $.each(data, function () {
            if (this.id === id) {
                curr = this;
                return false;
            }
        });
        num = curr.num;
        size = curr.size;
        var model = {num: curr.num, arr: curr.productSize.split('-'), size: curr.size, productNum: curr.productNum};
        var cartUpdate = template("cartUpdateTpl", model);
        mui.confirm(cartUpdate, "编辑商品", function (e) {
            if (e.index) {
                $.ajax({
                    url: '/cart/updateCart',
                    type: 'post',
                    data: {
                        id: id,
                        size: size,
                        num: num
                    },
                    success: function (res) {
                        if (res.success) {
                            page = 1;
                            mui('#refreshContainer').pullRefresh().refresh(true);
                            $("#cart_lists").html("");
                            data.length = 0;
                            setAmount();
                            getData();
                            mui.toast('编辑成功');
                        }
                    }
                })
            }else{
                mui.swipeoutClose(li[0]);
            }
        })
    }).on("tap",".del-btn",function () {
        var li = $(this).parents("li");
        var id = li.data("id");
        mui.confirm("是否确定删除这件商品","温馨提醒",function (e) {
            if (e.index) {
                $.ajax({
                    url:"/cart/deleteCart",
                    data:{
                        id:[id]
                    },
                    success:function (res) {
                        if (res.success) {
                            li.remove();
                            mui.toast("删除成功");
                        }else{
                            mui.toast("删除失败");
                        }
                    }
                })
            } else {
                mui.swipeoutClose(li[0]);
            }
        })

    });
    $('body').on("tap", ".detail-size span", function () {
        $(this).addClass("active").siblings().removeClass("active");
        size = $(this).text();
    }).on("tap", ".detail-num span", function () {
        var val = $(".detail-num input").val();
        var maxVal = $(".detail-num input").data("max");
        var text = $(this).text();
        if (text === "-")
            $(".detail-num input").val(--val < 1 ? 1 : val);
        else
            $(".detail-num input").val(++val > maxVal ? maxVal : val);
        num = val;
    })


});

function getData() {
    if (!that) {
        that = this;
    }
    $.ajax({
        url: "/cart/queryCartPaging",
        data: {
            page: page++,
            pageSize: 5
        },
        success: function (res) {
            if (res.count) {
                html = template("cartList", {"items": res.data});
                $("#cart_lists").append(html);
                that.endPullupToRefresh(false);
                $.each(res.data, function () {
                    data.push(this)
                })
            } else {
                that.endPullupToRefresh(true);
            }
        }
    });
}

function setAmount() {
    var amount = 0;
    $('input:checked').each(function () {
        var id = $(this).parents("li").data("id");
        $.each(data, function () {
            if (this.id === id) {
                amount += this.num * this.price;
            }
        })

    });

    $('#cartAmount').html(Math.ceil(amount * 100) / 100);
};