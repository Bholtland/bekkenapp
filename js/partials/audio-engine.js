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