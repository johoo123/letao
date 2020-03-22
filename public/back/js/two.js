$(function() {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
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
  //分页
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
  //请求一级列表数据
  $.ajax({
    url: "/category/queryTopCategoryPaging",
    data: {
      page: 1,
      pageSize: 100
    },
    dataType: "json",
    success: function(info) {
      console.log(info);
      //填充一级分类
      $(".cate-list").html(template("tmp-cate", info));
    }
  });
  //保存一级列表的值和显示内容
  $(".cate-list").on("click", "a", function() {
    //替换原来的占位文字
    $(".title-text").text($(this).text());
    //保存id
    $("[name='categoryId']").val($(this).data("id"));
    //当选择一级分类后，把状态有失败改为验证通过
    // 1-验证的字段
    // 2-状态
    // 3-提示信息
    $("#form1")
      .data("bootstrapValidator")
      .updateStatus("categoryId", "VALID");
  });
  //上传图片到图片服务器---使用fileupload插件
  $("#file").fileupload({
    dataType: "json",
    done: function(e, data) {
      // console.log(data);
      // 在图片服务器返回的数据中找到picAddr
      var url = data.result.picAddr;
      $("#img").attr("src", url);
      // 把服务器返回的图片保存地址存储到隐藏域
      $('[name="brandLogo"]').val(url);
      //把图片状态 设置验证通过
      $("#form1")
        .data("bootstrapValidator")
        .updateStatus("brandLogo", "VALID");
    }
  });
  //表单验证
  $("#form1").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: "一级分类不能为空"
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "分类名称不能为空"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "logo不能为空"
          }
        }
      },
      hot: {
        validators: {
          notEmpty: {
            message: "热门不能为空"
          }
        }
      }
    }
  });
  // 把hot赋值给隐藏域
  $(".hot-list a").click(function() {
    $("[name='hot']").val($(this).data("id"));
    // console.log($("[name='hot']").val());
    $(".title-hot").text($(this).text());
  });
  // 添加二级分类
  $("#form1").on("success.form.bv", function(e) {
    // 阻止默认行为
    e.preventDefault();
    // ajax提交
    $.ajax({
      url: "/category/addSecondCategory",
      type: "post",
      data: $("#form1").serialize(),
      dataType: "json",
      success: function(info) {
        console.log(info);
        currentPage = 1;
        render();
        $(".modal-add").modal("hide");
        // 重置
        $(".title-text").text("请选择一级分类");
        $(".title-hot").text("请选择是否为热门");
        $("#img").attr("src", "./images/none.png");
        //重置表单验证样式和数据
        $('#form1').data('bootstrapValidator').resetForm(true);
      }
    });
  });
});
