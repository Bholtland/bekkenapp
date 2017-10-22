 var vasScoreChoice;
 var evaluationStep1 = q('.evaluation-step-1');
 var evaluationStep2 = q('.evaluation-step-2');
 var vasScoreChoiceImage = q('.evaluation-step-2 .top img');
 var changeVasScore = q('.change-vas-score');

 (function () {
    setTimeout(function(){
    // html elements
    var container = document.getElementById("slider-container");
    var slider = document.getElementById("slider-bar");
    var handle = document.getElementById("slider-handle");
    var submitVal = document.getElementById("submit-value");

    // initial values
    var minVal = 0;
    var maxVal = 100;

    var range = maxVal - minVal;
    var isSliding = false;
    var sliderValue;

    // the sliding function
    var move = function(e) {

        var mouseY = 0;
        var containerTop = 0;
        var newHeight = 0;
        var containerHeight = 0;
        var percentHght = 0;
        var x = 0;
        var y = 0;
        // var sliderValue = 0;

        if (!e) var e = window.event;

        if( e.pageY ){ // all browsers except IE before version 9
            mouseY = e.pageY;

        } else if ( e.clientY ) { // IE before version 9
            mouseY = e.clientY;
        }   

        containerTop = container.offsetTop+60;
        newHeight = mouseY - containerTop;
        containerHeight = container.offsetHeight;
        percentHght = newHeight * 100 / containerHeight;

        if( (percentHght <= 100) && (percentHght >= 0) ) {
            slider.style.height = (percentHght) + '%';
            y = 100 - percentHght;
            x = y * range / 100;

        } else if( percentHght < 0 ) {
            percentHght = 0;
            slider.style.height = (percentHght) + '%';
            y = 100 - percentHght;
            x = y * range / 100;

        } else if( percentHght > 100 ) {
            percentHght = 100;
            slider.style.height = (percentHght) + '%';
            y = 100 - percentHght;
            x = y * range / 100;
        }
        sliderValue = Math.round(x);
        // document.getElementById('sliderValue').innerHTML = sliderValue + minVal;

        calculateEmoji(sliderValue);
    };

    // adding the slide functionality
    var addSlide = function() {
        isSliding = true;
        if ( !window.addEventListener ){
            document.attachEvent('onmousemove',move);
        } else {
            document.addEventListener('mousemove', move, false);
        }
    };

    // removing the slide functionality
    var cancelSlide = function() {
        if( isSliding ) {
            if ( window.removeEventListener ) {
                document.removeEventListener('mousemove', move, false);
            } else if ( window.detachEvent ) {
                document.detachEvent('onmousemove', move );
            }
        }
    };

    // cancelling event bubbling
    // cancelling default event action
    var cancelBubble = function(e) {
        var evt = e ? e:window.event;

        if( evt.stopPropogation ){
            evt.stopPropogation();
        }

        if( evt.cancelBubble != null ){
            evt.cancelBubble = true;
        }

        if( evt.preventDefault ){
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    };

    // capture events
    //capturing the mousedown on the handle
    handle.onmousedown = function(e) {
        addSlide();
        cancelBubble(e);
    }

    //capture the mouseup on the handle
    handle.onmouseup = function(e) {
        cancelSlide();
        cancelBubble(e);
       
        if (sliderValue > 93){
            type=1
        }
        else if (sliderValue > 82) {
            type=2
        }
        else if (sliderValue > 71) {
            type=3
        }
        else if (sliderValue > 60) {
            type=4
        }
        else if (sliderValue > 49) {
            type=5
        }
        else if (sliderValue > 38) {
            type=6
        }
        else if (sliderValue > 27) {
            type=7
        }
        else if (sliderValue > 16) {
            type=8
        }
        else if (sliderValue > 5) {
            type=9
        }
        else if (sliderValue < 5) {
            type=10
        }

        else {
            type=10;
            console.log('false')
        }

        var emoji = document.querySelector('.emojiholder > img:nth-of-type('+type+')');
        vasScoreChoice = type;
        vasScoreChoiceImage.setAttribute('src', 'resources/img/eval-'+type+'.svg');
        hd(evaluationStep1);
        sw(evaluationStep2);
    }

    // capture the mouse up on the slider
    slider.onmouseup = function(e) {
        cancelSlide();
        cancelBubble(e);
    }

    // capture the mouse down on the slider
    slider.onmousedown = function(e) {
        move(e);
        cancelBubble(e);
    }

    // capture the mouse up on the container
    container.onmouseup = function(e) {
        cancelSlide();
        cancelBubble(e);
    }

    // capture the mouse down on the container
    container.onmousedown = function(e) {
        move(e);
        cancelBubble(e);
    }

    // capture the mouse up on the window
    document.onmouseup = function(e) {
        cancelSlide();
        cancelBubble(e);
    }
},2000)
})();

var emoji = document.querySelectorAll('.emojiholder > img');


function calculateEmoji(val){

    for(i = 0; i < emoji.length; i++) {

        point = 100- (i*11);

        valRebase = (val-point)/20

        if (val > (point-10) && val < (point+10)){
            parab = (valRebase*valRebase)-1

            emoji[i].style.transform = "scale("+ parab*-1 +")"
            emoji[i].style.opacity = (parab*-1)
        }

        else {
            emoji[i].style.transform = "scale(0.8)"
            emoji[i].style.opacity = 0.8;       
        }

    }
}

changeVasScore.addEventListener('click', function(){
    hd(evaluationStep2);
    sw(evaluationStep1);
})
var buttonNavMain = q('.button-nav-main'),
	buttonStats = q('nav ul li:nth-of-type(1)'),
	buttonScheme = q('nav ul li:nth-of-type(2)'),
	buttonSettings = q('nav ul li:nth-of-type(3)'),

	screens = qAll('main > div > section'),
	screenCanvas = q('main > div'),
	screenOverlay = q('.screen-overlay'),
	navBar = q('.navigation-bar'),
	navBarTitle = q('.navigation-bar h1'),
	buttonNavEdit = q('.button-nav-edit'),

	currentScreen,
	previousScreen,
	centerOffset,
	currentExercise,
	vibrate = false,
	audio = true,
	music = true,

	exerciseScreen = q('.exercise-screen'),
	breather = q('.breather'),
	timer = q('.remaining-time span'),
	screenScheme = q('#scheme'),
	screenStats = q('#stats'),
	today = q('.today'),
	// todayExercises = qAll('.today .exercise'),

	stats = q('.stats'),
	onboarding = q('.onboarding'),

	buttonExerciseVibrate = q('.vibrate'),
	buttonExerciseAudio = q('.playAudio'),
	buttonExerciseMusic = q('.playMusic'),
	buttonExerciseSettings = q('.button-settings'),
	buttonExerciseStart = q('.start'),
	exerciseSettings = q('.exercise-settings'),

	feedbackScreen = q('.feedback'),
	feedbackButton = q('.feedback .button'),
	hiddenTextArea = q('.hidden-textarea'),
	lineCanvas = q('.line-canvas'),
	graphPoly = q('#graphPoly'),
	graph = q('.graph'),
	graphBackground = q('.graph-background'),
	dates = q('.dates'),
	datesElement,
	datesElementFirst = q('.dates p:first-child'),
	graphVasGrade = q('.vas-grade'),
	graphVasDate = q('.vas-results > div > p'),
	graphVasText = q('.vas-results > p'),

	schemeSettings = q('.scheme-settings'),
	schemeSettingsCards = q('.scheme-settings .cards'),
	schemeSettingsButton = q('.scheme-settings .button'),
	schemeDays = q('.scheme-days'),

	informationScreen = q('.information-screen'),
	informationButton = q('.information'),
	progressionGraph = q('.progression-graph'),
	progressionGraphMenu = q('.progression-graph-menu'),

	notification = q('.notification'),
	notificationText = q('.notification p'),

 	loginButton = q('.login .button'),
 	entryButton = q('.onboarding-entry .button'),
 	complaintsButton = q('.onboarding-complaints .button'),
 	tutorialButtonNo = q('.onboarding-question .button:nth-of-type(1)'),
 	tutorialButtonYes = q('.onboarding-question .button:nth-of-type(2)'),

 	profileScreen = q('.profile'),

	scrollBox = q('.scroll-box'),

	sessions = 4,
	tightenTime = 10,
	relaxTime = 20, 

	hasStarted = false,

	currentPopup,

	// Stats screen
	pointString = "",
	feedback = [],
	pointWidth,
	pointHeight,
	pointNum,
	point,
	pointString,
	graphWidth,
	graphHeight,
	line,
	lineHeight,

	manualSub,

	focus,
	focusModulus,
	currentScrollPos,
	previousLine,
	scrollLeft,
	scrollPos,
	linePos,
	element,
	elementNumber,
	previousLine,

	audio,
	music,

	isDesktop=false,

	planForDays = 7;

if (window.innerWidth > 700){
	window.innerHeight = 667;
	window.innerWidth = 375;
	isDesktop = true;
}

var screenHierarchy = {
	scheme : {
		name : "scheme",
		title : "Oefenschema",
		edit : {
			name : "schemeEdit",
			title : "Schema aanpassen",
			parent : "scheme"
		},
		login: {
			name: "login",
			title: "Aanmelden",
			parent: "scheme"
		}
	},
	exercise : {
		name : "exercise",
		title : "Ontspannen",
		settings : {
			name : "exerciseSettings",
			title : "Instellingen",
			parent : "exercise"
		},
		info : {
			name : "exerciseInfo",
			title : "Uitleg",
			parent : "exercise"
		}
	},
	progress : {
		name : "progress",
		title : "Voortgang",
		graph : {
			name : "progressGraph",
			title : "Voortgang pijnklachten",
			parent : "progress.graphmenu"
		},
		graphmenu : {
			name: "progressGraphMenu",
			title: "Toon evaluaties",
			parent: "progress"
		}
	},
	profile : {
		name : "profile",
		title : "Profiel",
		parent : "scheme"
	},
	onboarding: {
		name : "onboarding",
		title : ""
	},
	feedback : {
		name : "exerciseFeedback",
		title : "Evaluatie",
		parent : "scheme"
	},
}

var exercisePlanning = [1,1,2,0];

var exerciseData = [
	[
		['Co&ouml;rdinatie'],
		['Aanspannen (s)', 5],
		['Ontspannen (s)', 15],
		['Herhalen (aantal keer)', 6],
		['series', exercisePlanning[0]]
	],
	[
		['Krachttraining (snel)'],
		['Aanspannen (s)', 1],
		['Ontspannen (s)', 2],
		['Herhalen (aantal keer)', 10],
		['series', exercisePlanning[1]]
	],
	[
		['Krachttraining'],
		['Aanspannen (s)', 10],
		['Ontspannen (s)', 20],
		['Herhalen (aantal keer)', 12],
		['series', exercisePlanning[2]]
	],
	[
		['Ontspanning'],
		['Duur (min)', 20],
		['series', exercisePlanning[3]]
	],

];

// Set the current screen to load
currentScreen = screenHierarchy.onboarding;
navigateTo(currentScreen);

// Set width and height of some elements with JS. For some reason CSS doesn't like doing this. Should look into that again.
q('main > div').style.width = window.innerWidth*2 + 'px';

for(var i=0; i < screens.length; i++) {
	screens[i].style.width = window.innerWidth + 'px';
}

screenCanvas.style.height = window.innerHeight + 'px';
q('main').style.height = window.innerHeight + 'px';
screenScheme.style.width = window.innerWidth + 'px';
q('.stats').style.width = window.innerWidth + 'px';
navBar.style.width = window.innerWidth + 'px';
q('.graph-background').style.height = window.innerHeight + 'px';
q('.graph').style.height = window.innerHeight + 'px';
scrollBox.style.height = window.innerHeight-55 + 'px';
// Hide and show functions
function hd(element){
	element.classList.add('invisible');
}

function sw(element){
	element.classList.remove('invisible');
}

// faster querySelectors
function q(element){
	return document.querySelector(element)
}

function qAll(element){
	return document.querySelectorAll(element)
}
function showNotification(text, time, action, actionParam1, actionParam2, actionParam3){
	notificationText.innerHTML = text;

	notification.classList.add('show');

	notification.addEventListener('click', ()=>{
		action(actionParam1, actionParam2, actionParam3);
		notification.classList.remove('show');
	})

	setTimeout(()=>{
		notification.classList.remove('show');
	},time)
}
var progressionMenuItem = q('.progression-graph-menu ul li:nth-of-type(1)')

navBarTitle.addEventListener('click',function(){
	if (this.classList.contains('is-sub') && !currentPopup) {
		navigateTo(screenHierarchy.scheme);
	} else if (this.classList.contains('is-sub')) {
		closePopupScreen(currentPopup);
	} else {
		return;
	}
})

q('.button-nav-stats').addEventListener('click', function(){navigateTo(screenHierarchy.progress)});
q('.button-nav-scheme').addEventListener('click', function(){navigateTo(screenHierarchy.scheme)});

buttonExerciseSettings.addEventListener('click',function(){popUpScreenFull(exerciseSettings, screenHierarchy.exercise.settings)});
q('.testbtn').addEventListener('click', ()=> {popUpScreenFull(progressionGraphMenu, screenHierarchy.progress.graphmenu, true)});
buttonNavEdit.addEventListener('click', function(){makeSchemeSettings(); popUpScreenFull(schemeSettings, screenHierarchy.scheme.edit, true)});
informationButton.addEventListener('click', function(){popUpScreenFull(informationScreen, screenHierarchy.exercise.info, true)});

progressionMenuItem.addEventListener('click',function(){
	hd(currentPopup)
	popUpScreenFull(progressionGraph, screenHierarchy.progress.graph);
	if (isDesktop){
		showNotification('Je zit op een computer, scroll opzij met je muis om door de grafiek heen te gaan', 5000);
	}
});

buttonSettings.addEventListener('click',()=>{
	popUpScreenFull(profileScreen, screenHierarchy.profile);
})

buttonNavMain.addEventListener('click',function(){
	var navMainButton = q('.tcon'),
		nav = q('nav'),
		navButtons = qAll('.button-nav')


	navMainButton.classList.toggle('tcon-transform');
	nav.classList.toggle('active');

	if (nav.classList.contains('active')) {
		for(var i=0; i < navButtons.length; i++) {
			navButtons[i].addEventListener('click', function(){
				navMainButton.classList.remove('tcon-transform');
				nav.classList.remove('active');
			});
		};
	};
});

schemeSettingsButton.addEventListener('click', ()=>{
	inputs = document.querySelectorAll('.scheme-settings input');

	for (i = 0; i < inputs.length; i++){
		let serie = inputs[i].getAttribute("serie");
		let key = inputs[i].getAttribute("key");

		if (exerciseData[serie][key][0] === 'series'){
			exerciseData[serie][key][1] = inputs[i].value;
			// exercisePlanning[serie]=inputs[i].value;
		}

		else {
			exerciseData[serie][key][1] = inputs[i].value;
		}
	}

	showNotification('Instellingen opgeslagen!', 2000);

	makeScheme();
});
function makeSchemeSettings(){
	for (let i = 0; i < exercisePlanning.length; i++){

			const li = document.createElement('li');

			const name = document.createElement('h2');
			name.setAttribute('class','margin-base');
			name.innerHTML = exerciseData[i][0][0];

			const outline = document.createElement('ul');
			outline.setAttribute('class','outline margin-base');

			li.appendChild(name);
			li.appendChild(outline);

			schemeSettingsCards.appendChild(li);

			for(a = 0; a < exerciseData[i].length; a++){
				const outlineLi = document.createElement('li');

				const outlineName = document.createElement('p');
				outlineName.innerHTML = exerciseData[i][a][0];

				if (typeof(exerciseData[i][a][1]) === 'number'){
					const outlineType = document.createElement('input');
					outlineType.setAttribute('type','number');
					outlineType.setAttribute('value',exerciseData[i][a][1]);
					outlineType.setAttribute('serie',i);
					outlineType.setAttribute('key',a);

					outlineLi.appendChild(outlineName);
					outlineLi.appendChild(outlineType);

					outline.appendChild(outlineLi);
				}

			}

	}
}

var today = 0;

function makeScheme(){
	schemeDays.innerHTML = '';

	for (let i = 0; i < planForDays; i++){

		const day = document.createElement('div');

		if (i==today){
			day.setAttribute('class','day today');
		}

		else {
			day.setAttribute('class','day');
		}

		const oneDay = document.createElement('h3');
		oneDay.innerHTML = 'Dag '+(i+1);

		const timeline = document.createElement('div');
		timeline.setAttribute('class','timeline');

		day.appendChild(oneDay);
		day.appendChild(timeline);

		schemeDays.appendChild(day);

		for (a = 0; a < exercisePlanning.length; a++){
			if (exercisePlanning[a] > 1){

				var amount = exercisePlanning[a]+1;

				for(b = 1; b < amount; b++){
					createSerie(a);
				}
			}

			else if (exercisePlanning[a]===0){
			}

			else{
				createSerie(a);
			}


			function createSerie(serieType){
				const serie = document.createElement('div');
				serie.setAttribute('class','exercise');

				if (i===today){
						serie.addEventListener('click', function(){
							if (!this.classList.contains('done')) {
								navigateTo(screenHierarchy.exercise);

								sessions = exerciseData[serieType][3][1];
								timer.innerHTML = exerciseData[serieType][3][1];

								navBarTitle.innerHTML =	exerciseData[serieType][0][0];

								tightenTime = exerciseData[serieType][1][1];
								relaxTime = exerciseData[serieType][2][1];

								// Define the current exercise, to mark it as "done" later
						 		currentExercise = this;
							}
						});
				}

				const exerciseLine = document.createElement('div');
				exerciseLine.setAttribute('class','exercise-line');

				const exerciseBox = document.createElement('div');
				exerciseBox.setAttribute('class','exercise-box');

				serie.appendChild(exerciseLine);
				serie.appendChild(exerciseBox);

				const exerciseName = document.createElement('span');
				exerciseName.setAttribute('class','exercise-name');
				const exerciseNameTitle = document.createElement('h3');

				const exerciseDuration = document.createElement('span');
				exerciseDuration.setAttribute('class','exercise-duration');
				const exerciseDurationText = document.createElement('p');

				const exerciseIndicator = document.createElement('span');
				exerciseIndicator.setAttribute('class','exercise-indicator');


				switch(a){
					case 0:
						serie.setAttribute('class', 'exercise coordination');

						exerciseNameTitle.innerHTML = 'Co&ouml;rdinatie';
						exerciseDurationText.innerHTML = exerciseData[0][3][1]+' herhalingen';

						break;
					case 1:
						serie.setAttribute('class', 'exercise power-fast');

						exerciseNameTitle.innerHTML = 'Krachttraining (snel)';
						exerciseDurationText.innerHTML = exerciseData[1][3][1]+' herhalingen';

						break;
					case 2:
						serie.setAttribute('class', 'exercise power-slow');

						exerciseNameTitle.innerHTML = 'Krachttraining';
						exerciseDurationText.innerHTML = exerciseData[2][3][1]+' herhalingen';

						break;
					case 3:
						serie.setAttribute('class', 'exercise relaxation');

						exerciseNameTitle.innerHTML = 'Ontspannen';
						exerciseDurationText.innerHTML = exerciseData[3][1][1]+' minuten';

						break;
				}

				exerciseName.appendChild(exerciseNameTitle);
				exerciseDuration.appendChild(exerciseDurationText);

				exerciseBox.appendChild(exerciseName);
				exerciseBox.appendChild(exerciseDuration);
				exerciseBox.appendChild(exerciseIndicator);

				timeline.appendChild(serie);
			}
		}
	}
}

makeScheme();

buttonExerciseVibrate.addEventListener('click', function(){
    if (this.checked) {
        vibrate = true;
    } else {
    	vibrate = false;
    }
}); 

buttonExerciseAudio.addEventListener('click', function(){
    if (this.checked) {
        audio = true;
    } else {
    	audio = false;
    }
}); 

buttonExerciseMusic.addEventListener('click', function(){
    if (this.checked) {
        music = true;
    } else {
    	music = false;
    }
}); 
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
		counterText.innerHTML = localSeconds+"<span>/"+duration+"</span";

		if (sessionsToGo == 0) {
			clearBreather();
			navigateTo(screenHierarchy.scheme);
			if (currentExercise) {
				setTimeout(function(){
					currentExercise.classList.add('done','shine');
					var node = document.createElement("i");                 // Create a <li> node                              // Append the text to <li>
					currentExercise.appendChild(node); 
					setTimeout(()=>{showLogin();},1400)
				}, 400);	
			}	
		}
		
	},1000);

	// When clicking reset, all is cleared
	resetButton.addEventListener('click',function(){
		clearBreather();
		playAudio('stop');		
	});

}
// This function is used to navigate between popup screens
function popUpScreenFull(screen, name, manualSub) {
	currentPopup = screen;

	currentScreen = name;

	sw(screen);
	screen.classList.add('open');

	navBarTitle.innerHTML = name.title;

	if (manualSub) {
		manualSub = true;
		navBarTitle.classList.add('is-sub');
	}

	navBar.classList.add('popped-up');

}

