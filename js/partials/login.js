var loginScreen = q('.login-screen');
var loginChoiceYes = q('.loginChoice a:nth-of-type(2)');
var loginChoiceNo = q('.loginChoice a:nth-of-type(1)');

var buttonUseremail = q('.login-step-2 .button');
var buttonUserpassword = q('.login-step-3 .button');

var login = q('.login');

var loginStep1 = q('.login-step-1');
var loginStep2 = q('.login-step-2');
var loginStep3 = q('.login-step-3');
var loginStep4 = q('.login-step-4');

function showLogin(){
	popUpScreenFull(loginScreen, screenHierarchy.scheme.login, true);
}

loginChoiceYes.addEventListener('click',()=>{
	hd(loginStep1);
	sw(loginStep2);
});

loginChoiceNo.addEventListener('click',()=>{
	closeLogin();
});

buttonUseremail.addEventListener('click',()=>{
	registerLogin('email');
});

buttonUserpassword.addEventListener('click',()=>{
	registerLogin('password');
});

function registerLogin(type){
 	var errorText = q('.error');
 	
 	var loginEmail = q('.login-step-2 input');
 	var loginPassword = q('.login-step-3 input');

 	if (type === 'email'){
	 	if(loginEmail.value !== '' && loginEmail.value.includes('@')){
	 		hd(loginStep2);
	 		sw(loginStep3);
	 	}
	 	else if (loginEmail.value === ''){
	 		throwError('Vul a.u.b. een e-mailadres in');
	 	}
	 	else if (!loginEmail.value.includes("@")){
	 		throwError('Een e-mailadres bevat een @');
	 	}
 	}

 	else if (type === "password"){
 		if (!loginPassword.value) {
 			throwError('Voer een wachtwoord in');
 		}
 		else {
 			hd(loginStep3);
 			sw(loginStep4);
 			q('.login h3').innerHTML = 'Gelukt!<br/>Nu kunnen we echt aan de slag';
 			setTimeout(()=>{closeLogin();},2000);
 		}
 	}

 	function throwError(text){
 		errorText.innerHTML = text; 
 	}

 }

 function closeLogin(){
 	closePopupScreen(loginScreen);
 	setTimeout(()=>{
 		showNotification('Het is tijd om te evalueren! Klik hier', 4000, popUpScreenFull, schemeSettings, screenHierarchy.scheme.edit, true);
 	},1000);
 }

 tutorialButtonNo.addEventListener('click', ()=> {
 	tutorial(false);
 });

 tutorialButtonYes.addEventListener('click', ()=> {
 	tutorial(true);
 });

 function tutorial(choice){
 	if(choice){
 		navigateTo(screenHierarchy.exercise);

		sessions = 2;
		timer.innerHTML = 2;	

		navBarTitle.innerHTML =	exerciseData[2][0][0];	

		tightenTime = exerciseData[2][1][1];	
		relaxTime = exerciseData[2][2][1];		

		currentExercise = q('.today .exercise:nth-of-type(3)');
 	} 
 	else {
 		navigateTo(screenHierarchy.scheme);
 	}
 }