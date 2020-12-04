const paragraph = document.querySelector('.type-text').innerText;
const textArea = document.querySelector('#textarea');
const timer = document.querySelector('.timer');
const wpm = document.querySelector('.wpm');
var countWord = 1, counter;
textArea.addEventListener('keyup', function(e){
	if(paragraph.search(textArea.value) > -1) {
		changeColor("blue");
		if(e.key == " "){
			countWord++;
		}
		if(paragraph.length == textArea.value.length){
			changeColor("green")
			clearInterval(counter);
			wpm.innerHTML = Math.round(countWord/parseTimer(timer.innerText));
		}
	}
	else {
		changeColor("red");
	}
});

textArea.addEventListener('keypress', function(){
	if(!counter)
		setTimer();
});

function upTimer(currentDate) {
	var timeElapsed = new Date(new Date() - currentDate);
	let mm = timeElapsed.getUTCMinutes();
	let ss = timeElapsed.getUTCSeconds();
	let ms = timeElapsed.getUTCMilliseconds();
	mm = ("0"+mm).slice(-2);
	ss = ("0" + ss).slice(-2);
	ms = (ms+"0").slice(0, 2);
	return `${mm}:${ss}:${ms}`;
}

function changeColor(color) {
	textArea.style.borderColor = color;
}

function reset() {
	clearInterval(counter);
	counter = null;
	textArea.value = "";
	timer.innerText = "00:00:00";
	changeColor("#dddddd");
}

function setTimer(){
	var currentDate = new Date();
	counter = setInterval(function(){
		timer.innerHTML = upTimer(currentDate);
	}, 100);
}

function parseTimer(timeString) {
	let stamp = timeString.split(":");
	return stamp[0]+stamp[1]/60;
}