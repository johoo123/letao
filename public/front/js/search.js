$(function () {
    // 1-模拟存储一些搜索记录到localstorage中    
    // 2-动态渲染历史记录
    // 3-清空历史记录
    // 4-删除指定的历史记录

    // 1-模拟存储一些搜索记录到localstorage中  
    var search = ['鞋', '鞋子', '卫衣', '韭菜馅'];
    // //存储到localStorage中
    localStorage.setItem('search', JSON.stringify(search));

    // 2-动态渲染历史记录
    function render() {
        //1-获取所有的历史记录 ,如果没有记录用空数组表示 
        var str = localStorage.getItem('search') || '[]';
        var arr = JSON.parse(str);
        console.log(arr);        
        //渲染
        $('.search-content').html(template('tmp', {list: arr}));
    }
    render();

    // 3-清空历史记录
    // 点击清空按钮，弹出模态框，确定清空 后，用removeItem()删除search对应的数据
    $('.search-content').on('click', '.clear', function () {
         //确认框
        // mui.confirm('提示信息', '标题', [按钮的值], callback)
        mui.confirm('亲，确定要清空历史吗', '清空历史', ['否', '是'], function (data) {
            console.log(data); 
            // data.index 按钮索引值
            if (data.index == 1) {
                //进行清空
                localStorage.removeItem('search');
                //重新渲染
                render();
            }
        })
    })


    // 4-删除指定的历史记录
    // 
    // 1-点击删除按钮，弹出对话框， 获取当前数据id
    // 2-把搜索历史获取出来转出数组
    // 3-从数组中进行删除
    // 4-删除完成后，在转出json 存回localstroage中
    // 5-重新渲染 
    $('.search-content').on('click', '.del', function () {
        var that = this;
        //对话框
        mui.confirm('确定要删除记录吗？', '删除记录', ['否', '是'], function (data) {
            if (data.index == 1) {
                //进行删除
                var id = $(that).data('id');
                // alert(id);
                //获取全部历史记录
                var arr = JSON.parse(localStorage.getItem('search'));
                //从数组删除
                // arr.splice(从哪删，删几个，替换项);
                arr.splice(id, 1);
                //存储到localstorage中
                localStorage.setItem('search', JSON.stringify(arr));
                //重新渲染
                render();
            }
        })
    })



    // 5- 添加搜索记录
    // 1-点击搜索按钮，获取输入框值， 值不能为空
    // 2-把搜索记录添加到localstorage中
    // 3-注意点：
    //  1-长度不能大于8条 ， 始终保留最近搜索就8条 
    //  2- 不能重复 

    $('.search-btn').click(function () {
        var txt = $('.search-txt').val();
        $('.search-txt').val(''); //清空输入框 

        setSearch(txt);

        //重新渲染
        render();


        //跳转到搜索列表页，查看搜索结果
        // 页面之间传值 
        // localhost:3000/index.html? name=zs&age=18  查询字符串
        location.href = 'searchList.html?key='+txt;
    })

})