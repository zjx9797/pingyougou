$(function(){
    mui('body').on('tap', 'a', function (e) {
        e.preventDefault()
        window.top.location.href = this.href;
    });
    const baseurl='http://157.122.54.189:9094/api/public/v1/';
    $.ajaxSettings.beforeSend=function(xhr,obj) {
        // $('body').addClass('loadding');
        obj.url=baseurl+obj.url;
    }
    $.ajaxSettings.complate=function() {
        // $('body').removeClass('loadding');
    }
})