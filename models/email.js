const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
	host: "smtp.office365.com",
	port: 587,
	secure: false,
	auth: {
		user: "highstreetconcessionaria@hotmail.com",
		pass: "concessionaria2022"
	}
})



module.exports = transporter;