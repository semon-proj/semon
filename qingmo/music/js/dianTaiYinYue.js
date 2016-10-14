/**
 * Created by Administrator on 2016/10/11.
 */
$(function () {
    $.ajax({
        url: "json/content.json",
        dataType: "json",
        method: "get",
        success: function (data) {
            var data_len = data.length;
            // console.log(data_len);
            var album_list_len = $(".album-list").length;
            var data_info = new Array();
            for(var j = 0; j < album_list_len; j++){
                for(var m = 5*j; m < 5*(j+1); m++){
                    if(5*(j+1) <= data_len){
                        data_info[m%5] = $(data).eq(m);
                        // console.log(data_info);
                        // console.log(m%5);
                    }
                }
                $.each(data_info, function (i, val) {
                    $tpl = $(template("music-content", val[0]));

                    // console.log( val);
                    // console.log( $tpl);
                    // console.log( j);
                    switch (j) {
                        case 0:
                            $tpl.appendTo(".album-list:eq(0)");
                            break;
                        case 1:
                            $tpl.appendTo(".album-list:eq(1)");
                            break;
                        case 2:
                            $tpl.appendTo(".album-list:eq(2)");
                            break;
                        case 3:
                            $tpl.appendTo(".album-list:eq(3)");
                            break;
                    }
                });
                // console.log("----");
                data_info = [];
            }

            // $(".album-item").on("hover", function () {
            //     $('<i class="icon iconfont">&#xe606;</i>').appendTo(this)
            //     .css({
            //         zIndex: 333,
            //         position: "absolute",
            //         top: 85+ 'px',
            //         left: 70+ 'px',
            //         fontSize: 50+ 'px',
            //         opacity: 0.7
            //     })
            // })

            // $('.nav-switch').toggle(function(){$(this).css('background', '#6400A6').text('收起菜单');},
            //     function(){$(this).removeAttr("style").text('导航菜单');});

            $(".album-item").mouseenter(function () {
                if($(".album-item i").is(".rd")){
                    return "";
                }else {
                    $('<i class="icon iconfont ctl">&#xe606;</i>').appendTo(this)
                        .addClass("play")
                }

            }).mouseleave(function () {
                if($(".album-item i").is(".ky")){
                    return "";
                }else {
                    $(".ctl").remove();
                }
            }).toggle(function () {
                $(".ctl").remove();
                $(".ky").remove();
                $('<i class="icon iconfont rd">&#xe607;</i>').appendTo(this)
                    .addClass("play").css("backgroundColor: red")
            },
            function () {
                $(".rd").remove();
                $('<i class="icon iconfont ky">&#xe606;</i>').appendTo(this)
                    .addClass("play")
            })
        }

    });

});