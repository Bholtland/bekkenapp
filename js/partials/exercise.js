// When clicking start and the counter hasn't started yet, start the exercise
buttonExerciseStart.addEventListener('click',function(){
	if (hasStarted) {
		hasStarted = false;
	} else {
		startExercise();
		hasStarted = true;
	}
});

timer.innerHTML = sessions;

function startExercise() {
	if (audio){
		setTimeout(()=>{
			if (tightenTime == 10){
				playAudio('voice');
			}
		},4000)
	}

	if (music){
		setTimeout(()=>{
			if (tightenTime == 10){
				playAudio('music');
			}
		},4000)
	}
	// Defining local variables
	var duration = 4,

		counterText = q('.countdown-number'),
		activeRing = q('svg .active-ring'),
		resetButton = q('.reset'),

		localSeconds = 1,
		didPrecount = false,

		localCount,
		sessionsToGo = sessions;

	// Create a function to clear all timers etc.
	function clearBreather(){
		clearInterval(localCount);
		timer.innerHTML = sessions;
		exerciseScreen.classList.remove('active');
		breather.classList.remove('release');	
		didPrecount = false;
		breather.classList.add('precount');
	}

	exerciseScreen.classList.add('active');

	activeRing.style.strokeDashOffset = '0'
	activeRing.style.animationDuration = 4+'s';
	duration = 4;

	counterText.innerHTML = localSeconds;
	timer.innerHTML = sessionsToGo;
	
	// Create a counter for relaxing and exerting 
	localCount = setInterval(function(){	
		localSeconds++;

		// Toggle relaxation or exertion after given amount of seconds
		if(localSeconds > duration){
			if (duration === tightenTime){ 
				duration = relaxTime;
				activeRing.style.animationDuration = relaxTime+'s';
				activeRing.style.animationName = "relax";
			}
			else {
				duration = tightenTime;
				activeRing.style.animationDuration = tightenTime+'s';
				activeRing.style.animationName = "tighten";
			}	
			localSeconds = 1;		
			
			if (didPrecount) {
				if (breather.classList.contains('release')) {
					sessionsToGo--;

					console.log(sessionsToGo)

					if (sessionsToGo !== 0){
						if (audio){
							if (tightenTime == 10){
								playAudio('voice');
							}
						}

						if (music){
							if (tightenTime == 10){
								playAudio('music');
							}
						}
					}	
				}
				breather.classList.toggle('release');

			}
			
			timer.innerHTML = sessionsToGo;

			// Vibrate of turned on
			if (vibrate){
				if (!breather.classList.contains('release')){
					navigator.vibrate(500);
				} else {
					navigator.vibrate(80);
					setTimeout(function(){
						navigator.vibrate(80);
					},250);
				}
			}


			if (!didPrecount) {
				breather.classList.remove('release');
			}
			didPrecount = true;
			breather.classList.remove('precount');
		}		
		counterText.innerHTML = localSeconds;

		if (sessionsToGo == 0) {
			clearBreather();
			popUpScreenFull(feedbackScreen, screenHierarchy.exercise.feedback, true);
		}
		
	},1000);

	// When clicking reset, all is cleared
	resetButton.addEventListener('click',function(){
		clearBreather();
	});

}