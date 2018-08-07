// JavaScript source code
var startTime = document.getElementById('#startTime');
var cdmin = document.getElementById('#cdmin');
var cdsec = document.getElementById('#cdsec');
var clock = document.getElementById('#clock');
var timeMin = document.getElementById('#timeMin');
var plus = document.getElementById('#plus');
var minus = document.getElementById('#minus');
var reset = document.getElementById('#reset');

document.getElementById

var alarm = new Audio('Alarm01.wav');

var timerFlag = true;
var cancel = false;
var play = true;
var pause = false;

// Start timer: Play/Pause
startTime.addEventListener('click', function () {

	if (play) {
		var timeInMinutes = Number(timeMin.innerHTML);
		if (pause) {
			timeInMinutes = Number(cdmin.innerHTML) + Number(cdsec.innerHTML) / 60;	
			console.log('pause time: ' + timeInMinutes);
			pause = false;
		}
		
		var currentTime = Date.parse(new Date());
		var deadline = new Date(currentTime + timeInMinutes * 60 * 1000);
		
		timerFlag = false;
		initializeClock(deadline);
		startTime.innerHTML = '<i class="fa fa-pause"></i>';
		play = false;
	} else {
		startTime.innerHTML = '<i class="fa fa-play"></i>';
		pause = true;
		play = true;
	}
});

// Timer workhorse
function getTimeRemaining(endTime) {
	var time = Date.parse(endTime) - Date.parse(new Date());

	var seconds = Math.floor((time / 1000) % 60);
	var minutes = Math.floor((time / 1000 / 60) % 60);

	return {
		'total': time,
		'seconds': seconds,
		'minutes': minutes
	};
}

// Timer DOM manipulator
function initializeClock(endTime) {

	function updateClock() {
		

		var time = getTimeRemaining(endTime);
		if (!cancel) {
			fadeOut();
			fadeIn(time);
		}
	

		if (pause) {
			clearInterval(timeInterval);
			return;
		}

		if (time.total <= 0 || cancel) {
			clearInterval(timeInterval);
			cdmin.innerHTML = ('0' + timeMin.innerHTML).slice(-2);
			cdsec.innerHTML = '00';
			cancel = false;
			pause = false;
			play = true;
			console.log(timeMin.innerHTML);
			if (time.total <= 0) {
				alarm.play();
			}
			return;
		}
	}

	updateClock();
	var timeInterval = setInterval(updateClock, 1000);
}

// Timer Value Change
	plus.addEventListener('click', function () {
		timeMin.innerHTML = Number(timeMin.innerHTML) + 1;
		if (timerFlag) {
			cdmin.innerHTML = ('0' + timeMin.innerHTML).slice(-2);
		}
	});
	
minus.addEventListener('click', function () {
	timeMin.innerHTML = Number(timeMin.innerHTML) - 1;
	if (timerFlag) {
		cdmin.innerHTML = ('0' + timeMin.innerHTML).slice(-2);
	}
});



function fadeOut() {
	cdsec.style.opacity = 0;
}

function fadeIn(time) {

	setTimeout(function () {

		cdmin.innerHTML = ('0' + time.minutes).slice(-2);
		cdsec.innerHTML = ('0' + time.seconds).slice(-2);
		cdsec.style.opacity = 1;
	},100);
	
}

// Reset
reset.addEventListener('click', function () {
	timerFlag = true;
	cancel = true;
	pause = false;
	play = true;
	cdmin.innerHTML = ('0' + timeMin.innerHTML).slice(-2);
	cdsec.innerHTML = '00';
	startTime.innerHTML = '<i class="fa fa-play"></i>';
});