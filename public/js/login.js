$(function(){
    $(".btn-login").click(function(e){
        e.preventDefault();
        var uname = $("#uname").val();
        var upwd = $("#upwd").val();
        console.log(uname+" "+upwd);
        //因为ajax异步，很有可能在获取到用户名和密码之前就执行，所以要等待一下
        (async function(){
            var res = await  $.ajax({
                url:"http://localhost:3000/users/login",
                type:"post",
                data:{uname,upwd},
                dataType:"json",
            });
            if(res.ok == 1){
                if(location.search.indexOf("back=")!=-1){
                    location.href = location.search.slice(6);
                }
                else{
                    location.href="http://localhost:3000/index.html"
                }
            }
            else{
                alert("wa");
            }
        })();
    })
})