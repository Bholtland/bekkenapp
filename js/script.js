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

	exerciseScreen = q('.exercise-screen'),
	breather = q('.breather'),
	timer = q('.remaining-time span'),
	screenScheme = q('#scheme'),
	screenStats = q('#stats'),
	today = q('.today'),
	todayExercises = qAll('.today .exercise'),

	stats = q('.stats'),

	buttonExerciseVibrate = q('.vibrate'),
	buttonExerciseSettings = q('.button-settings'),
	buttonExerciseStart = q('.start'),
	exerciseSettings = q('.exercise-settings'),

	feedbackScreen = q('.feedback'),
	feedbackButton = q('.feedback button'),
	hiddenTextArea = q('.hidden-textarea'),
	hiddenTextButton = q('.hidden-textarea > p'),
	lineCanvas = q('.line-canvas'),
	graphPoly = q('#graphPoly'),
	graph = q('.graph'),
	graphBackground = q('.graph-background'),
	dates = q('.dates'),
	datesElement = q('.dates p'),
	datesElementFirst = q('.dates p:first-child'),
	graphVasGrade = q('.vas-grade'),
	graphVasDate = q('.vas-results > div > p'),
	graphVasText = q('.vas-results > p'),

	schemeSettings = q('.scheme-settings'),
	progressionGraph = q('.progression-graph'),

	scrollBox = q('.scroll-box'),

	sessions = 1,

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
	previousLine;


