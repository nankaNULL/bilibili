var express = require("express");
var pool = require("../pool.js");
var router = express.Router();

router.post("/login",(req,res)=>{
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    var pe = uname.indexOf('@')==-1 ? pe = "phone" : pe = "email";
    
    console.log(`select *from bl_user where ${pe}=? and upwd=?`);
    console.log(uname+"  "+upwd)
    pool.query(`select *from bl_user where ${pe}=? and upwd=?`,[uname,upwd],(err,result)=>{
        if(err) throw err;
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8",
            "Access-Control-Allow-Origin":"*"
        });
        if(result.length>0){
            req.session["uid"]=result[0]["uid"];
            res.write(JSON.stringify({
                ok:1
            }));
            console.log(req.session.uid);
        }
        else{
            res.write(JSON.stringify({
                ok:0,
                msg:"用户名或密码错误"
            }));
        }
        res.end();
    });
});
router.get("/islogin",(req,res)=>{
    res.writeHead(200,{
        "Content-Type":"application/json;charset=utf-8",
        "Access-Control-Allow-Origin":"*"
    });
    //这句话必须加载获取session中uid之前
    if(req.session["uid"]===undefined){
        res.write(JSON.stringify({
            ok:0,
            msg:"请先登录"
        }));
        res.end();
    }
    else{
        var uid = req.session.uid;
        pool.query(`select *from bl_user where uid=?`,uid,(err,result)=>{
            if(err) throw err;
            res.write(JSON.stringify({
                ok:1,
                uname:result[0].uname,
                uimg:result[0].uimg
            }));
            res.end();
        })
    }
    
});
module.exports = router;