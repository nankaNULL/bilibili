$(function(){
    var audio = new Audio("./images/music/xwzcy.mp3");
    var adDuration = 0;
    var isPlay = false;
    audio.oncanplay = function () {
        adDuration = audio.duration;
        console.log("1currentTime: "+audio.currentTime);
        console.log("1duration: "+audio.duration);
    }
    var timer = null;
    // 点击播放音频
    $(".mp-start").click(function(){
        // if(!audio) 
        if(!isPlay){
            audio.play();
            isPlay = true;
            audio.loop = true;
            timer = setInterval(function(){
                // 间隔
                var xDuration = $(".mp-progress").width()/adDuration;
                // 滑块移动，播放条
                $(".slider-box").css("left",parseFloat($(".slider-box").css("left"))+xDuration);
                
                $(".mp-progress .track-top").css("width",parseFloat($(".mp-progress .track-top").width())+xDuration); 
                // 时间
                $(".mp-time>span:first-child").html(timeFilter(parseInt(audio.currentTime/60))+":"+timeFilter(parseInt(audio.currentTime%60)));

                // 循环
                if(parseInt(audio.currentTime) == 0){
                    console.log("emm?");
                    $(".slider-box").css("left",-4);
                    $(".mp-progress .track-top").css("width",0);
                }
            },1000);
        }
        else{
            audio.pause();
            isPlay = false;
            clearInterval(timer);
        }
    });
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
})