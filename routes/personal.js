var express = require("express");
var pool = require("../pool.js");
var router = express.Router();

router.get("/",(req,res)=>{
	// 设置页数，每页查询几个等信息
	var page = {
		pno:0,
		pageCount:3,
		count:0,
		pageSum:0
	};
	if(req.query.pno) page.pno = req.query.pno;
	pool.query(`select *from per_default_dir`,(err,result)=>{
		if(err) throw err;
		page.count = result.length;
	});
	page.pageSum = Math.ceil(page.count/page.pageCount);
	
	console.log(page.pno*page.pageCount+"  "+page.pageCount);
	// 进行分页查询
	pool.query(`SELECT *FROM per_default_dir limit ?,?`,[page.pno*page.pageCount,page.pageCount],(err,result)=>{
		if(err) throw err;
		console.log(result.length);
		res.send(result);
	});
})

module.exports = router;