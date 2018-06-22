/**
 * Created by Administrator on 2018/6/21 0:39.
 */

'use strict';
var keyArr = localStorage.history ? JSON.parse(localStorage.history) : [];
$(function () {

    searchLest(keyArr);
    /*实现用户点击搜索按钮跳转搜索结果页面*/
    $("#search-btn").on("click", function () {
        var keyword = $(this).prev().val().trim();
        if (keyword) {
            keyArr.unshift(keyword);
            keyArr = keyArr.distinct();
            searchLest(keyArr);
            localStorage.setItem("history", JSON.stringify(keyArr));
            $(".search").submit();
        } else {
            mui.toast('请输入搜索内容');
            return false;
        }
    })

    $("#clearBtn").on("click", function () {
        mui.confirm('确认删除所有记录？', 'letao', function(e) {
            if (e.index === 1) {
                localStorage.clear();
                keyArr.length = 0;
                mui.toast('清除成功');
                searchLest(keyArr);
            }

        });
    });

    $(".mui-table-view").on("click",".mui-slider-handle",function () {
        location.href = "search-result.html?proName="+$(this).text();
    })
    //第二个demo，向左拖拽后显示操作图标，释放后自动触发的业务逻辑
    $('.mui-table-view').on('slideleft', '.mui-table-view-cell', function() {
        delList($(this));
    });
    //第二个demo，向右拖拽后显示操作图标，释放后自动触发的业务逻辑
    $('.mui-table-view').on('slideright', '.mui-table-view-cell', function() {
        delList($(this));
    });

});

function delList(that) {
    keyArr.splice(that.data("id"),1);
    localStorage.setItem("history", JSON.stringify(keyArr));
    mui.toast('删除成功');
    searchLest(keyArr);
}

function searchLest(arr) {
    var html = "";
    if (arr.length) {
        html += template("searchLists",{"items":arr});
    } else {
        html = "暂无搜索记录";
    }

    $(".mui-table-view").html(html);
}

Array.prototype.distinct = function(){
    var result = [],o ={};
    for(var i=0;i<this.length;i++) {
        if(!o[this[i]]){
            o[this[i]] = 1;
            result.push(this[i]);
        }
    }
    return result;
};