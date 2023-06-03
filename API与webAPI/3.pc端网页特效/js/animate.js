//(缓动)动画函数
function animate(obj,target,callback){   //元素 停止位置值  callback回调函数(结束时调用的函数)
    //问题:点击qqqq越多,开启的定时器越多,移动的越快
    //解决方法:先清除以前的定时器,只保留当前的定时器
    // callback()  //普通函数,不是回调函数,结束调用才是回调函数 调用函数用()
    clearInterval(obj.timer)
    //将var timer变为obj.timer
    obj.timer=setInterval(function() {  //间隔定时器
        //缓动时步长逐渐减小
        var step= (target-obj.offsetLeft)/15;
        //步长值取整,大于0时往大取整Math.ceil,负数时往小取整;
        step=step>0? Math.ceil(step) :Math.floor(step);
        //定时器停止条件
        if (obj.offsetLeft==target){
            // 停止定时器
            clearInterval(obj.timer);

            // if (callback){
            //     callback();
            // }
            //callback高级写法
            callback&&callback();  //短路与
        }
        //把每次步长加固定值改为一个慢慢变小的值会实现缓动动画
        obj.style.left=obj.offsetLeft+step+'px'; //盒子当前的位置
    }, 30);
}