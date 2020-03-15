$(function () {
    // 获取要展示商品id
    var productId = getData('productId');
    // console.log(productId);

    //1-获取对应id商品信息,渲染
    $.ajax({
        url: '/product/queryProductDetail',
        data: { id: productId },
        dataType: 'json',
        success: function (info) {
            console.log(info);    
            //渲染页面
            $('.mui-scroll').html(template('tmp', info));

            //轮播图 
            var gallery = mui('.mui-slider');
            gallery.slider({
            interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
            });
            //数字框
            mui('.mui-numbox').numbox()

        }
    })

    // 2- 选择尺码  切换current类名 
    $('.mui-scroll').on('click', '.lt_size span', function () {
        $(this).addClass('current').siblings().removeClass('current');
    })

    // 3-点击加入购物车 
    $('#addCart').click(function () {
        var size = $('.lt_size .current').text();
        var num = mui('.mui-numbox').numbox().getValue();
        if (!size) {
            mui.toast('请选择尺码');
            return; //导出结束
        }
        // console.log(size, num);
        //把商品添加到购物车
        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: productId,
                size: size,
                num: num
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);      
                // 失败 取登录页
                // 成功 弹框 去购物车 还是继续浏览
                if (info.error) {
                    location.href = 'login.html?reUrl='+location.href;
                } else {
                    mui.confirm('添加成功', '温馨提示', ['去购物车', '继续看看'], function (data) {
                        if (data.index == 0) {
                            //去购物车
                            location.href = 'cart.html';
                        }
                    });
                }

            }
        })
        
        
    });

    
});