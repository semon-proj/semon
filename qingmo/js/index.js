/**
 * Created by Administrator on 2016/10/10.
 */
<!--正文内容数据渲染-->

$(function () {
    $.ajax({
        url: "json/content.json",
        dataType: "json",
        success: function (data) {
//                        console.log(data);
            var $div = $(".postzero");
            $.each(data, function (i, val) {
//                            tags标签背景色
                var bgAtr = ["#B0D686", "#E6CC6E", "#37A7FF", "#6C9", "#6CC", "#F99", "#C9C", "#F96"];
                var $article = $(template("postTemp", val));
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
            var x = 30;
            $(".thumbnail a").mouseenter(function (e) {
//                            console.log(e);
//                            $(".thumbnail a img").css();

                aTip = this.title;
                this.title = "";
//                            console.log(aTip);
                $aTip = $("<div class='clear'></div> <div id='aTip'>" + aTip + "</div> <div class='clear'></div> ");
//                            console.log($aTip);
                $aTip.appendTo(this);
                $("#aTip").css({
//                                距离计算问题,弹出的框显示的位置
                    top: (e.pageY - 300) + "px",
                    left: (e.pageX - 200) + "px"
                }).show();
            }).mouseleave(function () {
                this.title = aTip;
                $aTip.remove();
            }).mousemove(function (e) {
                $("#aTip").css({
                    top: (e.pageY - 300) + "px",
                    left: (e.pageX - 200) + "px"
                });
            })
        }
    });


    <!--正文底部滚动广告-->

    //列表自适应
    var ptListWrp = $('.croll-list'); //列表容器
    var valLstLiWth = $('.croll-list li').width();	//图片宽度（图片可能包括边框样式等，取Li宽度参与可视图片计算避免误差）
    var valImgLth = 1;  //可见图数变量*
    var valpLstMg = 0;  //边距变量*
    //列表滚动
    var pLstRoLt = $('.croll-lt');	//左滚动元素
    var pLstRoRt = $('.croll-rt');	//右滚动元素
    var pLstImgLth = ptListWrp.find('p').length; //获取图片总数
    //宽度自适应方法
    function fnAutoWth() {
        //重置滚动
        $('.croll-list ul').css({'marginLeft': '0'});
        pLstRoLt.hide();
        pLstRoRt.show();

        var pLstWrpWth = ptListWrp.width();	 //获取当前容器宽度
        valImgLth = Math.floor(pLstWrpWth / valLstLiWth);	///当前可视图片数计算*
        //图片间距算法
        function fnpLstMg() {
            //间距 = 除去图片的宽度 /（图片数 + 1），并向上取整（避免小数误差）
            valpLstMg = Math.ceil((pLstWrpWth - valImgLth * valLstLiWth) / (valImgLth + 1));
        }

        //执行计算
        fnpLstMg();
        //可视图片数 >= 总图片数时，总图片数即可视图片数
        if (valImgLth >= pLstImgLth) {
            valImgLth = pLstImgLth;
            fnpLstMg();//重新计算间距
            pLstRoRt.hide();
        }

        //设置间距
        console.log(valpLstMg);
        ptListWrp.find('li').css('margin-left', valpLstMg + 'px');
    }

    //初始执行宽度自适应方法
    fnAutoWth();
    //动态变化宽度时执行方法
    $(window).resize(function () {
        fnAutoWth();	//宽度自适应方法
    });


    //滚动方法
    function fnPlstArr($this) {
        var pLstRoWrp = ptListWrp.find('ul');
        var ptLstCssMg = parseInt(pLstRoWrp.css('margin-left'));	//获取当前已滚动宽度
        var ptLstImgMg = parseInt(pLstRoWrp.find('li:first').css('margin-left'));	//获取当前图片间距
        //向右滚动
        if ($this.hasClass('croll-rt')) {
            //当点击右箭头时，列表向左滚动。需滚动的宽度 = 当前图片间距 + 图片宽度（取Li宽度）
            pLstRoWrp.not(':animated').animate({
                    marginLeft: ptLstCssMg - (ptLstImgMg + valLstLiWth)
                },
                200, function () {
                    //回调函数判断滚动之后的箭头状态
                    var ptLstCurMg = parseInt(pLstRoWrp.css('margin-left'));//获取当前已滚动宽度
                    var ptLstRoWth = (pLstImgLth - valImgLth) * (ptLstImgMg + valLstLiWth);//计算非可视区域宽度
                    //当已滚动宽度 = 非可视区宽度，即已滚动至最后一图
                    if (ptLstCurMg + ptLstRoWth == 0) {
                        $this.hide();	//隐藏右箭头
                    }
                    pLstRoLt.show();	//一旦向右滚动，左箭头即显示
                });
        }
        //向左滚动
        if ($this.hasClass('croll-lt')) {
            pLstRoWrp.not(':animated').animate({marginLeft: ptLstCssMg + (ptLstImgMg + valLstLiWth)}, 200, function () {
                //回调函数判断滚动之后的箭头状态
                var ptLstCurMg = parseInt(pLstRoWrp.css('margin-left'));					//获取当前已滚动宽度
                //当已滚动宽度 = 0，即已滚动至最前一图
                if (ptLstCurMg == 0) {
                    $this.hide();	//隐藏左箭头
                }
                pLstRoRt.show();	//一旦向左滚动，右箭头即显示
            });
        }
    }

    //滚动事件绑定
    $('.croll-lt, .croll-rt').click(function () {
        fnPlstArr($(this));
    });
    //hover事件绑定
    $('.croll-lt, .croll-rt').hover(function () {
        $(this).stop().animate({"opacity": 1});
    }, function () {
        $(this).stop().animate({"opacity": 0.7});
    });

});
