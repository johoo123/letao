$(function(){
    // 请求用户的信息
    $.ajax({
        url:'/user/queryUserMessage',
        dataType:'json',    
        success:function(info){
            console.log(info);
            $('#userInfo').html(template('tpl',info));
        }
    })
    // 退出功能
    $('#logout').click(function(){
        $.ajax({
            url:'/user/logout',
            dataType:'json',
            success:function(info){
                console.log(info);
                location.href='login.html';
            }
        })
    })
})