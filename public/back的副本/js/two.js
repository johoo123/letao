$(function () {
    var currentPage = 1;
    var pageSize = 5;

    //1-获取分类数据并渲染
    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
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

    //2-分页
    function setPage(total) {
        $('#paginator').bootstrapPaginator({
            bootstrapMajorVersion: 3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: currentPage,//当前页
            totalPages: Math.ceil(total / pageSize),//总页数
            onPageClicked: function (event, originalEvent, type, page) {
                //为按钮绑定点击事件 page:当前点击的按钮值
                currentPage = page;
                render();//重新渲染页面
            }
        });
    }

    //3-填充下拉列表数据
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        data: {
            page: 1,
            pageSize: 100
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            //填充一级分类
            $('.dropdown-menu').html(template('tmp-cate', info));
        }
    })

    //4-点击下拉列表选项，获取选项的值，赋值按钮， 并保存当前数据id到隐藏域
    $('.cate-list').on('click', 'a', function () {
        // alert($(this).text());
        //把当前a标签文字赋值给按钮
        $('.title-text').text($(this).text());
        //把当前a标签id赋值给隐藏域
        $('[name="categoryId"]').val($(this).data('id'));

        //当选择一级分类后，把状态有失败改为验证通过
        // 1-验证的字段
        // 2-状态
        // 3-提示信息
        $('#form1').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })

    //5-单独上传图片到图片服务器
    $('#file').fileupload({
        dataType: 'json', //后台返回数据格式
        //后保存图片成后 回调函数， 
        // e事件对象
        // data 后台保存图片 地址相关的信息 
        done: function (e, data) {
            console.log(data.result.picAddr);
            var url = data.result.picAddr;
            //根据图片地址实现 图片预览
            $('#img').attr('src', url);
            // 把图片服务器保存地址 赋值给隐藏， 
            $('[name="brandLogo"]').val(url);
            //把图片状态 设置验证通过
            $('#form1').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    })



    //6-添加分类的表单验证
    $('#form1').bootstrapValidator({

        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3-字段
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请选择图片'
                    }
                }
            },
        }
    });

    //7-添加二级分类
    $('#form1').on('success.form.bv', function (e) {
        //阻止默认行为
        e.preventDefault();
        //ajax提交
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: $('#form1').serialize(),
            dataType: 'json',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    // 隐藏模态框
                    $('.modal-add').modal('hide');
                    //重新渲染
                    currentPage = 1;
                    render();
                    //重置表单验证样式和数据
                    $('#form1').data('bootstrapValidator').resetForm(true);
                    //手动重置 一级分类按钮文章 和图片 
                    $('.title-text').text('请选择一级分类');
                    $('#img').attr('src', './images/none.png');
                }
                
            }
        })
    });

})