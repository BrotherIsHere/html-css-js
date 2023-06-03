$(function(){
    //到达'今日推荐'位置时显示推荐模块
    //今日推荐距离顶部
    var boxTop=$('.recommend').offset().top;
    //家用电器距顶位置
    var jd=$(".jiadian").offset().top;
    
    $(document).scroll(function(){
        if ($(document).scrollTop()>=boxTop){
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    })



})