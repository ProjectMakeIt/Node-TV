var socket = io.connect('http://localhost');
socket.on('video', function (data) {
	console.log(data);
	setVideo(data.url);
});

var setVideo = function(url){
	setPage('video');
	document.getElementById('videoDom').src=url
}
