/**
 * Created by Administrator on 2018/6/22 20:53.
 */

'use strict';

$(function () {
    var isEdit = Number(getParamsByUrl(location.href, 'isEdit'));
    var url = "/address/addAddress";
    if (isEdit) {
        $.ajax({
            url: "/address/queryAddress",
            success: function (res) {
                $.each(res, function () {
                    if (this.id === isEdit) {
                        $('[name="address"]').val(this.address);
                        $('[name="addressDetail"]').val(this.addressDetail);
                        $('[name="recipients"]').val(this.recipients);
                        $('[name="postcode"]').val(this.postCode);
                        return false;
                    }
                })
            }
        });
        url = "/address/updateAddress";
    }

    var picker = new mui.PopPicker({
        layer: 3
    });
    picker.setData(cityData);
    $(".addressFrom").on("tap", ".selectCity", function () {
        picker.show(function (SelectedItem) {
            var value = "";
            $.each(SelectedItem, function (index, ele) {
                value += ele.text;
            });
            this.value = value;
        }.bind(this))
    });

    $("#submitBtn").on("tap", function () {
        var check = true;
        mui(".addressFrom input").each(function () {
            if (!this.value || this.value.trim() === "") {
                var label = this.previousElementSibling;
                mui.toast(label.innerText + "不允许为空");
                check = false;
                return false;
            }

        }); //校验通过，继续执行业务逻辑
        if (check) {
            var data = $(".addressFrom").serializeArray();
            isEdit?data.push({name:'id',value:isEdit}):"";
            console.log(data);
            $.ajax({
                url: url,
                type: "post",
                data: data,
                success: function (res) {
                    if (res.success) {
                        mui.toast("收货地址"+(isEdit?"更新":"添加")+"成功");
                        setTimeout(function () {
                            location.href = "address.html"
                        }, 1500)
                    } else {
                        mui.toast("收货地址"+(isEdit?"更新":"添加")+"失败");
                    }
                }
            })
        }
    });

});