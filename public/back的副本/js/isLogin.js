//判断用户是否登录过 是在后台判断的
$.ajax({
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function (info) {
        console.log(info);    
        //如果用户未登录，跳转到登录页
        if (info.error) {
            location.href = "./login.html";
        }
    }
})
