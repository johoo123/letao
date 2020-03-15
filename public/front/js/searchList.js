$(function () {
    //要搜索内容关键字
    var key = getData('key');
    // 2-把关键字放到输入框中
    $('.search_input').val(key);
    // 3-根据关键字请求对应商品，回来渲染

    //3-1-保存参数：
    var obj = {
        proName: key,
        page: 1, 
        pageSize: 100
    }

    function render() {

        $.ajax({
            url: '/product/queryProduct',
            data: obj,
            dataType: 'json',
            beforeSend: function () {
                $('.lt_product').html('<div class="loading"></div>');
            },
            success: function (info) {
                console.log(info);    
                //渲染
                setTimeout(function () {
                    $('.lt_product').html(template('tmp', info));
                },500)
               
            }
        })
    }

     render(); //渲染首屏

    //4-点击价格，根据按钮方向进行排序
    // 箭头向上 升序 向下：降序  
    $('.price').click(function () {

        //如果有current类名就切换i标签箭头方向
        if ($(this).hasClass('current')) {
            $(this).find('i').toggleClass('fa-angle-up fa-angle-down');
        }


        $(this).addClass('current');  //添加current类名
        //判断升序还是降序
        var price = $(this).find('i').hasClass('fa-angle-up') ? 1 : 2;
        //把排序规则加给 请求参数
        obj.price = price; 
        render(); //重新渲染
    });


    //5-点击搜按钮，获取输入的值， 
    // 1-把搜索框值添加到历史记录中
    // 2-根据输入值，获取对应的商品，并渲染
    $('.search_btn').click(function () {
        //获取输入框值
        var txt = $('.search_input').val();
        //把输入值存储到历史记录中
        setSearch(txt);
        //修改搜索关键字
        obj.proName = txt;
        //渲染
        render();        
    })
})