function closePopupScreen(screen) {
	screen.classList.remove('open');

	var parent = currentScreen.parent;
	parent = "screenHierarchy."+parent;
	parent = eval(parent);
	
	navBarTitle.innerHTML = parent.title;

	currentScreen = parent;

	navBar.classList.remove('popped-up');
	currentPopup = null;

}
// This function is used to navigate between main screens
function navigateTo(screen){
	screen = screen.name

	if (currentPopup){
		closePopupScreen(currentPopup, "Ontspannen");
		setTimeout(()=> {navigate()},300);
	}
	else {
		navigate();
	}

	function navigate(){
		sw(navBar);
		if (screen == 'scheme') {
			screenCanvas.style.left = '0';
			navBarTitle.classList.remove('is-sub');
			navBarTitle.innerHTML = screenHierarchy.scheme.title;
			hd(stats);
			hd(onboarding);

			setTimeout(function(){hd(screenStats)}, 300);
			sw(scheme);		
			setTimeout(function(){sw(screenScheme)})
			// centerOnToday();
			currentScreen = screenHierarchy.scheme;
		} 

		else if (screen == 'exercise') {
			screenCanvas.style.left = (-window.innerWidth)-2 + 'px';
			navBarTitle.classList.add('is-sub');
			currentScreen = screenHierarchy.exercise;
		}

		else if (screen == 'progress') {
			screenCanvas.style.left = '0';
			navBarTitle.classList.remove('is-sub');	
			navBarTitle.innerHTML = screenHierarchy.progress.title;
			hd(scheme);
			hd(onboarding);

			setTimeout(function(){hd(scheme)}, 300);
			sw(stats)		
			setTimeout(function(){sw(screenStats)}, 300);
			currentScreen = screenHierarchy.progress;
		}
		else if (screen == 'onboarding') {
			screenCanvas.style.left = '0';
			hd(navBar)
			hd(scheme);
			sw(onboarding)		
			currentScreen = screenHierarchy.onboarding;
		}
	}
 };
