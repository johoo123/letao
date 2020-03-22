$(function () {
    var currentPage = 1;
    var pageSize = 3;
    var picArr = []; //用于存放最近上传三张图片 
    //1-请求并渲染第一屏数据
    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                // 渲染
                $('tbody').html(template('tmp', info));
                // 生成分页标签
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
                currentPage = page; //记录当前页变化
                render();
            }
        });
    }

    // 3-填充二级分类的数据
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        data: {
            page: 1,
            pageSize: 100
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            //渲染
            $('.brand-list').html(template('tmp-brand', info));
        }

    })

    // 4-点击二级分类下拉列表，把选择品牌文字赋值给按钮， 用隐藏域保持数据id  
    $('.brand-list').on('click', 'a', function () {
        //把当前a标签文字， 赋值给按钮
        $('.title-text').text($(this).text());
        //隐藏保持数据id
        $('[name="brandId"]').val($(this).data('id'));
        //品牌id 验证状态设置为通过
        $('#form1').data('bootstrapValidator').updateStatus('brandId', 'VALID');
    });

    // 5- 上传商品图片
    // 商品 需要保留最新上传 三张，显示最新上传3张图片
    $("#file").fileupload({
        dataType: "json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        // 数组方法：
        // push() 追加  pop() 删除最后一个元素
        // unshift() 向最前面添加    shift 删除第一个元素
        done: function (e, data) {
            console.log(data);
            //把最新上传图片 添加到数组前面
            picArr.unshift(data.result);
            //显示当前图片,向盒子前面去添加
            $('.pic-box').prepend('<img src="' + data.result.picAddr + '" height="100" >');
            //图片大于三张
            if (picArr.length > 3) {
                // 删除最后一个元素
                picArr.pop();
                //图片容器删除最后一个图片 remove() 自杀   empty() 清空盒子内部                  
                $('.pic-box img:last-child').remove();
            }
            console.log(picArr);

            //如果图片个数等于3,则图片验证通过 
            if (picArr.length == 3) {
                $('#form1').data('bootstrapValidator').updateStatus('picStatus', 'VALID');
            }

        }
    });

    //6-对表单数据进行验证 
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
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择二级分类！'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品名称！'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品描述！'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品库存！'
                    },
                    //正则校验
                    regexp: {
                        //要验证正则表达式
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存必须是非零开头数字！'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码！'
                    },
                    //正则校验
                    regexp: {
                        regexp: /^[1-9]\d{1}-[1-9]\d{1}$/,
                        message: '商品尺码必须是 xx-xx格式， x是数字'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品原价！'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品现价！'
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: '图片必须上传3张！'
                    }
                }
            }
        }
    })

    //7-表单验证通过后，向后台发送ajax请求， 添加商品数据
    $('#form1').on('success.form.bv', function (e) {
        e.preventDefault(); //阻止默认行为 
        //处理数据
        var str = $('#form1').serialize();
        //把数组中三张图片 的数据转出json字符串，拼接在查询字符串后面
        str += '&' + 'picArr=' + JSON.stringify(picArr);
        // console.log(str);

        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: str,
            dataType: 'json',
            success: function (info) {
                console.log(info); 
                //添加成功后
                // 1-隐藏模态框
                $('.modal-add').modal('hide');
                // 2-重新渲染第一页
                currentPage = 1;
                render();
                // 3- 表单重置验证样式 和 数据 
                $('#form1').data('bootstrapValidator').resetForm(true);
                // 4-手动重置 图片列表 和 下拉列表 
                $('.pic-box').empty(); //清空盒子内部
                $('.title-text').text('请选择二级分类');
                // 5-数组重置 
                picArr = []; //把本次添加数据清除，避免影响下次判断 

            }
        });
    })
})