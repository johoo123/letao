$(function () {
    // 动态渲染 当前用户购物车的信息
    $.ajax({
        type: 'get',
        url: '/cart/queryCart',
        dataType: 'json',
        success: function (info) {
            console.log(info);   
            if (info.error) {
                //去登陆
                location.href = 'login.html';
            } else {
                //渲染数据
                $('.mui-table-view').html(template('tmp', { list: info }));
            }
        }
    })
})