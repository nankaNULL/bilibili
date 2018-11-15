var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session")

var app = express();
app.listen(3000);

app.use(bodyParser.urlencoded({
	extended:false
}));
app.use(session({
	secret: '128位随机字符串',
    resave: false,
    saveUninitialized: true,
}));

//托管静态资源
app.use(express.static("./public"));
app.use('/personal',require("./routes/personal"));
app.use('/users',require("./routes/users"))