//main.js
var seconds =0; //timer counter
var timer = null; //global variable for timer
var devices;
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
			ifSend("R");
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
	window.plugins.insomnia.keepAwake();ifSend("?");
	timer = setInterval(function(){
		tick(total,green,orange);
	},1000);	
}

function stopTimer(){
	$("#page").attr("style","background-color:");
	window.plugins.insomnia.allowSleepAgain();
	clearInterval(timer);
	timer = null;
}
$(document).on("pageshow","#btconf",function(){
	bluetoothSerial.isEnabled(function(){
		bluetoothSerial.list(function(data){
			devices=data;
			$("#devicelist").html("");
			for (var i=0;data.length>i;i++){
				$("#devicelist").append('<li><a href="#" onClick="connect_b('+i+')">'+data[i].name+'</li>').listview('refresh');
		}
		$("#devicelist").listview('refresh');
		},function(){
			$("#devicelist").html("");
			window.plugins.toast.showLongBottom("Error Listing Devices");
		});
	},
	function(){
		window.plugins.toast.showLongBottom("Turn On Bluetooth First");
		$.mobile.changePage("#page");
	});
});
function connect_b(id) {
	bluetoothSerial.connect(devices[id].address,function(){
		window.plugins.toast.showLongBottom("Connected");
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
function disconnect_b(){
	bluetoothSerial.disconnect(function(){
		window.plugins.toast.showLongBottom("Disconnected");
	},function(){
		window.plugins.toast.showLongBottom("FAILED DISCONNECTING");
	});
}
//onLoad
$(document).ready(function(e) {
});