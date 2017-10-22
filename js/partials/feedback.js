feedbackButton.addEventListener('click',function(){
	checkmark = q('.checkmark');
	absoluteWrapper = q('.absolute-wrapper');

	hd(feedbackButton);
	hd(evaluationStep2);
	sw(checkmark);
	sw(absoluteWrapper)
	setTimeout(function(){
		hd(checkmark);
		hd(absoluteWrapper)
		closePopupScreen(currentPopup)	
		setTimeout(function(){
			sw(checkmark);
			sw(evaluationStep2);
			sw(feedbackButton);
			

		},500);
	},1600);
})

hiddenTextArea.addEventListener('click', function(){
	hiddenTextArea.classList.add('open');
});