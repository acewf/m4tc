var nApp = function function_name (argument) {
	var instance = this;

	function init (argument) {
		instance.startSlideShow(null);
	}

	init();
}
var aplication
var counter = 0;
var lastIndex = 1;
var controlerTime;
nApp.prototype.startSlideShow = function(first_argument) {
	var inst = this;
	var listImages = document.querySelectorAll("#home_slideshow > li");
	var pageMarker = document.querySelectorAll(".pageindex")[0];
	for (var i = 0; i < listImages.length ; i++) {
		var li=document.createElement("li");
		if(i==0){
			li.className = 'selected';
		}
		pageMarker.appendChild(li);
	};
	function transitionControl(m,counter){
		var li = m[counter];
		counter++;

		if(counter>m.length-1){
			counter = 0;
		}
		if(lastIndex>20){
			lastIndex = 0;
		}
				inst.manageMark(counter);
		inst.pageR_SlideShow(li);
		transitionTweenDelay(m,counter);
	}
	function transitionTweenDelay(m,counter){
		//controlerTime  = setTimeout(function(){transitionControl(m,counter);},5000)
	}
	transitionTweenDelay(listImages,1);
};

nApp.prototype.manageMark = function(value) {
	var pageMarker = document.querySelectorAll(".pageindex > li");
	for (var i = pageMarker.length - 1; i >= 0; i--) {
		pageMarker[i].className = '';
	};
	console.log(value)
	pageMarker[value].className = 'selected';
}
nApp.prototype.pageR_parse = function(li) {
	var listImages = document.querySelectorAll("#home_slideshow > li");
	counter +=1;
	if(counter>listImages.length-1){
		counter = 0;
	}
	var value = counter;
	var li = listImages[value];
	this.manageMark(counter);
	this.pageR_SlideShow(li);
}
nApp.prototype.pageL_parse = function(li) {
	var listImages = document.querySelectorAll("#home_slideshow > li");
	counter -=1;
	if(counter<0){
		counter = listImages.length-1;
	}
	var value = counter;
	if (value<0) {
		value = listImages.length-1;
	};
	var li = listImages[value];
	this.manageMark(counter);
	this.pageL_SlideShow(li);
}
nApp.prototype.pageR_SlideShow = function(li) {
	lastIndex++;
	clearTimeout(controlerTime);
	li.style.left = '100%';
	li.style.zIndex = lastIndex;
	$(li).animate({left: 0}, 500, function() {});
}
nApp.prototype.pageL_SlideShow = function(li) {
	clearTimeout(controlerTime);
	lastIndex++;
	li.style.left = '-100%';
	li.style.zIndex = lastIndex;
	$(li).animate({left: 0}, 500, function() {});	
}

function overOption(event){
	var subMenu = document.querySelectorAll(".submenu > ul");
	var fromElement = event.fromElement;
	subMenu[0].style.display = 'inline-block';
	//subMenu[0].style.opacity = 0;
	$(subMenu[0]).animate({opacity: 1}, 500, function() {});	
}
var openLang = false;
function toggleLang (argument) {
	console.log(argument)
	if(openLang){
		openLang = false;
		$("#backlangchoose").delay(200).animate({height: 0}, 500, function() {});
		$('div#langchoose > div[value="es"]').fadeOut(100);
	} else {
		openLang = true;
		$("#backlangchoose").css( "display", "inline-block" );
		$("#backlangchoose").animate({height: 34}, 500, function() {$('div#langchoose > div[value="es"]').fadeIn();});
	}
}
function outOption(event){
	console.log(event)
	var subMenu = document.querySelectorAll(".submenu > ul");
	//$(subMenu[0]).animate({opacity: 0}, 500, function() {});	
	subMenu[0].style.display = 'none';
}

$(document).ready(function(){
	aplication = new nApp();
	var Menu = document.querySelectorAll(".submenu");
	Menu[0].addEventListener("mouseover", overOption, false);
	Menu[0].addEventListener("mouseout", outOption, false);

	var chooselang = document.getElementById("langchoose");
	chooselang.addEventListener("click", toggleLang, false);

	$('#emailnews').focus(function(){
		if($('#emailnews').val()=="escreva o seu email"){
			$('#emailnews').val("");
		}
	});
	$('#emailnews').focusout(function(){
		if($('#emailnews').val()==""){
			$('#emailnews').val("escreva o seu email");
		}
	});
});

var filesRef=[];
var formData = {};
var urlsData = {};

function mailIsValid(value){
	var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if( !emailReg.test(value)) {
		return false;
	} else {
		return true;
	}
}

formData.formIsValid = false;
formData.closeFeedback = function(){
	$( ".overlay" ).remove();
	$( ".messageFeedback" ).remove();
}
formData.submitform = function(event,values,area){
	 event.preventDefault(); 
	var tempValue = true;

	for (var i = 0; i < values.length; i++) {
		console.log(values[i].getAttribute('src-type')=='email','__')
		if((values[i].value.toString().length>0) && (values[i].getAttribute('src-type')!='email')){
			values[i].style.backgroundColor = '';
			if(tempValue){
				formData.formIsValid = true;
			}			
		} else if(values[i].getAttribute('src-type')=='email'){
			var response = mailIsValid(values[i].value);
			if (!response){
				tempValue = false;
				values[i].style.backgroundColor = '#ffffc5';
			};
		} else {
			formData.formIsValid = false;
			tempValue = false;
			values[i].style.backgroundColor = '#ffffc5';
		}


	};
	if(tempValue){
		formData.formIsValid = true;
	}

	var v
	var _url 
	if(area=='formulario'){
		v = $('#smallform');
		_url = "http://pixelkiller.net/works/m4tc/registerengine.php";
	} else {
		v = $('#newsform');
		_url = "http://pixelkiller.net/works/m4tc/queryengine.php";
	}

	console.log(formData.formIsValid,'formData.formIsValid')

	if(formData.formIsValid){
		var sendValues = v.serialize();
		$.ajax({
	         type: "POST",
	         crossDomain: true,
	         url: _url,
	         data: sendValues,
	         success:formData.successHandle,
	         error: formData.errorHandle
	     });
    }
}

formData.successHandle = function(data){
	console.log(data)
}
formData.errorHandle = function(data){
	console.log('error')
}