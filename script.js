// Data structure involved;List,Dictionary
//List ["Reuben","Yishan","patwin"]

// Dictionary {}
/*
{
        "Patwin": "91230000"
        "Jace" : "9897777"
}
*/


const database1 = [
    {
        question : "What's the best seed in grow a garden?",
        options : ["Beanstalk", "Elder strawberry", "Romanesco", "Carrot"],
        answer : "Romanesco"
    },

    {
        question : "What is a carrot worth?",
        options : ["100$", "25$", "50$","4Qa"],
        answer : "25$"
    },

    {
        question : "when was I born?",
        options : ["2019", "2018", "2015", "2017"],
        answer : "2017"
    },

    {
       question: "What is the chance of finding the rare “Cacao” seed in the shop?",
       options : ["0.25", "0.50", "0.75", "1.0"],
       answer : "0.75"
    },

    {
        question : "worst seed in grow a garden?",
        options : ["Beanstalk", "Elder strawberry", "Romanesco", "Carrot"],
        answer : "carrot"
    },
];   



const DropDown = document.getElementById("drop-down");
const StartButton = document.getElementById("start-btn");
const TimerLabel = document.getElementById("timer-label");
const QuestionLabel = document.getElementById('question');
const optionContainer = document.getElementById("option-container");
const ScoreLabel =  document.getElementById("score-label");
const FeedbackLabel = document.getElementById("feedback-label");
const ProgressBar = document.getElementById("progress-bar-fill")
const BgmDropdown = document.getElementById("bgm-dropdown");
const BgmButton = document.getElementById("music-btn");

let CurrentSong = null;
let IsBgmPlaying = false;

// on bgm dropdown change
BgmDropdown.addEventListener("change", () => {
    
    const SelectedSong = BgmDropdown.value;

    // abort the function if the song cannot be found
    if(!SelectedSong) return;

    // stop and reset previous song if it exists
    if(CurrentSong)
    {
        CurrentSong.pause();
        CurrentSong.currentTime = 0;
    }

    // load and play the new song
    CurrentSong = new Audio(SelectedSong);
    CurrentSong.loop = true;
    CurrentSong.volume = 0.2;
    CurrentSong.play();
    IsBgmPlaying = true;
    BgmButton.textContent = "🔊 Music On";

});

BgmButton.addEventListener('click', () => {
    if(IsBgmPlaying) 
    {
        CurrentSong.pause();
        BgmButton.textContent = "music off"
        IsBgmPlaying =  false
    }else
    {
        CurrentSong.play();
        BgmButton.textContent = "music on"
        IsBgmPlaying = true
    }
});










let timer;
let question_index = 0;
let score = 0;

StartButton.addEventListener('click', StartQuiz)



function StartQuiz()
{
    DropDown.style.display = 'none';
    StartButton.style.display = 'none';
    LoadQuestion();
}

function LoadQuestion()
{
    if(question_index < database1.length)
    {
        // reset the timer
        TimerLabel.textContent = 15;

        FeedbackLabel.textContent = "";

        // adjust progress bar's width
        ProgressBar.style.width = `${((question_index + 1) / database1.length) * 100}%`;

        //load a question from the database
        const currentQuestionset = database1[question_index];
        QuestionLabel.textContent = currentQuestionset.question;

        // remove previous button
        optionContainer.innerHTML = "";


        //create option buttons
        currentQuestionset.options.forEach((item) => {
            const button = document.createElement('button')
            button.textContent = item;
            button.classList.add ('option-btn')
            optionContainer.appendChild(button);

            button.addEventListener('click', () => {
                DisableAllOptionButtons();
                CheckAnswer(item);
            });
        });



        //turn on the timer
        timer = setInterval(() => {
            TimerLabel.textContent = parseInt(TimerLabel.textContent) - 1; 

            if(parseInt(TimerLabel.textContent) === 0)
            {
                clearInterval(timer);// turn off the timer
                CheckAnswer(null);
            }

        }, 1000);
    } else {
        EndQuiz();
    }
}


function EndQuiz()
{
QuestionLabel.textContent = "Oh, did you even try"
}

{
    QuestionLabel.textContent = "Hooray!Quiz hasEnded🦎"
}








function DisableAllOptionButtons()
{
    const all_option_buttons = document.querySelectorAll('.option-btn');

    all_option_buttons.forEach(button => {
        button.disabled = true;
    });
}

// item - the player selected option
function CheckAnswer(item)
{
    clearInterval(timer);
    const currentQuestionset = database1[question_index];
    let message = "";

    if (item === currentQuestionset.answer)
    {
        score = score + 1;
        message = "Correct! 1 point goes to you."
    } else if (item === null)
    {
        message = "Time's up!"
    } else
    {
        message = "Incorrect."
    }

    ScoreLabel.textContent = `You scored ${score} points`;
    FeedbackLabel.textContent = message;

    // to hold for 2 seconds before loading the next question
    setTimeout(() => {
        question_index = question_index + 1;
        LoadQuestion();
    }, 2000);
}