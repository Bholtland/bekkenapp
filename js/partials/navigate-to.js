// This function is used to navigate between main screens
function navigateTo(screen){
	screen = screen.name

	if (currentPopup){
		closePopupScreen(currentPopup, "Ontspannen");
		setTimeout(()=> {navigate()},300);
	}
	else {
		navigate();
	}

	function navigate(){
		sw(navBar);
		if (screen == 'scheme') {
			screenCanvas.style.left = '0';
			navBarTitle.classList.remove('is-sub');
			navBarTitle.innerHTML = screenHierarchy.scheme.title;
			hd(stats);
			hd(onboarding);

			setTimeout(function(){hd(screenStats)}, 300);
			sw(scheme);		
			setTimeout(function(){sw(screenScheme)})
			// centerOnToday();
			currentScreen = screenHierarchy.scheme;
		} 

		else if (screen == 'exercise') {
			screenCanvas.style.left = (-window.innerWidth)-2 + 'px';
			navBarTitle.classList.add('is-sub');
			currentScreen = screenHierarchy.exercise;
		}

		else if (screen == 'progress') {
			screenCanvas.style.left = '0';
			navBarTitle.classList.remove('is-sub');	
			navBarTitle.innerHTML = screenHierarchy.progress.title;
			hd(scheme);
			hd(onboarding);

			setTimeout(function(){hd(scheme)}, 300);
			sw(stats)		
			setTimeout(function(){sw(screenStats)}, 300);
			currentScreen = screenHierarchy.progress;
		}
		else if (screen == 'onboarding') {
			screenCanvas.style.left = '0';
			hd(navBar)
			hd(scheme);
			sw(onboarding)		
			currentScreen = screenHierarchy.onboarding;
		}
	}
 };