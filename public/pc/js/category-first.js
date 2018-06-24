/**
 * Created by Administrator on 2018/6/23 15:02.
 */

'use strict';

$(function () {
    /**
     * 获取一级分类数据并展示
     */
    var page = 1;
    var pageSize = 10;
    var totalPage = 0;

    $("#prev").prop({disabled: true});
    getData();

    
    $("#prev").on("click",function () {
        $("#next").prop({disabled: false});
        if(--page <= 1){
            $(this).prop({disabled: true});
            page = 1;
        }
        getData();
    });
    $("#next").on("click",function () {
        $("#prev").prop({disabled: false});
        if(++page >= totalPage){
            $(this).prop({disabled: true});
            page = totalPage;
        }
        getData();
    });

    /**
     * 添加一级分类
     * /category/addTopCategory
     */
    
    $("#save").on("click",function () {
        var flag = true;
        var categoryName = $("input[name='categoryName']");
        var name = $.trim(categoryName.val());
        if(name) {
            categoryName.parents(".form-group").removeClass("has-error").addClass("has-success");
            categoryName.parents(".form-group").find(".glyphicon").removeClass("glyphicon-remove").addClass("glyphicon-ok");
        }else {
            flag = false;
            categoryName.parents(".form-group").removeClass("has-success").addClass("has-error");
            categoryName.parents(".form-group").find(".glyphicon").removeClass("glyphicon-ok").addClass("glyphicon-remove");
        }
        if (flag) {
            $.ajax({
                url: "/category/addTopCategory",
                type: "post",
                data:{
                    categoryName : name
                },
                success: function (res) {
                    if (res.success) {
                        getData();
                        $(".category-first").modal("hide");
                    } else {
                        console.log("添加失败")
                    }
                }
            });
        }
    });

    function getData() {

        $.ajax({
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                totalPage = Math.ceil(res.total/pageSize);
                if (totalPage < 2) {
                    $(".page").remove();
                }
                var html = template("categoryFirstTpl",{"items":res.rows});
                $("#cate_lists").html(html)
            }
        })
    }
});