$(function () {

    var currentPage = 1;
    var pageSize = 5;

    //1- 请求一级分类的数据 并渲染 
    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                //渲染
                $('tbody').html(template('tmp', info));
                //生成分页标签
                setPage(info.total);
            }
        })
    }

    render();
    // 2-分页
    function setPage(total) {
        $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: currentPage,//当前页
            totalPages: Math.ceil(total / pageSize),//总页数
            onPageClicked: function (event, originalEvent, type, page) {
                //为按钮绑定点击事件 page:当前点击的按钮值
                //记录当前页
                currentPage = page;
                //重新渲染
                render();
            }
        });
    }

    //3- 一级分类表单验证
    $('#form1').bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //字段
        fields: {
            //字段name属性
            categoryName: {
                //验证规则
                validators: {
                    //非空
                    notEmpty: {
                        message: '一级分类不能为空'
                    }
                }
            }
        }
    });

    //4- 点击添加按钮， 表单验证通过后提交数据给后台，进行添加
    $('#form1').on('success.form.bv', function (e) {
        // 阻止表单提交
        e.preventDefault();
        //进行ajax提交
        $.ajax({
            url: '/category/addTopCategory',
            data: $('#form1').serialize(),
            type: 'post',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                //重新渲染第一页
                currentPage = 1;
                render();
                //隐藏模态框
                $('.modal-add').modal('hide');
                //重置表单
                // .resetForm(); 默认只重置表单相关样式 ，不重置数据 ， 如果重置数据，设置参数为ture
                $('#form1').data('bootstrapValidator').resetForm(true);
            }
        })
    })
})