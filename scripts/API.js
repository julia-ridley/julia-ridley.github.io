//var hasCapturedSpeech = false; //signaling the end of the speech capture

var langs =
[['Afrikaans',       ['af-ZA']],
 ['Bahasa Indonesia',['id-ID']],
 ['Bahasa Melayu',   ['ms-MY']],
 ['Català',          ['ca-ES']],
 ['Čeština',         ['cs-CZ']],
 ['Deutsch',         ['de-DE']],
 ['English',         ['en-AU', 'Australia'],
                     ['en-CA', 'Canada'],
                     ['en-IN', 'India'],
                     ['en-NZ', 'New Zealand'],
                     ['en-ZA', 'South Africa'],
                     ['en-GB', 'United Kingdom'],
                     ['en-US', 'United States']],
 ['Español',         ['es-AR', 'Argentina'],
                     ['es-BO', 'Bolivia'],
                     ['es-CL', 'Chile'],
                     ['es-CO', 'Colombia'],
                     ['es-CR', 'Costa Rica'],
                     ['es-EC', 'Ecuador'],
                     ['es-SV', 'El Salvador'],
                     ['es-ES', 'España'],
                     ['es-US', 'Estados Unidos'],
                     ['es-GT', 'Guatemala'],
                     ['es-HN', 'Honduras'],
                     ['es-MX', 'México'],
                     ['es-NI', 'Nicaragua'],
                     ['es-PA', 'Panamá'],
                     ['es-PY', 'Paraguay'],
                     ['es-PE', 'Perú'],
                     ['es-PR', 'Puerto Rico'],
                     ['es-DO', 'República Dominicana'],
                     ['es-UY', 'Uruguay'],
                     ['es-VE', 'Venezuela']],
 ['Euskara',         ['eu-ES']],
 ['Français',        ['fr-FR']],
 ['Galego',          ['gl-ES']],
 ['Hrvatski',        ['hr_HR']],
 ['IsiZulu',         ['zu-ZA']],
 ['Íslenska',        ['is-IS']],
 ['Italiano',        ['it-IT', 'Italia'],
                     ['it-CH', 'Svizzera']],
 ['Magyar',          ['hu-HU']],
 ['Nederlands',      ['nl-NL']],
 ['Norsk bokmål',    ['nb-NO']],
 ['Polski',          ['pl-PL']],
 ['Português',       ['pt-BR', 'Brasil'],
                     ['pt-PT', 'Portugal']],
 ['Română',          ['ro-RO']],
 ['Slovenčina',      ['sk-SK']],
 ['Suomi',           ['fi-FI']],
 ['Svenska',         ['sv-SE']],
 ['Türkçe',          ['tr-TR']],
 ['български',       ['bg-BG']],
 ['Pусский',         ['ru-RU']],
 ['Српски',          ['sr-RS']],
 ['한국어',            ['ko-KR']],
 ['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
                     ['cmn-Hans-HK', '普通话 (香港)'],
                     ['cmn-Hant-TW', '中文 (台灣)'],
                     ['yue-Hant-HK', '粵語 (香港)']],
 ['日本語',           ['ja-JP']],
 ['Lingua latīna',   ['la']]];

for (var i = 0; i < langs.length; i++) {
  //$("#select_language").options[i] = new Option(langs[i][0], i);
  select_language.options[i] = new Option(langs[i][0], i);
}
//$("#select_language").selectedIndex = 6;
select_language.selectedIndex = 6;
updateCountry();
//$("#select_dialect").selectedIndex = 6;
select_dialect.selectedIndex = 6;
showInfo('info_start');

function updateCountry() {
  for (var i = select_dialect.options.length - 1; i >= 0; i--) {
    select_dialect.remove(i);
  }
  var list = langs[select_language.selectedIndex];
  for (var i = 1; i < list.length; i++) {
    select_dialect.options.add(new Option(list[i][1], list[i][0]));
  }
  select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}

