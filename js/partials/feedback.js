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

		},200);
	},1100);
})

hiddenTextArea.addEventListener('click', function(){
	hiddenTextArea.classList.add('open');
});