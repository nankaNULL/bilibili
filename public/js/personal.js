$(function(){
	var pno = 0;
	$.ajax({
		url:"http://localhost:3000/personal",
		type:"get",
		data:{pno,sdir:1},
		dataType:"json",
		success:function(res){
			console.log(res);
			var result = res;
			var html = "";
			for(var r of result){
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
		}
	});
})