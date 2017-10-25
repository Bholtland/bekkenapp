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