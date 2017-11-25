var lastTextField = null;
var startButtonOn = null;

$(document).ready(function() {
	//console.log("hello there!");
	$("input[type='text'],textarea").click(function() {
		if (document.getElementById("command")!=this) {
			lastTextField = this;
			console.log(lastTextField);
		}
		
	});

	$("#start_button").click(function() {
		if (startButtonOn==null) {
			startButtonOn="true"
			console.log("on!");
		} else if (startButtonOn=="true") {
			startButtonOn="false"
			console.log("off!");
	//		var potentialcommand = $("#recognized_speech").val();
	//		console.log("input: "+potentialcommand);

			//var re = /^scroll\s.*(down|up).*/i //starts with scroll, then any number of upper/lowercase characters
			var text = ($("#recognized_speech").val());
			console.log(text);
			var re = /^(click|scroll|enter)\s(.*)/i 
			var result = re.exec(text);
			console.log(result);


			if (result) { 
				var verb = result[1];
				var arg = result[2];

				//$("*:contains"('"+arg="'))

				console.log("verb: "+verb+", args: "+arg);
				//console.log("command: scroll"+result[2])
				switch(verb) {
					case "click":
						console.log("handling click");
						var stringpieces = arg.split(/\s/);
						$("a, input, button").each(function() {
							if ($(this).val()==arg||$(this).text()==arg) { //look for the text in the input field
								console.log("found the click thing!");
								simulateClick(this);
							} //else if () {//other kinds of tags

							//}

						})
						break;
					case "scroll":
						console.log("handling scroll");
						if (arg=="left") {
							$("html, body").animate({
								scrollTop: $(document).scrollLeft()-300
							},1000);
						} else if (arg=="right") {
							$("html, body").animate({
								scrollTop: $(document).scrollLeft()+300
							},1000);
						} else if (arg=="up") {
							$("html, body").animate({
								scrollTop: $(document).scrollTop()-300
							},1000);
						} else if (arg=="down") {
							$("html, body").animate({
								scrollTop: $(document).scrollTop()+300
							},1000);
						}
						break;
					case "enter":
						console.log("handling enter");
						lastTextField.focus();
						var text = $(lastTextField).val();
						text += arg
						$(lastTextField).val(text);
						break;
					default:
						alert("sorry, that's not a recognized command");
						//any other case
						break;

				}
			} else if (!result){
				alert("I cannot process that command");
			}
			} else if (startButtonOn=="false") {
				startButtonOn="true"
				console.log("on!");
			}
		})
	//if (startButtonOn=="false") {

//	}
}); 

function simulateClick(element) {
	  	if (!element) return;
	  		var dispatchEvent = function (elt, name) {
	   	 	var clickEvent = document.createEvent('MouseEvents');
	    	clickEvent.initEvent(name, true, true);
	    	elt.dispatchEvent(clickEvent);
	  	};
	  	dispatchEvent(element, 'mouseover');
	  	dispatchEvent(element, 'mousedown');
	  	dispatchEvent(element, 'click');
	  	dispatchEvent(element, 'mouseup');
	  	console.log("element clicked!")
	};