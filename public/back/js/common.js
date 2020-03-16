// 测试NProgress
// NProgress.start();
// setTimeout(function(){
//     NProgress.done();
// },1000);
// 进度条开始就是在ajax开始请求之前，当ajax请求完成，进度条结束
$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    },700);
})
// 禁止显示加载小圆圈
NProgress.configure({
    showSpinner:false
})
