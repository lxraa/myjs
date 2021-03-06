var utils = require("./utils");
var mail = require("./mail");

var fs = require("fs");
var request = require("request");
var async = require("async");

var host = "http://127.0.0.1:3000"

var Uploader = {

	index : function(req,res){
		res.render("index",{ origin : host });
	},




	upload : function(req ,res){
		var token = req.body['g-recaptcha-response'];
		var file = req.files.js_file[0];
		var mail_address = req.body['mail_address'];

		async.auto({
			reCaptchaHandler : function(callback){

				request.post({
					url:"https://www.google.com/recaptcha/api/siteverify",
					form:{
						secret:"6LdY7kMUAAAAANSezqHRhvYnaPt-qMhnkA76MH4x",
						response:token
					}
				},function(err,response,body){
					/*
					{
					  "success": false,
					  "challenge_ts": "2018-02-02T02:21:43Z",
					  "hostname": "127.0.0.1",
					  "error-codes": [
					    "timeout-or-duplicate"
					  ]
					}
					----------------------------------------
					{
					  "success": true,
					  "challenge_ts": "2018-02-02T03:26:52Z",
					  "hostname": "127.0.0.1"
					}
		
					*/
					var result = JSON.parse(body);
					var success = true;
					if(result.success == true){
						console.log("[*] recaptcha inspection passed");
						success = true;
					}
					else{
						console.log("[!] recaptcha inspection error");
						success = false;
					}
					callback(null,{result:success});

				});

			},
			
			fileHandler : ["reCaptchaHandler",function(results,callback){
				if(results.reCaptchaHandler.result == false){
					callback(null,{info : "recaptcha inspection error"});
					return;
				}
				var file_folder = utils.getDate();
				var target_path = `${__dirname}/../files/${file_folder}/`;
				utils.mkdir(target_path);

				var origin_filename = file.originalname;
				var path = file.path;
				var target = `${target_path}${(new Date()).getTime()}_${origin_filename}`;
				var url = `${host}/jsfiles/${file_folder}/${(new Date()).getTime()}_${origin_filename}`;

				fs.renameSync(path,target);
				mail.sendMail(mail_address,"your js address",url);

				callback(null,{info : "uploaded"});
				
			}]

		},function(err,results){
			res.send(results.fileHandler.info);
		});
	}

}


module.exports = Uploader;