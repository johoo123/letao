$(function() {
  // 获取商品列表页传递过来的商品id
  var productId = getData("productId");
  // console.log(productId);
  // 获取对应id的商品信息
  $.ajax({
    url: "/product/queryProductDetail",
    data: { id: productId },
    dataType: "json",
    success: function(info) {
      console.log(info);
      // 渲染
      $(".mui-scroll").html(template("productTpl", info));
      // 数字选择初始化
      mui(".lt_num").numbox();
    }
  });
  // 为尺码添加选中功能
  $(".lt-main").on("click", ".lt_size span", function() {
    $(this)
      .addClass("current")
      .siblings()
      .removeClass("current");
  });
  // 点击添加到购物车，获取尺码和数量
  $("#addCart").click(function() {
    // 获取尺码
    var size = $(".lt_size .current").text();
    // console.log(size);
    // 获取数量---从mui-numbox拷贝
    var num = mui(".mui-numbox")
      .numbox()
      .getValue();
    if (!size) {
      mui.toast("请选择尺码");
      return;
    }
    // 添加商品到购物车
    $.ajax({
      url: "/cart/addCart",
      type: "POST",
      data: {
        productId: productId,
        size: size,
        num: num
      },
      dataType: "json",
      success: function(info) {
        console.log(info);
        // 如果未登陆，就先登陆
        if (info.error) {
          location.href = "login.html?reUrl="+location.href;
        } else {
          //就提示添加成功，并跳转到购物车页面
          mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(data){
            console.log(data.index);
            if(data.index==0){
              location.href='car.html';
            }
          })
        }
      }
    });
  });
});
