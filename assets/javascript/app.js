$(document).ready(function() {



	//GLOBAL VAR

	var currentQ, correctAnswer, wrongAnswer, unnswered, answered, seconds, time, userChoice;		



	var text = {

		correct: "Good Job!",

		incorrect: "Aww, wrong answer, you'll get it next time..",

		noTime: "Out here, you've got to be quicker than that!",

		done: "Wasn't too bad, now was it?",

	};



	var triviaQuestions = [
           {	
	
			question: 'Which U.S. president served the shortest time in office?',
			choices: ['Trump','barack obama', 'William Henry Harrison',  'Goerge Bush'],
            correct: 2,
            //gif: 'assets\images\220px-William_Henry_Harrison_daguerreotype_edit.jpg'
            answerText: "Answer is William Henry Harrison"
		},
	    {
			question: 'Which is the most populous U.S. state?',
            choices: [ 'Virginia','California','Maryland','Seatle' ],
            correct: 1,
            //gif: 'assets/images/skink.gif'
            answerText: "Answer is California"
		},
		 {
			question: 'The ulna is a long bone in which part of the body?',
		
            choices: ['Ear', 'Leg', 'Neck', 'Arm'],
            correct: 3,
            //gif: 'assets/images/arms.gif'
            answerText: "Answer is Arm"
		},
	    {
			question: 'Micky Dolenz, Michael Nesmith, Peter Tork, and Davy Jones were members of which band?',
			
            choices: ['The Monkees', 'The Animals', 'The Beatles', 'The Buggles'],
            correct: 0,
        //	gif: 'assets/images/monkees.gif'
             answerText: "Answer is The Monkees"
             
		},
	    {
			question: 'What is the square root of 256?',
			
            choices: ['16','11','13','14'],
            correct: 0,
            //gif: 'assets/images/scot.gif'
            answerText: "Answer is 16"
		},
		{
			question: 'Digitalis is a plant commonly known as what?',
			correct: 3,
            choices: ['Campanula', 'Delphinium', 'Penstemon', 'Foxglove'],
            correct: 3,
            //gif: 'assets/images/digitalis.gif'
            answerText: "Answer is Foxglove"
		},
		{
			question: 'What’s the capital of Ethiopia?',
			correct: 1,
            choices: ['Nairobi', 'Addis Ababa', 'Akara', 'Johnsberge'],
            correct: 1,
            //gif: 'assets/images/tea.gif'
            answerText: "Answer is Addis Ababa"
            
		}, 
		 {
			question: ' Who was the first man to reach the South Pole?',
			
            choices: ['Token', 'Jimmy', 'Roald Amundsen', 'Timmy'],
            correct: 2,
            //gif: 'assets/images/butters.gif'
            answerText: "Answer is Roald Amundsen"
		},
    ];





	// Hides Content at Start Up

	$("#gameArea").hide();



	// Start Button Click and Hide

	$("#startBtn").on("click", function(){

		$("#startGame").hide();

		newGame();

	});



	// Reset Button

	$("#startOverBtn").on("click", function(){

		$("#Res").hide();

		newGame();

	});



	// ======================================================

	//Function to Start Game After Initial Click

	// ======================================================

	function newGame() {

		$("#gameArea").show();

		$("#Ans").hide();

		$("#Res").hide();		

		correctAnswer = 0;

		wrongAnswer = 0;

		unanswered = 0;

		currentQ = 0;

		questions();

	}

	// ==================

	// Displays Question

	// ==================

	function questions() {

		$("#Ans").hide();

		$("#Qs").show();

		answered = true;

		// Prints Question from Array

		$(".question").html(triviaQuestions[currentQ].question);



		// -----------------------------------------

		//Loops through possible choices and appends

		// -----------------------------------------

		for (var i = 0; i <= 7; i++) {

			var list = $("<div>");

			list.text(triviaQuestions[currentQ].choices[i]);

			list.attr({"data-index": i });

			list.addClass("thisChoice");

			$(".choices").append(list);

		}



		//Calls Timer

		countdown();



		// USERCLICK

		$(".thisChoice").on("click",function(){

			userChoice = $(this).data("index");

			clearInterval(time);

			shoAnswer();

		});

	}



	// ==================

	// TIMER COUNTDOWN

	// ==================

	function countdown() {

		seconds = 20;

		$("#time").html("00:" + seconds);

		answered = true;

		//Delay of 1 sec before timer goes off

		time = setInterval(countDownSho, 1000);

	}



	// ==================

	// SHOWS TIMER

	// ==================

	function countDownSho() {

		seconds --;

		if(seconds < 10) {

			$("#time").html("00:0" + seconds);

			$("#time").css({"color": "red"});

		} else {

			$("#time").html("00:" + seconds);

			$("#time").css({"color": "#def"});

		}



		if (seconds < 1) {

			clearInterval(time);

			answered = false;

			shoAnswer();

		}

	}

	// ====================================

	// DISPLAYS ANSWER DIV

	// ====================================

	function shoAnswer() {

		$("#Qs").hide();

		$("#Res").hide();

		$("#Ans").show();

		$(".thisChoice").empty();



		var rightAnswerText = triviaQuestions[currentQ].choices[triviaQuestions[currentQ].correct];

		var rightAnswerIndex = triviaQuestions[currentQ].correct;

		console.log(rightAnswerText);

		console.log(rightAnswerIndex);

		

		// GIF TEXT

		var gifText = triviaQuestions[currentQ].answerText;

			newCap = $("<div>");

			newCap.html(gifText);

			newCap.addClass("gifCap");

			$("#gifText").html(newCap);





		// DISPLAYS AND COUNTS USER ANSWERS/ UnANSWERS

		if ((userChoice === rightAnswerIndex) && (answered === true)) {

			correctAnswer++;

			$("#text").html(text.correct);

			$("#correctAnswer").hide();

		} else if ((userChoice !== rightAnswerIndex) && (answered === true)) {

			wrongAnswer++;

			$("#text").html(text.incorrect);

			$("#correctAnswer").show().html("The correct answer was: " + rightAnswerText);

		} else {

			unanswered++;

			$("#text").html(text.noTime);

			$("#correctAnswer").html("The correct answer was: " + rightAnswerText);

			answered = true;

		}



		//Last Answer Reveal Timer

		if (currentQ === (triviaQuestions.length-1)) {

			setTimeout(results, 1000);

		} else {

			currentQ++;

			setTimeout(questions, 1000);

		}



	}



	function results() {

		$("#Ans").hide();

		$("#Qs").hide();

		$("#Res").show();

		$("#resultText").html(text.done);

		$("#correctAnswers").html("Correct Answers: " + correctAnswer);

		$("#wrongAnswers").html("Wrong Answers: " + wrongAnswer);

		$("#unanswered").html("Didn't Answer: " + unanswered);

		$("#startOverBtn").show();

		$("#startOverBtn").html("RESTART GAME");

	}



	

});