feedbackButton.addEventListener('click',function(){
	checkmark = q('.checkmark');
	absoluteWrapper = q('.absolute-wrapper');

	hd(feedbackButton);
	hd(evaluationStep2);
	sw(checkmark);
	sw(absoluteWrapper)
	setTimeout(function(){
		hd(checkmark);
		hd(absoluteWrapper)
		closePopupScreen(currentPopup)	
		setTimeout(function(){
			sw(checkmark);
			sw(evaluationStep2);
			sw(feedbackButton);
			

		},500);
	},1600);
})

hiddenTextArea.addEventListener('click', function(){
	hiddenTextArea.classList.add('open');
});
var weekData = q('.week-data');
var closeWeekData = q('.close-week-data');

feedback = [
	[4,"Ik had ergens last van", "Week 1"],
	[5,"Ik had constant last van mijn rechterdij", "Week 2"],
	[7,"Iets", "Week 3"],
	[8,"Ik had last", "Week 4"],
	[10,"Ik had ergens last van dus daarom voelde het niet goed maar nu gaat het wel weer wat beter dus we gaan gewoon door.", "Week 5"],
];

// Defining the space between feedback points
pointWidth = window.innerWidth/2.5;

// Defining the graph size based on the amount of feedback
graphWidth = (feedback.length ) * pointWidth;
graphHeight = 500;

