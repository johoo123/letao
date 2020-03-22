$(function() {
  var currentPage = 1;
  var pageSize = 5;

  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        $("tbody").html(template("tmp", info));
        setPage(info.total);
      }
    });
  }
  // 请求数据
  render();

  //一级分类分页
  function setPage(total) {
    $("#paginator").bootstrapPaginator({
      bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
      currentPage: currentPage, //当前页
      totalPages: Math.ceil(total / pageSize), //总页数
      size: "small", //设置控件的大小，mini, small, normal,large
      onPageClicked: function(event, originalEvent, type, page) {
        //为按钮绑定点击事件 page:当前点击的按钮值
        // console.log(page);
        currentPage = page;
        render();
      }
    });
  }
  //表单验证
  $("#form1").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [":disabled", ":hidden", ":not(:visible)"],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类不能为空"
          }
        }
      }
    }
  });
  //添加分类
  $("#form1").on("success.form.bv", function(e) {
    //   阻止表单提交
    console.log(123);
    e.preventDefault();
    //进行ajax提交
    $.ajax({
      type: "post",
      url: "/category/addTopCategory",
      data: $("#form1").serialize(),
      dataType: "json",
      success: function(info) {
        currentPage = 1;
        render();
        // 隐藏模态框
        $(".modal-add").modal("hide");
        // 重置表单
        $("#form1")
          .data("bootstrapValidator")
          .resetForm(true);
      }
    });
  });
});
