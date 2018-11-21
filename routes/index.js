var express = require("express");
var pool = require("../pool");
var router = express.Router();

router.get("/getVideo",(req,res)=>{
    var type = req.query.type;
    var sql = "select v.*,u.uname from bilibili_video as v inner JOIN bilibili_user as u on v.uid = u.uid ";
    if(type) sql+= "where type=?";
    pool.query(sql,type,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send(result);
        }
    })
});

module.exports = router;