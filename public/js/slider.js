$(function(){
    /* -- 图片轮播 -- */
    //获取个数
    var sliderItem = $("li.slider-item").length;
    // 获取当前元素和其位置
    var picActive = $("li.slider-item.active");
    var picIndex = picActive.index();
    // 获取图片宽度
    var picWidth = parseInt($("li.slider-item img").width());
    var picHeight = parseInt($("li.slider-item img").height());
    // -- 高度问题 --
    $("ul.slider-con").css("height",picHeight)

    // 初始化一下
    move(sliderItem,picIndex,picWidth);
    // 计时器
    var timer = setInterval(function(){
        picActive = $("li.slider-item.active");
        moveLeft(picActive);
    },3000);

    /* -- 轮播的小圆点的点击效果 -- */
    $("li.dot-item").click(function(){
        var picIndex = $(this).index();
        $(`li.slider-item:eq(${picIndex})`).addClass("active").siblings().removeClass("active");
        move(sliderItem,picIndex,picWidth);
    });

    /* -- 鼠标悬停事件 -- */
    $("div.slider").hover(
        function(){
            console.log("emm");
            clearInterval(timer);
        },
        function(){
            timer = setInterval(function(){
                picActive = $("li.slider-item.active");
                moveLeft(picActive);
            },3000);
        }
    );

    // 实现左移
    function moveLeft($active){
        if($active.index() == sliderItem - 1){
            $active = $("li.slider-item:eq(0)");
        }
        else{
            $active = $active.next();
        }
        $active.addClass("active").siblings().removeClass("active");
        move(sliderItem,$active.index(),picWidth);
    }
    // 改变left值，并移动
    function move(sliderItem,picIndex,picWidth){
        // 先做三个以上的轮播，获取中间位置（暂时不考虑两个及以下
        $("li.slider-item").each(function(){
            var left = 0;
            
            // var left = 0;
            // var tIndex = $(this).index();  // 每一张图片
            // if(picIndex+1 == sliderItem && tIndex == 0){
            //     left = picWidth;
            //     $(this).css("z-index","1");
            // }
            // else if(picIndex == 0 && tIndex == sliderItem-1){
            //     left = -1*picWidth;
            //     //$(this).css("z-index","2");
            // }
            // else{
            //     left = (tIndex - picIndex)*picWidth;
            //     $(this).css("z-index","5");
            // }
            // //var zIndex = tIndex - picIndex;
            // // sliderHide(left,$(this));
            // $(this).animate({
            //     left:left
            // },500);
            // // if(zIndex == 1 && tIndex == sliderItem-1){
            // //     $(this).css("z-index","1");
            // // }
            // // else if(zIndex == -1 && tIndex == 0){
            // //     $(this).css("z-index","2");
            // // }
            // // else{
            // //     $(this).css("z-index","5");
            // // }
        });
        // 小圆点的效果
        $(`li.dot-item:eq(${picIndex})`).addClass("active").siblings().removeClass("active");
    }
    // 隐藏
    function sliderHide(left,element){
        // if(left == picWidth || left == -picWidth){
        //     element.css("z-index","3");
        // }
        // else if(left == 0){
        //     element.css("z-index","5");
        // }
        // else{
        //     element.css("z-index","1");
        // }

    }
})