/**
 * Created by Administrator on 2016/10/11.
 */
$(function () {
    var flag = false;
    var timer1 = null;
    var audio = document.getElementById("audio");

    // 音乐电台列表项ajax获取
    $.ajax({
        url: "json/content.json",
        dataType: "json",
        method: "get",
        success: function (data) {
            var data_len = data.length;
            // var album_list_len = $(".album-list").length;
            var album_list_len = 4;
            var data_info = new Array();
            for(var j = 0; j < album_list_len; j++){
                for(var m = 5*j; m < 5*(j+1); m++){
                    if(5*(j+1) <= data_len){
                        data_info[m%5] = $(data).eq(m);
                    }
                }
                $.each(data_info, function (i, val) {
                    $tpl = $(template("music-content", val[0]));
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
                data_info = [];
            }

            //图片上点击与hover对应图标字体切换
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

                $(".album-item .pauseR").remove();

                if(($(this).children("i").is(".playR"))){
                    audio.play();
                    $('<i class="icon iconfont pauseR">&#xe607;</i>').appendTo(this).addClass("pasue_R");
                    $(".nmplaybar").css("display","block");
                    $(".music_list").css("display","block");
                    $("#nmplayer-button span").remove();
                    $("#nmplayer-button").append($("<span class='icon iconfont'>&#xe609;</span>"));

                }else {

                    // $(".music_list").remove();
                    $('<i class="icon iconfont pauseR">&#xe607;</i>').appendTo(this).addClass("pasue_R");
                    // $(".music_list").css("display","block");
                    $(".nmplaybar").css("display","block");
                    var index_album_list = $(this).parent().index();
                        //思想：用行*个数+index
                    var index = $(this).index();
                    var index_title = $(this)[0].outerText;
                    // console.log($(this));;
                    var $mus_list = $('<div class="music_list"><div class="mus_title">'+index_title+'</div> <ul class="mus_ul"></ul></div>');
                    $("#cont_wrapper").children().eq(index_album_list).after($mus_list);
                    musicList ((index_album_list)*5+(index+1));
                    $("#nmplayer-button span").remove();
                    $("#nmplayer-button").append($("<span class='icon iconfont'>&#xe609;</span>"));

                }
                $(".album-item .playR").remove();
            },
            function () {
                $(".album-item .pauseR").remove();
                $('<i class="icon iconfont playR">&#xe606;</i>').appendTo(this).addClass("play_R");
                $(".music_list").css("display","none");
                // $(".nmplaybar").css("display","none");
                $("#nmplayer-button span").remove();
                $("#nmplayer-button").append($("<span class='icon iconfont'>&#xe60b;</span>"));
                audio.pause();
            })
        }

    });

    //音乐列表ajax请求
    function musicList (z) {
        var jishu = 1003.136054421769;
        $.ajax({
            url: "json/json_"+z+".json",
            dataType: "json",
            method: "get",
            success: function (data) {
                $.each(data, function (i, val) {
                    // console.log(val);
                    allTime = val.duration;
                    var seconds = Math.round(val.duration/jishu);
                    var min = Math.floor(seconds / 60);
                    if(min <= 9){
                        min = "0"+min+"";
                    }else {
                       min = ""+min;
                    }
                    var second = seconds % 60;
                    if(second <= 9){
                        second = "0"+second;
                    }else {
                        second = ""+second;
                    }
                    val.duration = min+':'+second ;
                    $mytpl = $(template("music_list", val));
                    $mytpl.appendTo(".mus_ul");
                });
                $(".mus_ul li:first-child").addClass("mus_currentplay");
                $(".mus_ul li").mouseenter(function () {
                    $(this).addClass("mus_current");
                }).mouseleave(function () {
                    $(this).removeClass("mus_current");
                }).click(function () {
                    $(".mus_ul li").removeClass("mus_currentplay");
                    $(this).addClass("mus_currentplay");
                    // alert($(this).text());
                    var mus_str = $(this).text();
                    var mus_str_length = mus_str.length;
                    //下面字符串截取为什么是13和27，因为json数据里面取出来就是前后有空格，而且所有的都是这样，而前面有13个，后面有27个，所以这样截取
                    var mus_str1 = mus_str.substring(13,mus_str_length-27);
                    $(".nmplayer-title").text(mus_str1);
                });
                /*刚点开第一首播放时间*/
                //清除上一首歌的定时器
                // console.log();
                if(flag == true){
                    window.clearInterval(timer1);
                    flag = false;
                }
                console.log(flag);
                var mus_Url = data[0].mp3;
                //字符串时间格式转秒格式
                var mus_seconds = parseInt(data[0].duration.substring(0,2))*60+parseInt(data[0].duration.substring(3,5));
                // console.log(mus_seconds);
                playcontrol(mus_Url,mus_seconds);

            },
            error: function () {
                alert("请求数据出错！");
                return false;
            }
        })
    }

    function playcontrol(mus_url,mus_seconds) {
        // console.log(mus_url);
        flag = true;
        $("#audio").attr({
            "src":mus_url,
            "autoplay":"autoplay"
        });
        timer1 = setInterval(function() {
            var currentTime = audio.currentTime;
            currentTime =parseInt(currentTime);
            // console.log(currentTime);
            // console.log(mus_seconds);
            $(".nmplayer-prosess").css("width",(currentTime/mus_seconds)*100+'%');
            if(currentTime == mus_seconds){
                window.clearInterval(timer1);
            }
            $(".nmplayer-time").html(timeChange(currentTime));
        }, 1000);
    }

    //播放时间格式化
    function timeChange(time) {//默认获取的时间是时间戳改成我们常见的时间格式
        var audio = document.getElementById('audio');
        //分钟
        var minute = time / 60;
        var minutes = parseInt(minute);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        //秒
        var second = time % 60;
        seconds = parseInt(second);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var allTime = "" + minutes + "" + ":" + "" + seconds + "";
        return allTime;
    }
    
    //点击切换上一首
    $("#nmplayer-prev").click(function () {
        var no = $(".mus_ul li").index($(".mus_currentplay"));
        $(".mus_ul li").removeClass("mus_currentplay");
        var numb = no - 1;
        $(".mus_ul li").eq(numb).addClass("mus_currentplay");
    });

    //点击切换下一首
    $("#nmplayer-next").click(function () {
        var no = $(".mus_ul li").index($(".mus_currentplay"));
        $(".mus_ul li").removeClass("mus_currentplay");
        var numb = no + 1;
        $(".mus_ul li").eq(numb).addClass("mus_currentplay");
    });

    //点击暂停/播放
    $("#nmplayer-button").toggle(function () {
        $("#nmplayer-button span").remove();
        $("#nmplayer-button").append($("<span class='icon iconfont'>&#xe60b;</span>"));
        audio.pause();
    },function () {
        $("#nmplayer-button span").remove();
        $("#nmplayer-button").append($("<span class='icon iconfont'>&#xe609;</span>"));
        audio.play();
    });

    //点击加载更多
    var count = 0;
    $(".mus_loadmore").click(function () {
        count += 1;
        if(count == 1){
            for(var i = 0; i < 4; i++){
                $("#cont_wrapper").append($("<div class='album-list'></div>"));
            }
            $.ajax({
                url: "json/json_a.json",
                dataType: "json",
                method: "get",
                success: function (data) {
                    var data_len = data.length;
                    var album_list_len = 4;
                    var data_info = new Array();
                    for(var j = 0; j < album_list_len; j++){
                        for(var m = 5*j; m < 5*(j+1); m++){
                            if(5*(j+1) <= data_len){
                                data_info[m%5] = $(data).eq(m);
                            }
                        }
                        $.each(data_info, function (i, val) {
                            $tpl = $(template("music-content", val[0]));
                            switch (j) {
                                case 0:
                                    $tpl.appendTo(".album-list:eq(4)");
                                    break;
                                case 1:
                                    $tpl.appendTo(".album-list:eq(5)");
                                    break;
                                case 2:
                                    $tpl.appendTo(".album-list:eq(6)");
                                    break;
                                case 3:
                                    $tpl.appendTo(".album-list:eq(7)");
                                    break;
                            }
                        });
                        data_info = [];
                    }
                }
            })
        }else if(count == 2) {
            for(var i = 0; i < 4; i++){
                $("#cont_wrapper").append($("<div class='album-list'></div>"));
            }
            $.ajax({
                url: "json/json_b.json",
                dataType: "json",
                method: "get",
                success: function (data) {
                    var data_len = data.length;
                    var album_list_len = 4;
                    var data_info = new Array();
                    for(var j = 0; j < album_list_len; j++){
                        for(var m = 5*j; m < 5*(j+1); m++){
                            if(5*(j+1) <= data_len){
                                data_info[m%5] = $(data).eq(m);
                            }
                        }
                        $.each(data_info, function (i, val) {
                            $tpl = $(template("music-content", val[0]));
                            switch (j) {
                                case 0:
                                    $tpl.appendTo(".album-list:eq(8)");
                                    break;
                                case 1:
                                    $tpl.appendTo(".album-list:eq(9)");
                                    break;
                                case 2:
                                    $tpl.appendTo(".album-list:eq(10)");
                                    break;
                                case 3:
                                    $tpl.appendTo(".album-list:eq(11)");
                                    break;
                            }
                        });
                        data_info = [];
                    }
                }
            })
        }else {
            alert("音乐已加载完毕！");
            return false;
        }
    })

});