var cpu = require('./cpu.js');
var express = require("express");
var path = require("path");
var app = express();
var usage = require('./node-usage');
var schedule = require('node-schedule');
var pid = process.pid;
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var server = app.listen(8000, function(){})
var io = require('socket.io').listen(server);


var sys = require('sys')
var exec = require('child_process').exec
io.sockets.on('connection', function (socket) {
	var child
	child = exec("mpstat", function (error, stdout, stderr) {
		schedule.scheduleJob('* * * * * *', function(){
		    socket.emit('server_response', {response: stdout})
		})
	})
})

app.get('/', function(req, res) {
	res.render("index");
});