graphSVG = q('.graphSVG');
verticalAxis = q('.vertical-axis');

graphSVG.setAttribute('width' ,graphWidth);
graphSVG.setAttribute('viewBox', '0 0 ' +graphWidth+ ' '+ graphHeight);
lineCanvas.style.width = graphWidth+10+'px';
verticalAxis.style.width = graphWidth+'px';
lineCanvas.style.height = graphHeight+'px';

// A loop that takes data from the feedback array and visualizes that into the graph
for(let i=0; i < feedback.length; i++) {
	// Define absolute height of an SVG poly
	pointHeight = (feedback[i][0]*-graphHeight/10)+graphHeight;

	// Define the x position of the poly
	pointNum = i*pointWidth;

	// Create a poly
	point = pointNum + " " + pointHeight + " ";

	// Build a string to create the SVG width
	pointString = pointString + point;

	// Define the height of a line and create a span element to add to the DOM
	lineHeight = (graphHeight/10)*feedback[i][0]+"px";
	line = "<span style='height:"+lineHeight+"; margin-left: "+(pointWidth-1)+"px;'></span>";

	$('.line-canvas').append(line)

	$('.dates').append("<p>"+feedback[i][2]+"</p>");
}

// Finish the string with standard remaining poly's and add it to the DOM
pointString = pointString + ((feedback.length -1)*pointWidth) + " " + graphHeight + " 0 " + graphHeight;
graphPoly.setAttribute('points', pointString);

