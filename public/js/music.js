$(function(){
    var audio = new Audio("./images/music/xwzcy.mp3"); // DOM对象
    var adDuration = 0;
    var isPlay = false;
    var isover = true;
    var index = 0;
    var playType = 'order';
    var timer = null;
    var itemSum = 0;
    itemSum = $(".play-item").length;
    // 音频加载完成
    audio.oncanplay = function () {
        $(`.play-item:eq(${index})`).addClass("active").siblings().removeClass("active");
        adDuration = audio.duration;

        // 音频信息
        var activeId = $("li.play-item.active").attr("data-id");
        for(var list of vm.playerlists){
            if(list.id == activeId){
                vm.musicInfo.title = list.title;
                vm.musicInfo.musician = list.musician;
                vm.musicInfo.time = list.time;
            }
        }
    }
    // 音频播放完
    audio.onended = function(){
        isover = true;
        init();
        setTimeout(function(){
            // 顺序播放
            if(playType == 'order'){
                ++index;
                if(index>itemSum - 1) index = 0;
                audio.src = './images/music/'+$(`.play-item:eq(${index})`).attr("data-music");
            }
            // 单曲循环
            else if(playType == 'loop'){
                audio.load();
            }
            audioPlay();
        },1000)
        
    }
    // 点击播放列表中对应歌曲
    $(".rlist-item,.play-item").click(function(){
        index = $(this).index();
        audio.src = './images/music/'+$(this).attr("data-music");
        init();
        audioPlay();
    })
    // 点击删除
    $(".play-item .trash").click(function(){
        itemSum = $(".play-item").length;
        // 删完了，，
        if(itemSum == 0){
            init();
        }
        if($(this).parent().index() == index){
            var i = index + 1;
            if(i > itemSum - 1) { i = --index; }
            audio.src = './images/music/'+$(`.play-item:eq(${i})`).attr("data-music");
            init();
            audioPlay();
        }
    })
    // 点击进行播放下一首
    $(".mp-next").click(function(){
        choosePlay(1);
    })
    // 点击进行播放上一首
    $(".mp-prev").click(function(){
        choosePlay(-1);
    })
    // 单曲循环
    $(".tool .order").click(function(){
        if(playType == "order"){
            playType = "loop"
            $(".tool .order .loop").hide().next().show();
        }
        else{
            playType = "order"
            $(".tool .order .loop").show().next().hide();
        }  
    })
    // 点击播放音频
    $(".mp-start").click(function(){
        if(!isPlay){
            audioPlay();
        }
        else{
            audio.pause();
            isPlay = false;
            $(".mp-start-s").show().next().hide();
            clearInterval(timer);
        }
    });
    // 初始化数据
    function init(){
        $(".slider-box").css("left",-4);
        $(".mp-progress .track-top").css("width",0);
        $(".mp-time>span:first-child").html("00:00");
        $(".mp-start-s").show().next().hide();
        if(timer) clearInterval(timer);
    }
    // 播放哪一首
    function choosePlay(dur){
        index += dur;
        if(index>itemSum - 1) index = 0;
        else if(index<0) index = itemSum - 1;
        audio.src = './images/music/'+$(`.play-item:eq(${index})`).attr("data-music");
        init();
        audioPlay();
    }
    // 音频播放（正在播放）
    function audioPlay(){
        clearInterval(timer);
        audio.play();
        isPlay = true;
        isover = false;
        $(".mp-start-s").hide().next().show();
        // audio.loop = true;
        timer = setInterval(function(){
            // 间隔
            var xDuration = $(".mp-progress").width()/adDuration;
            // 滑块移动，播放条
            $(".slider-box").css("left",parseFloat($(".slider-box").css("left"))+xDuration);
            
            $(".mp-progress .track-top").css("width",parseFloat($(".mp-progress .track-top").width())+xDuration); 
            // 时间
            $(".mp-time>span:first-child").html(timeFilter(parseInt(audio.currentTime/60))+":"+timeFilter(parseInt(audio.currentTime%60)));
        },1000);
    }
    // 滑块的事件，包括点击，拖动
    function sliderbox($box,$track,$trackparent,pad,type,$toFilter=null){
        // 数据
        var canmove = false;
        var emtLeft = 0, maxLength = 0;
        var emtX = 0;
        var trackLength = $trackparent.width();
        var boxWidth = $box.width();
        emtLeft = $box.offset().left;
        maxLength = trackLength - $box.width() + pad;

        //鼠标点击事件
        $trackparent.click(function(e){
            var clickLeft = e.clientX-$(this).offset().left;
            // 滑块移动位置
            if(clickLeft <= boxWidth/2) clickLeft = -pad;
            else if(trackLength - clickLeft < boxWidth/2) clickLeft = maxLength;
            else clickLeft = clickLeft - boxWidth/2;
        
            $box.css("left",clickLeft);
            $track.css("width",clickLeft+boxWidth/2); 

            // 对应百分比转换
            var precent = (clickLeft+pad)/(maxLength+pad);
            typeFilter(precent,type,adDuration)
        })
        // 鼠标拖动事件
        $box.mousedown(function(e){ 
            canmove = true;
            emtX = e.clientX-$(this).offset().left;
         });
        $(document).mouseup(function(){ canmove = false });
        $(document).mousemove(function(e){ 
            if(canmove){
                var left = e.clientX - emtLeft - emtX - pad;
                if(left < 0) left = -pad;
                else if(left > maxLength) left = maxLength;
                $box.css("left",left);
                $track.css("width",left+pad);
                var precent = (left+pad)/(maxLength+pad);
                typeFilter(precent,type,adDuration)
            }
        });
    }
    // 判断格式化类型并转换
    function typeFilter(precent,type,t=0){
        if(type == 'musicplay'){
            var time = Math.round(t*precent);
            var m = parseInt(time/60);
            var s = parseInt(time%60);
            $(".mp-time>span:first-child").html(timeFilter(m)+":"+timeFilter(s));
            audio.currentTime = adDuration*precent;
        }
        else if(type == 'volume'){
            audio.volume = precent;
        }
    }
    // 格式化时间
    function timeFilter(time){
        var timeStr = '';
        if(time == 0){
            timeStr += '00';
        }
        else if (time < 10){
            timeStr += '0'+time;
        }
        else timeStr += time;
        return timeStr;
    }

    // 调用
    sliderbox($(".slider-box"),$(".mp-progress .track-top"),$(".mp-progress"),4,'musicplay')
    sliderbox($(".volume-track-dot"),$(".volume-track .track-top"),$(".volume-track"),6,'volume')

    $(".s-list").click(function(){
        $("div.mp-list").toggleClass("hide");
    })
})