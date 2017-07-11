// Defining global variables
var buttonNavMain = $('.button-nav-main'),
	buttonStats = $('nav ul li:nth-of-type(1)'),
	buttonScheme = $('nav ul li:nth-of-type(2)'),
	buttonSettings = $('nav ul li:nth-of-type(3)'),

	currentScreen,
	centerOffset,
	currentExercise,
	vibrate = false,

	exerciseScreen = $('.exercise-screen'),
	breather = $('.breather'),
	timer = $('.remaining-time span'),
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
	previousLine

// Set the current screen to load
currentScreen = "stats";
navigateTo(currentScreen);

// Set width and height of some screens with JS. For some reason CSS doesn't like doing this. Should look into that again.
$('main > div').css("width",$(window).width()*2);
$('main > div > div').css("width",$(window).width());
$('main > div').css("height",$(window).height());
$('main').css("height", $(window).height());
$('.screen-overlay').css("width", $(window).width());
$('#scheme').css('width', $(window).width()-30);
$('.stats').css('width', $(window).width());
$('.navigation-bar').css('width', $(window).width());
$('.graph-background').css("height",$(window).height());
$('.graph').css("height",$(window).height());

// ========== NAV MENU ==========

// Toggle navigation buttons onclick
buttonNavMain.click(function(){
	$('.tcon').toggleClass('tcon-transform');
	$('nav').toggleClass('active');

	if ($('nav').hasClass('active')) {
		$('.button-nav').click(function(){
			$('.tcon').removeClass('tcon-transform');
			$('nav').removeClass('active');
		});	
	};
});

// Screen to navigate to per button
$('.button-nav-stats').click(function(){navigateTo('stats')});
$('.button-nav-scheme').click(function(){navigateTo('exercises')});

// This function is used to navigate between screens
function navigateTo(screen){
	if (screen == 'exercises') {
		$('main > div').css('left', '0');
		$('.navigation-bar h1').removeClass('is-sub');
		$('.button-nav-edit').removeClass('invisible-state');
		$('.stats').fadeOut(200);

		setTimeout(function(){$('#stats').hide()}, 300);
		$('.scheme').show();		
		$('#scheme').delay(300).fadeIn();
		centerOnToday();
	} 

	else if (screen == 'exercise') {
		$('main > div').css('left', -$(window).width()-2);
		$('.navigation-bar h1').addClass('is-sub');
		$('.button-nav-edit').addClass('invisible-state');
	}

	else if (screen == 'stats') {
		$('main > div').css('left', '0');
		$('.navigation-bar h1').removeClass('is-sub');	
		$('.button-nav-edit').addClass('invisible-state');	
		$('.scheme').fadeOut(200);

		setTimeout(function(){$('#scheme').hide()}, 300);
		$('.stats').show();		
		$('#stats').delay(300).fadeIn();
	}
 };

// ========== END NAV MENU ==========

// ========== EXERCISES SCHEME ==========

centerOffset = ($('#scheme').height() - $('.today').height()) /2;

// A function to center on today's exercises
function centerOnToday() {
	$('#scheme').scrollTop(0);
	$('#scheme').scrollTop($(".today").offset().top - centerOffset);
}

centerOnToday();

// ========== END EXERCISES SCHEME ==========

// ========== OPEN EXERCISE ========== 

// Navigate back and forth between exercises and exercise screen
$('.today .exercise').click(function(){
	if (!$(this).hasClass('done')) {
		navigateTo('exercise');

		// Define the current exercise, to mark it as "done" later
 		currentExercise = $(this);
	}
});

$('.navigation-bar h1').click(function(){
	if ($(this).hasClass('is-sub')) {
		navigateTo('exercises');
	}
})

// ========== END OPEN EXERCISE ==========

// ========== BREATHER SETTINGS ==========

// Check if the vibrate setting is on
$('.vibrate').click(function(){
    if (this.checked) {
        vibrate = true;
    } else {
    	vibrate = false;
    }
}) 

// ========== END BREATHER SETTINGS ==========

// ========== EXERCISE ==========

