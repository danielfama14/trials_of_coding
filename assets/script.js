//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector(".time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");



// if start button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(timeValue); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeLeft=null;
let timeValue =  60;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 60; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeLeft); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); // Clear the main counter
    
    let userAns = answer.textContent;
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;

    if(userAns == correcAns){
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        if (timeLeft >= 10) {
            timeLeft -= 10; // Subtract 10 seconds from the timer
        } else {
            timeLeft = 0; // Ensure timer doesn't go negative
        }
        timeCount.textContent = timeLeft; // Update the displayed time

        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }

    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show");

    // Restart the timer after an answer is selected
    startTimer(timeLeft); // Calling startTimer function with the updated timeLeft
}



function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span> Enter your initials to save your score.';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // if user scored more than 1
        let scoreTag = '<span>and nice , You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span> Enter your initials to save your score.';
        scoreText.innerHTML = scoreTag;
    }
    else{ // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span> Enter your initials to save your score.';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        console.log("Time:", time);
        if (time >= 0) {
            timeCount.textContent = time < 10 ? "0" + time : time;
            time--; // Decrement the time value
            timeLeft = time;
        } else {
            clearInterval(counter); // Clear counter
            showResult();
            timeText.textContent = "Time Off"; // Change the time text to time off
            const allOptions = option_list.children.length; // Getting all option items
            let correcAns = questions[que_count].answer; // Getting correct answer from array
            
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { // If there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); // Adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); // Adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); // Once user selects an option, disable all options
            }
            
            next_btn.classList.add("show"); // Show the next button if user selected any option
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //upgrading time value with 1
        //time_line.style.width = time + "px"; //increasing width of time_line with px by time value//
        if(time > 549){ //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index){
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

function showHighScores (){
    $("#screen-home");
    $("#screen")
}


const viewHighScoresBtn = document.getElementById("viewHighScoresBtn");
        const highScoresBox = document.querySelector(".high_scores_box");
        const closeHighScoresBtn = document.querySelector(".close_scores_btn");

        viewHighScoresBtn.addEventListener("click", () => {
            highScoresBox.style.display = "block";
        });

        closeHighScoresBtn.addEventListener("click", () => {
            highScoresBox.style.display = "none";
        });



        // Function to show the high scores box
        function showHighScoresBox() {
            const highScoresBox = document.querySelector('.high_scores_box');
            const highScoresList = document.querySelector('.high_scores_list');
            let scores = JSON.parse(localStorage.getItem("highScores")) || [];
            
            // Order scores from highest to lowest
            scores.sort((a, b) => b.userScore - a.userScore);
            
            highScoresList.innerHTML = '';
        
            scores.forEach((score, index) => { // Add 'index' parameter
                const listItem = document.createElement('li');
                // Display score number (index + 1) along with initials and score
                listItem.textContent = `${index + 1}. ${score.initials}: ${score.userScore}`;
                highScoresList.appendChild(listItem);
            });
        
            highScoresBox.style.display = 'block';
        }
        

// Function to hide the high scores box
function hideHighScoresBox() {
    const highScoresBox = document.querySelector('.high_scores_box');
    highScoresBox.style.display = 'none';
}

// Sample data for high scores 
const sampleHighScores = [
    { name: 'Player1', score: 100 },
    { name: 'Player2', score: 90 },
    { name: 'Player3', score: 80 },
    { name: 'Player4', score: 70 },
];

const saveScore = () => {
    const initialsInput = document.querySelector("#initialsInput");
    const initials = initialsInput.value.trim();
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = {
        initials: initials,
        userScore: userScore
    };
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));

    // Hide the high scores box
    hideHighScoresBox();

    // Clear the input field
    initialsInput.value = '';

    // Show the info box
    info_box.classList.add("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.remove("activeResult");

    // Delay and then show the high scores box
    setTimeout(() => {
        showHighScoresBox();
    }, 500); // delay time
};


const showScores=(e) => {
e.preventDefault()

}

// Call the showHighScoresBox function to display high scores when the "View High Scores" link is clicked
const viewHighScoresLink = document.querySelector('#viewHighScoresBtn');
viewHighScoresLink.addEventListener('click', () => {
    showHighScoresBox(sampleHighScores);
});

// Call the hideHighScoresBox function to hide high scores when the "Close" button is clicked
const closeScoresBtn = document.querySelector('.close_scores_btn');
closeScoresBtn.addEventListener('click', hideHighScoresBox);


const saveScoreButton=document.querySelector(".save_score")
saveScoreButton.addEventListener('click',saveScore)
