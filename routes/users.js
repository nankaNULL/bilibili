var express = require("express");
var pool = require("../pool.js");
var router = express.Router();

router.post("/login",(req,res)=>{
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    var pe = uname.indexOf('@')==-1 ? pe = "phone" : pe = "email";
    
    console.log(`select *from bilibili_user where ${pe}=? and upwd=?`);
    console.log(uname+"  "+upwd)
    pool.query(`select *from bilibili_user where ${pe}=? and upwd=?`,[uname,upwd],(err,result)=>{
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
            console.log("error");
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
        pool.query(`select *from bilibili_user where uid=?`,uid,(err,result)=>{
            if(err) throw err;
            var uimg = result[0].img_url=="" ? "http://localhost:3000/images/akari.jpg":result[0].img_url
            res.write(JSON.stringify({
                ok:1,
                uname:result[0].uname,
                uimg:uimg
            }));
            res.end();
        })
    }
    
});
// 昵称是否被注册
router.get("/isregister",(req,res)=>{
    var uname = req.query.uname;
    console.log(uname);
    pool.query("select uname from bilibili_user where uname=?",uname,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send(JSON.stringify({ok:0,msg:"该昵称已被他人使用"}))
        }
        else{
            res.send(JSON.stringify({ok:1,msg:""}));
        }
    })
});

// 注册
router.post("/register",(req,res)=>{
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    var phone = req.body.phone;
    pool.query(`INSERT INTO bilibili_user VALUES(null,?, ?, ?, '', '')`,[uname,upwd,phone],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send(JSON.stringify({
                ok:1,
                msg:"register success"
            }));
        }
        else{
            res.send(JSON.stringify({
                ok:0,
                msg:"register fail"
            }))
        }
    });
})
module.exports = router;