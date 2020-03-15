$(function () {
    //用户登陆
    // 1-点击按钮，获取输入框的值，判断数据是否完整
    // 2-在数据完整情况下，发送ajax请求，返回验证结果
    $('#loginBtn').click(function () {
        var username = $('#username').val();
        var password = $('#password').val();
        //验证
        if (username.trim().length === 0) {
            mui.toast('请输入用户名');
            return;
        }
        if (password.trim().length === 0) {
            mui.toast('请输入密码');
            return;
        }

        //进行登陆验证
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);      
                if (info.error) {
                    mui.toast('用户名或者密码错误');
                } else {
                    //默认跳转到个人中心，如果是从其他页面跳转过来的，登陆成功后在调回原页面
                    var reUrl = decodeURI(location.search);
                    reUrl = reUrl.substr(7);                     
                    console.log(reUrl);
                    
                    if (reUrl) {
                        location.href = reUrl;
                    } else {
                        location.href = 'user.html';
                    }                  
                }
                
            }
        })
    });
})