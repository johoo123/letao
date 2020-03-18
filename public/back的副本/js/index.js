$(function () {
    //设置图表1 
    // 1-初始化 获取图表的实例
    var myChart1 = echarts.init(document.getElementById('chart1'));
    // 2-准备数据
    var option = {
        title: {
            text: '2019年注册人数'
        },
        // 提示工具
        tooltip: {
            trigger: 'axis'
        },
        // 图例 
        legend: {
            data: ['销量', '人数']
        },
        // x轴
        xAxis: {
            data: ["1月", "3月", "5月", "7月", "9月", "11月"]
        },
        //y轴的刻度会根据数据自动生成
        yAxis: {},
        // 数据
        series: [
            {
                name: '销量',
                type: 'bar',  //图表类型 bar  line pie
                data: [5, 20, 36, 10, 10, 20]
            },
            {
                name: '人数',
                type: 'line',  //图表类型 bar  line pie
                data: [15, 10, 30, 20, 17, 10]
            },
        ]
    };
    // 3-根据数据生成图表
    myChart1.setOption(option);


    // 设置图标2

    // 1-初始化 获取图表的实例
    var myChart2 = echarts.init(document.getElementById('chart2'));
    // 2-准备数据
    var option2 = {
        title: {
            text: '热销品牌排行',
            subtext: '2020年1月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a}---{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪达斯', '回力', '匡威', '老北京布鞋']
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    { value: 335, name: '耐克' },
                    { value: 310, name: '阿迪达斯' },
                    { value: 234, name: '回力' },
                    { value: 135, name: '匡威' },
                    { value: 1548, name: '老北京布鞋' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 3-根据数据生成图表
    myChart2.setOption(option2);

})