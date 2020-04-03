$(function() {
  // 点击登陆按钮
  $("#loginBtn").click(function() {
    // 获取用户名和密码
    var username = $("#username").val();
    var password = $("#password").val();
    // 验证
    if (username.trim().length === 0) {
      mui.toast("请输入用户名");
      return;
    }
    if (password.trim().length === 0) {
      mui.toast("请输入密码");
      return;
    }
    // 进行登陆验证
    $.ajax({
      url: "/user/login",
      type: "post",
      data: {
        username: username,
        password: password
      },
      dataType: "json",
      success: function(info) {
        // console.log(info);
        if (info.error) {
          mui.toast("用户名错误");
        } else {
          // 如果登陆成功，跳回用户中心或者原来的页面
          var reUrl = decodeURI(location.search);
          reUrl = reUrl.substr(7);
        //   console.log(reUrl);
          if(reUrl){
            //   返回原来的页面
              location.href=reUrl;
          }else{
            //   跳转到用户页面
              location.href='user.html';
          }
        }
      }
    });
  });
});
