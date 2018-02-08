var fs = require("fs");

var File = {
	getJs : function(req,res){
		var list = req.path.split("/");
		if(list.length != 4){
			res.send("error");
		}
		else{
			var target = `${__dirname}/../files/${list[2]}/${list[3]}`;
			fs.readFile(target,function(err,data){
				if(err){
					res.send("error");
				}
				res.append("Content-Type","text/javascript");
				res.append("Access-Control-Allow-Origin","*");
				res.send(data);
			});
		}
	}
}

module.exports = File;