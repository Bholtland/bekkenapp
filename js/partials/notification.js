function showNotification(text, time){
	notificationText.innerHTML = text;
	notification.classList.add('show');
	closePopupScreen(currentPopup);

	setTimeout(()=>{
		notification.classList.remove('show');
	},time)
}