// GRAPH FOCUSPOINT

// Create a focus in which the screen will focus on a given feedbackpoint. The variable focus is the position x of the focuspoint
focus = (window.innerWidth - pointWidth) /2;

// Define the number that remains when fitting the pointWidth in our focus variable
focusModulus = focus % pointWidth;

graphBackground.style.width = graphWidth+(focus*2)+10+'px';
dates.style.width =  graphWidth+(focus*2)+10+'px';
lineCanvas.style.left = focus+'px';
graphSVG.style.left = focus+'px';

datesElement = document.querySelectorAll('.dates p');

for (let i=0; i < datesElement.length; i++) {
	datesElement[i].style.width = pointWidth-1+'px';
}

datesElementFirst.style.width = focus-(pointWidth/2)-6+'px';

graph.addEventListener('scroll',function(){
	// combine scrollposition x and focusModulus
	scrollLeft = graph.scrollLeft + focusModulus;

	// Divide the absolute scrollposition by the width of a point, so we'll get numbers like 1,2,3 etc. which will define feedbackpoints
 	scrollPos = Math.ceil(scrollLeft/pointWidth);

	// Only fire this when a new point is highlighted within our focuspoint (Some optimization)
	if (scrollPos != currentScrollPos) {
		currentScrollPos = scrollPos;
		
		// define the line that is highlighted by combining the scrollPos and the space between x=0 and the focuspoint
		linePos = Math.ceil(focus/pointWidth-1)+scrollPos;

		if (previousLine){
			previousLine.classList.remove('active');
		}

		element = q('.line-canvas span:nth-of-type('+linePos+')');
		element.classList.add('active');

		// Get the currently higlighted element
		elementNumber = linePos-1;
		
		// Add the corresponding data to the DOM
		graphVasGrade.innerHTML = feedback[elementNumber][0];
		graphVasDate.innerHTML = feedback[elementNumber][1];
		graphVasText.innerHTML = feedback[elementNumber][2];

		// Set the current element as previous so it's "active" class will be removed when another point is highlighted
		previousLine = element;
	}
})

