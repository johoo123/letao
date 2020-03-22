$(function() {
  var currentPage = 1;
  var pageSize = 5;
  var picArr = [];
  function render() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
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
  render();
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
  //添加商品模态框下拉列表填充
  //请求一级列表数据
  $.ajax({
    url: "/category/querySecondCategoryPaging",
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
    $("[name='brandId']").val($(this).data("id"));
    //当选择一级分类后，把状态有失败改为验证通过
    // 1-验证的字段
    // 2-状态
    // 3-提示信息
    $("#form1")
      .data("bootstrapValidator")
      .updateStatus("brandId", "VALID");
  });
  //上传图片到图片服务器---使用fileupload插件
  $("#file").fileupload({
    dataType: "json",
    done: function(e, data) {
      console.log(data);

      var picObj = data.result;
      var picAddr = picObj.picAddr;
      //把图片服务器返回的存储地址的对象追加到数组的前面
      picArr.unshift(data.result);
      //显示图片，向图片盒子前面添加
      $(".pic-box").prepend('<img src="' + picAddr + '" height="100" >');
      //如果图片大于3张，则删除最后面，追加到第一个
      if (picArr.length > 3) {
        // 删除最后一个元素
        picArr.pop();
        //图片容器删除最后一个图片 remove() 自杀   empty() 清空盒子内部
        $(".pic-box img:last-child").remove();
      }
      console.log(picArr);
      //验证更新状态
      if (picArr.length == 3) {
        $("#form1")
          .data("bootstrapValidator")
          .updateStatus("picStatus", "VALID");
      }
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
      brandId: {
        validators: {
          notEmpty: {
            message: "二级分类不能为空"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "商品名称不能为空"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "商品描述不能为空"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "库存不能为空"
          },
          //正则校验
          regexp: {
            //要验证正则表达式
            regexp: /^[1-9]\d*$/,
            message: "商品库存必须是非零开头数字！"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "尺码不能为空"
          },
          //正则校验
          regexp: {
            regexp: /^[1-9]\d{1}-[1-9]\d{1}$/,
            message: "商品尺码必须是 xx-xx格式， x是数字"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "原价不能为空"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "现价不能为空"
          }
        }
      },
      picStatus: {
        validators: {
          notEmpty: {
            message: "图片必须上传3张！"
          }
        }
      }
    }
  });
  //验证完成
  $("#form1").on("success.form.bv", function(e) {
    e.preventDefault();
    var str = $("#form1").serialize();
    //把数组中三张图片 的数据转出json字符串，拼接在查询字符串后面
    str += "&" + "picArr=" + JSON.stringify(picArr);
    console.log(str);
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: str,
      dataType: "json",
      success: function(info) {
        // console.log(info);
        $(".modal-add").modal("hide");
        // 2-重新渲染第一页
        currentPage = 1;
        render();
        // 3- 表单重置验证样式 和 数据
        $("#form1")
          .data("bootstrapValidator")
          .resetForm(true);
        // 4-手动重置 图片列表 和 下拉列表
        $(".pic-box").empty(); //清空盒子内部
        $(".title-text").text("请选择二级分类");
        // 5-数组重置
        picArr = []; //把本次添加数据清除，避免影响下次判断
      }
    });
  });
});
