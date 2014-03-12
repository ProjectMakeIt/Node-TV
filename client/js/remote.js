var socket
var movies
var music
var pictures
var movie_list
var pause
var play
var power
var players

var movieClickEvent = function(){
	switchPage('movie-list');
}

var musicClickEvent = function(){
	switchPage('music-list');
}

var titleClickEvent = function(){
	switchPage('menu');
}

var playClickEvent = function(){
	socket.emit('play-media');
}

var pauseClickEvent = function(){
	socket.emit('pause-media');
}

var powerClickEventShow = function(){
	showModel('#models #power');
	power.onclick = powerClickEventHide
}

var powerClickEventHide = function(){
	hideModel('#models #power');
	power.onclick = powerClickEventShow
}

var loadMedia = function(type,url){
	if(renderer==0){
		localPlayer[type].src=url
		switchPage(type+"-player");
	}else{
		socket.emit('load-media',{type: type, url:url});
		socket.emit('switch-page',{page:type});
	}
}

var getMediaList = function(url,type,container){
	getJson(url,function(data){
		for(var i=0,e; item = data[i++];){
			var itemDom = document.createElement('li')
			itemDom.innerText = item.title;
			itemDom.onclick = (function(item,type){return function(){loadMedia(type,item.url); }})(item,type)
			container.appendChild(itemDom);
		}
	});
}

var getDom = function(){
	//header
	power = document.getElementById('power')
	title = document.getElementById('title')

	//main menu
	movies = document.getElementById('movies')
	music = document.getElementById('music')
	pictures = document.getElementById('pictures')

	//lists
	movie_list = document.getElementById('movie-list').children[0];
	music_list = document.getElementById('music-list').children[0];

	//footer
	play = document.getElementById('play')
	pause = document.getElementById('pause')

	//models
	settings = document.querySelector('#models #power')

	//players
	players = {}
	players.movie = document.createElement('video')
	players.music = document.createElement('audio')
	document.querySelector('#movie-player').appendChild(players.movie)
}

var loadOnclick = function(){
	//header
	power.onclick = powerClickEventShow
	title.onclick = titleClickEvent

	//main menu
	movies.onclick = movieClickEvent
	music.onclick = musicClickEvent

	//footer
	play.onclick = playClickEvent
	pause.onclick = pauseClickEvent

	//models
	//settings
	settings.querySelector('#library').onclick = function(){
		console.log('open library here')
	}
	settings.querySelector('#login').onclick = function(){
		console.log('start login here')
	}
	settings.querySelector('#renderer').onclick = function(){
		console.log('switch to phone playback here')
	}
	settings.querySelector('#close').onclick = powerClickEventHide
}

var getMedia = function(){
	getMediaList('movielist.json', 'movie', movie_list);
	getMediaList('musiclist.json', 'music', music_list);
}

window.onload = function(){
	socket = io.connect('/');

	getDom();
	getMedia();
	loadOnclick();

	titleClickEvent()
}
