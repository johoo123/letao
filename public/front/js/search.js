$(function() {
  // 把搜索记录存储到localStorage中
  // var search = ["鞋子", "鞋", "卫衣", "运动"];
  // localStorage.setItem("test", "abc");
  // var obj = { name: "zs" };
  // search = JSON.stringify(search);
  // localStorage.setItem("search", search);

  // 初始化搜索记录
  function render() {
    // 1. 获取存储在localStorage中的记录
    var str = localStorage.getItem("search") || "[]";
    var arr = JSON.parse(str);
    console.log({ list: arr });
    $(".search-content").html(template("search-tmp", { list: arr }));
  }
  render();
  // 点击清除，弹出对话框，点击确认，清除localStorage，重新渲染
  $(".search-content").on("click", ".clealAll", function() {
    // mui-模态框
    mui.confirm("亲，确认要清空？", "清空历史", ["否", "是"], function(data) {
      console.log(data); //按钮索引值
      if (data.index == 1) {
        console.log(1);
        //进行清空
        localStorage.removeItem("search");
        render();
      }
    });
  });
  // 删除指定的历史记录，用事件委托进行优化
  //1. 点击删除按钮，获取当前数据id
  //2. 把搜索记录获取出来，转化为数组
  //3. 从数组中删除
  //4. 删除完成，转化为字符串，存储到localStorage中
  //5. 重新渲染
  $(".search-content").on("click", ".clear", function() {
    var that = this;
    // mui-模态框
    mui.confirm("亲，确认要清空？", "清空历史", ["否", "是"], function(data) {
      console.log(data); //按钮索引值
      if (data.index == 1) {
        console.log(1);
        var id = $(that).data("id");
        // console.log(id);
        // 获取localStorage
        var str = localStorage.getItem("search");
        // 转化为数组
        var arr = JSON.parse(str);
        // 进行删除
        arr.splice(id, 1);
        // 重新转化为字符串,并存储
        localStorage.setItem("search", JSON.stringify(arr));
        render();
      }
    });
  });
  // 点击搜索按钮，获取输入的值，添加到localStorage
  $('.search-btn').click(function(){
    setSearch();
    
  })
});
