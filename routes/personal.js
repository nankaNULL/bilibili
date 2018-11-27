var express = require("express");
var pool = require("../pool.js");
var router = express.Router();

router.get("/",(req,res)=>{
	var uid = req.session.uid;
	var sdir = req.query.sdir;
	// 设置页数，每页查询几个等信息
	var page = {
		pno:0,
		pageCount:3,
		count:0,
		pageSum:0
	};
	if(req.query.pno) page.pno = req.query.pno;
	pool.query(`select *from bilibili_person where uid=? and sdir=?`,[uid,sdir],(err,result)=>{
		if(err) throw err;
		page.count = result.length;
	});
	page.pageSum = Math.ceil(page.count/page.pageCount);
	
	// console.log(page.pno*page.pageCount+"  "+page.pageCount);
	// 进行分页查询
	pool.query(`select bilibili_video.*,bilibili_user.uname,bilibili_person.save_time FROM bilibili_video inner JOIN bilibili_person on bilibili_video.vid = bilibili_person.vid inner JOIN bilibili_user on bilibili_user.uid = bilibili_video.uid where bilibili_person.uid=? and bilibili_person.sdir = ? limit ?,?`,[uid,sdir,page.pno*page.pageCount,page.pageCount],(err,result)=>{
		if(err) throw err;
		console.log("????");
		console.log(result.length+"emm");
		res.send(result);
	});
})

module.exports = router;