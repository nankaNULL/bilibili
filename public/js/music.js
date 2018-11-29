$(function(){
    sliderbox($(".slider-box"),$(".mp-progress").width(),4)
    function sliderbox($box,trackLength,pad){
        var canmove = false;
        var emtLeft = 0, maxLength = 0;
        var emtX = 0;
        emtLeft = $box.offset().left;
        maxLength = trackLength - $box.width()+pad;
        console.log(maxLength);
        $box.mousedown(function(e){ 
            canmove = true;
            emtX = e.clientX-$(this).offset().left;
            
         });
        $(document).mouseup(function(){ canmove = false });
        $(document).mousemove(function(e){ 
            if(canmove){
                var left = e.clientX - emtLeft - emtX - pad;
                console.log(left);
                if(left < 0) left = -4;
                else if(left > maxLength) left = maxLength;
                $box.css("left",left);
             }
         });
    }
})