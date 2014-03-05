var getJson = function(url,cb){
	function reqListener () {
		var data = JSON.parse(this.responseText);
		cb(data);
	}

	var oReq = new XMLHttpRequest();
	oReq.onload = reqListener;
	oReq.open("get", url, true);
	oReq.send();
}

