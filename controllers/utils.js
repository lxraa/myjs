var time = require("silly-datetime");
var fs = require("fs");
var crypto = require("crypto");

var Utils = {
	getDate : function(){
		return time.format(new Date(), "YYYY-MM-DD");
	},
	mkdir : function(folder){
		try{
        	fs.accessSync(folder); 
    	}catch(e){
        	fs.mkdirSync(folder);
    	}
	},
	md5 : function(str){ 
		var md5 = crypto.createHash("md5"); 
		md5.update(str);
		var r = md5.digest("hex");
		return r;
	}
} 


module.exports = Utils;