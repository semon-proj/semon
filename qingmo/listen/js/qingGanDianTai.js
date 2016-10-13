/**
 * Created by Administrator on 2016/10/11.
 */
<!--正文内容数据渲染-->

$(function () {
    $.ajax({
        url: "json/qingGanDianTai/content.json",
        dataType: "json",
        success: function (data) {
//                        console.log(data);
            var $div = $(".main-media");
            $.each(data, function (i, val) {
//                            tags标签背景色
                var bgAtr = ["#B0D686", "#E6CC6E", "#37A7FF", "#6C9", "#6CC", "#F99", "#C9C", "#F96"];
                var $article = $(template("mediaTemp", val));
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

            // 分页器的显示
            var $pageLi = $(".pagination li");
            var pageLenght = $pageLi.length;
            console.log(pageLenght);
            $(".pagination li:first a").css({
                display: "none",
                marginRight: 14 + "px"
            });
            $(".pagination li:gt(4) a").css("display","none");
            $(".pagination li .next").css("display","block");
            $(".pagination li:last a").css("display","block");


            // 遍历a
            $(".pagination li a").each(function (i,val) {
                // console.log(i);

                // 上一页、下一页、尾页除外的点击事件
                if(i != 0 && i != 8 && i != 9){
                    $(val).click(function () {
                        for(var j = 0;j < pageLenght;j++){
                            $(".pagination li a").removeClass("active");
                        }
                        $(this).addClass("active");
                    })
                }

                // 只要不是第一页的点击事件,就要显示上一页按钮
                if(i != 1){
                    $(val).click(function () {
                        $(".pagination li:first a").css("display","block");
                    })
                }
                if(i == 2){
                    $(val).click(function () {
                        $(".pagination li:eq(5) a").css("display","block");
                    })
                }
                if(i == 3){
                    $(val).click(function () {
                        $(".pagination li:eq(6) a").css("display","block");
                    })
                }
                if(i == 4){
                    $(val).click(function () {
                        $(".pagination li:eq(7) a").css("display","block");
                    })
                }
            });

            // 上一页按钮事件
            $(".prev").click(function () {
                // 获取当前有active这个class的元素的下标
                var currentIdex = $(".pagination li:eq(3)").index();
                console.log(currentIdex);
            });
            // 下一页按钮事件
            $(".next").click(function () {

            });
            // 尾页按钮事件
            $(".last").click(function () {

            })
        }
    });
});

