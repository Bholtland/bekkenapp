var progressionMenuItem = q('.progression-graph-menu ul li:nth-of-type(1)')

navBarTitle.addEventListener('click',function(){
	if (this.classList.contains('is-sub') && !currentPopup) {
		navigateTo(screenHierarchy.scheme);
	} else if (this.classList.contains('is-sub')) {
		closePopupScreen(currentPopup);
	} else {
		return;
	}
})

q('.button-nav-stats').addEventListener('click', function(){navigateTo(screenHierarchy.progress)});
q('.button-nav-scheme').addEventListener('click', function(){navigateTo(screenHierarchy.scheme)});

buttonExerciseSettings.addEventListener('click',function(){popUpScreenFull(exerciseSettings, screenHierarchy.exercise.settings)});
q('.testbtn').addEventListener('click', ()=> {popUpScreenFull(progressionGraphMenu, screenHierarchy.progress.graphmenu, true)});
buttonNavEdit.addEventListener('click', function(){makeSchemeSettings(); popUpScreenFull(schemeSettings, screenHierarchy.scheme.edit, true)});
informationButton.addEventListener('click', function(){popUpScreenFull(informationScreen, screenHierarchy.exercise.info, true)});

progressionMenuItem.addEventListener('click',function(){
	hd(currentPopup)
	popUpScreenFull(progressionGraph, screenHierarchy.progress.graph);
});

buttonSettings.addEventListener('click',()=>{
	popUpScreenFull(profileScreen, screenHierarchy.profile);
})

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

schemeSettingsButton.addEventListener('click', ()=>{
	inputs = document.querySelectorAll('.scheme-settings input');

	for (i = 0; i < inputs.length; i++){
		let serie = inputs[i].getAttribute("serie");
		let key = inputs[i].getAttribute("key");

		if (exerciseData[serie][key][0] === 'series'){
			exerciseData[serie][key][1] = inputs[i].value;
			// exercisePlanning[serie]=inputs[i].value;
		}

		else {
			exerciseData[serie][key][1] = inputs[i].value;
		}
	}

	showNotification('Instellingen opgeslagen!', 2000);

	makeScheme();
});