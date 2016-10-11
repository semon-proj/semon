$(function(){
    var nowimg=0;
        
        var $rightBtn= $(".rightBtn")
        var $leftBtn= $(".leftBtn")
        var lis=$(".banner-in li")
        var $banner=$(".banner")
        var $circle=$(".circle span")
        var animateTime=300;
        var timer=null;
        var setTimer=3200;

        var $bannerIn=$(".banner .banner-in")
        $(".banner-in>li:first").clone().appendTo(".banner-in")
        // rightBtn
        $rightBtn.click(rightBtnfunc)
            function rightBtnfunc() {
            if(!$bannerIn.is(":animated")){
                if(nowimg<lis.length-1){
                nowimg++
                putong();
            }else{
                nowimg=0;
                $bannerIn.animate({"left":lis.length*-430}, animateTime,function(){
                   $bannerIn.css("left",0)
                 })
            }
            $circle.eq(nowimg).addClass('cur').siblings().removeClass("cur")
            }
        }
        // leftBtn
        $leftBtn.click(function() {
          if(!$bannerIn.is(":animated")){
            if(nowimg>0){
            nowimg--
            putong();
          }else{
            nowimg=lis.length-1
            $bannerIn.css("left",lis.length*-430)
           putong();
          }
           $circle.eq(nowimg).addClass('cur').siblings().removeClass("cur")
          }
        });
        // 小圆点业务
        $circle.mouseover(function() {
            nowimg=$(this).index()
            $bannerIn.animate({"left":nowimg*-430}, animateTime)
             $circle.eq(nowimg).addClass('cur').siblings().removeClass("cur")
        });
        function putong(){
            $bannerIn.animate({"left":nowimg*-430}, animateTime)
        }
        timer=setInterval(rightBtnfunc,setTimer)
        $banner.mouseenter(function() {
           clearInterval(timer)
        });
        $banner.mouseleave(function() {
           clearInterval(timer)
           timer=setInterval(rightBtnfunc,setTimer)
        });
        })();