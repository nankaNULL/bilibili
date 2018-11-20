$(function(){
	// 每层距离顶端的高度
	var secOffsets = [];
	// 页面高度
	var winHeight = $(window).innerHeight();
	// 当前滚动高度
	var scrollTop = $(window).scrollTop();

	// 获取推广区域的高度
	var spreadHeight = $(".content-list-spread").offset().top;

	// -- 电梯滚动导航栏 -- 
	// - 获取每层距离顶端的高度 -
	$(".scroll-con").each(function(i){
		secOffsets[i] = $(this).offset().top;
	})
	
	// - 滚动 - 
	$(".scroll-nav").toggleClass("moveTop",scrollTop+winHeight/4>spreadHeight);
	$(window).scroll(function(){
		scrollTop = $(this).scrollTop();
		$(".scroll-nav").toggleClass("moveTop",scrollTop+winHeight/4>spreadHeight);
		for(var i=secOffsets.length-1;i>=0;i--){
			$(`.scroll-nav li`).removeClass("s-active");
			// - 1/2的innerHeight 在向上20px
			if(scrollTop+winHeight/2>secOffsets[i]+20){
				$(`.scroll-nav li:eq(${i})`).addClass("s-active").siblings().removeClass("s-active");
				break;
			}
		}
	});
	// - 点击 -
	$(".s-nav-list a").click(function(e){
		var secIndex = $(this).parent().index();
		e.preventDefault();
		$("html").animate({
			scrollTop:$(`.scroll-con:eq(${secIndex})`).offset().top-20+"px"
		},500);
		return false;
	})
})