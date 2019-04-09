$(function(){
    //侧边菜单的初始化
    $('.mui-icon-search').on('tap',function() {
        mui('.mui-off-canvas-wrap').offCanvas('show');
    });
    //定义一个全局变量
    var data={
        query:'',
        cid:getParameter(location.search).cid,
        pagenum:1,
        pagesize:10
    };
    //封装一个ajax请求函数
    function renderList(callback,obj) {
        $.ajax({
            type:'get',
            url:'goods/search',
            data:$.extend(data,obj),
            dataType:'json',
            success:function(result) {
                callback(result);
            }
        })
    }
    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : {
            height:50,//可选,默认50.触发下拉刷新拖动距离,
            auto: true,//可选,默认false.首次加载自动下拉刷新一次
            contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
            contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
            contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
            callback :function(){  //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                data.pagenum=1;
                renderList(function(result){
                    var html=template('goodslistTemp',result.data);
                    $('.goodslist').html(html);
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); 
                    mui('#refreshContainer').pullRefresh().refresh(true)
                })
            }
          },
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:false,//可选,默认false.自动上拉加载一次
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :function(){  //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                data.pagenum++;
                renderList(function(result){
                    if(result.data.goods.length>0) {
                        var html=template('goodslistTemp',result.data);
                        $('.goodslist').append(html);
                        //如果获取导数据则加载
                        mui('#refreshContainer').pullRefresh().endPullupToRefresh();
                    }
                    else {
                        //如果获取不到数据则显示没有更多数据了
                        mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
                    }
                })
            }
          }
        }
      });
      //将网址中的字符串处理下
      function getParameter(url){
        var obj = {}
        url = url.substring(1)
        var arr = url.split('&')
        for(var i=0;i<arr.length;i++){
            var temp = arr[i].split('=')
            obj[temp[0]] = temp[1]
        }
        return obj
    }
    //点击搜索可以将输入的值赋给query渲染出搜索到的链接
    $('.query_btn').on('tap',function(){
        var ssval=$('.query_txt').val();    //储存输入的val值
        var arr = getHistoryData();         //将本地储存的字符串数据改为数组形式
        arr.push(ssval);                    //将输入的数据加入数组中
        localStorage.setItem('ssval',JSON.stringify(arr));  //将arr数组改为字符串形式再次本地存储
        init();
        var obj={};
        obj.query=$('.query_txt').val();
        renderList(function(result){
            var html=template('searchTemp',result.data);
            $('.searchList').html(html);
        },obj)
    })
    $('.ssbc').on('tap','span',function(){      //委托事件，点击span也能执行点击搜索操作，将传给query的值改成span里的内容再渲染到页面
        var obj={};
        obj.query=$(this).text();
        renderList(function(result){
            var html=template('searchTemp',result.data);
            $('.searchList').html(html);
        },obj)
    })
    $('.qingchu_btn').on('tap',function(){      //点击清除后将本地储存的删除掉并再渲染一遍变成空，不重新渲染则会需要刷新才能看到清除掉会效果很不好
        localStorage.removeItem('ssval');
        init();
    })
    function init(){                        //将数据改成数组遍历渲染到页面中
        var arr = getHistoryData();
        var html='';
        for(var i=0;i<arr.length;i++) {
            html+='<span>'+arr[i]+'</span>';
        }
        $('.ssbc').html(html);
    }
    init();
    function getHistoryData(){
        // 获取本地存储的字符串数据
        var dataStr = localStorage.getItem('ssval')
        // 将其转换为数组:一开始的时候没有当前存储的历史数据所对应的key,为了避免以后的错误，这里返回一个空值数组
        var dataArr = JSON.parse(dataStr || '[]')
        // 返回
        return dataArr;
    }
})
