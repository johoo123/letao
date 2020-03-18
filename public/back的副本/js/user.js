$(function () {

    var currentPage = 1;
    var pageSize = 5;

    //记录当前操作用户状态
    var currentId = null;
    var isDelete = null;

    // 1-获取用户数据，动态渲染在页面中

    function render() {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                //渲染
                $('tbody').html(template('tmp', info));
                //生成分页
                setPage(info.total);
            }
        })
    }
    //获取第一屏数据渲染完成
    render();

    // 2-分页功能
    function setPage(total) {
        $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: currentPage,//当前页
            totalPages: Math.ceil(total/pageSize),//总页数           
            onPageClicked: function (event, originalEvent, type, page) {
                //为按钮绑定点击事件 page:当前点击的按钮值
                console.log(page);
                //记录当前页
                currentPage = page; 
                //渲染对应页面
                render();                
            }
        })
    }

    // 3-点击禁用启用按钮，获取当前数据id,记录要进行的操作 (根据按钮颜色)
    $('tbody').on('click', '.button', function () {
        // currentId = $(this).parent().attr('data-id');
        // dataset.id   data-id   用 $('div').data('id');
        currentId = $(this).parent().data('id');
        isDelete = $(this).hasClass('btn-success') ? 1 : 0;  // 1启用  0 禁用
        // console.log(currentId);
        // console.log(isDelete);                
    });

    // 4- 点击确定按钮后，把刚才记录数据 执行对应的操作
    $('.btn-ok').click(function () {
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: currentId, 
                isDelete : isDelete
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    //重新渲染当前页
                    render();
                    // 隐藏模态框
                    //  显示 .modal('show');
                    $('.modal-user').modal('hide'); 
                }
                
            }
        });
    });
})