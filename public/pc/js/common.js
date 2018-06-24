
$.ajax({
	url:"/employee/checkRootLogin",
    async : false,
	success:function (res) {
        if (res.error && res.error === 400) {
			location.href = "login.html"
        }
    }
});


$(function(){

	var navLi = $('.navs li');

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

    /**
	 * 退出功能
	 * /employee/employeeLogout
     */

    $(".login_out_bot").on("click",function () {
		$.ajax({
			url:"/employee/employeeLogout",
			success:function (res) {
                if(res.success){
                	location.href = "login.html";
				}else{
                    console.log(res.message);
                }
            }
		})
    })

});