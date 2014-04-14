//main.js
var seconds =0; //timer counter
var timer = null; //global variable for timer
// Timing Circuits
function tick(total,green,orange){
	seconds += 1;
	$("#timecode").html(read_sec(seconds));
	switch (seconds){
		case green:
			$("#page").attr("style","background-color:#0C0");
			ifSend("G");
			break;
		case orange:
			$("#page").attr("style","background-color:#FF9900");
			ifSend("O");
			break;
		case total:
			$("#page").attr("style","background-color:#FF0000");
			break;
			ifSend("R");
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
	bluetoothSerial.isEnabled(function(){
		$.mobile.changePage("#btconf");
		bluetoothSerial.list(function(data){
			for (var i=0;i>data.length;i++){
				$("#devicelist").add("<a href='#' onClick='connect_bt('"+data[i].address
				+"')' >"+data[i].name+"</a>").listview('refresh');
			}
		},function(){
			window.plugins.toast.showLongBottom("Error Listing Devices");
		});
	},
	function(){
		window.plugins.toast.showLongBottom("Turn On Bluetooth First");
	});
}
function connect_bt(uid){
	bluetoothSerial.connect(uid,function(){
		window.plugins.toast.showLongBottom("connected");
		$.mobile.changePage("#page");
	},function(){
		window.plugins.toast.showLongBottom("Error connected");
	});
}
function ifSend(msg){
	bluetoothSerial.isConnected(function(){
		bluetoothSerial.write(msg,function(){
			window.plugins.toast.showLongBottom("OK");
		},function(){
			window.plugins.toast.showLongBottom("FAILED");
		});
	},function(){
		window.plugins.toast.showLongBottom("NOT CONNECTED");
	});
}
//onLoad
$(document).ready(function(e) {
});