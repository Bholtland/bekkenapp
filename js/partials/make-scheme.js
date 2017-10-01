function makeSchemeSettings(){
	for (i = 0; i < exercisePlanning.length; i++){

			const li = document.createElement('li');

			const name = document.createElement('h2');
			name.setAttribute('class','margin-base');
			name.innerHTML = exerciseData[i][0][0];

			const outline = document.createElement('ul');
			outline.setAttribute('class','outline margin-base');

			li.appendChild(name);
			li.appendChild(outline);

			schemeSettingsCards.appendChild(li);

			for(a = 0; a < exerciseData[i].length; a++){
				const outlineLi = document.createElement('li');

				const outlineName = document.createElement('p');
				outlineName.innerHTML = exerciseData[i][a][0];

				if (typeof(exerciseData[i][a][1]) === 'number'){
					const outlineType = document.createElement('input');
					outlineType.setAttribute('type','number');
					outlineType.setAttribute('value',exerciseData[i][a][1]);
					outlineType.setAttribute('serie',i);
					outlineType.setAttribute('key',a);

					outlineLi.appendChild(outlineName);
					outlineLi.appendChild(outlineType);

					outline.appendChild(outlineLi);
				}

			}

	}
}

var today = 0;

function makeScheme(){
	schemeDays.innerHTML = '';

	for (i = 0; i < planForDays; i++){

		const day = document.createElement('div');

		if (i==today){
			day.setAttribute('class','day today');
		}

		else {
			day.setAttribute('class','day');
		}

		const oneDay = document.createElement('h3');
		oneDay.innerHTML = 'Dag '+(i+1);

		const timeline = document.createElement('div');
		timeline.setAttribute('class','timeline');

		day.appendChild(oneDay);
		day.appendChild(timeline);

		schemeDays.appendChild(day);

		for (a = 0; a < exercisePlanning.length; a++){
			if (exercisePlanning[a] > 1){

				var amount = exercisePlanning[a]+1;

				for(b = 1; b < amount; b++){
					createSerie(a);
				}
			}

			else if (exercisePlanning[a]===0){
			}

			else{
				createSerie(a);
			}


			function createSerie(serieType){
				const serie = document.createElement('div');
				serie.setAttribute('class','exercise');

				if (i===today){
						serie.addEventListener('click', function(){
							if (!this.classList.contains('done')) {
								navigateTo(screenHierarchy.exercise);

								sessions = exerciseData[serieType][3][1];
								timer.innerHTML = exerciseData[serieType][3][1];

								navBarTitle.innerHTML =	exerciseData[serieType][0][0];

								tightenTime = exerciseData[serieType][1][1];
								relaxTime = exerciseData[serieType][2][1];

								// Define the current exercise, to mark it as "done" later
						 		currentExercise = this;
							}
						});
				}

				const exerciseLine = document.createElement('div');
				exerciseLine.setAttribute('class','exercise-line');

				const exerciseBox = document.createElement('div');
				exerciseBox.setAttribute('class','exercise-box');

				serie.appendChild(exerciseLine);
				serie.appendChild(exerciseBox);

				const exerciseName = document.createElement('span');
				exerciseName.setAttribute('class','exercise-name');
				const exerciseNameTitle = document.createElement('h3');

				const exerciseDuration = document.createElement('span');
				exerciseDuration.setAttribute('class','exercise-duration');
				const exerciseDurationText = document.createElement('p');

				const exerciseIndicator = document.createElement('span');
				exerciseIndicator.setAttribute('class','exercise-indicator');


				switch(a){
					case 0:
						serie.setAttribute('class', 'exercise coordination');

						exerciseNameTitle.innerHTML = 'Co&ouml;rdinatie';
						exerciseDurationText.innerHTML = exerciseData[0][3][1]+' herhalingen';

						break;
					case 1:
						serie.setAttribute('class', 'exercise power-fast');

						exerciseNameTitle.innerHTML = 'Krachttraining (snel)';
						exerciseDurationText.innerHTML = exerciseData[1][3][1]+' herhalingen';

						break;
					case 2:
						serie.setAttribute('class', 'exercise power-slow');

						exerciseNameTitle.innerHTML = 'Krachttraining';
						exerciseDurationText.innerHTML = exerciseData[2][3][1]+' herhalingen';

						break;
					case 3:
						serie.setAttribute('class', 'exercise relaxation');

						exerciseNameTitle.innerHTML = 'Ontspannen';
						exerciseDurationText.innerHTML = exerciseData[3][1][1]+' minuten';

						break;
				}

				exerciseName.appendChild(exerciseNameTitle);
				exerciseDuration.appendChild(exerciseDurationText);

				exerciseBox.appendChild(exerciseName);
				exerciseBox.appendChild(exerciseDuration);
				exerciseBox.appendChild(exerciseIndicator);

				timeline.appendChild(serie);
			}
		}
	}
}

makeScheme();
