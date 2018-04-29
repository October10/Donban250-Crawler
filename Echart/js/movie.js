// echarts
const chartStore = {
    pie: null,
}

const optionForPie = function(data) {
    var option = {
        title: {
            text: '豆瓣top250地区占比',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
            {
                name: '地区占比',
                type: 'pie',
                radius: '65%',
                center: ['50%', '60%'],
                selectedMode: 'single',
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }

    return option
}

const optionForArea = function(area) {
    const data = _.map(area, (v, k) => {
        const o = {
            name: k,
            value: v.length,
        }
        return o
    })
    const option = optionForPie(data)
    return option
}

const renderChart = function(d) {
    const data = d

    const area = _.groupBy(data, 'area')
    const areaOption = optionForArea(area)
    const pie = chartStore.pie
    pie.setOption(areaOption)
}

const fetchMovies = function() {
    // 使用 ajax 动态获取数据
    // api.fetchMovies(function (d) {
    //     d = JSON.parse(d)
    //     renderChart(d)
    // })
    // 直接使用 JSON 数据 不从后台获取
    var d = movieJSON()
    renderChart(d)
}

const initedChart = function() {
    _.each(chartStore, (v, k) => {
        const element = document.getElementById(k)
        const chart = echarts.init(element)
        chartStore[k] = chart
    })
}

const __main = function() {
    initedChart()
    fetchMovies()
}

// $(document).ready() 是 jQuery 的回调函数
// 是页面内容(只包括元素, 不包括元素引用的图片)载入完毕之后的回调事件
$(document).ready(function() {
    __main()
})
