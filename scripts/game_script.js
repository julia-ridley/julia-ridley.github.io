var griddim = 50; //height and width of each of the grid cells
var visible_height = 6; //the height of the visible board

var board = //full board, loops through visible board
	[[0,0,0,1,0,0],
   	[0,0,0,0,1,1],
   	[0,0,0,0,0,0],
   	[0,0,0,0,0,0],
   	[1,1,1,0,0,0],
   	[0,0,0,0,0,0],
   	[0,0,0,0,1,1],
   	[1,0,0,1,0,0]
   	[0,1,0,0,0,0]];

var visible_width = board[0].length; //how many grid cells across is the board
var board_width = griddim * board[0].length; //how many pixels wide is the board
var board_height = griddim * visible_height; //how many pixels tall is the board
var ship_location = 0; //grid cell in the last row where the ship is located

var reward_per_turn = 0.001
var total_reward = 0.000;

var _interval = null;

var game_state = "off" //"on" or "off"

$(document).ready(function() {
	var vboard = $("<div id='board' class='board'></div>");
	vboard.width(board_width);
	vboard.height(board_height);
	vboard.css("position", "relative");
	vboard.css("z-index", "100");

	$("body").append(vboard);

	for(i=0; i<visible_height; i++) {
		for(j=0; j<visible_width; j++) {
			var gridcell = $("<div class='gridcell'></div>");
			gridcell.width(griddim);
			gridcell.height(griddim);
			gridcell.css("position", "absolute");
			gridcell.css("left", (j*griddim)+"px");
			gridcell.css("top", (i*griddim)+"px");
			gridcell.css("border", "2px solid black");
			gridcell.css("z-index", String((parseInt($(".board").css("z-index"))+1)));
			gridcell.attr("id", "cell_" + j + "_" + i)
			vboard.append(gridcell);
		}
	}
	for(i=0; i<board.length; i++) { //height of the board
		for(j=0; j<board[0].length; j++) { //width of the board
			if (board[i][j]==1) {
				var alien = $("<img src='images/alien.png' class='alien'>");
				alien.height(griddim);
				alien.width(griddim);
				alien.css("position", "absolute");
				alien.css("left", (j*griddim));
				alien.css("top", (i*griddim));
				gridcell.css("z-index", String((parseInt($(".gridcell").css("z-index"))+1)));
				alien.attr("id", "alien_" + j + "_" + i);
				//alien.css("display", "none");
				vboard.append(alien);
			}
		}
	}

	var ship = $("<img id='ship' src='images/spaceship.png'>");
	ship.width(griddim);
	ship.height(griddim);
	ship.css("position", "absolute");
	ship.css("left", (ship_location*griddim)+"px");
	ship.css("top", ((visible_height-1)*griddim)+"px");
	ship.css("z-index", String((parseInt($(".alien").css("z-index"))+1)));
	vboard.append(ship);

	$(document).keydown(function(e) {
		console.log("ship: " + ship_location + " " + e.which);
		if(e.which==37) { // left arrow clicked
			e.preventDefault();
  			ship_location -= 1;
  			if(ship_location < 0) {ship_location = visible_width - 1};
		} else if(e.which == 39) { // right arrow clicked
			e.preventDefault();
  			ship_location += 1;
  			if(ship_location >= visible_width) {ship_location = 0};
		}
	});


	_interval = setInterval(function() {
		update();
	}, 500); //updates every 0.5 seconds

	$(".board").click(function() {
		console.log(this);
		if ($.contains( $(".board"),this)) {
			if (game_state=="off") {
				game_state="on"
				console.log("game on!")
			} else if (game_state=="on") {
				game_state="off"
			}
		}
	
	});
});

function update() {
	var offset = Math.floor(new Date().getTime() / 1000.0);

	for(var i=0; i<visible_height-1; i++) {

		var y = (offset + i) % board.length;

		for(var x=0; x<board[y].length; x++) {
			var ry = visible_height-i;

			if(board[y][x] == 1) {
				$("alien_" + x + "_" + ry).show();
			} //else {
			//	$("#cell_" + x + "_" + ry).css("background-color", "blue");
			//}
		}
	}

	$("#ship").css("left", (ship_location*griddim)+"px");
	console.log(ship_location + "_" + (visible_height-1));
	//console.log("#cell_" + ship_location + "_" + (visible_height-1) + "||" + $("#cell_" + ship_location + "_" + (visible_height-1)).css("background-color"));

	if($("#cell_" + ship_location + "_" + (visible_height-1)).css("background-color") == "rgb(0, 0, 255)") {
		gameover();
	}

	total_reward += reward_per_turn;
	total_reward = Math.round(total_reward * 1000)/1000.0;
	$(".score").html("$" + total_reward);
	$("#bonus").val($(".score").text());
}

function gameover() {
	clearInterval(_interval);

	alert("GAME OVER!");
};
$("#mturk_form").submit()
