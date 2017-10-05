$('#toc').toc({
});

var sourceCount = 1;

$('body').css('height',$('body').height() + 500)

function scrollNav() {
  $('a').click(function(){  
    //Toggle Class
    //Animate
    $('html, body').stop().animate({
        scrollTop: $( $(this).attr('href') ).offset().top - 80
    }, 500);
    return false;
  });
   
  $('.scrollTop a').scrollTop();
}
scrollNav();

function control(el, a) {
	$('#toc a').each(function(){
		href = $(this).attr('href');
			if (href == el && a == 'classactive'){
				$(this).removeClass('active');
			}
			else if (href == el){
				$(this).addClass('active');
			}
				
	})
}

$('.wrapper section').each(function(){
	var offset = $(this).offset();
	var scrollMargin = 150;
	offset = offset.top;
	var height = $(this).height();
	var section = $(this);
	var el = "#" + $(this).children('h2').attr('id');
	$(window).scroll(function() {
		if ($(this).scrollTop()+scrollMargin > offset &&  $(this).scrollTop()+scrollMargin < offset+height && !section.hasClass('active')){
			control(el)
		} else if ($(this).scrollTop()+scrollMargin < offset ||  $(this).scrollTop()+scrollMargin > offset+height) {
			control(el, "classactive");
		}
	});
})

$('.sources p').each(function(){
	id = 'bron'+sourceCount;
	$(this).attr('id', id);
	sourceCount++;
})