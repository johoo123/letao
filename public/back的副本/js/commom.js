
// 进度条开始
// NProgress.start();
// 进度条结束 
// setTimeout(function () {
//     NProgress.done();
// }, 1000);

// 页面ajax请求开始是，进度条出现
// 页面ajax请求结束后，进度条完成

/*
    $.ajax({
        url: '01.php',
        data: {},
        beforeSend: function () {},
        success: function (){},
        error： function() {},
        complete: function () {}
    })

    全局ajax事件，这些事件绑定给页面后，页面中任何一个ajax请求发送，只要满足条件就会触发事件 

    ajaxSend() 当页面中有ajax发送是会触发 
    ajaxSuccess() 当页面中有ajax成功响应后就会触发 
    ajaxComplete() 当页面中有ajax完成时会触发 
    ajaxError() 当页面中有ajax请求出错时会触发 
    ajaxStart() 当页面的第一个ajax请求发送时触发  1次
    ajaxStop() 当页面最后一个ajax请求完成是触发  1次
*/
// 进度条禁止显示圆圈
NProgress.configure({ showSpinner: false });
//页面中第一个请求发送时，进度条开始， 当页面最后一个请求结束时，进度条完成

$(document).ajaxStart(function () {
    // console.log('第一个请求发送了');
    NProgress.start(); //进度条开始
})

$(document).ajaxStop(function () {
    // console.log('最后一个请求结束了'); 
    setTimeout(function () {
        NProgress.done(); //进度条结束
    }, 700);
  
});


$(function () {
    // 二级导航展开合并 
    $('.cate-link').click(function () {
        $('.second').slideToggle();
    });

    //点击切换侧边栏
    $('.menu').click(function () {
        $('body').toggleClass('hidemenu');
    })

    //退出功能
    $('.btn-logout').click(function () {
        //发送ajax请求，进行退出（后台删除用户在服务器中标记)
        $.ajax({
            url: ' /employee/employeeLogout',
            dataType: 'json',
            success: function (info) {
                console.log(info);       
                //退出跳转到登录页
                if (info.success) {
                    location.href = './login.html';
                }
            }
        })
    })

    
})

