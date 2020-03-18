
$(function () {
    //1- 表单验证
    // 1-用户名和密码不能为空
    // 2-用户名2-6位
    // 3-密码 6-12位
    // 调用表单验证的方法
    $('#form').bootstrapValidator({

        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            // valid: 'glyphicon glyphicon-ok',
            valid: 'glyphicon glyphicon-heart',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3.对表单数据进行验证  fields 字段  对那些字段进行验证 
        fields: {
            //username 是表单name属性
            username: {
                // 验证规则
                validators: {
                    // 非空
                    notEmpty: {
                        message: '用户名不能为空！'
                    },
                    // 长度限制
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度2-6位！'
                    },
                    //拓展错误提示消息
                    callback: {
                        message: '用户名不存在!'
                    }
                }
            },
            //密码
            password: {
                //验证规则
                validators: {
                    //非空
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    //长度限制
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度为6-12位'
                    },
                    //拓展一个密码错误消息
                    callback: {
                        message: '密码错误！'
                    }
                }
            }
        }
    });

    // 2- 重置表单全部样式 （验证样式）
    // 1-reset按钮的默认行为是重置表单数据
    // 2-resetForm 用于重置表单验证样式
    // $('#form').data('bootstrapValidator') 获取表单校验实例，通过实例可以调用插件方法 
    $('.btn-reset').click(function () {
        //重置表单全部样式
        $('#form').data('bootstrapValidator').resetForm();
    });


    // 3-表单校验通过后，发送ajax请求，进行登录，要阻止表单默认提交行为
    // 当点击提交按钮是，插件会进行验证，如果验证通过出触发表单 自身 success.form.bv事件 
    $('#form').on('success.form.bv', function (e) {
        //阻止默认行为
        e.preventDefault();
        //把表单数据发送给后他进行判断
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $('#form').serialize(), //name=zs&age=18
            dataType: 'json',
            success: function (info) {
                console.log(info);        
                if (info.error) {
                    //失败
                    // alert('登录失败');
                    if (info.error == 1000) {
                        //用户名错误  把用户校验状态改为校验失败
                        // updateStatus()
                        // 参数一： 要更新的字段
                        // 参数二： 字段状态 
                        //参数三：  显示错误信息
                        $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
                    }
                    if (info.error == 1001) {
                        //密码错误 把用户校验状态改为校验失败
                        $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
                    }

                } else {
                    //成功
                    // alert('登录成功');
                    //跳转到首页
                    location.href = './index.html';
                }

            }
        })
    });



});