$('.line-canvas span').each(function(){
	$(this).click(function(){
		showWeekData();
	})
})

function showWeekData(){
	sw(weekData);
}

closeWeekData.addEventListener('click',function(){
	hd(weekData);
});
if (audio){
	buttonExerciseAudio.checked = true;
}

if (music){
	buttonExerciseMusic.checked = true;
}


 function playAudio(type){
 	var dir = "resources/audio/";
 	var audioFile;	
 	var musicFile;

 	variation = Math.ceil(Math.random() * 3);

 	var voiceFile = new Audio(dir+"10x20-"+variation+".ogg");
 	var musicFile = new Audio(dir+"music1.ogg");

 	if (type === 'voice'){
	 	
	 	voiceFile.play();
 	}

 	if (type === 'music'){
	 	
	 	musicFile.play();
 	}

 	if (type === 'stop'){
 		if(voiceFile){
			voiceFile.pause();
		}
		
		if(musicFile){
			musicFile.pause();
		}
 	}
 }
var onboardingEntry = q('.onboarding-entry');
var onboardingComplaints = q('.onboarding-complaints');
var onboardingQuestion = q('.onboarding-question');

var complaints = document.querySelectorAll('.complaint');

entryButton.addEventListener('click',()=>{
	hd(onboardingEntry);
	sw(onboardingComplaints);
})

