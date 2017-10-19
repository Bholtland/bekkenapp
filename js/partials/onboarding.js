var onboardingEntry = q('.onboarding-entry');
var onboardingComplaints = q('.onboarding-complaints');
var onboardingQuestion = q('.onboarding-question');

var complaints = document.querySelectorAll('.complaint');

entryButton.addEventListener('click',()=>{
	hd(onboardingEntry);
	sw(onboardingComplaints);
})

complaintsButton.addEventListener('click', ()=>{
	hd(onboardingComplaints);
	sw(onboardingQuestion);
})

tutorialButtonNo.addEventListener('click', ()=> {
	tutorial(false);
});

tutorialButtonYes.addEventListener('click', ()=> {
	tutorial(true);
	setTimeout(()=>{popUpScreenFull(informationScreen, screenHierarchy.exercise.info, true)},400)
});

function tutorial(choice){
	if(choice){
		navigateTo(screenHierarchy.exercise);

	sessions = 2;
	timer.innerHTML = 2;	

	navBarTitle.innerHTML =	exerciseData[2][0][0];	

	tightenTime = exerciseData[2][1][1];	
	relaxTime = exerciseData[2][2][1];		

	currentExercise = q('.today .exercise:nth-of-type(1)');
	} 
	else {
		navigateTo(screenHierarchy.scheme);
	}
}

// for (var c = 0; c < complaints.length; c++){
// 	complaints[c].addEventListener('click', (index)=>{
// 		this.classList.add('true');
// 		console.log(c)
// 	})
// }

$('.complaint').each(function(index){
	$(this).click(function(){
		$(this).toggleClass('istrue')
	})
})