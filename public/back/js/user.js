$(function() {
  var currentPage = 1;
  var pageSize = 5;
  var id = null;
  var isDelete = null;
  render();
  // 用户渲染
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage || 1,
        pageSize: pageSize || 5
      },
      dataType: "json",
      success: function(data) {
        // console.log(data);
        $("tbody").html(template("tmp", data));
        setPage(data.total);
      }
    });
  }
  // 分页功能
  function setPage(total) {
    $("#pagintor").bootstrapPaginator({
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
  // 提交按钮--启用/禁用
  $("tbody").on("click", ".button", function() {
    id = $(this).parent().data("id");
    isDelete = $(this).hasClass("btn-success") ? 1 : 0;
    console.log(id);
    console.log(isDelete);
  });
  $(".btn-ok").click(function() {
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: id,
        isDelete: isDelete
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        render();
        // 隐藏模态框
        $('.modal-user').modal('hide'); 

      }
    });
  });
});
