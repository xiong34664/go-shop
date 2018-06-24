/**
 * Created by Administrator on 2018/6/23 16:30.
 */

'use strict';

$(function () {

    var page = 1;
    var pageSize = 5;
    var totalPage = 0;
    getData();

    $("#prev").prop({disabled: true});


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


    function getData() {

        $.ajax({
            url:"/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                totalPage = Math.ceil(res.total/pageSize);
                if (totalPage < 2) {
                    $(".page").remove();
                }
                var html = template("categorySecondTpl",{"items":res.rows});
                $("#categorySecond").html(html)
            }
        })
    }

    /**
     * 二级分类添加
     * 获取一级分类的数据并显示在选择框中
     * /category/queryTopCategoryPaging
     * 图片文件上传
     * /category/addSecondCategoryPic
     * 调用接口  实现二级分类添加
     * /category/addSecondCategory
     */

    $.ajax({
        url:'/category/queryTopCategoryPaging',
        data:{
            page:1,
            pageSize:100
        },
        success:function (res) {
            var html = template("categoryFirstTpl",{items:res.rows})
            $("#categoryFirstBox").html(html);
        }
    });

    var brandLogo = "";

    $('#fileUpload').fileupload({
        dataType:'json',
        done:function (e,data) {
            brandLogo = data.result.picAddr;
            $("#preview").attr("src",brandLogo);
        }
    });
    
    $("#save").on("click",function () {
        var flag = true;
        var categoryId = $.trim($("[name='categoryId']").val());
        var brandName = $.trim($("[name='brandName']").val());
        if (!brandLogo || !brandName || !categoryId) {
            alert("请填写完整信息");
            flag = false;
        }
        if (flag) {
            $.ajax({
                url:"/category/addSecondCategory",
                type:"post",
                data:{
                    brandName:brandName,
                    categoryId:categoryId,
                    brandLogo:brandLogo,
                    hot:0
                },
                success:function (res) {
                    if (res.success){
                        $(".modal").modal("hide");
                        location.reload();
                    }
                }
            });
        }
    });
});