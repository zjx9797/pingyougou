$(function () {
    render();
    //定义一个对象储存获取来的数据
    var cateDate;
    //定义路由函数
    function render() {
        //将储存的数据变成对象存到cateDate中
        cateDate = JSON.parse(localStorage.getItem('abc'))
        //判断超过这个世界就重新发起请求
        if (cateDate && Date.now() - cateDate.time < 24 * 60 * 60 * 1000) {
            leftList();
            rightList(0);
        } else {
            getList();
        }
    }
    //请求数据并保存数据
    function getList() {
        $('body').addClass('loadding');
        $.get('categories', function (result) {
            if (result.meta.status == 200) {
                cateDate = {
                    'list': result.data,
                    time: Date.now()
                };
                localStorage.setItem('abc', JSON.stringify(cateDate));
                leftList();
                rightList(0);
            }
        }, 'json')
    }
    //渲染左边列表
    function leftList() {
        var html = template('leftnavTemp', cateDate)
        $('.left ul').html(html)
        var myScroll = new IScroll('.left');
        $('.left').on('tap', 'li', function () {
            $(this).addClass('active').siblings().removeClass('active');
            myScroll.scrollToElement(this);
            var index = $(this).index();
            rightList(index);
        })
    }
    //渲染右边列表
    function rightList(index) {
        var rhtml = template('rightListTemp', cateDate.list[index]);
        $('.rightList').html(rhtml);
        var imgcount = $('.rightList img').length;
        console.log(imgcount);
        $('.rightList img').on('load', function () {
            imgcount--;
            if (imgcount == 0) {
                $('body').removeClass('loadding');
                var myScroll = new IScroll('.right');
            }
        })
    }
})