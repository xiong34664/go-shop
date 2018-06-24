/**
 * Created by Administrator on 2018/6/23 18:40.
 */

'use strict';



$(function () {

    /**
     * 商品展示 /product/queryProductDetailList
     */

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
            url:"/product/queryProductDetailList",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                totalPage = Math.ceil(res.total/pageSize);
                if (totalPage < 2) {
                    $(".page").remove();
                }
                var html = template("productList",{"items":res.rows});
                $("#productBox").html(html);
            }
        });
    }

    /**
     * 添加商品
     * 1.获取二级分类并展示在选择框中  /category/querySecondCategoryPaging
     */

    $.ajax({
        url:"/category/querySecondCategoryPaging",
        data:{
            page:1,
            pageSize:100
        },
        success:function (res) {
            var html = template("secondTpl",{"items":res.rows})
            $("#secondBox").html(html)
        }
    });


    var imageArray = []
    $('#fileUpload').fileupload({
        dataType:'json',
        done:function (e,data) {
            imageArray.push(data.result);
            $("#preview").attr("src",data.result.picAddr);
        }
    });
    
    
    $("#addProduct").on("click",function () {
        var flag = true;
        $(".has-feedback .form-control").trigger("change");
        $(".has-feedback").each(function () {
            if(!$(this).is('.has-success')){
                flag = false;
            }
        });
        console.log(flag);
        if (flag) {
            var data = $("#productForm").serializeArray();
            data.push({name:'statu',value:1},{name:'pic',value:imageArray});
            $.ajax({
                url:'/product/addProduct',
                type:'post',
                data:data,
                success:function (res) {
                    if(res.success){
                        location.reload();
                    }else{
                        alert(res.message);
                    }
                }
            })
        }
    })

    $(".has-feedback .form-control").on("change",function () {
        if($.trim($(this).val())) {
            $(this).parents(".form-group").removeClass("has-error").addClass("has-success");
            $(this).parents(".form-group").find(".glyphicon").removeClass("glyphicon-remove").addClass("glyphicon-ok");
        }else {
            $(this).parents(".form-group").removeClass("has-success").addClass("has-error");
            $(this).parents(".form-group").find(".glyphicon").removeClass("glyphicon-ok").addClass("glyphicon-remove");
        }
    });
});