/**
 * Created by lujiaolan on 16/10/13.
 */

<!--正文内容数据渲染-->

$(function () {
    // console.log("bdwebd");
    $.ajax({
        url: "json/yinYueDianTai/content.json",
        dataType: "json",
        success: function (data) {
            console.log(data);
            var $div = $(".main-media");
            $.each(data, function (i, val) {
//                            tags标签背景色
                var bgAtr = ["#B0D686", "#E6CC6E", "#37A7FF", "#6C9", "#6CC", "#F99", "#C9C", "#F96"];
                var $article = $(template("yinyueTemp", val));
//                            tag标签随机背景色
                for (var j = 0; j < 3; j++) {
                    var bgIndex = Math.floor(Math.random() * bgAtr.length);
                    $article.find(".tags").children().eq(j).css("background-color", bgAtr[bgIndex]);
                }
                if (val.tag1_url == "undefined") {
                    $article.find(".tags").hide();
                }
                if (val.tag2_url == "undefined") {
                    $article.find(".tag2").hide();
                    $article.find(".tag3").hide();
                }
                if (val.tag3_url == "undefined") {
                    $article.find(".tag3").hide();
                }
                $article.appendTo($div);
            });

            $(".thumbnail a").each(function () {

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
        },
        error: function () {
            alert("服务器错误");
        }
    });
});