var screenHierarchy = {
	scheme : {
		name : "scheme",
		title : "Oefenschema",
		edit : {
			name : "schemeEdit",
			title : "Schema aanpassen",
			parent : "scheme"
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
		feedback : {
			name : "exerciseFeedback",
			title : "Hoe ging het?",
			parent : "exercise"
		},
		info : {
			name : "exerciseInfo",
			title : "Informatie",
			parent : "exercise"
		}
	},
	progress : {
		name : "progress",
		title : "Voortgang",
		graph : {
			name : "progressGraph",
			title : "Resultaat per dag",
			parent : "progress"
		}
	},
	account : {
		name : "account",
		title : "Mijn account"
	}
}

// Set the current screen to load
currentScreen = screenHierarchy.scheme;
navigateTo(currentScreen.name);

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

// ========== NAV MENU ==========

// Toggle navigation buttons onclick
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

// Screen to navigate to per button
q('.button-nav-stats').addEventListener('click', function(){navigateTo(screenHierarchy.progress)});
q('.button-nav-scheme').addEventListener('click', function(){navigateTo(screenHierarchy.scheme)});

// ========== END NAV MENU ==========

// ========== EXERCISES SCHEME ==========

centerOffset = (scrollBox.clientHeight - today.clientHeight) /2;

// A function to center on today's exercises
function centerOnToday() {
	scrollBox.scrollTop = (today.offsetTop - centerOffset);
}
centerOnToday();

// ========== END EXERCISES SCHEME ==========

// ========== OPEN EXERCISE ========== 

// Navigate back and forth between exercises and exercise screen
for (var i=0; i < todayExercises.length; i++) {
	todayExercises[i].addEventListener('click', function(){
		if (!this.classList.contains('done')) {
			navigateTo(screenHierarchy.exercise);

			// Define the current exercise, to mark it as "done" later
	 		currentExercise = this;
		}
	});	
}

navBarTitle.addEventListener('click',function(){
	if (this.classList.contains('is-sub') && !currentPopup) {
		navigateTo(screenHierarchy.scheme);
	} else if (this.classList.contains('is-sub')) {
		closePopupScreen(currentPopup);
	} else {
		return;
	}
})

// ========== END OPEN EXERCISE ==========

// ========== BREATHER SETTINGS ==========

// Check if the vibrate setting is on
buttonExerciseVibrate.addEventListener('click', function(){
    if (this.checked) {
        vibrate = true;
    } else {
    	vibrate = false;
    }
}); 

// ========== END BREATHER SETTINGS ==========

// ========== EXERCISE ==========

timer.innerHTML = sessions;

function startExercise() {
	// Defining local variables
	var duration = q('.interval').value,
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
	activeRing.style.animationDuration = duration+'s';

	counterText.innerHTML = localSeconds;
	timer.innerHTML = sessionsToGo;

	playAudio(2, false, true);
	
	// Create a counter for relaxing and exerting 
	localCount = setInterval(function(){	
		localSeconds++;

		// Toggle relaxation or exertion after given amount of seconds
		if(localSeconds > duration){

			localSeconds = 1;		
			
			if (didPrecount) {
				if (breather.classList.contains('release')) {
					sessionsToGo--;	
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
			popUpScreen(feedbackScreen, feedbackButton, 1300, false);
		}

		if (duration - localSeconds == 1){
			playAudio(localSeconds+1, true);
		}
		else if (duration == localSeconds) {
			playAudio(1, false, true);
		}

		else {
			playAudio(localSeconds+1, false);
		}
		
	},1000);

	// When clicking reset, all is cleared
	resetButton.addEventListener('click',function(){
		clearBreather();
	});

}

// The button that opens the local "settings" screen
buttonExerciseSettings.addEventListener('click',function(){popUpScreenFull(exerciseSettings, screenHierarchy.exercise.settings)});
q('.testbtn').addEventListener('click', ()=> {popUpScreenFull(progressionGraph, screenHierarchy.progress.graph, true)});
buttonNavEdit.addEventListener('click', function(){popUpScreenFull(schemeSettings, screenHierarchy.scheme.edit, true)})

// ========== END EXERCISE ==========

// ========== CONTROL BUTTONS ==========

// When clicking start and the counter hasn't started yet, start the exercise
buttonExerciseStart.addEventListener('click',function(){
	if (hasStarted) {
		hasStarted = false;
	} else {
		startExercise();
		hasStarted = true;
	}
});

// ========== END CONTROL BUTTONS ==========

// ========== POP UP SCREEN ==========

// A function for calling general popup screens
// screenElement is the screen to be called, closingItem is the element that closes the window on click
// screenHideDelay is the delay on closing the popup, hideScreenElement hides the screen except for the background overlay
function popUpScreen(screenElement, closingItem, screenHideDelay, hideScreenElement) {
	sw(screenElement);
	screenElement.classList.add('resize')

	$('.'+currentScreen).append('<div class="screen-overlay" style="width:'+window.innerWidth+'px;"></div>');
	overlay = q('.screen-overlay');

	setTimeout(function(){
		overlay.classList.add('active');
	},10)
	

	function closePopup(){
		screenElement.classList.remove('resize');
		overlay.classList.remove('active');

		if (screenHideDelay) {
			setTimeout(function(){
				$('.screen-overlay').remove();
			},screenHideDelay);
		}

		else {
			$('.screen-overlay').remove();
		}	

		if (hideScreenElement) {	
			hd(screenElement);
		}		
		this.removeEventListener('click', closePopup);
	};

	if (closingItem == 'screenOverlay') {
		closingItem = q('.screen-overlay');
		closingItem.addEventListener('click',closePopup);
	} 
	closingItem.addEventListener('click',closePopup);
};

// ========== END POP UP SCREEN ==========

// ========== POP UP SCREEN FULL ==========



// ========== END POP UP SCREEN FULL ==========

// ========== FEEDBACK SCREEN ==========

// When clicking the feedback screen button, the corresponding animation is showed
feedbackButton.addEventListener('click',function(){
	var form = q('.feedback form'),
		absoluteWrapper = q('.absolute-wrapper'),
		checkmark = q('.checkmark');

	sw(absoluteWrapper);
	hd(feedbackButton);
	hd(form);
	absoluteWrapper.classList.add('active');

	setTimeout(function(){
		hd(checkmark);
		setTimeout(function(){
			absoluteWrapper.classList.remove('active');
			sw(checkmark);
			sw(form);
			sw(feedbackButton);
			hd(feedbackScreen);
			hd(absoluteWrapper)
			navigateTo('scheme');

			if (currentExercise) {
				setTimeout(function(){
					currentExercise.classList.add('done','shine');
					var node = document.createElement("i");                 // Create a <li> node                              // Append the text to <li>
					currentExercise.appendChild(node); 
				}, 400);	
			}		

		},200);
	},1100);
})

hiddenTextButton.addEventListener('click', function(){
	hiddenTextArea.classList.toggle('invisible');
	hiddenTextArea.classList.contains('invisible') ? hiddenTextButton.innerHTML = "&or;" : hiddenTextButton.innerHTML = "&and;";
});

// ========== END FEEDBACK SCREEN ==========

// ========== STATS ==========

// An array that contains the user's feedback
feedback = [
	[4,"Ik had ergens last van", "19-07"],
	[6,"Jep last", "20-07"],
	[10,"Iets", "21-07"],
	[7,"Ik had last", "22-07"],
	[4,"Ik had ergens last van dus daarom voelde het niet goed maar nu gaat het wel weer wat beter dus we gaan gewoon door.", "23-07"],
	[6,"Jep last", "24-07"],
	[10,"Iets", "25-07"],
	[7,"Ik had last", "26-07"],
	[4,"Ik had ergens last van", "27-07"],
	[6,"Jep last", "28-07"],
	[10,"Iets", "29-07"],
	[7,"Ik had last", "30-07"]
];

// Defining the space between feedback points
pointWidth = window.innerWidth/3.5;

// Defining the graph size based on the amount of feedback
graphWidth = (feedback.length -1) * pointWidth;
graphHeight = 400;

graphSVG = q('.graphSVG');

graphSVG.setAttribute('width' ,graphWidth);
graphSVG.setAttribute('viewBox', '0 0 ' +graphWidth+ ' '+ graphHeight);
lineCanvas.style.width = graphWidth+10+'px';
lineCanvas.style.height = graphHeight+'px';

// A loop that takes data from the feedback array and visualizes that into the graph
for(i=0; i < feedback.length; i++) {
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
	$('.line-canvas').append(line);

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

for (var i=0; i < datesElement.length; i++) {
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

// END GRAPH FOCUSPOINT

// ========== END STATS ==========

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
	if (screen == 'scheme') {
		screenCanvas.style.left = '0';
		navBarTitle.classList.remove('is-sub');
		navBarTitle.innerHTML = screenHierarchy.scheme.title;
		hd(stats);

		setTimeout(function(){hd(screenStats)}, 300);
		sw(scheme);		
		setTimeout(function(){sw(screenScheme)})
		centerOnToday();
		currentScreen = screenHierarchy.scheme;
	} 

	else if (screen == 'exercise') {
		screenCanvas.style.left = (-window.innerWidth)-2 + 'px';
		navBarTitle.classList.add('is-sub');
		navBarTitle.innerHTML = screenHierarchy.exercise.title;
		currentScreen = screenHierarchy.exercise;
	}

	else if (screen == 'progress') {
		screenCanvas.style.left = '0';
		navBarTitle.classList.remove('is-sub');	
		navBarTitle.innerHTML = screenHierarchy.progress.title;
		hd(scheme);

		setTimeout(function(){hd(scheme)}, 300);
		sw(stats)		
		setTimeout(function(){sw(screenStats)}, 300);
		currentScreen = screenHierarchy.progress;
	}
	}
 };

 scrollBox.addEventListener('scroll', function(){
 	screenScheme.style.backgroundPositionY = -this.scrollTop/4 + 'px';
 })

 function playAudio(number, isLast, noDelay){
 	var dir = "resources/audio/";
 	var audio;

 	if (number){
 		variation = Math.ceil(Math.random() * 3);

 		if (isLast) {
 			audio = new Audio(dir+'nr_last'+number+"_"+variation+".ogg");
 			console.log('nr_last'+number+"_"+variation+'.ogg');
 		}
 		// else if (noDelay){
 		// 	audio = new Audio(dir+'nr_nodelay'+number+"_"+variation+".ogg");
 		// }

 		else {
 			audio = new Audio(dir+'nr'+number+"_"+variation+".ogg");
 			console.log('nr'+number+"_"+variation+'.ogg');
 		}


 		audio.play();
 	}

 }
