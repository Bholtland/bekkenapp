 function playAudio(type){
 	var dir = "resources/audio/";
 	var audioFile;	
 	var musicFile;

 	variation = Math.ceil(Math.random() * 3);

 	if (type === 'voice'){
	 	var voiceFile = new Audio(dir+"10x20-"+variation+".ogg");
	 	voiceFile.play();
 	}

 	if (type === 'music'){
	 	var musicFile = new Audio(dir+"music1.ogg");
	 	musicFile.play();
 	}
 }