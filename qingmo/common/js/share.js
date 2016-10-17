$(document).ready(function () {

    $('.ds-sort a').click(function () {
        $(this).addClass('ds-current').siblings().removeClass('ds-current');
    })

    $('.ds-more-services').click(function () {
        $(this).parents('.ds-service-list').next().toggle();
    })

    $('.ds-textarea-wrapper').click(function () {
        $('#ds-wrapper').css('display','block')
    })

    $('#ds-wrapper').click(function () {
        $(this).css('display','none')
    })

    $(".related-post a").each(function () {

        $(this).mouseenter(function (e) {
            // alert(e.offsetX);
            // alert(e.offsetY);
            aTip = this.title;
            this.title = "";
//                            console.log(aTip);
            $aTip = $("<div class='clear'></div> <div id='aTip'>" + aTip + "</div> <div class='clear'></div> ");
//                            console.log($aTip);
            $aTip.appendTo("body");
            $("#aTip").css({
//                                距离计算问题,弹出的框显示的位置
                top: (e.pageY+20) + "px",
                left: (e.pageX+30) + "px"
            }).show();
        }).mouseleave(function () {
            this.title = aTip;
            $aTip.remove();
        }).mousemove(function (e) {
            $("#aTip").css({
                position: "absolute",
                top: (e.pageY+20) + "px",
                left: (e.pageX+30) + "px"
            });
        })
    });
})






































/**
 * Created by yihuan on 2016/10/17.
 */
