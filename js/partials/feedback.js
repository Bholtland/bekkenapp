feedbackButton.addEventListener('click',function(){
	var form = q('.feedback form'),
		absoluteWrapper = q('.absolute-wrapper'),
		checkmark = q('.checkmark');

	sw(absoluteWrapper);
	hd(feedbackButton);
	hd(form);
	absoluteWrapper.classList.add('active');

	setTimeout(function(){
		hd(checkmark);
		setTimeout(function(){
			absoluteWrapper.classList.remove('active');
			sw(checkmark);
			sw(form);
			sw(feedbackButton);
			hd(feedbackScreen);
			hd(absoluteWrapper)
			navigateTo(screenHierarchy.scheme);

			if (currentExercise) {
				setTimeout(function(){
					currentExercise.classList.add('done','shine');
					var node = document.createElement("i");                 // Create a <li> node                              // Append the text to <li>
					currentExercise.appendChild(node); 
				}, 400);	
			}		

		},200);
	},1100);
})

hiddenTextArea.addEventListener('click', function(){
	hiddenTextArea.classList.add('open');
});