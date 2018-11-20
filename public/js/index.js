$(function(){
    $(".tab>.tab-item").click(function(){
        tabChange($(this));
    });
    $(".content-list-anime .list-right .tab>.tab-item").mouseover(function(){
        tabChange($(this));
    });
    //  -- 这个是要做加载 emm 不是卡片切换-- 
    $(".content-list-anime .list-left .tab>.tab-item").click(function(){
        tabChange($(this));
    });
    function tabChange(tabItem){
        var index = tabItem.index();
        var content = null;
        var conWidth = 0;
        // add class 'on'
        tabItem.addClass("on").siblings().removeClass("on");
        // content -
        if(tabItem.parent().next().hasClass("right-content")){
            content = tabItem.parent().next();
        }
        else{
            content = tabItem.parent().parent().next();
        }
        conWidth = parseInt(content.children(":first").css("width"));
        content.animate({
            left:-conWidth*index
        },500);
    }
})