complaintsButton.addEventListener('click', ()=>{
	hd(onboardingComplaints);
	sw(onboardingQuestion);
})

tutorialButtonNo.addEventListener('click', ()=> {
	tutorial(false);
});

tutorialButtonYes.addEventListener('click', ()=> {
	tutorial(true);
	setTimeout(()=>{popUpScreenFull(informationScreen, screenHierarchy.exercise.info, true)},400)
});

function tutorial(choice){
	if(choice){
		navigateTo(screenHierarchy.exercise);

	sessions = 2;
	timer.innerHTML = 2;	

	navBarTitle.innerHTML =	exerciseData[2][0][0];	

	tightenTime = exerciseData[2][1][1];	
	relaxTime = exerciseData[2][2][1];		

	currentExercise = q('.today .exercise:nth-of-type(1)');
	} 
	else {
		navigateTo(screenHierarchy.scheme);
	}
}

// for (var c = 0; c < complaints.length; c++){
// 	complaints[c].addEventListener('click', (index)=>{
// 		this.classList.add('true');
// 		console.log(c)
// 	})
// }

$('.complaint').each(function(index){
	$(this).click(function(){
		$(this).toggleClass('istrue')
	})
})
var loginScreen = q('.login-screen');
var loginChoiceYes = q('.loginChoice a:nth-of-type(2)');
var loginChoiceNo = q('.loginChoice a:nth-of-type(1)');

