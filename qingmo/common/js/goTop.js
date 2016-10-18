

$(function(){
    var $topBtn = $('#gotop');
    var $cmtBtn = $('#cmt');
    var $shareBtn = $('#share');
    var isTopBtnShow = false;
    window.onscroll = function() {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
//				console.log(t);
        if (t >= 300 && !isTopBtnShow) {
            $topBtn.css("display", "block");
            $cmtBtn.css("display", "block");
            $shareBtn.css("display", "block");
            isTopBtnShow = true;
        } else if(t < 300 && isTopBtnShow) {
            $topBtn.css("display", "none");
            $cmtBtn.css("display", "none");
            $shareBtn.css("display", "none");
            isTopBtnShow = false;
        }
    };
    //点击id为gotop的元素时网页回到顶部

    $("#gotop").click(function(){

        $('html,body').animate({scrollTop:0},500);//回到顶端

        return false;

    });


});