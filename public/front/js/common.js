
  mui(".mui-scroll-wrapper").scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: false, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  });
  // 解析地址栏传递的地址
  function getData(name) {
    var str = decodeURI(location.search);
    console.log(str); //?key=22
    str = str.substr(1);
    var arr = str.split("&"); //从&处切割字符串
    var obj = {};
    arr.forEach(function(v, i) {
      var key = v.split("=")[0];
      var value = v.split("=")[1];
      obj[key] = value;
    });
    // console.log(obj[name]);//输出地址栏传递过来的值
    return obj[name];
  }
  function setSearch(){
    // 获取输入的内容
    var txt=$('.search-txt').val();
    // 如果内容为空
    if(txt.length==0){
      mui.toast('请输入搜索内容',{ duration:'short', type:'div' });
      return;
    }
    // --重要：把搜索的内容传递到地址栏的参数中
    location.href="searchList.html?key="+txt;
    // 如果不为空--把数据添加到localStorage
    var arr=JSON.parse(localStorage.getItem('search')||'[]');
    // --如果已经搜索过，利用indexOf，删除之前的记录
    // 如果不存在，返回-1
    var index=arr.indexOf(txt);

    if(index>-1){
      // 删除之前数组中的记录
      arr.splice(index,1);
    }

    // 把txt添加到数组前面
    arr.unshift(txt);
    // 判断最大长度不能大于8
    if(arr.length>8){
      // 删除数组的最后一个
      arr.pop();
    }
    // 存储到localStorage中
    localStorage.setItem('search',JSON.stringify(arr));
    // 初始化搜索记录
    render();
    
  }