var buttonUseremail = q('.login-step-2 .button');
var buttonUserpassword = q('.login-step-3 .button');

var login = q('.login');

var loginStep1 = q('.login-step-1');
var loginStep2 = q('.login-step-2');
var loginStep3 = q('.login-step-3');
var loginStep4 = q('.login-step-4');

function showLogin(){
	popUpScreenFull(loginScreen, screenHierarchy.scheme.login, true);
}

loginChoiceYes.addEventListener('click',()=>{
	hd(loginStep1);
	sw(loginStep2);
});

loginChoiceNo.addEventListener('click',()=>{
	closeLogin();
});

buttonUseremail.addEventListener('click',()=>{
	registerLogin('email');
});

buttonUserpassword.addEventListener('click',()=>{
	registerLogin('password');
});

function registerLogin(type){
 	var errorText = q('.error');
 	
 	var loginEmail = q('.login-step-2 input');
 	var loginPassword = q('.login-step-3 input');

 	if (type === 'email'){
	 	if(loginEmail.value !== '' && loginEmail.value.includes('@')){
	 		hd(loginStep2);
	 		sw(loginStep3);
	 	}
	 	else if (loginEmail.value === ''){
	 		throwError('Vul a.u.b. een e-mailadres in');
	 	}
	 	else if (!loginEmail.value.includes("@")){
	 		throwError('Een e-mailadres bevat een @');
	 	}
 	}

 	else if (type === "password"){
 		if (!loginPassword.value) {
 			throwError('Voer een wachtwoord in');
 		}
 		else {
 			hd(loginStep3);
 			sw(loginStep4);
 			q('.login h3').innerHTML = 'Gelukt!<br/>Nu kunnen we echt aan de slag';
 			setTimeout(()=>{closeLogin();},2000);
 		}
 	}

 	function throwError(text){
 		errorText.innerHTML = text; 
 	}

 }

 function closeLogin(){
 	closePopupScreen(loginScreen);
 	setTimeout(()=>{
 		showNotification('Het is tijd om te evalueren! Klik hier', 4000, popUpScreenFull, feedbackScreen, screenHierarchy.feedback, true);
 	},1000);
 }

 tutorialButtonNo.addEventListener('click', ()=> {
 	tutorial(false);
 });

 tutorialButtonYes.addEventListener('click', ()=> {
 	tutorial(true);
 });

 function tutorial(choice){
 	if(choice){
 		navigateTo(screenHierarchy.exercise);

		sessions = 2;
		timer.innerHTML = 2;	

		navBarTitle.innerHTML =	exerciseData[2][0][0];	

		tightenTime = exerciseData[2][1][1];	
		relaxTime = exerciseData[2][2][1];		

		currentExercise = q('.today .exercise:nth-of-type(3)');
 	} 
 	else {
 		navigateTo(screenHierarchy.scheme);
 	}
 }
