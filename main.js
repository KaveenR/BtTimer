//main.js
var seconds =0; //timer counter
var timer = null; //global variable for timer
// Timing Circuits
function tick(total,green,orange){
	seconds += 1;
	$("#timecode").html(read_sec(seconds));
	console.log(seconds);
	switch (seconds){
		case green:
			$("#page").attr("style","background-color:#0C0");
			break;
		case orange:
			$("#page").attr("style","background-color:#FF9900");
			break;
		case total:
			$("#page").attr("style","background-color:#FF0000");
			break;
	}
}
//seconds to reaable
function read_sec(src){
	var minutes = Math.floor(src / 60);
	var seconds = (src - minutes*60)
	return minutes+" : "+seconds;
}
//Timer functions
function startTimer(total,green,orange){
	$("#page").attr("style","background-color:");
	if (seconds != null){
		stopTimer();
	}
	seconds =0;
	timer = setInterval(function(){
		tick(total,green,orange);
	},1000);	
}

function stopTimer(){
	clearInterval(timer);
	timer = null;
}
function goConf(){
	bluetoothSerial.isEnable(function(){
		$.mobile.changepage("#btconf");
		$("#mac").val(localStorage.getItem("mac"));
	},
	function(){
		alert("Turn On Bluetooth First");
	});
}
function connect_bt(){
	localStorage.setItem("mac",$("#mac").val);
	bluetoothSerial.connect($("#mac").val(),function(){
		alert("connected");
	},function(){
		alert("Error connected");
	});
}
//onLoad
$(document).ready(function(e) {
});