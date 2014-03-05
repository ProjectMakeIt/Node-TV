var pageClass = "page"
var showClass = "show"

var switchPage = function(pageId){
	clearPage(pageClass,showClass);
	var page = document.getElementById(pageId);
	page.classList.add(showClass);
}

var clearPage = function(){
	var pages = document.getElementsByClassName(pageClass);
	for(var i=0,e; page = pages[i++];){
		page.classList.remove(showClass);
	}
}

var showModel = function(menu){
	var menuDom = document.querySelector(menu);
	menuDom.classList.add(showClass);
}

var hideModel = function(menu){
	var menuDom = document.querySelector(menu);
	menuDom.classList.remove(showClass);
}
