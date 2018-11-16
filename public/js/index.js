$(function(){
    $(".content-list-live .tab>.tab-item").click(function(){
       tabChange(".content-list-live .list-right .right-content",$(this));
    });
    $(".content-list-anime .list-right .tab>.tab-item").click(function(){
        tabChange(".content-list-anime .list-right .right-content",$(this));
    });
    $(".content-list-anime .list-right .tab>.tab-item").mouseover(function(){
        tabChange(".content-list-anime .list-right .right-content",$(this));
    });
    //  -- 这个是要做加载 emm 不是卡片切换-- 
    $(".content-list-anime .list-left .tab>.tab-item").click(function(){
        tabChange(".content-list-anime .list-left .right-content",$(this));
    });
    function tabChange(str,tabItem){
        var index = tabItem.index();
        tabItem.addClass("on").siblings().removeClass("on");

        var conWidth = $(str).children(":first").css("width");
        console.log(conWidth);
        $(str).animate({
            left:-parseInt(conWidth)*index
        },500);
    }
})