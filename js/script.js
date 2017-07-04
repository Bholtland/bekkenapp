var buttonNavMain = $('.button-nav-main');
var buttonStats = $('nav ul li:nth-of-type(1)');
var buttonScheme = $('nav ul li:nth-of-type(2)');
var buttonSettings= $('nav ul li:nth-of-type(3)');

var currentScreen = "exercises";
navigateTo(currentScreen);

$('main > div').css("width",$(window).width()*2);
$('main > div > div').css("width",$(window).width());
$('main > div').css("height",$(window).height());
$('main').css("height", $(window).height());
$('.screen-overlay').css("width", $(window).width());

$('.scheme').css('width', $(window).width()-30);
$('.stats').css('width', $(window).width());
$('.navigation-bar').css('width', $(window).width());

// NAV MENU

buttonNavMain.click(function(){
	$('.tcon').toggleClass('tcon-transform');
	$('nav').toggleClass('active');

	if ($('nav').hasClass('active')) {
		$('.button-nav').click(function(){
			$('.tcon').removeClass('tcon-transform');
			$('nav').removeClass('active');
		})		
	}


});

$('.button-nav-stats').click(function(){navigateTo('stats')})

// END NAV MENU

function navigateTo(screen){
	if (screen == 'exercises') {
		$('main > div').css('left', '0');
		$('.navigation-bar h1').removeClass('is-sub');
		$('.button-nav-edit').removeClass('invisible-state');
	} else if (screen == 'exercise') {
		$('main > div').css('left', -$(window).width()-2);
		$('.navigation-bar h1').addClass('is-sub');
		$('.button-nav-edit').addClass('invisible-state');
	} else if (screen == 'stats') {
		$('main > div').css('left', '0');
		$('.navigation-bar h1').removeClass('is-sub');	
		$('.button-nav-edit').addClass('invisible-state');	

		$('.scheme').fadeOut(200);

		setTimeout(function(){$('#scheme').hide()}, 300);		
		$('#stats').delay(300).fadeIn();
	}
 }

// EXERCISES

function centerOnToday() {
	var centerOffset = ($('#scheme').height() - $('.today').height()) /2;
	$('#scheme').scrollTop($(".today").offset().top - centerOffset);
}

centerOnToday();

// END EXERCISES

// OPEN EXERCISE 

var currentExercise;

$('.today .exercise').click(function(){
	if (!$(this).hasClass('done')) {
		navigateTo('exercise');
		currentExercise = $(this);
	}
});

$('.navigation-bar h1').click(function(){
	if ($(this).hasClass('is-sub')) {
		navigateTo('exercises');
	}
})

// END OPEN EXERCISE

// BREATHER
var vibrate = false;
$('.vibrate').click(function(){
    if (this.checked) {
        vibrate = true;
    } else {
    	vibrate = false;
    }
}) 

var exerciseScreen = $('.exercise-screen');
var breather = $('.breather');
var timer = $('.remaining-time span');
var durationGlobal = 1;
timer.html(durationGlobal+":00");

function startExercise() {

	function clearBreather(){
		clearInterval(globalCount);
		clearInterval(localCount);
		timer.html(durationGlobal+":00");
		exerciseScreen.removeClass('active');
		breather.removeClass('release');	
	}

	var duration = $('.interval').val();
	$('svg .active-ring').css('animation-duration', duration+'s')
	exerciseScreen.addClass('active');
	var counter = 1;
	var counterText = $('.countdown-number');
		counterText.html(counter);
	var didPrecount = false;

	var localCount = setInterval(function(){
		if (didPrecount) {
			breather.removeClass('precount');
		}

		if(counter==duration){
			counter = 0;
			didPrecount = true;			
			breather.toggleClass('release');
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
		counter++;
		counterText.html(counter);
	},1000);

	var currentDurationGlobal = durationGlobal;
	var seconds = 60;

	timer.html(currentDurationGlobal+":00");

	currentDurationGlobal-=1;

	var globalCount = setInterval(function(){
		seconds--;
		if(seconds==0-1){
			seconds = 59;
			currentDurationGlobal--;
		}
		if(currentDurationGlobal==0) {
			if (seconds < 10) {
				seconds = "0"+seconds;
			}
			if (seconds ==00) {
				clearBreather();
				popUpScreen($('.feedback'), $('.feedback button'), 1300, false);
			}
		}

		else if (seconds < 10) {
			seconds = "0"+seconds;
		}
		timer.html(currentDurationGlobal+":"+seconds);
	},10);

	$('.reset').click(function(){
		clearBreather();
	});

}

// END BREATHER

// CONTROL BUTTONS

var hasStarted = false;

$('.start').click(function(){
	if (hasStarted) {

		hasStarted = false;
	} else {
		startExercise();
		hasStarted = true;
	}
});

// END CONTROL BUTTONS

// POP UP SCREEN

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

$('.button-settings').click(function(){popUpScreen($('.settings'), $('.screen-overlay'), 0, true)});

// END POP UP SCREEN

// FEEDBACK SCREEN

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

// END FEEDBACK SCREEN

// STATS

// Graph render

var graphHeight = 208;

var pointString = "";
var feedback = [3,5,6,8,10,9,6,7,10];

var graphWidth = (feedback.length -1) * 75;
var pointWidth = 75;

$('.graphSVG').attr('width' ,graphWidth);
$('.graphSVG').attr('viewBox', '0 0 ' +graphWidth+ ' '+ graphHeight);
$('#stats .graph span').css('width', graphWidth);

for(i=0; i < feedback.length; i++) {
	var pointHeight = (feedback[i]*-graphHeight/10)+graphHeight;
	var pointNum = i*pointWidth;
	var point = pointNum + " " + pointHeight + " ";

	pointString = pointString + point;
}

pointString = pointString + (feedback.length -1)*pointWidth + " " + graphHeight + " 0 " + graphHeight;

$('#graphPoly').attr('points', pointString);

// End graph render

// END STATS
