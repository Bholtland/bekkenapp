function showNotification(text, time, action, actionParam1, actionParam2, actionParam3){
	notificationText.innerHTML = text;

	notification.classList.add('show');

	notification.addEventListener('click', ()=>{
		action(actionParam1, actionParam2, actionParam3);
		notification.classList.remove('show');
	})

	setTimeout(()=>{
		notification.classList.remove('show');
	},time)
}