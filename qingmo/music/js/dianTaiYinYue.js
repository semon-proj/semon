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


            $(".album-item").mouseenter(function () {
                if(($(this).children("i").is(".pauseR"))||($(this).children("i").is(".playR"))){
                    return "";
                }else {
                    $('<i class="icon iconfont ctl">&#xe606;</i>').appendTo(this)
                        .addClass("play")
                }

            }).mouseleave(function () {
                if(($(this).children("i").is(".pauseR"))||($(this).children("i").is(".playR"))){
                    return "";
                }else {
                    $(".ctl").remove();
                }
            }).toggle(function () {
                $(".album-item .ctl").remove();
                $(".album-item .playR").remove();
                $(".album-item .pauseR").remove();
                $('<i class="icon iconfont pauseR">&#xe607;</i>').appendTo(this)
                    .addClass("pasue_R");
                $(".music_list").css("display","block")
            },
            function () {
                $(".album-item .pauseR").remove();
                $('<i class="icon iconfont playR">&#xe606;</i>').appendTo(this)
                    .addClass("play_R");
                $(".music_list").css("display","none")
            })
        }

    });

    $.ajax({
        url: "json/json_1.json",
        dataType: "json",
        method: "get",
        success: function (data) {
            $.each(data, function (i, val) {
                $mytpl = $(template("music_list", val));
                $mytpl.appendTo(".mus_ul");
            });
            $(".mus_ul li:first-child").addClass("mus_current");

        }
    })

});