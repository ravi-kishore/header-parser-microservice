var express = require("express");
var requestIp = require("request-ip");

var app = express();
app.use(requestIp.mw());

var lang_rx = /(.*?),/g;
var os_rx = /\((.*?)\)/g;
app.get('/', function(req, res){
	var retval = {};
	retval.ipaddress = req.clientIp;
	retval.language = lang_rx.exec(req.headers["accept-language"])[1];
	retval.software = os_rx.exec(req.headers["user-agent"])[1];

	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(retval));
});

app.listen(process.env.PORT || 4000);

