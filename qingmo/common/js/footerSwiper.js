/**
 * Created by lujiaolan on 16/10/17.
 */
$(function () {
    var now_msg = 0;
    var $ul = $("#bulletin ul");
    var lis = $("#bulletin ul li");
    var $close = $("#close");
    var set_timer = 7000;
    // var timer;
    $("#bulletin ul li:first").clone().appendTo($ul);
    function msgCroll() {
        if(!$ul.is(":animated")){
            if(now_msg < lis.length - 1){
                now_msg++;
                $ul.animate({"top": now_msg * -23 }, 1000);
            }else {
                now_msg = 0;
                $ul.animate({"top": lis.length * -23 }, 1000, function () {
                    $ul.css("top",0);
                })
            }
        }
    }
    setInterval(msgCroll,set_timer);
    $close.click(function () {
        $("#message").slideToggle("slow");
    })
});
