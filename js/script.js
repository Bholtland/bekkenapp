var buttonNavMain = $('.button-nav-main');
var buttonStats = $('nav ul li:nth-of-type(1)');
var buttonScheme = $('nav ul li:nth-of-type(2)');
var buttonSettings= $('nav ul li:nth-of-type(3)');

var setCurrentScreen = 2;

$('main > div').css("width",$(window).width()*2);
$('main > div').css("height",$(window).height());
$('main').css("height", $(window).height());
$('.screen-overlay').css("width", $(window).width());

$('.screen').css('width', $(window).width()-30);
$('.navigation-bar').css('width', $(window).width());

// NAV MENU

buttonNavMain.click(function(){
	$('.tcon').toggleClass('tcon-transform');
	$('nav').toggleClass('active');
});

// END NAV MENU

// OPEN EXERCISE 

$('.today .exercise').click(function(){
	if (!$(this).hasClass('done')) {
		$('main > div').css('left', -$(window).width()-2);
		$('.navigation-bar h1').addClass('is-sub');
		$('.button-nav-edit').addClass('invisible-state');
	}
});

$('.navigation-bar h1').click(function(){
	if ($(this).hasClass('is-sub')) {
		$('main > div').css('left', '0');
		$('.navigation-bar h1').removeClass('is-sub');
		$('.button-nav-edit').removeClass('invisible-state');
	}
})

if (setCurrentScreen==2) {
	$('main > div').css('left', -$(window).width()-2);
	$('.navigation-bar h1').addClass('is-sub');
}

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
var durationGlobal = 5;
timer.html(durationGlobal+":00");

function startExercise() {
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
				clearInterval(globalCount);
				clearInterval(localCount);
				popUpScreen($('.feedback'), $('.feedback button'), 1300, false)
			}
		}

		else if (seconds < 10) {
			seconds = "0"+seconds;
		}
		timer.html(currentDurationGlobal+":"+seconds);
	},10);

	$('.reset').click(function(){
		clearInterval(globalCount);
		clearInterval(localCount);
		timer.html(durationGlobal+":00");
		exerciseScreen.removeClass('active');
		breather.removeClass('release');
		popUpScreen($('.feedback'), $('.feedback button'), 1300, false);
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
		$('.checkmark').fadeOut(200);
		setTimeout(function(){
			$('.absolute-wrapper').removeClass('active');
			$('.checkmark').show();

		},200);
	},1100);
})

// END FEEDBACK SCREEN
