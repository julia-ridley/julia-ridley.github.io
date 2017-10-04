var numClicks1 = null;
var elementHistory1 = [];
var startTime1 = null;
var numClicks2 = null;
var elementHistory2 = [];
var startTime2 = null;
var numClicks3 = null;
var elementHistory3 = [];
var startTime3 = null;
var numClicks4 = null;
var elementHistory4 = [];
var startTime4 = null;
var numClicks5 = null;
var elementHistory5 = [];
var startTime5 = null;
var numClicks6 = null;
var elementHistory6 = [];
var startTime6 = null;

$(document).ready(function() {
	//image 1 functions________________________________________
	$("#people_1").one("click", function (){
		startTime1 = performance.now();
	});
	$("#people_1").click(function(e) {
		numClicks1++;
		$("#numpeoplefield1").val(numClicks1);
		$("#peoplecount1").text(numClicks1);
		var newDomElement = $("<div class='marker'></div>");
		newDomElement.css("left", (e.pageX-3)+"px");
		newDomElement.css("top", (e.pageY-3)+"px");
		$("body").append(newDomElement);
		elementHistory1.push(newDomElement);
		var endTime1 = performance.now();
		var timeTaken1 = endTime1-startTime1;
		$("#timetaken1").val(timeTaken1);
	});
	$("#undobutton1").click(function() {
		numClicks1--;
		$("#numpeoplefield1").val(numClicks1);
		$("#peoplecount1").text(numClicks1);
		var elementToRemove = elementHistory1.pop();
		elementToRemove.remove();
	});

	//image 2 functions________________________________________
	$("#people_2").one("click", function (){
		startTime2 = performance.now();
	});
	$("#people_2").click(function(e) {
		numClicks2++;
		$("#numpeoplefield2").val(numClicks2);
		$("#peoplecount2").text(numClicks2);
		var newDomElement = $("<div class='marker'></div>");
		newDomElement.css("left", (e.pageX-3)+"px");
		newDomElement.css("top", (e.pageY-3)+"px");
		$("body").append(newDomElement);
		elementHistory2.push(newDomElement);
		var endTime2 = performance.now();
		var timeTaken2 = endTime2-startTime2;
		$("#timetaken2").val(timeTaken2);
	});
	$("#undobutton2").click(function() {
		numClicks2--;
		$("#numpeoplefield2").val(numClicks2);
		$("#peoplecount2").text(numClicks2);
		var elementToRemove = elementHistory2.pop();
		elementToRemove.remove();
	});

	//image 3 functions________________________________________
	$("#people_3").one("click", function (){
		startTime3 = performance.now();
	});
	$("#people_3").click(function(e) {
		numClicks3++;
		$("#numpeoplefield3").val(numClicks3);
		$("#peoplecount3").text(numClicks3);
		var newDomElement = $("<div class='marker'></div>");
		newDomElement.css("left", (e.pageX-3)+"px");
		newDomElement.css("top", (e.pageY-3)+"px");
		$("body").append(newDomElement);
		elementHistory3.push(newDomElement);
		var endTime3 = performance.now();
		var timeTaken3 = endTime3-startTime3;
		$("#timetaken3").val(timeTaken3);
	});
	$("#undobutton3").click(function() {
		numClicks3--;
		$("#numpeoplefield3").val(numClicks3);
		$("#peoplecount3").text(numClicks3);
		var elementToRemove = elementHistory3.pop();
		elementToRemove.remove();
	});

	//image 4 functions________________________________________
	$("#people_4").one("click", function (){
		startTime4 = performance.now();
	});
	$("#people_4").click(function(e) {
		numClicks4++;
		$("#numpeoplefield4").val(numClicks4);
		$("#peoplecount4").text(numClicks4);
		var newDomElement = $("<div class='marker'></div>");
		newDomElement.css("left", (e.pageX-3)+"px");
		newDomElement.css("top", (e.pageY-3)+"px");
		$("body").append(newDomElement);
		elementHistory4.push(newDomElement);
		var endTime4 = performance.now();
		var timeTaken4 = endTime4-startTime4;
		$("#timetaken4").val(timeTaken4);
	});
	$("#undobutton4").click(function() {
		numClicks4--;
		$("#numpeoplefield4").val(numClicks4);
		$("#peoplecount4").text(numClicks4);
		var elementToRemove = elementHistory4.pop();
		elementToRemove.remove();
	});

	//image 5 functions________________________________________
	$("#people_5").one("click", function (){
		startTime5 = performance.now();
	});
	$("#people_5").click(function(e) {
		numClicks5++;
		$("#numpeoplefield5").val(numClicks5);
		$("#peoplecount5").text(numClicks5);
		var newDomElement = $("<div class='marker'></div>");
		newDomElement.css("left", (e.pageX-3)+"px");
		newDomElement.css("top", (e.pageY-3)+"px");
		$("body").append(newDomElement);
		elementHistory5.push(newDomElement);
		var endTime5 = performance.now();
		var timeTaken5 = endTime5-startTime5;
		$("#timetaken5").val(timeTaken5);
	});
	$("#undobutton5").click(function() {
		numClicks5--;
		$("#numpeoplefield5").val(numClicks5);
		$("#peoplecount5").text(numClicks5);
		var elementToRemove = elementHistory5.pop();
		elementToRemove.remove();
	});

	//image 6 functions________________________________________
	$("#people_6").one("click", function (){
		startTime6 = performance.now();
	});
	$("#people_6").click(function(e) {
		numClicks6++;
		$("#numpeoplefield6").val(numClicks6);
		$("#peoplecount6").text(numClicks6);
		var newDomElement = $("<div class='marker'></div>");
		newDomElement.css("left", (e.pageX-3)+"px");
		newDomElement.css("top", (e.pageY-3)+"px");
		$("body").append(newDomElement);
		elementHistory6.push(newDomElement);
		var endTime6 = performance.now();
		var timeTaken6 = endTime6-startTime6;
		$("#timetaken6").val(timeTaken6);
	});
	$("#undobutton6").click(function() {
		numClicks6--;
		$("#numpeoplefield6").val(numClicks6);
		$("#peoplecount6").text(numClicks6);
		var elementToRemove = elementHistory6.pop();
		elementToRemove.remove();
	});

	//submit button function________________________________________
/*	$("#submitbutton").click(function() {
		//creating an array of all of the people counts for the HIT
		img1Count = $("#numpeoplefield1").val();
		$("#numpeoplefield").append(img1Count);
		img2Count = $("#numpeoplefield2").val();
		$("#numpeoplefield").append(img2Count);
		img3Count = $("#numpeoplefield3").val();
		$("#numpeoplefield").append(img3Count);
		img4Count = $("#numpeoplefield4").val();
		$("#numpeoplefield").append(img4Count);
		img5Count = $("#numpeoplefield5").val();
		$("#numpeoplefield").append(img5Count);
		img6Count = $("#numpeoplefield6").val();
		$("#numpeoplefield").append(img6Count);
		//creating an array of all of the times for the HIT
		img1Time= $("#timetaken1").val();
		$("#timetaken").append(img1Time);
		img2Time= $("#timetaken2").val();
		$("#timetaken").append(img2Time);
		img3Time= $("#timetaken3").val();
		$("#timetaken").append(img3Time);
		img4Time= $("#timetaken4").val();
		$("#timetaken").append(img4Time);
		img5Time= $("#timetaken5").val();
		$("#timetaken").append(img5Time);
		img6Time= $("#timetaken1").val();
		$("#timetaken").append(img6Time);
	});
*/	
})