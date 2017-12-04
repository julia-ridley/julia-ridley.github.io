/*
game.js
Julia Ridley
modified from Zach Mineroff
11/8/2017
*/


//Game board is provided
//1s are blocks and 0s are free spaces
//Each grid cell on the board is a square with dimension 50px
var board = [[0,0,0,1,0,0],
             [0,0,0,0,1,1],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0],
             [1,1,1,0,0,0],
             [0,0,0,0,0,0],
             [0,0,0,0,0,0]];

var nCols = board[0].length;
var nRows = board.length;
var nVisibleRows = 6; //given

//Dimensions in px
var cellWidth = 70;
var cellHeight = cellWidth;
var boardWidth = nCols * cellWidth;
var boardHeight = nVisibleRows * cellWidth;

var blockColor = "rgb(0, 0, 255)";
var gridCells = [];

//Ship Position
var shipRow;
var shipCol;

//Animation Intervals
var animateInterval;
var checkShipInterval;
var ajaxInterval;

//Reward
var rewardPerAnimation = 0.002;
var totalReward = 0.000;
var maxReward = 2.000;

//Other things to keep track of
var keydowns = 0;


$(document).ready(function () {
    //Set up board
    var gameBoard = $("#gameBoard");
    gameBoard.width(boardWidth);
    gameBoard.height(boardHeight);
    gameBoardColor = gameBoard.css('backgroundColor');
    var galaxy = $("<img src='galaxy.png'>")
    galaxy.css("width", boardWidth);
    galaxy.css("height", boardHeight);
    galaxy.css("opacity", 0.75);
    $("#gameBoard").append(galaxy)

    //Create grid cells
    for (var iRow=0; iRow<nVisibleRows; iRow++) {
        gridCells[iRow] = [];
        gridCellY = cellHeight*iRow;

        for (var iCol=0; iCol<nCols; iCol++) {
            var gridCell = $("<div>", {"class": "gridCell"});
            gridCell.width(cellWidth);
            gridCell.height(cellHeight);

            gridCellX = cellWidth*iCol;
            gridCell.css("left", gridCellX+"px");
            gridCell.css("top", gridCellY+"px");

            gameBoard.append(gridCell);
            gridCells[iRow][iCol] = gridCell;
        }
    }
    //create crowd ship
    shipRow = nVisibleRows-1;
    shipCol = Math.floor(nCols/2);
    var crowdShipCell = $("<div>", {id: "crowdShipCell", "class": "gridCell"});
    crowdShipCell.width(cellWidth);
    crowdShipCell.height(cellHeight);
    
    var shipX = cellWidth*shipCol;
    var shipY = cellHeight*shipRow;

    crowdShipCell.css("left", shipX+"px");
    crowdShipCell.css("top", shipY+"px");

    gameBoard.append(crowdShipCell);
    crowdShipCell.html("<img src='spaceship_light.png' height='70px' width='70px'>");

    //Create single player ship

    var shipCell = $("<div>", {id: "shipCell", "class": "gridCell"});
    shipCell.width(cellWidth);
    shipCell.height(cellHeight);
    
    var shipX = cellWidth*shipCol;
    var shipY = cellHeight*shipRow;

    shipCell.css("left", shipX+"px");
    shipCell.css("top", shipY+"px");

    gameBoard.append(shipCell);
    shipCell.html("<img src='spaceship.png' height='70px' width='70px'>"); //EO.jpg



    //Ship controls
    $(document).keydown(function(e) {
        if(e.keyCode==37) {
            //left arrow clicked
            shipCol = mod(--shipCol, nCols);
            shipX = cellWidth*shipCol
            $("#shipCell").css("left", shipX+"px");

        } else if(e.keyCode == 39) {
            //right arrow clicked
            shipCol = mod(++shipCol, nCols);
            shipX = cellWidth*shipCol
            $("#shipCell").css("left", shipX+"px");
        }
    });


    //Animation
    $('#start').click(function() {
        animateInterval = setInterval(function() {
            updateBoard();
        }, 500);
    
        //Check ship (has immunity for first 3 seconds)
        setTimeout( function(){
            checkShipInterval = setInterval(function() {
                checkShip();
            }, 50);
        }, 3000);

        //AJAX call
        ajaxInterval = setInterval(function() {
            var shipPos = $("#shipCell").css("left");
            shipPos = shipPos.slice(0, shipPos.indexOf("px"));
            $.ajax({
                url: "https://codingthecrowd.com/counter.php", 
                jsonp: "callback",
                datatype: "json",
                data: {
                    key: "Julia",
                    data: shipPos,
                  //localship: 5, 
                  //active: 1,
                    //},
                    format: "json"
              //},
                
                    },  //, active: is_active
              success: function(result) {
                // do something with the response
                console.log (result);
                /*console.log(json["results"]);
                var allInputs = json["results"];
                for (var i=0; i<allInputs.length; i++) {
                  console.log(allInputs[i]["sid"]); //logging the browser ID
                }*/
                // "count" is the number of players accessing the web service
                // timestamp is the current timestamp
                // "time" is a number that synchronizes the players (for breakout, can use as offset)
                // "status" is the total game success (to alert all players)
                // given all of the inputs, take the median input
                // then, make a better mediator
              },      
              error: function(jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                console.log( "Request Failed: " + err );
                console.log(jqxhr.responseTest);
              },
            })
        }, 1000);
    });


    

    //Check max reward
    $('#reward').on('input', function() {
        if (totalReward >= maxReward) {
            clearInterval(animateInterval);
            clearInterval(checkShipInterval);
            clearInterval(ajaxInterval);
            $(document).off('keydown');
            setTimeout( function(){
                alert("GOOD JOB");
            }, 50);
        }
    });


    //Log key presses
    $(document).keydown(function(e) {
		keydowns++;
		$("#numkeydowns").val(keydowns);
	})
});



function updateBoard() {
    var offset = Math.floor(new Date().getTime() / 1000.0);

    for(var iRow=0; iRow<nVisibleRows; iRow++) {
        var y = mod(offset + iRow, nRows); //row number
        var ry = nVisibleRows-iRow-1; //row number

        for(var iCol=0; iCol<nCols; iCol++) {
            if(board[y][iCol] == 0) {
                //gridCells[ry][iCol].css("background-color", gameBoardColor);
                gridCells[ry][iCol].html("");
            } else {
                //gridCells[ry][iCol].css("background-color", blockColor);
                gridCells[ry][iCol].html("<img src='alien.png' height='70px' width='70px'>");
            }
        }
    }

    totalReward += rewardPerAnimation;
    $("#reward").attr('value', totalReward.toFixed(3)).trigger("input");
}



//Check if ship crashed
function checkShip() {
    //if (gridCells[shipRow][shipCol].css("background-color")==blockColor) {
    if (gridCells[shipRow][shipCol].html()!="") {
        clearInterval(animateInterval);
        clearInterval(checkShipInterval);
        clearInterval(ajaxInterval);
        $(document).off('keydown');
        setTimeout( function(){
            alert("GAME OVER");
        }, 50);
    }
}


function mod(x, m) {
    return (x%m + m)%m;
}
