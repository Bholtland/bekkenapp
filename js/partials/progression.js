var weekData = q('.week-data');
var closeWeekData = q('.close-week-data');

feedback = [
	[4,"Ik had ergens last van", "Week 1"],
	[5,"Ik had constant last van mijn rechterdij", "Week 2"],
	[7,"Iets", "Week 3"],
	[8,"Ik had last", "Week 4"],
	[10,"Ik had ergens last van dus daarom voelde het niet goed maar nu gaat het wel weer wat beter dus we gaan gewoon door.", "Week 5"],
];

// Defining the space between feedback points
pointWidth = window.innerWidth/2.5;

// Defining the graph size based on the amount of feedback
graphWidth = (feedback.length ) * pointWidth;
graphHeight = 500;

graphSVG = q('.graphSVG');
verticalAxis = q('.vertical-axis');

graphSVG.setAttribute('width' ,graphWidth);
graphSVG.setAttribute('viewBox', '0 0 ' +graphWidth+ ' '+ graphHeight);
lineCanvas.style.width = graphWidth+10+'px';
verticalAxis.style.width = graphWidth+'px';
lineCanvas.style.height = graphHeight+'px';

// A loop that takes data from the feedback array and visualizes that into the graph
for(let i=0; i < feedback.length; i++) {
	// Define absolute height of an SVG poly
	pointHeight = (feedback[i][0]*-graphHeight/10)+graphHeight;

	// Define the x position of the poly
	pointNum = i*pointWidth;

	// Create a poly
	point = pointNum + " " + pointHeight + " ";

	// Build a string to create the SVG width
	pointString = pointString + point;

	// Define the height of a line and create a span element to add to the DOM
	lineHeight = (graphHeight/10)*feedback[i][0]+"px";
	line = "<span style='height:"+lineHeight+"; margin-left: "+(pointWidth-1)+"px;'></span>";

	$('.line-canvas').append(line)

	$('.dates').append("<p>"+feedback[i][2]+"</p>");
}

// Finish the string with standard remaining poly's and add it to the DOM
pointString = pointString + ((feedback.length -1)*pointWidth) + " " + graphHeight + " 0 " + graphHeight;
graphPoly.setAttribute('points', pointString);

// GRAPH FOCUSPOINT

// Create a focus in which the screen will focus on a given feedbackpoint. The variable focus is the position x of the focuspoint
focus = (window.innerWidth - pointWidth) /2;

// Define the number that remains when fitting the pointWidth in our focus variable
focusModulus = focus % pointWidth;

graphBackground.style.width = graphWidth+(focus*2)+10+'px';
dates.style.width =  graphWidth+(focus*2)+10+'px';
lineCanvas.style.left = focus+'px';
graphSVG.style.left = focus+'px';

datesElement = document.querySelectorAll('.dates p');

for (let i=0; i < datesElement.length; i++) {
	datesElement[i].style.width = pointWidth-1+'px';
}

datesElementFirst.style.width = focus-(pointWidth/2)-6+'px';

graph.addEventListener('scroll',function(){
	// combine scrollposition x and focusModulus
	scrollLeft = graph.scrollLeft + focusModulus;

	// Divide the absolute scrollposition by the width of a point, so we'll get numbers like 1,2,3 etc. which will define feedbackpoints
 	scrollPos = Math.ceil(scrollLeft/pointWidth);

	// Only fire this when a new point is highlighted within our focuspoint (Some optimization)
	if (scrollPos != currentScrollPos) {
		currentScrollPos = scrollPos;
		
		// define the line that is highlighted by combining the scrollPos and the space between x=0 and the focuspoint
		linePos = Math.ceil(focus/pointWidth-1)+scrollPos;

		if (previousLine){
			previousLine.classList.remove('active');
		}

		element = q('.line-canvas span:nth-of-type('+linePos+')');
		element.classList.add('active');

		// Get the currently higlighted element
		elementNumber = linePos-1;
		
		// Add the corresponding data to the DOM
		graphVasGrade.innerHTML = feedback[elementNumber][0];
		graphVasDate.innerHTML = feedback[elementNumber][1];
		graphVasText.innerHTML = feedback[elementNumber][2];

		// Set the current element as previous so it's "active" class will be removed when another point is highlighted
		previousLine = element;
	}
})

$('.line-canvas span').each(function(){
	$(this).click(function(){
		showWeekData();
	})
})

function showWeekData(){
	sw(weekData);
}

closeWeekData.addEventListener('click',function(){
	hd(weekData);
});