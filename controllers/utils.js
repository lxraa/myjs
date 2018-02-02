var time = require("silly-datetime");
var fs = require("fs");

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
	}
}


module.exports = Utils;