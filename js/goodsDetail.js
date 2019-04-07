$(function () {
    var info = {
        cat_id: '',
        goods_id: '',
        goods_name: '',
        goods_number: '',
        goods_price: '',
        goods_small_logo: '',
        goods_weight: ''
    };
    $.ajax({
        type: 'get',
        url: 'goods/detail',
        data: $.getParameter(location.search),
        dataType: 'json',
        success: function (result) {
            info = result.data;
            // console.log(result.data);
            var html = template('gdTemp', result.data);
            $('.pyg_content').html(html);
            mui('.mui-slider').slider({
                interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
            });
        }
    })
    //点解购物车事件
    $('.gocar').on('tap', function () {
        $(".gocar").attr("disabled", "disabled");       //点击一次后禁止按钮点击
        //获取token值
        var token = sessionStorage.getItem('pyg_token');
        //如果没有token值则保存此时网址再跳转到登录页面
        if (!token) {
            sessionStorage.setItem('redirectUrl', location.href);
            location.href = './login.html';
        } else {
            $.ajax({
                type: 'post',
                url: 'my/cart/add',
                data: JSON.stringify(info),
                dataType: 'json',
                success: function (result) {
                    console.log(result);
                    if (result.meta.status == 401) { //如果有token值则发起ajax请求
                        sessionStorage.setItem('redirectUrl', location.href);
                        location.href = './login.html';
                    } else { //如果有token值则为登录过了，执行添加成功后的操作
                        var btnArray = ['是', '否'];
                        mui.confirm('添加成功，是否需要跳转到购物车？', '尊敬的有钱人', btnArray, function (e) {
                            if (e.index == 0) {
                                alert('土豪');
                            } else {
                                alert('穷鬼');
                            }
                        })
                    }
                }
            })
            $(".gocar").removeAttr("disabled"); //清除禁止按钮操作
        }
    })
})