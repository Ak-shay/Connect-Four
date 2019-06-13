var player1 = prompt("Player One: Enter Your Name, you will Blue");
var player1color = 'rgb(86, 151, 255)';

var player2 = prompt("Player Two: Enter Your Name, you will Red");
var player2color = 'rgb(237, 45, 73)';

var game_on = false;
if (player1 !== "" && player2 !== "") {
	game_on = true;
}

var table = $("table tr");

function reportWin(rowNum, colNum) {
	console.log("You won starting at this row,col");
	console.log(rowNum);
	console.log(colNum);
}

function changeColor(rowIndex, colIndex, color){
	return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);	
}

function reportColor(rowIndex, colIndex){
	return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');	
}

function checkBottom(colIndex){
	for(var row = 5; row > -1; row--){
		var colorReport = reportColor(row, colIndex)
	if (colorReport === 'rgb(128, 128, 128)') {
		return row
		}
	}
}

function colorMatchCheck(one, two, three, four){
	return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined);
}


function horizontalWinCheck(){
	for(var row = 0; row<6; row++){
		for(var col = 0; col<4; col++){
			if (colorMatchCheck(reportColor(row, col), reportColor(row, col+1), reportColor(row, col+2), reportColor(row, col+3))) {
				console.log('horiz');
				reportWin(row, col);
				return true;
			}else{
				continue;
			}
		}
	}
}

function verticalWinCheck(){
	for(var col = 0; col<7; col++){
		for(var row = 0; row<3; row++){
			if (colorMatchCheck(reportColor(row, col), reportColor(row+1, col), reportColor(row+2, col), reportColor(row+3, col))) {
				console.log('verticle');
				reportWin(row, col);
				return true;
			}else{
				continue;
			}
		}
	}
}

function diagonalWinCheck(){
	for(var col =0; col<5; col++){
		for (var row = 0; row < 7; row++) {
			if (colorMatchCheck(reportColor(row, col), reportColor(row+1, col+1), reportColor(row+2, col+2), reportColor(row+3, col+3))) {
				console.log('diagonal');
				reportWin(row, col);
				return true;
			}if (colorMatchCheck(reportColor(row, col), reportColor(row-1, col+1), reportColor(row-2, col+2), reportColor(row-3, col+3))) {
				console.log('diagonal');
				reportWin(row, col);
				return true;
			}else{
				continue;
			}
		}
	}
}

//Start with player 1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1color;

$('h3').text(player1+" it is your turn, pick a column to drop in!");

if (game_on){
	$('.board button').on('click',function(){

		var col = $(this).closest('td').index();

		var bottomAvail = checkBottom(col);

		changeColor(bottomAvail, col, currentColor);

		if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
			$('h1').text(currentName+" You have won!")
			$('h3').fadeOut('fast');
			$('h2').fadeOut('fast');
			$('table').fadeOut('fast');
		}

		currentPlayer = currentPlayer * (-1);

		if (currentPlayer === 1) {
			currentName = player1;
			$('h3').text(currentName+" Its your turn");
			currentColor = player1color;
		}else{
			currentName = player2;
			$('h3').text(currentName+" Its your turn");
			currentColor = player2color;

		}
	})
}else{
	$('h2').text("Please enter valid name");
	$('h1').text("Refresh this page play");
	$('table').fadeOut('fast');
	$('h3').fadeOut('fast');
}
