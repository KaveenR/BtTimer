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
	bluetoothserial.isEnable(function(){
		$.mobile.changepage("#btconf");
		bluetoothSerial.list(function (data) {
			for(var i=0;i<data.length;i++){
				$("#devices").add("<a href='#' onClick='connect_bt('"+data[i].address
				+"')' data-role='button' data-icon='plus' data-iconpos='right'>"+
				data[i].name+"</a>");
			}
		},function (){
			alert("Failed retriving device list");
		});
	},
	function(){
		alert("Turn On Bluetooth First");
	});
}
function connect_bt(mac){
	bluetoothSerial.connect(mac,function(){
		alert("connected");
	},function(){
		alert("Error connected");
	});
}
//onLoad
$(document).ready(function(e) {
});