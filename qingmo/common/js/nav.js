/* 
* @Author: kaiye
* @Date:   2016-10-09 19:03:58
* @Last Modified by:   kaiye
* @Last Modified time: 2016-10-10 10:02:28
*/

jQuery(document).ready(function ($){

//顶部导航菜单
    $('.nav-search').click(function (){
        $('.nav-search-bar').toggle('fast');
        $('body').one('click', function (){$('.nav-search-bar').hide('fast');});
        return false;
    });   
    $('.nav-point').click(function (){
        $('.nav-point-list').toggle('fast');
        $('body').one('click', function (){$('.nav-point-list').hide('fast');});
        return false;
    });
    $('.denglu').click(function (){
        $('.denglu-list').toggle('fast');
        $('body').one('click', function (){$('.denglu-list').hide('fast');});
        return false;
    });
    $('.denglu-list').click(function(){return false;});
    $('.nav-point-list').click(function(){return false;});
    $('.nav-search-bar').click(function(){return false;});
    $('.nav-switch').click(function(){$('.nav-menu').slideToggle('fast');});
    $('.nav-switch').toggle(function(){$(this).css('background', '#6400A6').text('收起菜单');},
    function(){$(this).removeAttr("style").text('导航菜单');});
    $('.nav-menu ul li').hover(function (){
        var e = $(this);
        t = setTimeout(function (){
            e.children('ul').slideDown('fast');
        }, 300);
    },
    function (){clearTimeout(t);$(this).children('ul').slideUp('fast');});
    $(window).resize(function(){widthJudge();})
    function widthJudge(){var winWidth = $(window).width();if (winWidth>750){ $('.nav-menu').fadeIn('normal'); }}

    $(".current-menu-item a").each(function() {
        function c(a) {
            var c = document.body.clientWidth - a.pageX,
                d = $(".mtitle").outerWidth();
            d + 18 > c ? (x = d + 6, $(".mtitle").css({
                top: a.pageY - b + "px",
                left: a.pageX - x + "px",
                position: "absolute"
            })) : (x = -16, $(".mtitle").css({
                top: a.pageY - b + "px",
                left: a.pageX - x + "px",
                position: "absolute"
            }))
        }
        var a, b;
        this.title && (a = this.title, b = -24, $(this).mouseover(function(b) {
            this.title = "",
                $("body").append('<div class="mtitle" style="max-width:300px;color:#333;background:#f6f6f6;border:2px solid #ddd;padding:4px 12px;box-shadow:2px 3px 6px rgba(0,0,0,.5);z-index:999;display:none;">' + a + "</div>"),
                c(b),
                $(".mtitle").slideDown("fast")
        }).mouseout(function() {
            this.title = a,
                $(".mtitle").remove()
        }).mousemove(function(a) {
            c(a)
        }))
    });

    $('#nav .nav-menu li').click(function () {
        $(this).addClass('current-menu-item').siblings().removeClass('current-menu-item');
    })


})