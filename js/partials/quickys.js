// Hide and show functions
function hd(element){
	element.classList.add('invisible');
}

function sw(element){
	element.classList.remove('invisible');
}

// faster querySelectors
function q(element){
	return document.querySelector(element)
}

function qAll(element){
	return document.querySelectorAll(element)
}