$(function() {
  var id = null;
  // 渲染一级分类
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategory",
      dataType: "json",
      success: function(info) {
        console.log(info);
        $(".cate-list").html(template("cate-tmp", info));
        // 继续渲染二级分类
        var id = $(".cate-list li:first-child a").data("id");
        renderSecond(id);
      }
    });
  }
  render();
  // 渲染二级分类
  function renderSecond(id) {
    $.ajax({
      url: "/category/querySecondCategory",
      data: { id: id },
      dataType: "json",
      success: function(info) {
        console.log(info);
        $(".content-list").html(template("tmp-two", info));
      }
    });
  }

  //事件委托--a点击事件
  $(".cate-list").on("click", "a", function() {
    // 为当前li添加current，为兄弟li移除current类名
    $(this)
      .parent()
      .addClass("current")
      .siblings()
      .removeClass("current");
    var id = $(this).data("id");
    // 渲染对应二级分类
    renderSecond(id);
  });
});
