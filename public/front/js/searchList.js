$(function() {
  // 获取传递过来的值
  var key = getData("key");
  console.log(key);
  // 把关键词的值放到输入框中
  $(".search-txt").val(key);
  // 根据关键词请求对应的商品，进行渲染
  var obj = {
    proName: key,
    page: 1,
    pageSize: 100
  };
  // 渲染商品列表页面
  function renderList() {
    $.ajax({
      url: "/product/queryProduct",
      data: obj,
      dataType: "json",
      beforeSend: function() {
        $(".lt_product").html('<div class="loading"></div>');
      },
      success: function(info) {
        // 过500ms之后再进行渲染
        setTimeout(function() {
          console.log(info);
          $(".lt_product").html(template("tmp", info));
        }, 500);
      }
    });
  }
  renderList();
  // 根据箭头向上还是向下判断升序或降序
  $(".price").click(function() {
    // 如果有current类名，就切换箭头的方向
    if ($(this).hasClass("current")) {
      $(this)
        .find("span:last-child")
        .toggleClass("mui-icon-arrowup mui-icon-arrowdown");
    }
    $(this).addClass("current");
    // 判断升序还是降序
    var price = $(this)
      .find("span:last-child")
      .hasClass("mui-icon-arrowup")
      ? 1
      : 2;
    obj.price = price;
    renderList();
  });
  // 点击搜索按钮，获取输入框的值，请求数据并渲染
  $(".search-btn").click(function() {
    // 获取输入框的值
    var txt = $(".search-txt").val();
    // 不需要清空输入框
    setSearch();
    // 修改搜索关键词
    obj.proName = txt;
    renderList();
  });
});
