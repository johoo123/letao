
//区域滚动
mui('.mui-scroll-wrapper').scroll({
    indicators: false, //是否显示滚动条
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

//轮播图 
var gallery = mui('.mui-slider');
gallery.slider({
  interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
});

//?key=aaa&age=22



// 获取查询字符串 指定参数的值
function getData(name) {
  //decodeURI() 对地址栏中文进行解码 
  var str = decodeURI(location.search); //?name=zs&age=11
  str = str.substr(1); // 去掉？  substr(起始索引，截取长度) 
  var arr = str.split('&');
  console.log(arr);
  var obj = {}; //用对象来存储截取结果
  arr.forEach(function (v, i) {
    var key = v.split('=')[0];
    var value = v.split('=')[1];
    obj[key] = value; //把数据存储到对象中
  });
  // console.log(obj);
  // console.log(obj[name]);
  return obj[name];  
}

//添加搜索历史 
function setSearch(txt) {
      //判断值是否为空
      if (txt.trim().length === 0) {
          mui.toast('请输入搜索内容');
          return;
      }

      //把数据添加到localStorage中 
      // 取原有数据
      var arr = JSON.parse(localStorage.getItem('search') || '[]');

      //在添加之前要去重，判断搜索记录，是否已存在，（删除之前已有那条记录，添加当前记录）
      var index = arr.indexOf(txt);  // 如果不存在 返回-1
      if (index > -1) {
          //删除之前那条记录
          arr.splice(index, 1);
      }

      // 往前面添加
      arr.unshift(txt);
      //判断 最大长度不能超过8条
      if (arr.length > 8) {
          arr.pop(); //删除最后一条
      }        
      //存储到localStorage中  
      localStorage.setItem('search', JSON.stringify(arr));
}
