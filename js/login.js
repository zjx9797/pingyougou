$(function () {
    //登录点击事件
    $('.mui-btn-primary').on('tap', function () {
        //将输入的值保存起来
        var obj = {
            username: '',
            password: ''
        }
        obj.username = $('.username').val();
        obj.password = $('.password').val();
        //正则表达式判断手机号错误就跳出
        if (!/^1[3-9]\d{9}$/.test(obj.username)) {
            mui.toast('手机号格式错误');
            return;
        }
        if (obj.password.length < 6) {
            mui.toast('密码小于6位');
            return;
        }
        //如果格式正确则发起ajax请求
        $.ajax({
            type: 'post',
            url: 'login',
            data: obj,
            dataType: 'json',
            success: function (result) {
                console.log(result);
                //如果成功则保存token值
                if (result.meta.status == 200) {
                    mui.toast('登录成功');
                    sessionStorage.setItem('pyg_token', result.data.token);
                    //获取跳转前本地保存的网址
                    var re = sessionStorage.getItem('redirectUrl');
                    //如果有这个值就跳转到这个网址
                    if (re) {
                        location.href = re;
                    } else {    //如果没有则跳去首页，这种情况是你进去网页直接登录并没有按加入购物车进去，所以没有保存网址，这样跳转到首页就可以了
                        location.href = '/index.html';
                    }
                } else {    //如果登录失败则将错误信息弹窗出来
                    mui.toast(result.meta.msg);
                }
            }
        })
    })
    $('.mui-btn-danger').on('tap',function() {
        location.href='register.html'
    })
})