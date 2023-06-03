$(function(){
    //调用总计总价函数
    getSum()
    //1.点击全选按钮时事件
    $(".checkall").change(function(){
        //prop()获取固有属性
        //每个小按钮的状态值等于全选按钮的状态值(checked的属性值)
        //另一个全选按钮也要改为全选状态
        $(".j-checkbox,.checkall").prop("checked",$(this).prop("checked"));
        //调用总计总价函数
        getSum();
        //更改背景颜色
        if($(this).prop('checked')){
            $('.cart-item').addClass('check-cart-item');
        } else {
            $('.cart-item').removeClass('check-cart-item');
        }
        //下面是自己做的
        // $('.cart-item').removeClass('check-cart-item');
        // $('.j-checkbox:checked').parents('.cart-item').addClass('check-cart-item');
    })
    //2.点击小复选框如果小复选框被选中的个数是3,那么全选按钮被选中,否则不选
    //:checked筛选选择器,$('.j-checkbox:checked') 查找.j-checkbox元素中属性为checked(为true)的元素
    $('.j-checkbox').change(function(){
        // if (被选中的小复选框==3或者小复选框个数){
        //     那就选中全选按钮
        // } else {
        //     不要选中全选按钮
        // }
        // console.log($('.j-checkbox:checked'));
        // console.log($('.j-checkbox').length)
        if ($('.j-checkbox:checked').length==$('.j-checkbox').length){
            $('.checkall').prop("checked",true);
        } else {
            $('.checkall').prop("checked",false);
        }
        //调用总计总价函数
        getSum();
         //更改背景颜色
         if($(this).prop('checked')){
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
        //下面是自己做的
        // $('.cart-item').removeClass('check-cart-item');
        // $('.j-checkbox:checked').parents('.cart-item').addClass('check-cart-item');
    })

    //3.商品数量的增减
    //点击+号时获取兄弟元素的值赋值给变量n进行加1
    //4.商品小计
    //占击+号时,单价(不要￥符号)乘以数量赋值给当前小计元素
    $('.increment').click(function(){
        var n=$(this).siblings('.itxt').val();
        n++;
        // console.log(n);
        //设置兄弟元素的值为新的n
        $(this).siblings('.itxt').val(n);

        //获取当前元素的单价
        // var p=$(this).parent().parent().siblings('.p-price').html();
        //获取指定祖先元素用parents
        var p=$(this).parents('.p-num').siblings('.p-price').html();
        //去除￥符号
        p=p.substr(1);
        // console.log(p);
        //保留两位小数toFixed(2)
        p=(p*n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥'+p);
        //调用总计总价函数
        getSum()
    })
    //点击-号时获取兄弟元素的值赋值给变量n进行减1
    $('.decrement').click(function(){
        var n=$(this).siblings('.itxt').val();
        //如果是1,return返回,函数不再往下执行
        if (n==1){
            return false;
        }
        //如果不是1,进行减1,赋值给兄弟元素
        n--;
        $(this).siblings('.itxt').val(n);

        //获取当前元素的单价
        // var p=$(this).parent().parent().siblings('.p-price').html();
        //获取指定祖先元素用parents
        var p=$(this).parents('.p-num').siblings('.p-price').html();
        //去除￥符号
        p=p.substr(1);
        // console.log(p);
        //保留两位小数
        p=(p*n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥'+p);
        //调用总计总价函数
        getSum()
    })
    
    //如果用户输入商品数量,重新计算小计 chenge()
    $('.itxt').change(function(){
        //得到数量
        var n=$(this).val();
        //商品单价
        var p=$(this).parents('.p-num').siblings('.p-price').html();
        p=p.substr(1);
        //显示小计(保留两位小数)
        $(this).parents('.p-num').siblings('.p-sum').html("￥"+(n*p).toFixed(2));
        //调用总计总价函数
        getSum()
    })

    //5.(已选商品)数量总计和总价函数

    function getSum(){
        //总件数
        var nums=0;
        //总金额
        var mony=0;
        //循环each()每一个已选元素
        $('.j-checkbox:checked').each(function(i,n){
            //获取元素的父亲.兄弟.后辈数量值
            var sl=$(n).parents('.p-checkbox').siblings('.p-num').find('.itxt').val();
            //数量小计,字符转为整数
            nums+=parseInt(sl);
            //获取对象的父亲.兄弟金额值,从1形如截取去掉￥
            var je=$(n).parents('.p-checkbox').siblings('.p-sum').text().substr(1);
            //金额总计,字符转为浮点数;
            mony+=parseFloat(je);
        })
        //更改总件数
        $('.amount-sum em').text(nums);
        //更改总金额
        $('.price-sum em').text('￥'+mony.toFixed(2));
    }

    //6.删除商品模块
    //6.1 商品后面的删除按钮
    $(".p-action a").click(function(){
        console.log(2);
        $(this).parents('.cart-item').remove();
        //调用总计总价函数
        getSum()
    })
    //6.2 删除选中的商品按钮
    $('.remove-batch').click(function(){
        $('.j-checkbox:checked').parents('.cart-item').remove();
        //调用总计总价函数
        getSum()
    })
    //6.3 清空购物车按钮 删除全部商品
    $('.clear-all').click(function(){
        $('.cart-item').remove();
        //调用总计总价函数
        getSum()
    })

    //7.选中的商品添加背景
    //教师是用if else
    //下面是自己做的
    // $('.j-checkbox').change(function(){
        // $('.cart-item').removeClass('check-cart-item');
        // $('.j-checkbox:checked').parents('.cart-item').addClass('check-cart-item');
    // })
})