var create_email = false;
var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;
if (!('webkitSpeechRecognition' in window)) {
  upgrade();
} else {
  start_button.style.display = 'inline-block';
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    showInfo('info_speak_now');
    start_img.src = 'images/mic-animate.gif';
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      start_img.src = 'images/mic.gif';
      showInfo('info_no_speech');
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      start_img.src = 'images/mic.gif';
      showInfo('info_no_microphone');
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      if (event.timeStamp - start_timestamp < 100) {
        showInfo('info_blocked');
      } else {
        showInfo('info_denied');
      }
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    console.log(final_transcript);



      //var text = ($("#recognized_speech").val());
      //console.log(text);
      console.log($("#recognized_speech").val());
      var re = /^(click|scroll|enter)\s(.*)/i 
      //var result = re.exec(final_transcript);
      var result = re.exec(final_transcript);
      console.log(result);


      if (result) { 
        var verb = result[1];
        var arg = result[2];

        //$("*:contains"('"+arg="'))

        console.log("verb: "+verb+", args: "+arg);
        //console.log("command: scroll"+result[2])
        switch(verb) {
          case "Click":
            //console.log("handling click");
            arg = arg.split(/\s/);
            $("a, input, button").each(function() {
              //console.log(this);
              console.log($(this).text());
              console.log($(this).val());
              if ($(this).val().localeCompare(arg)==0||$(this).text().localeCompare(arg)==0) {
              //if ($(this).val()==arg||$(this).text()==arg) { //look for the text in the input or text field
                console.log("found the click thing!");
                simulateClick(this);
              } //else if () {//other kinds of tags

              //}

            })
            break;
          case "Scroll":
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
          case "Enter":
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




    recognizing = false;
    if (ignore_onend) {
      return;
    }
    start_img.src = 'images/mic.gif';
    if (!final_transcript) {
      showInfo('info_start');
      return;
    }
    showInfo('');
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
      var range = document.createRange();
      range.selectNode(document.getElementById('final_span'));
      window.getSelection().addRange(range);
    }
    if (create_email) {
      create_email = false;
      createEmail();
    }
  };

  recognition.onresult = function(event) {
    //console.log(event);
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        console.log(final_transcript);
        //setting hidden variable to transcript result
        $("#recognized_speech").val(final_transcript);
        console.log($("#recognized_speech").val());
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    if (final_transcript || interim_transcript) {
      showButtons('inline-block');
    }
    //console.log(final_transcript);
  };
}

function upgrade() {
  start_button.style.visibility = 'hidden';
  showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

function createEmail() {
  var n = final_transcript.indexOf('\n');
  if (n < 0 || n >= 80) {
    n = 40 + final_transcript.substring(40).indexOf(' ');
  }
  var subject = encodeURI(final_transcript.substring(0, n));
  var body = encodeURI(final_transcript.substring(n + 1));
  window.location.href = 'mailto:?subject=' + subject + '&body=' + body;
}

function copyButton() {
  if (recognizing) {
    recognizing = false;
    recognition.stop();
  }
  //copy_button.style.display = 'none';
  //copy_info.style.display = 'inline-block';
  showInfo('');
}

function emailButton() {
  if (recognizing) {
    create_email = true;
    recognizing = false;
    recognition.stop();
  } else {
    createEmail();
  }
  //email_button.style.display = 'none';
  //email_info.style.display = 'inline-block';
  showInfo('');
}

function startButton(event) {
  if (recognizing) {
    //recognition.stop(); //stop the recognition, final_transcript is finalized
    var mySpeechRecognition = recognition.stop();
    console.log(mySpeechRecognition);
    console.log("made it here");
    //console.log(final_transcript);
    //console.log($("#recognized_speech").val());
    return;



      

    } 






  //}
  final_transcript = '';
  recognition.lang = select_dialect.value;
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  start_img.src = 'images/mic-slash.gif';
  showInfo('info_allow');
  showButtons('none');
  start_timestamp = event.timeStamp;
}

function showInfo(s) {
  if (s) {
    for (var child = info.firstChild; child; child = child.nextSibling) {
      if (child.style) {
        child.style.display = child.id == s ? 'inline' : 'none';
      }
    }
    info.style.visibility = 'visible';
  } else {
    info.style.visibility = 'hidden';
  }
}

var current_style;
function showButtons(style) {
  if (style == current_style) {
    return;
  }
  current_style = style;
  //copy_button.style.display = style;
  //email_button.style.display = style;
  //copy_info.style.display = 'none';
  //email_info.style.display = 'none';
}

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

var lastTextField = null;

$(document).ready(function() {
  //console.log("hello there!");
  $("input[type='text'],textarea").click(function() {
    if (document.getElementById("command")!=this) {
      lastTextField = this;
      console.log(lastTextField);
    }
    
  });
})
