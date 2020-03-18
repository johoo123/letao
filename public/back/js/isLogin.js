// 判断是否登陆
$.ajax({
    url:'/employee/checkRootLogin',
    dataType:'json',
    success:function(info){
        if(info.error){
            location.href="./login.html"
        }
    }
})