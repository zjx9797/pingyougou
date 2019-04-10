$(function() {
    $.ajax({
        type:'get',
        url:'my/users/userinfo',
        dataType:'json',
        success:function(result) {
            console.log(result);
            if(result.meta.status==200) {
                var html=template('perinfoTemp',result.data);
                $('.perinfo').html(html);
            }
        }
    })
    $('.btn_exit').on('tap',function() {
				mui.confirm('确定要退出吗？', '温馨提示', ['是', '否'], function(e) {
					if (e.index == 0) {
                        sessionStorage.removeItem('pyg_token');
                        location.href='./login.html';
					} else {

					}
				})
    })
})
				

		