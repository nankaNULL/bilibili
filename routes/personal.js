var express = require("express");
var pool = require("../pool.js");
var router = express.Router();

// 获取对应文件夹下收藏的视频并分页
router.get("/",(req,res)=>{
	var uid = req.session.uid;
	var sdir = req.query.sdir;
	// 进度
	var progress = 0;
	// 设置页数，每页查询几个等信息
	var page = {
		pno:0,
		pageCount:3,
		count:0,
		pageSum:0,
		lists:[]
	};
	if(req.query.pno) page.pno = req.query.pno;
	pool.query(`select *from bilibili_person where uid=? and sdir=?`,[uid,sdir],(err,result)=>{
		if(err) throw err;
		page.count = result.length;
		page.pageSum = Math.ceil(page.count/page.pageCount);
		progress += 50;
	});
	// 进行分页查询
	pool.query(`select bilibili_video.*,bilibili_user.uname,bilibili_person.save_time FROM bilibili_video inner JOIN bilibili_person on bilibili_video.vid = bilibili_person.vid inner JOIN bilibili_user on bilibili_user.uid = bilibili_video.uid where bilibili_person.uid=? and bilibili_person.sdir = ? limit ?,?`,[uid,sdir,page.pno*page.pageCount,page.pageCount],(err,result)=>{
		if(err) throw err;
		page.lists = result;
		progress += 50;
		if(progress == 100){
			res.send(page);
		}
	});
})

// 文件夹列表
router.get('/dir',(req,res)=>{
	var uid = req.session.uid;
	pool.query(`SELECT * FROM bilibili_dir WHERE uid=? order by sdir ASC`,uid,(err,result)=>{
		if(err) throw err;
		res.send(result);
	})
})

module.exports = router;