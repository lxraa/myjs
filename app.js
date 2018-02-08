var express = require("express");
var path = require("path");

var urls = require("./urls");
var app = express();
/*
	中间件
*/

var bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({ extended: false }));

app.set("views","./views");
app.set("view engine","ejs");


urls(app);


app.listen(3000,function(){
	console.log("[*] listening  port 3000");
});
