var pen = null;
var player = 1;
var offset = null;
var data = [];
var status = "run"

function gameInit(id, _player) {
	var checkboard = '	<canvas id="checkboard" width="600px" height="600px"></canvas>';
	if(id) {
		$("#" + id).append(checkboard);
	} else {
		$("body").append(checkboard);
	}
	offset = $("#checkboard").offset();
	for(var i = 0; i < 15; i++) {
		var temp = [];
		for(var j = 0; j < 15; j++) {
			temp.push(-1);
		}
		data.push(temp);
	}

	drawCheckboard();
	//chessmen
	if(_player == 1) {
		player = 1;
		status = "run";
		showChat({
			nickname: "系统提示",
			msg: "系统分配，先手执白"
		}, true)
	} else {
		player = 2;
		status = "wait";
		showChat({
			nickname: "系统提示",
			msg: "系统分配，后手执黑"
		}, true)
	}

	$("#checkboard").mousedown(function(event) {

		var x = event.clientX - offset.left;
		var y = event.clientY - offset.top;

		var col = Math.floor(x / 40);
		var row = Math.floor(y / 40);

		if(status == "wait") {
			return;
		}
		if(data[row][col] != -1) {
			return;
		}
		data[row][col] = player;
		pen.beginPath();
		if(player == 1) {
			pen.fillStyle = "white";
		} else {
			pen.fillStyle = "black";
		}
		pen.arc(col * 40 + 20, row * 40 + 20, 15, 0, 2 * Math.PI);
		pen.fill();
		pen.closePath();

		// 交换信息
		socket.emit("game.changedata", {
			row: row,
			col: col,
			player: player
		});
		status = "wait";
		if(gameOver(row, col, player)) {
			socket.emit("game.over");
		};
	});
}

function gameOver(row, col, player) {
	var count = 1;
	for(var i = row - 1; i >= 0; i--) {
		if(data[i][col] == player) {
			count++;
		} else {
			break;
		}
	}
	for(var i = row + 1; i < 15; i++) {
		if(data[i][col] == player) {
			count++;
		} else {
			break;
		}
	}
	for(var i = col - 1; i >= 0; i--) {
		if(data[row][i] == player) {
			count++;
		} else {
			break;
		}
	}
	for(var i = col + 1; i < 15; i++) {
		if(data[row][i] == player) {
			count++;
		} else {
			break;
		}
	}

	for(var i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
		if(data[i][j] == player) {
			count++;
		} else {
			break;
		}
	}

	for(var i = row + 1, j = col + 1; i < 15 && j < 15; i++, j++) {
		if(data[i][j] == player) {
			count++;
		} else {
			break;
		}
	}

	for(var i = row - 1, j = col + 1; i >= 0 && j < 15; i--, j++) {
		if(data[i][j] == player) {
			count++;
		} else {
			break;
		}
	}
	for(var i = row + 1, j = col - 1; i < 15 && j >= 0; i++, j--) {
		if(data[i][j] == player) {
			count++;
		} else {
			break;
		}
	}
	if(count == 5) {
		alert("player" + player + " win");
		return;
	}
}

function drawCheckboard() {
	pen = $("#checkboard").get(0).getContext("2d");

	for(var i = 0; i <= 15; i++) {
		pen.beginPath();
		if(i == 0 || i == 15) {
			pen.strokeStyle = "darkslategrey";
			pen.lineWidth = 8;
		} else if(i == 3 || i == 12) {
			pen.strokeStyle = "black";
			pen.lineWidth = 3;
		} else {
			pen.strokeStyle = "#808080";
			pen.lineWidth = 1;
		}
		pen.moveTo(0, i * 40);
		pen.lineTo(600, i * 40);
		pen.stroke();
		pen.closePath();
	}
	for(var i = 0; i <= 15; i++) {
		pen.beginPath();
		if(i == 0 || i == 15) {
			pen.strokeStyle = "darkslategrey";
			pen.lineWidth = 8;
		} else if(i == 3 || i == 12) {
			pen.strokeStyle = "black";
			pen.lineWidth = 3;
		} else {
			pen.strokeStyle = "#808080";
			pen.lineWidth = 1;
		}
		pen.moveTo(i * 40, 0);
		pen.lineTo(i * 40, 600);
		pen.stroke();
		pen.closePath();
	}
}

function gameOver(row, col, player) {
	var count = 1;
	for(var i = row - 1; i >= 0; i--) {
		if(data[i][col] == player) {
			count++;
		} else {
			break;
		}
	}
	for(var i = row + 1; i < 15; i++) {
		if(data[i][col] == player) {
			count++;
		} else {
			break;
		}
	}
	if(count == 5) {
		return true;
	}
	
	var count = 1;
	for(var i = col - 1; i >= 0; i--) {
		if(data[row][i] == player) {
			count++;
		} else {
			break;
		}
	}
	for(var i = col + 1; i < 15; i++) {
		if(data[row][i] == player) {
			count++;
		} else {
			break;
		}
	}
	if(count == 5) {
		return true;
	}
	
	var count = 1;
	for(var i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
		if(data[i][j] == player) {
			count++;
		} else {
			break;
		}
	}

	for(var i = row + 1, j = col + 1; i < 15 && j < 15; i++, j++) {
		if(data[i][j] == player) {
			count++;
		} else {
			break;
		}
	}
	if(count == 5) {
		return true;
	}
	
	var count = 1;
	for(var i = row - 1, j = col + 1; i >= 0 && j < 15; i--, j++) {
		if(data[i][j] == player) {
			count++;
		} else {
			break;
		}
	}
	for(var i = row + 1, j = col - 1; i < 15 && j >= 0; i++, j--) {
		if(data[i][j] == player) {
			count++;
		} else {
			break;
		}
	}
	if(count == 5) {
		return true;
	}
	return false;
}
//}

function drawOpponentChessmen(row, col, player) {
	data[row][col] = player;
	pen.beginPath();
	if(player == 1) {
		pen.fillStyle = "white";
	} else {
		pen.fillStyle = "black";
	}
	pen.arc(col * 40 + 20, row * 40 + 20, 15, 0, 2 * Math.PI);
	pen.fill();
	pen.closePath();
}