/**
 * Created by lujiaolan on 16/10/17.
 */

$(function () {
    // 表单input点击事件
    var $input = $(".fs_input");
    $(".f_cTitle").click(function () {
        $(this).parent(".f_component").addClass("fs_component").siblings().removeClass("fs_component");
        if ($(this).next('.fs_input').css('border', '1px solid #609Ed2')) {
            $input.css('border', '1px solid #A6A6A6')
        }
    });

    $(".f_optionsLi").click(function () {
        $(this).parent().parent(".f_component").addClass("fs_component").siblings().removeClass("fs_component");
        if ($(this).next('.fs_input').css('border', '1px solid #609Ed2')) {
            $input.css('border', '1px solid #A6A6A6')
        }
    });

    $input.click(function () {
        $(this).parent(".f_component").addClass("fs_component").siblings().removeClass("fs_component");
        if ($(this).css('border', '1px solid #609Ed2')) {
            $input.css('border', '1px solid #A6A6A6')
        }
        $(this).css('border', '1px solid #609Ed2')
    });


    /*二维码点击事件*/
    $(".f_share").click(function () {
        $('.tmask').css('display', 'block');
        $('.tbox').css('display', 'block')
            .css('opacity', '1');
        $('.tinner').css('background-image', 'none');
    });

    $(".tmask").click(function () {
        $(this).css('display', 'none');
        $('.tbox').css('display', 'none')
            .css('opacity', '0');
    })


});







































