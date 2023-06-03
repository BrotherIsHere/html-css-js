window.addEventListener('load',function(){
    // 1.鼠标经过轮播图,左右按钮显示,离开隐藏,自动播放图片
    var promo=this.document.querySelector('.tb-promo');
    var prev=this.document.querySelector('.prev');
    var next=this.document.querySelector('.next');
    promo.addEventListener('mouseover',function(){
        prev.style.display='block';
        next.style.display='block';
        // clearInterval(ul.timer2);
        // ul.timer2=null;
        clearInterval(timer3);
        timer3=null;
    })
    //2.鼠标离开 自动播放开始
    promo.addEventListener('mouseout',function(){
        prev.style.display='none';
        next.style.display='none';
        // ul.timer2=setInterval(bofang,2000);
        timer3=setInterval(function(){
            next.click();
        },2000)
    })
    //3.动态生成小圆圈插入到ol里
    var ul=this.document.querySelector('ul');
    var ol=this.document.querySelector('ol');
    for (var i=0;i<ul.children.length;i++){
        //创建小li
        var li=this.document.createElement('li');
        //记录当前小圆圈的索引号,为了和图片相对应,自定义属性
        li.setAttribute('index',i)
        // 反小li插入到ol里面
        ol.appendChild(li);
        //4.小圆圈的排他思想,生成小圆圈的时候同时绑定事件
        li.addEventListener('click',function(){
            //干掉所有人 所有小li的类名清除
            for (var i=0;i<ol.children.length;i++){
                ol.children[i].className='';
            }
            //留下我自己
            this.className='selected';
            //5.点击小圆圈,移动图片(ul)
            //ul移动必须有定位才行,li不能动否则其他li没位置, 
            //图片滚动的核心算法:点击某个小圆圈,ul移动的距离:小圆圈的索引号乘以图片宽度
            //左走是负值
            //图片宽度=盒子宽度
            var promoWidth=promo.offsetWidth;
            //点击某个小li,拿到这个小li的索引号
            var index=this.getAttribute('index');
            //点击某个小li,把这个索引号给num
            num=index;
            //点击某个小li,把这个同时给小圆圈
            circle=index;
            // console.log(promoWidth,index);
            //调用动画函数
            animate(ul,-index*promoWidth)
        })
    }
    ol.children[0].className='selected';
    //6.无缝滚动:
    //.克隆第一张图片放到ul最后面
    var first=ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //点击右侧按钮一次,图片滚动一张
    var num=0;
    //circle控制小圆圈的播放
    var circle=0;
    //右侧点击事件
    //加节流阀,防止过快点击使图片快速滚动,只有加载完一图才能加载另一图片
    //利用回调函数最后执行的原理,图片加载完后执行回调函数将flag修改为true,未调用前为false
    var flag=true;
    next.addEventListener('click',bofang
        
        // //如果走到了最后一张,此时要快速复原left为0
        // if(num==ul.children.length-1){
        //     ul.style.left=0;
        //     num=0;
        // }
        // num++;
        // animate(ul,-num*promo.offsetWidth);
        // //点击按钮,小圆圈跟随一起变化,可以再声明一个变量circle
        // circle++;
        // //如果走到最后一张,circle为0
        // if (circle==ol.children.length){
        //     circle=0
        // }
        // //先清除其余小圆圈的类名
        // // for (var i=0;i<ol.children.length;i++){
        // //     ol.children[i].className='';
        // // }
        // //留下当前小圆圈的类名
        // // ol.children[circle].className='selected';
        // circlechange()
    )
    //左侧点击事件
    prev.addEventListener('click',function(){
        //加节流阀,防止过快点击使图片快速滚动,只有加载完一图才能加载另一图片
        //利用回调函数最后执行的原理,图片加载完后执行回调函数将flag修改为true,未调用前为false
        if (flag){
            flag=false;
            //如果走到了第一张,此时要快速复原为最后一张
            var promoWidth=promo.offsetWidth;
            if(num==0){
                num=ul.children.length-1;
                ul.style.left=-num*promoWidth+'px';
            }
            num--;
            animate(ul,-num*promo.offsetWidth,function(){
                flag=true;  //打开水龙头
            });
            //点击按钮,小圆圈跟随一起变化,变量circle
            circle--;
            //如果走到第一张,circle为最大
            // if (circle<0){
            //     circle=ol.children.length-1;
            // }
            //优化为三元表达式
            circle=circle<0 ? ol.children.length-1 : circle;
            //先清除其余小圆圈的类名
            // for (var i=0;i<ol.children.length;i++){
            //     ol.children[i].className='';
            // }
            //留下当前小圆圈的类名
            // ol.children[circle].className='selected';
            circlechange();
            }
        
    })
    //播放图片函数:(类似右侧按钮)
    function bofang(){
        //加节流阀,防止过快点击使图片快速滚动,只有加载完一图才能加载另一图片
        //利用回调函数最后执行的原理,图片加载完后执行回调函数将flag修改为true,未调用前为false
        if(flag){
            flag=false; //关闭水龙头
            //如果走到了最后一张,此时要快速复原left为0
            if(num==ul.children.length-1){
                ul.style.left=0;
                num=0;
            }
            num++;
            animate(ul,-num*promo.offsetWidth,function(){
                flag=true;  //打开水龙头
            });
            //点击按钮,小圆圈跟随一起变化,可以再声明一个变量circle
            circle++;
            //如果走到最后一张,circle为0
            // if (circle==ol.children.length){
            //     circle=0
            // }
            //代码优化为三元表达式
            circle=circle==ol.children.length? 0: circle;
            //先清除其余小圆圈的类名
            // for (var i=0;i<ol.children.length;i++){
            //     ol.children[i].className='';
            // }
            //留下当前小圆圈的类名
            // ol.children[circle].className='selected';
            circlechange()}
        
    }
    //自动播放图片
    // ul.timer2=setInterval(bofang,2000);
    //自动播放图片第二种方法:手动调用右键点击程序
    var timer3=setInterval(function(){
        next.click();
    },2000)
    //对应小圆圈显示函数
    function circlechange(){
        //先清除其余小圆圈的类名
        for (var i=0;i<ol.children.length;i++){
            ol.children[i].className='';
        }
        //留下当前小圆圈的类名
        ol.children[circle].className='selected';
    }

})