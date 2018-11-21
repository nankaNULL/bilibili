$(function(){
    // tab切换
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

    // ajax数据获取 type=1的情况
    var str = "";
    $.ajax({
        url:`http://localhost:3000/index/getVideo?type=1`,
        type:"get",
        //data:{type:1},
        dataType:"json",
        success:function(res){
            for(var r of res){
                r.play_num = r.play_num<10000?r.play_num:(r.play_num/10000).toFixed(1)+"万";
                str += `<a href="#" class="show-card" title="${r.title}">
                    <div>
                        <img src="${r.img_url}" alt="${r.title}">
                        <div class="card-hidden radius-img">
                            <p>${r.title}</p>
                            <div id="up-play">
                                <p>up主：${r.uname}</p>
                                <p>播放：${r.play_num}</p>
                            </div>
                            <div class="dl"><img src="images/download.png" alt=""></div>
                        </div>
                    </div>
                </a>`;
            }
            
            $(".content-slider .slider-right").html(str);
        }
    })
})