var reward_per_turn = 0.002
var total_reward = 0.000;
var _interval = null;

$(document).ready(function (){
	
	setInterval(function() {
		console.log(hasGameStarted);
		if (hasGameStarted==true) {
			update();
		} else if (hasGameStarted==false) {
			total_reward=0.000;
		}
	}, 500);
	/*$(document).keydown(function(e) {
		console.log("key pressed!")
		if (e.keyCode=="13") {//enter key
			console.log("enter key pressed!")
			setInterval(function() {
				update();
				console.log("I've updated!")
			}, 500);
		}
	})*/
	
	
});
function update() {
	total_reward += reward_per_turn;
	total_reward = Math.round(total_reward * 1000)/1000.0;
	$(".score").html("$" + total_reward);
	$("#bonus").val($(".score").text());
}
