var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

var timeStore = {};

server.listen(8000);

app.use("/", express.static(__dirname+"/client"));

io.sockets.on('connection', function (socket) {
	socket.on('switch-page', function(data){
		console.log(data);
		socket.broadcast.emit('switch-page', data);
	});

	socket.on('load-media', function(data){
		console.log(data);
		socket.broadcast.emit('load-media', data);
	});

	socket.on('play-media', function(data){
		console.log(data);
		socket.broadcast.emit('play-media', data);
	});

	socket.on('pause-media', function(data){
		console.log(data);
		socket.broadcast.emit('pause-media', data);
	});

	socket.on('time-change', function(data){
		console.log(data);
		timeStore[data.hash]=data.time;
		socket.broadcast.emit('time-change', data);
	});

	socket.on('get-time', function(data,fn){
		console.log(data)
		console.log(timeStore[data.hash]);
		fn(timeStore[data.hash]);
	})
});
