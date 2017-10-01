// This function is used to navigate between popup screens
function popUpScreenFull(screen, name, manualSub) {
	currentPopup = screen;

	currentScreen = name;

	sw(screen);
	screen.classList.add('open');

	navBarTitle.innerHTML = name.title;

	if (manualSub) {
		manualSub = true;
		navBarTitle.classList.add('is-sub');
	}

	navBar.classList.add('popped-up');

}

function closePopupScreen(screen) {
	screen.classList.remove('open');

	var parent = currentScreen.parent;
	parent = "screenHierarchy."+parent;
	parent = eval(parent);
	
	navBarTitle.innerHTML = parent.title;

	currentScreen = parent;

	navBar.classList.remove('popped-up');
	currentPopup = null;

}