$(function(){
    //ajax获取header片段
    $.ajax({
        url:"http://localhost:3000/header.html",
        type:"get",
        success:function(res){
            $("header").replaceWith(res);

            $(".btn-login").click(function(e){
                e.preventDefault();
                location.href = "login.html";
            });
            // 判断是否已经登录
            $.ajax({
                url:"http://localhost:3000/users/islogin",
                type:"get",
                dataType:"json",
                success: function(res) {
                    if(res.ok == 1){
                        $(".isLogin").show().prev().hide();
                        $(".isLogin>.p-img>img").prop("src",res.uimg);
                    }
                    else{
                        $(".isLogin").hide().next().show();
                    }
                }
            });
        }
    });

    //动态创建link引用header.css
    $("<link rel='stylesheet' href='../css/header.css'>").appendTo("head");
})