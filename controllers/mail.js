var nodemailer = require("nodemailer");
var config = require("../config/mail.config")

var Mail = {
	sendMail : function(to,subject,html){

		var smtp_transport = nodemailer.createTransport({
			host : config.service,
			port : 465,
			secure: true,
			auth : {
				user : config.user,
				pass : config.password
			}
		});

		smtp_transport.sendMail({
			from : `myjs_service <${config.user}>`,
			to : to,
			subject : subject,
			html : html
		} , function(error,response){
			if(error){
				console.log(error);
			}
			else{
				console.log(`Send mail to ${to} complete`);
			}
		});


		
	}

}

module.exports = Mail;