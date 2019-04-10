$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false
    });
    //请求查看购物车数据
    function init() {
        $.ajax({
            type: 'get',
            url: 'my/cart/all',
            dataType: 'json',
            success: function (result) {
                console.log(result);
                if(result.meta.status==200) {
                    var data = JSON.parse(result.data.cart_info);
                    // console.log(data);
                    var html = template('orderTemp', {
                        list: data
                    });
                    $('.cart_order_content').html(html);
                    mui('.mui-numbox').numbox(); //将商品数量按钮初始化
                    pricenum(); //执行计算总金额事件
                }else {
                    location.href='login.html';
                }
                
            }
        })
    }
    init();
    $('.pyg_orderEdit').on('tap', function () { //点击右上角按钮
        $('body').toggleClass('eleToggle'); //切换body的类使之隐藏和显示
        if ($('.pyg_orderEdit').text() == '编辑') { //如果按钮为编辑则改成完成否则反之
            $('.pyg_orderEdit').text('完成')
        } else {
            $('.pyg_orderEdit').text('编辑');
            //写购物车的同步更新
            synccart($('.order_content_list'))
        }
    })
    //点击删除按钮是事件
    $('.pyg_orderDe').on('tap', function () {
        mui.confirm('确认要删除吗？', '温馨提示', ['是', '否'], function (e) {
            if (e.index == 0) {
                var dataarr = $('.checkeda').not(":checked").parent().parent(); //将没有点复选框的节点选中
                $('body').toggleClass('eleToggle'); //切换body的类使之隐藏和显示
                $('.pyg_orderEdit').text('编辑');   //改变为编辑
                synccart(dataarr);                  //执行同步购物车
            }
        })
    })
    //计算总金额事件
    function pricenum() {
        var num = 0;
        $('.order_content_list').each(function (index, value) {
            // console.log(index,value);
            var price = $(value).data('order').goods_price;
            var number = $(value).find('#test').val();
            num = num + (price * number);
        })
        $('.price').text('￥ ' + num);
    }
    //在点击加减商品后执行计算总金额事件
    $('.cart_order_content').on('tap', '.cart_info_wrap .mui-btn', function () {
        pricenum();
    })
    //同步购物车事件，传一个需要更新的参数，删除时不将删除掉的放进来
    function synccart(dataarr) {
        var obj = {};
        for (var i = 0; i < dataarr.length; i++) { //遍历所有需要更新的数据
            var data = $(dataarr[i]).data('order'); //将data-order值获得
            // console.log(data);
            data.amount = $(dataarr[i]).find('#test').val(); //修改买的商品数量
            obj[data.goods_id] = data; //将数据存进obj中
        }
        // console.log(obj);
        //发起同步购物车的请求
        $.ajax({
            type: 'post',
            url: 'my/cart/sync',
            data: {
                'infos': JSON.stringify(obj)
            }, //将上面obj传进来给infos
            success: function (result) {
                // console.log(result);
                if (result.meta.status == 200) { //成功则显示成功
                    mui.toast('修改成功');
                    init();         //再发起请求渲染页面
                } else { //失败则显示原因
                    mui.toast(result.meta.msg);
                }
            }
        })
    }
})