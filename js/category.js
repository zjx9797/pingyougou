$(function () {
    render();
    var cateDate;
    function render() {
        cateDate = JSON.parse(localStorage.getItem('abc'))
        if (cateDate && Date.now() - cateDate.time < 24 * 60 * 60 * 1000) {
            leftList();
            rightList(0);
        } else {
            getList();
        }
    }

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