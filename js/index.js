$(function(){
    // 动态生成轮播图结构
    $.ajax({
        type:'get',
        url:'http://157.122.54.189:9094/api/public/v1/home/swiperdata',
        dataType:'json',
        success:function(result){
            console.log(result)
            if(result.meta.status == 200){
                // 只有获取数据成功了，才有必要生成动态结构
                // 生成图片结构
                var html = template('pyg_bannerTemp',result)
                console.log(html)
                $('.pyg_indexbanner').html(html)
                // 生成点标记结构
                var indiHTML = template('indicatorTemp',result)
                $('.mui-slider-indicator').html(indiHTML)
                mui('.mui-slider').slider({
                    interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
                });
            }
        }
    })
})