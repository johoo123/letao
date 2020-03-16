// 1- 校验规则
$(function() {
  $("#form").bootstrapValidator({
    message: "This value is not valid",
    // 配置图标
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },
    // 对字段进行校验
    fields: {
      username: {
        message: "用户名验证失败",
        // 校验的规则
        validators: {
          // 非空校验
          notEmpty: {
            //   为空时显示的提示消息
            message: "用户名不能为空"
          },
          //   长度要求2-6位
          stringLength: {
            min: 2,
            max: 6,
            message: "用户名长度必须是 2-6 位"
          },
          callback:{
              message:"用户名不存在"
          }
        }
      },
      password: {
        message: "密码验证失败",
        // 校验的规则
        validators: {
          // 非空校验
          notEmpty: {
            //   为空时显示的提示消息
            message: "密码不能为空"
          },
          //   长度要求2-6位
          stringLength: {
            min: 2,
            max: 6,
            message: "密码长度必须是 2-6 位"
          },
          callback:{
              message:"密码不存在"
          }
        }
      },
     
    }
  });
});
//2- 重置功能
$('[type="reset"]').click(function(){
    // console.log(1111);
    // 除了重置文本，还要重置校验状态
    $('#form').data('bootstrapValidator').resetForm();
})
// 3- 进行登陆操作
$('#form').on("success.form.bv",function(e){
    // 阻止默认的表单提交
    e.preventDefault();
    $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        dataType:"json",
        data:$('#form').serialize(),
        success:function(info){
            console.log(info)
            if(info.success){
                location.href="index.html";
            }
            if(info.error===1000){
                $('#form').data("bootstrapValidator").updateStatus('username','INVALID','callback');
            }
            if(info.error===1001){
                $('#form').data("bootstrapValidator").updateStatus('password','INVALID','callback');
            }
        }
    })
})