$(function () {
    // 1-动态渲染一级分类
    // 2-渲染和一级分类对应的二级分类
    // 3-点击一级分类， 自己高亮，切换对应二级分类 

    // 1-动态渲染一级分类
    $.ajax({
        url: '/category/queryTopCategory',     
        dataType: 'json',
        success: function (info) {
            console.log(info);     
            //渲染完成
            $('.nav-list').html(template('tmp-one', info));

            //默认加载第一导航个二级分类
            var id = $('.nav-list li:first-child a').data('id');    
            renderSecond(id);
        }
    })

    //2-封装根据一级分类id渲染对应二级分类 
    function renderSecond(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            dataType:'json',
            success: function (info) {
                console.log(info);          
                // 渲染
                $('.content-list').html(template('tmp-two', info));
            }
        })
    }


    // 3-点击一级分类， 自己高亮，切换对应二级分类 
    $('.nav-list').on('click', 'a', function () {
        // 排他
        $(this).parent().addClass('current').siblings().removeClass('current');
        // 渲染当前一级分类对应二级分类
        var id = $(this).data('id');
        renderSecond(id);//渲染
    })
})