$(function(){
    //处理mui屏蔽a标签的链接
    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });
    //定义基本链接
    const baseurl='http://157.122.54.189:9094/api/public/v1/';
    //请求前做的事情
    $.ajaxSettings.beforeSend=function(xhr,obj) {
        // $('body').addClass('loadding');
        //拼接链接
        obj.url=baseurl+obj.url;
    }
    //请求后做的事情
    $.ajaxSettings.complate=function() {
        // $('body').removeClass('loadding');
    }
})