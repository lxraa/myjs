var uploader = require("./controllers/upload")

var multer = require("multer");

var Urls = function(app){
	app.get("/" , uploader.index);
	app.post("/upload" ,  multer({dest:"/tmp"}).fields([{name:'js_file',maxCount:1},{name:'g-recaptcha-response',maxCount:1}]) ,uploader.upload);
}

module.exports = Urls;