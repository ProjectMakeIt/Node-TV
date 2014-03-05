var socket 
var movie
var music
var current_mode
var urlHash = ""

var pauseAll = function(){
	movie.pause();
	music.pause();
}

var setMedia = function(type, url){
	window[type].src=url;
	window[type].play();
	urlHash = hex_md5(url);
	current_mode=type;
}

var play = function(){
	window[current_mode].play();
}

var pause = function(){
	window[current_mode].pause();
}


window.onload = function(){
	socket = io.connect('/');

	socket.on('switch-page', function(data){
		switchPage(data.page)
	});

	socket.on('load-media', function (data) {
		pauseAll();
		setMedia(data.type, data.url);
	});

	socket.on('play-media', function (data) {
		play();
	});

	socket.on('pause-media', function (data) {
		pause();
	});

	movie = document.createElement('video')
	var movieDiv = document.getElementById('movie')
	movieDiv.appendChild(movie)
	music = document.createElement('audio')
	var musicDiv = document.getElementById('music')
	musicDiv.appendChild(music)

	movie.addEventListener("timeupdate",function(event){
		socket.emit('time-change',{url:movie.src,hash:urlHash,time:movie.currentTime});
	})
	music.addEventListener("timeupdate",function(event){
		socket.emit('time-change',{url:music.src,hash:urlHash,time:music.currentTime});
	})
}
