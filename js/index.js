$(function(){
    banner();
})
function banner() {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: 'http://157.122.54.189:9094/api/public/v1/home/swiperdata',
        success: function (result) {
            console.log(result);
            var html = template('pyg_bannerTemp', result);
            $('.pyg_indexbanner').html(html);
            var listhtml=template('bannerListTemp',result);
            $('.bannerlist').html(listhtml);
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    })
}