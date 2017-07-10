var line
var rect
var arc
var pen = null;
var type = "pen"
var isdraw = false;
var offset = 0;

$(function() {
	//画线
	drawLine();
	//画方块
	setInterval(function() {
		drawRect();
	});
	//画圆
	drawArc();
	drawOnCanvas();
})

function drawLine() {
	line = $("#lineCan").get(0).getContext("2d");

	line.strokeStyle = "black";
	line.lineCap = "round"
	line.lineWidth = 8;
	line.lineJoin = "bevel"
	line.moveTo(50, 50);
	line.lineTo(50, 250);
	line.stroke();

	line.lineTo(250, 250);
	line.stroke();

	line.lineTo(250, 50);
	line.stroke();

	line.lineTo(50, 50);
	line.stroke();
}

function drawRect() {
	rect = $("#rectCan").get(0).getContext("2d");

	rect.clearRect(0, 0, 300, 300);
	rect.shadowBlur = 10;
	rect.shadowColor = "#484343";
	for(var i = 0; i <= 10; i++) {
		var x = Math.floor(Math.random() * 300);
		var y = Math.floor(Math.random() * 300);
		rect.fillStyle = randomColor();
		rect.beginPath();
		rect.rect(x, y, 100, 100);
		rect.fill();
		rect.closePath();
	}
}

function drawArc() {
	arc = $("#arcCan").get(0).getContext("2d");

	arc.fillStyle = "white";
	arc.fillStyle = "rgb(215,215,215)";
	arc.beginPath();
	arc.arc(150, 150, 149, 0, 2 * Math.PI);
	arc.fill();
	arc.closePath();

	arc.fillStyle = "red";
	arc.beginPath();
	arc.arc(150, 150, 149, Math.PI, 0);
	arc.fill();
	arc.closePath();

	line = $("#arcCan").get(0).getContext("2d");
	line.beginPath();
	line.strokeStyle = "black";
	line.lineWidth = 15;
	line.lineCap = "round";
	line.moveTo(5, 150);
	line.lineTo(90, 150);
	line.moveTo(210, 150);
	line.lineTo(295, 150);
	line.stroke();
	line.closePath();
	arc.fillStyle = "white";
	arc.fillStyle = "rgb(225,225,225)";
	arc.strokeStyle = "#000000";
	arc.beginPath();
	arc.arc(150, 150, 59, 2 * Math.PI, 0);
	arc.fill();
	arc.stroke();
	arc.closePath();
	
	arc.fillStyle = "white";
	arc.strokeStyle = "#000000";
	arc.lineWidth = 3;
	arc.beginPath();
	arc.arc(150, 150, 30, 2 * Math.PI, 0);
	arc.fill();
	arc.stroke();
	arc.closePath();
}

function randomColor() {
	return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

function drawOnCanvas() {
	pen = $("#can").get(0).getContext("2d");
	offset = $("#can").offset();

	$("#can").mousedown(function(event) {
		isdraw = true;
		pen.moveTo(event.clientX - offset.left, event.clientY - offset.top);
	});
	$("#can").mousemove(function(event) {
		if(isdraw) {
			pen.lineTo(event.clientX - offset.left, event.clientY - offset.top);
			pen.stroke();
		}
	});
	$("#can").mouseup(function(event) {
		isdraw = false;
	});
	$("#can").mouseleave(function(event) {
		isdraw = false;
	});
	$("#curve").click(function() {
		curve();
	});
	$("#line").click(function() {
		line();
	});
	$("#rect").click(function() {
		rect();
	});
	$("#arc").click(function() {
		arc();
	});
	$("#eraser").click(function() {
		eraser();
	})
	$("#lineWidth").change(function(){
		pen.lineWidth = $(this).val();
	})
	$("#color").change(function(){
		pen.strokeStyle = $(this).val();
	})
	$("#save").click(function(){
		var str = $("#can").get(0).toDataURL();
		var html = "<img src='"+str+"'/>";
		$("#img").empty();
		$("#img").append(html);
	})
	function curve() {
		$("#can").unbind().mousedown(function(event) {
			isdraw = true;
			pen.beginPath();
			pen.moveTo(event.clientX - offset.left, event.clientY - offset.top);
		}).mousemove(function(event) {
			if(isdraw) {
				pen.lineTo(event.clientX - offset.left, event.clientY - offset.top);
				pen.stroke();

			}
		}).mouseup(function(event) {
			pen.closePath();
			isdraw = false;
		}).mouseleave(function(event) {
			isdraw = false;
		})
	}

	function line() {
		$("#can").unbind().mousedown(function(event) {
			isdraw = true;
			pen.beginPath();
			pen.moveTo(event.clientX - offset.left, event.clientY - offset.top);
		}).mouseup(function(event) {
			if(isdraw) {
				pen.lineTo(event.clientX - offset.left, event.clientY - offset.top);
				pen.stroke();
				pen.closePath();
			}
		}).mouseleave(function(event) {
			isdraw = false;
		})
	}

	function rect() {
		var x = y = 0;

		$("#can").unbind().mousedown(function(event) {
			isdraw = true;
			pen.beginPath();
			x = event.clientX - offset.left;
			y = event.clientY - offset.top;
		}).mouseup(function(event) {
			if(isdraw) {
				pen.rect(x, y, event.clientX - offset.left - x, event.clientY - offset.top - y);
				pen.stroke();
				pen.closePath();
				isdraw = false;
			}
		}).mouseleave(function(event) {
			isdraw = false;
		})
	}

	function arc() {
		var x = y = 0;

		$("#can").unbind().mousedown(function(event) {
			isdraw = true;
			pen.beginPath();
			x = event.clientX - offset.left;
			y = event.clientY - offset.top;
		}).mouseup(function(event) {
			if(isdraw) {
				var width = event.clientX - offset.left - x;
				var height = event.clientY - offset.top - y;

				width = width > height ? width : height;
				pen.arc(x + width / 2, y + width / 2, Math.abs(width / 2), 0, 2 * Math.PI);
				pen.stroke();
				pen.closePath();
			}
			isdraw = false
		}).mouseleave(function(event) {
			isdraw = false;
		})
	}

	function eraser() {
		$("#can").unbind().mousedown(function(event){
			isdraw = true;
		}).mousemove(function( event ){
			if(isdraw){
				var width = pen.lineWidth * 10;
				pen.clearRect(event.clientX - width / 2 - offset.left,event.clientY - width / 2 - offset.top,width,width);
			}
		}).mouseleave(function(){
			isdraw = false;
		});
	}
}