function startExercise() {
	// Defining local variables
	var duration = $('.interval').val(),
		counterText = $('.countdown-number'),
		localSeconds = 1,
		didPrecount = false,

		localCount,
		sessionsToGo = sessions;

	// Create a function to clear all timers etc.
	function clearBreather(){
		clearInterval(localCount);
		timer.html(sessions);
		exerciseScreen.removeClass('active');
		breather.removeClass('release');	
		didPrecount = false;
		breather.addClass('precount');
	}

	exerciseScreen.addClass('active');
	$('svg .active-ring').css('animation-duration', duration+'s');

	counterText.html(localSeconds);
	timer.html(sessionsToGo)
	
	// Create a counter for relaxing and exerting 
	localCount = setInterval(function(){	
		localSeconds++;

		if (didPrecount) {
			breather.removeClass('precount');
		}

		// Toggle relaxation or exertion after given amount of seconds
		if(localSeconds > duration){
			if (didPrecount && !breather.hasClass('release')) {
				sessionsToGo--;
			}
			localSeconds = 1;
			didPrecount = true;			
			breather.toggleClass('release');
			timer.html(sessionsToGo);

			// Vibrate of turned on
			if (vibrate){
				if (!breather.hasClass('release')){
					navigator.vibrate(500);
				} else {
					navigator.vibrate(80);
					setTimeout(function(){
						navigator.vibrate(80);
					},250);
				}
			}
		}		
		counterText.html(localSeconds);

		if (sessionsToGo == 0) {
			clearBreather();
			popUpScreen($('.feedback'), $('.feedback button'), 1300, false);
		}
	},1000);

	// When clicking reset, all is cleared
	$('.reset').click(function(){
		clearBreather();
	});

}

// The button that opens the local "settings" screen
$('.button-settings').click(function(){popUpScreen($('.settings'), $('.screen-overlay'), 0, true)});

// ========== END EXERCISE ==========

// ========== CONTROL BUTTONS ==========

// When clicking start and the counter hasn't started yet, start the exercise
$('.start').click(function(){
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
	$('.screen-overlay').fadeIn();
	screenElement.fadeIn();

	closingItem.click(function(){
		if (screenHideDelay) {
			$('.screen-overlay').delay(screenHideDelay).fadeOut();
		}

		else {
			$('.screen-overlay').fadeOut();
		}	

		if (hideScreenElement) {	
			screenElement.fadeOut();
		}
	});
};

// ========== END POP UP SCREEN ==========

// ========== FEEDBACK SCREEN ==========

// When clicking the feedback screen button, the corresponding animation is showed
$('.feedback button').click(function(){

	$('.feedback button').fadeOut(200);
	$('.feedback > div > div').fadeOut(200);

	$('.absolute-wrapper').addClass('active');

	setTimeout(function(){
		$('.checkmark').fadeOut(100);
		setTimeout(function(){
			$('.absolute-wrapper').removeClass('active');
			$('.checkmark').show();
			$('.feedback > div > div').show();
			$('.feedback button').show();
			$('.feedback').hide();
			navigateTo('exercises');

			setTimeout(function(){currentExercise.addClass('done');}, 400);			

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
pointWidth = $(window).width()/3.5;

// Defining the graph size based on the amount of feedback
graphWidth = (feedback.length -1) * pointWidth;
graphHeight = 400;

$('.graphSVG').attr('width' ,graphWidth);
$('.graphSVG').attr('viewBox', '0 0 ' +graphWidth+ ' '+ graphHeight);
$('.line-canvas').css('width', graphWidth+10);
$('.line-canvas').css('height', graphHeight);

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
$('#graphPoly').attr('points', pointString);

// GRAPH FOCUSPOINT

// Create a focus in which the screen will focus on a given feedbackpoint. The variable focus is the position x of the focuspoint
focus = ($(window).width() - pointWidth) /2;

// Define the number that remains when fitting the pointWidth in our focus variable
focusModulus = focus % pointWidth;

$('.graph-background').css('width', graphWidth+(focus*2)+10);
$('.dates').css('width', graphWidth+(focus*2)+10);
$('.line-canvas').css('left', focus);
$('.graphSVG').css('left', focus);
$('.dates p').css('width', pointWidth-1);
$('.dates p:first-child').css('width', focus-(pointWidth/2)-6);

$('.graph').scroll(function(){
	// combine scrollposition x and focusModulus
	scrollLeft = $('.graph').scrollLeft() + focusModulus;

	// Divide the absolute scrollposition by the width of a point, so we'll get numbers like 1,2,3 etc. which will define feedbackpoints
 	scrollPos = Math.ceil(scrollLeft/pointWidth);

	// Only fire this when a new point is highlighted within our focuspoint (Some optimization)
	if (scrollPos != currentScrollPos) {
		currentScrollPos = scrollPos;
		
		// define the line that is highlighted by combining the scrollPos and the space between x=0 and the focuspoint
		linePos = Math.ceil(focus/pointWidth-1)+scrollPos;

		$(previousLine).removeClass('active');

		element = '.line-canvas span:nth-of-type('+linePos+')';
		$(element).addClass('active');

		// Get the currently higlighted element
		elementNumber = $(element).index();
		
		// Add the corresponding data to the DOM
		$('.vas-grade').html(feedback[elementNumber][0]);
		$('.vas-results > div > p').html(feedback[elementNumber][1]);
		$('.vas-results > p').html(feedback[elementNumber][2]);

		// Set the current element as previous so it's "active" class will be removed when another point is highlighted
		previousLine = element;
	}
})

// END GRAPH FOCUSPOINT

// ========== END STATS ==========
