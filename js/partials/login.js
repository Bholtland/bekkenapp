loginButton.addEventListener('click',()=>{
	login();
})

function login(){
 	var login = q('.login');
 	var errorText = q('.error');
 	var loginDate = q('.login input:nth-of-type(1)');
 	var loginCode = q('.login input:nth-of-type(2)');
 	var tutorialQuestion = q('.tutorial-question');

 	if(checkCode() && loginDate.value !== ''){
 		proceed();
 	}
 	else if (loginDate.value === ""){
 		throwError('Vul a.u.b. een geldige datum in<br/>bijvoorbeeld 25-03-1995');
 	}
 	else if (!checkCode()){
 		throwError('Vul a.u.b. een geldige code in<br/>Een code heeft 9 karakters');
 	}

 	function checkCode(){
 		if (loginCode.value !== "" && loginCode.value.length === 9){
 			return true;
 		}
 		else{
 			return false;
 		}
 	}

 	function throwError(text){
 		errorText.innerHTML = text; 
 	}

 	function proceed(){
 		hd(login);
 		sw(tutorialQuestion);
 	}
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