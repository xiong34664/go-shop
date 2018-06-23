/**
 * Created by Administrator on 2018/6/21 0:39.
 */

'use strict';

//              页码   价格升序    销量排序                   搜索关键词
var html="",page = 1,priceSort=1,numSort=1,that=null,keyword = getParamsByUrl(location.search,"proName");

$(function () {

    /*
    * 根据用户输入的关键字搜索结果
    * */

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

    $("#priceSort").on("tap", function () {
        $(this).find(".mui-icon").toggleClass("mui-icon-arrowup mui-icon-arrowdown");
        priceSort = priceSort === 1 ? 2 : 1;
        page = 1;
        html="";
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    });

    $("#numSort").on("tap", function () {
        $(this).find(".mui-icon").toggleClass("mui-icon-arrowup mui-icon-arrowdown");
        numSort = numSort === 1 ? 2 : 1;
        page = 1;
        html="";
        mui('#refreshContainer').pullRefresh().refresh(true);
        getData();
    });


});


function getData() {
    if(!that){
        that = this;
    }
    $.ajax({
        url: "/product/queryProduct",
        data: {
            proName: keyword,
            page: page++,
            pageSize: 4,
            price : priceSort,
            num : numSort
        },
        success: function (res) {
            if (res.data.length) {
                html += template("search_result", {items: res.data});
                that.endPullupToRefresh(false);
            } else {
                that.endPullupToRefresh(true);
            }
            $("#search_box").html(html);
        }
    })
}
