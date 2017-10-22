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