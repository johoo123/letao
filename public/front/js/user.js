$(function () {
    // 获取用户的数据，动态渲染在页面中
    $.ajax({
        url: '/user/queryUserMessage',
        dataType: 'json',
        success: function (info) {
            console.log(info);       
            if (info.error) {
                //跳转到登录页
                location.href = 'login.html?reUrl=' + location.href;''
            } else {
                //渲染数据
                $('.username').text(info.username);
                $('.mobile').text(info.mobile);
            }
        }
    })

    //退出
    $('#logout').click(function () {
        $.ajax({
            url: '/user/logout',
            dataType: 'json',
            success: function (info) {
                console.log(info);      
                //跳转到登录页
                location.href = 'login.html'; 
            }
        })
    })
    
})