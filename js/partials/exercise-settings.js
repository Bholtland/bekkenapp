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