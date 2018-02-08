var uploader = require("./controllers/upload");
var file = require("./controllers/file");

var multer = require("multer");

var Urls = function(app){
	app.get("/" , uploader.index);
	app.post("/upload" ,  multer({dest:"/tmp"}).fields([{name:'js_file',maxCount:1} , {name:'g-recaptcha-response',maxCount:1}]) ,uploader.upload);
	app.get("/jsfiles*" , file.getJs);
}

module.exports = Urls;