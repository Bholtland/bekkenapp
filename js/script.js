// Defining global variables
var buttonNavMain = document.querySelector('.button-nav-main'),
	buttonStats = document.querySelector('nav ul li:nth-of-type(1)'),
	buttonScheme = document.querySelector('nav ul li:nth-of-type(2)'),
	buttonSettings = document.querySelector('nav ul li:nth-of-type(3)'),

	screens = document.querySelectorAll('main > div > section'),
	screenCanvas = document.querySelector('main > div'),
	screenOverlay = document.querySelector('.screen-overlay'),
	navBar = document.querySelector('.navigation-bar'),
	navBarTitle = document.querySelector('.navigation-bar h1'),
	buttonNavEdit = document.querySelector('.button-nav-edit'),

	currentScreen,
	centerOffset,
	currentExercise,
	vibrate = false,

	exerciseScreen = document.querySelector('.exercise-screen'),
	breather = document.querySelector('.breather'),
	timer = document.querySelector('.remaining-time span'),
	screenScheme = document.querySelector('#scheme'),
	screenStats = document.querySelector('#stats'),
	today = document.querySelector('.today'),
	todayExercises = document.querySelectorAll('.today .exercise'),

	stats = document.querySelector('.stats'),

	buttonExerciseVibrate = document.querySelector('.vibrate'),
	buttonExerciseSettings = document.querySelector('.button-settings'),
	buttonExerciseStart = document.querySelector('.start'),
	exerciseSettings = document.querySelector('.settings'),

	feedbackScreen = document.querySelector('.feedback'),
	feedbackButton = document.querySelector('.feedback button'),
	lineCanvas = document.querySelector('.line-canvas'),
	graphPoly = document.querySelector('#graphPoly'),
	graph = document.querySelector('.graph'),
	graphBackground = document.querySelector('.graph-background'),
	dates = document.querySelector('.dates'),
	datesElement = document.querySelector('.dates p'),
	datesElementFirst = document.querySelector('.dates p:first-child'),
	graphVasGrade = document.querySelector('.vas-grade'),
	graphVasDate = document.querySelector('.vas-results > div > p'),
	graphVasText = document.querySelector('.vas-results > p'),

	sessions = 1,

	hasStarted = false,

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

function hd(element){
	element.classList.add('invisible');
}

function sw(element){
	element.classList.remove('invisible');
}

// Set the current screen to load
currentScreen = "exercise";
navigateTo(currentScreen);

// Set width and height of some elements with JS. For some reason CSS doesn't like doing this. Should look into that again.
document.querySelector('main > div').style.width = window.innerWidth*2 + 'px';

for(var i=0; i < screens.length; i++) {
	screens[i].style.width = window.innerWidth + 'px';
}

screenCanvas.style.height = window.innerHeight + 'px';
document.querySelector('main').style.height = window.innerHeight + 'px';
screenOverlay.style.width = window.innerWidth + 'px';
screenScheme.style.width = window.innerWidth-30 + 'px';
document.querySelector('.stats').style.width = window.innerWidth + 'px';
navBar.style.width = window.innerWidth + 'px';
document.querySelector('.graph-background').style.height = window.innerHeight + 'px';
document.querySelector('.graph').style.height = window.innerHeight + 'px';

// ========== NAV MENU ==========

// Toggle navigation buttons onclick
buttonNavMain.addEventListener('click',function(){
	var navMainButton = document.querySelector('.tcon'),
		nav = document.querySelector('nav'),
		navButtons = document.querySelectorAll('.button-nav')


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
document.querySelector('.button-nav-stats').addEventListener('click', function(){navigateTo('stats')});
document.querySelector('.button-nav-scheme').addEventListener('click', function(){navigateTo('exercises')});

// This function is used to navigate between screens
function navigateTo(screen){
	if (screen == 'exercises') {
		screenCanvas.style.left = '0';
		navBarTitle.classList.remove('is-sub');
		buttonNavEdit.classList.remove('invisible-state');
		hd(stats);

		setTimeout(function(){hd(screenStats)}, 300);
		sw(scheme);		
		setTimeout(function(){sw(screenScheme)})
		centerOnToday();
	} 

	else if (screen == 'exercise') {
		screenCanvas.style.left = (-window.innerWidth)-2 + 'px';
		navBarTitle.classList.add('is-sub');
		buttonNavEdit.classList.add('invisible-state');
	}

	else if (screen == 'stats') {
		screenCanvas.style.left = '0';
		navBarTitle.classList.remove('is-sub');	
		buttonNavEdit.classList.add('invisible-state');	
		hd(scheme);

		setTimeout(function(){hd(scheme)}, 300);
		sw(stats)		
		setTimeout(function(){sw(screenStats)}, 300);
	}
 };

// ========== END NAV MENU ==========

// ========== EXERCISES SCHEME ==========

centerOffset = (screenScheme.clientHeight - today.clientHeight) /2;

// A function to center on today's exercises
function centerOnToday() {
	screenScheme.scrollTop = (today.offsetTop - centerOffset);
}
centerOnToday();

// ========== END EXERCISES SCHEME ==========

// ========== OPEN EXERCISE ========== 

// Navigate back and forth between exercises and exercise screen
for (var i=0; i < todayExercises.length; i++) {
	todayExercises[i].addEventListener('click', function(){
		if (!this.classList.contains('done')) {
			navigateTo('exercise');

			// Define the current exercise, to mark it as "done" later
	 		currentExercise = this;
		}
	});	
}

navBarTitle.addEventListener('click',function(){
	if (this.classList.contains('is-sub')) {
		navigateTo('exercises');
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
	var duration = document.querySelector('.interval').value,
		counterText = document.querySelector('.countdown-number'),
		activeRing = document.querySelector('svg .active-ring'),
		resetButton = document.querySelector('.reset'),

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
	},1000);

	// When clicking reset, all is cleared
	resetButton.addEventListener('click',function(){
		clearBreather();
	});

}

// The button that opens the local "settings" screen
buttonExerciseSettings.addEventListener('click',function(){popUpScreen(exerciseSettings, screenOverlay, 0, true)});

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
	sw(screenOverlay);
	sw(screenElement);

	function closePopup(){
		if (screenHideDelay) {
			setTimeout(function(){
				hd(screenOverlay);
			},screenHideDelay);
		}

		else {
			hd(screenOverlay);
		}	

		if (hideScreenElement) {	
			hd(screenElement);
		}		
		this.removeEventListener('click', closePopup);
	};

	closingItem.addEventListener('click',closePopup);
};

// ========== END POP UP SCREEN ==========

// ========== FEEDBACK SCREEN ==========

// When clicking the feedback screen button, the corresponding animation is showed
feedbackButton.addEventListener('click',function(){
	var form = document.querySelector('.feedback form'),
		absoluteWrapper = document.querySelector('.absolute-wrapper'),
		checkmark = document.querySelector('.checkmark');

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
			navigateTo('exercises');

			if (currentExercise) {
				setTimeout(function(){currentExercise.classList.add('done');}, 400);	
			}		

		},200);
	},1100);
})

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

graphSVG = document.querySelector('.graphSVG');

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

		element = document.querySelector('.line-canvas span:nth-of-type('+linePos+')');
		element.classList.add('active');

		// Get the currently higlighted element
		elementNumber = linePos;
		
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
