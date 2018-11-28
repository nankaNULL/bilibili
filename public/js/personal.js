$(function(){
	// 分页
	var pno = 0;
	var nowPno = 0;
	var pageSum = 0;
	var sdir = 1;
	$(".mr-content").children().hide();
		
	loadPage(pno,sdir);
	// 页码按钮点击 - 
	$(".mr-page").on("click", "a.page-list", function (e) {
		e.preventDefault();
		nowPno = $(this).html()-1;
		loadPage(nowPno,sdir);
	})
	// 上一页，下一页 - 
	$(".mr-page").on("click", "a.page-pre", function (e) {
		e.preventDefault();
		--nowPno;
		loadPage(nowPno,sdir);
	});
	$(".mr-page").on("click", "a.page-next", function (e) {
		e.preventDefault();
		++nowPno;
		loadPage(nowPno,sdir);
	})
	// 是否有上一页下一页 - 
	function pnShow(){
		 $("a.page-pre").toggle(nowPno != pno);
		 $("a.page-next").toggle(nowPno+1 != pageSum);
	}
	// 卡片
	function loadPage(pno,sdir){
		$.ajax({
			url:"http://localhost:3000/personal",
			type:"get",
			data:{pno,sdir},
			dataType:"json",
			success:function(res){
				var page = res;
				if(page.lists.length == 0){
					$(".mr-content>div.empty").show().siblings().hide();
				}
				else{
					$(".mr-content>div.empty").hide().siblings().show();
					var html = "";
					for(var r of page.lists){
						// 获取对象中属性
						var {vid,title,img_url,vtime,uname,contribute_time,play_num,collect_num,save_time} = r;
						// 数量上转换
						var playNum = play_num>10000 ? (play_num/10000).toFixed(1)+'万' : play_num;
						var collectNum = collect_num>10000 ? (collect_num/10000).toFixed(1)+'万' : collect_num;
						// 时间上转换
						//  - 视频时间的转换 - 
						var vTime = vtime.split('.')[0];
						if(vtime.slice(0,2) == '00') vTime = vTime.slice(3);
						// - 投稿时间的转换 - 
						var contributeTime = new Date(contribute_time);
						var pTime = contributeTime.getFullYear()+'-'+(contributeTime.getMonth()+1)+'-'+contributeTime.getDate();;
						if(contributeTime.getFullYear() == 2018){
							pTime = contributeTime.getMonth()+1+'-'+contributeTime.getDate();
						}
						// - 收藏时间转换 - 
						var time = new Date();
						var cTime = new Date(save_time);
						var s = parseInt((time-cTime)/1000);
						var m = parseInt(s/60);
						var h = parseInt(m/60);
						var bTime;
						if(h>24) bTime = cTime.getFullYear()+'-'+(cTime.getMonth()+1)+'-'+cTime.getDate();
						else if(h>0) bTime = h+"小时前";
						else if(m>0) bTime = m+"分钟前";
						else if(s>5) bTime = s+"秒前";
						else bTime = "刚刚";
						// 添加card
						html += `
							<div class="mr-card">
								<div class="card-content f-position">
									<a href="kajikaji.html">
										<img src="${img_url}" alt="" class="card-img">
										<div class="video-time"><span>${vTime}</span></div>
										<div class="card-detail">
											<p>播放：${playNum}</p>
											<p>收藏：${collectNum}</p>
											<p>UP主：${uname}</p>
											<p>投稿：${pTime}</p>
											<img src="../images/download.png" alt="">
										</div>
									</a>
								</div>
								<div class="card-title">
									<a href="kajikaji.html" target="_blank">
										<p>${title}</p>
									</a>
									<div>
										<span>收藏于${bTime}</span>
										<span class="iconfont icon-ic_more"></span>
									</div>
								</div>
							</div>
							`;
						
					}
					$(".card-container").html(html);
					pageSum = page.pageSum;
					// 分页按钮 -- 先是确实有页码的情况
					var str = "";
					str += '<a href="#" class="page-pre">上一页</a>';
					for(var i=1;i<=pageSum;i++){
						if(i == pno+1){
							str += `<a href="#" class='page-list page-active'>${i}</a>`;
						}
						else str += `<a href="#" class='page-list'>${i}</a>`;
					}
					str += '<a href="#" class="page-next">下一页</a>';
					$("div.mr-page>div:first-child").html(str);
					pnShow();
				}				
			}
		});
	}

	// tab 切换
	$(".col-list-con").on("click",".collection-list",function(){
		if(!$(this).hasClass("col-active")){
			$(this).addClass("col-active").siblings().removeClass("col-active");
			pno = 0,nowPno = 0,sdir = $(this).index()+1;

			$(".mr-t>p").html($(this).find('.col-label').html());
			$(".dnum").html($(this).find('.col-more').html());
			loadPage(pno,sdir);
		}
	})
})
