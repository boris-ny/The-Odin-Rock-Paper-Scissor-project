// DOM elements
const winsEl = document.getElementById("wins");
const userPick = document.getElementById("user-pick");
const housePick = document.getElementById("house-pick");
const restartBtn = document.getElementById("restart-btn");
const resultContainer = document.getElementById("result-container");
const resultEl = document.getElementById("result");
const scoreContainer = document.getElementById("score-container");
const userScore = document.getElementById("user-score");
const houseScore = document.getElementById("house-score");
const userEmoji = document.getElementById("user-outcome");
const houseEmoji = document.getElementById("house-outcome");
const outcomeText = document.getElementById("outcome");
const choicesEl = document.querySelectorAll(".circle");
const rulesBtn = document.getElementById("rules");
const overLay = document.getElementById("overlay");
const closeIcon = document.getElementById("close-icon");

// Game variables
const choices = ["paper", "scissors", "rock"];
let gameover = false;
let active = false;

// functions
function chooseRandom() {
    return choices[Math.floor(Math.random() * 3)];
}

function isGameover() {
    if (userScore.innerText == "3" || houseScore.innerText == "3") {
        gameover = true;
        setTimeout(() => {
            scoreContainer.classList.add("hide");
            resultContainer.classList.remove("hide");
            if (+userScore.innerText > +houseScore.innerText) {
                resultEl.innerText = "You win!";
                winsEl.textContent = +winsEl.textContent + 1;
            } else {
                resultEl.innerText = "You lose!";
            }
        }, 500);
    }
}

function playRound() {
    outcomeText.textContent = "Waiting for your choice...";
    userEmoji.textContent = "";
    houseEmoji.textContent = "";

    setTimeout(() => {
        userPick.classList.add("large-circle", user);
        userPick.innerHTML = `<img src="images/icon-${user}.svg" >`;
    }, 300);

    setTimeout(() => {
        housePick.classList.add("large-circle", house);
        housePick.innerHTML = `<img src="images/icon-${house}.svg" >`;
        
        if (user === house) {
            outcomeText.textContext = "It's a draw!";
        } else if (
            (user === "paper" && house === "rock") ||
            (user === "scissors" && house === "paper") ||
            (user === "rock" && house === "scissors")
        ) {
            outcomeText.textContent = `${user} beats ${house}. You win!`;
            userEmoji.textContent = "🎉";
            houseEmoji.textContent = "😢"
            userScore.textContent = +parseInt(userScore.textContent) + 1;
        } else {
            outcomeText.textContent = `${house} beats ${user}. You lose!`;
            userEmoji.textContent = "😢";
            houseEmoji.textContent = "🎉";
            houseScore.textContent = +parseInt(houseScore.textContent) + 1;
        }
        isGameover();
        active = false;
    }, 400);
}

function restart() {
    userScore.textContent = 0;
    houseScore.textContent = 0;
    userEmoji.textContent = "";
    houseEmoji.textContent = "";
    resultContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    outcomeText.innerText = "Waiting for your choice...";
    gameover = false;
}

const clearE1 = (element) => {
    element.classList= "placeholder";
    element.innerHTML = "";
}

// Event listeners
choicesEl.forEach((choice) => {
   choice.addEventListener("click", (event) => {
      if (!gameover && !active) {
         active = true;
         // set users pick
         const userChoice = event.currentTarget.dataset.choice;
         clearEl(userPick);

         // set houses pick
         const houseChoice = chooseRandom();
         clearEl(housePick);

         playRound(userChoice, houseChoice);
      }
   });
});

restartBtn.addEventListener("click", () => {
   clearEl(housePick);
   clearEl(userPick);
   resetGame();
});

rulesBtn.addEventListener("click", (event) => {
   event.stopPropagation();
   overlay.classList.remove("hide");
});

closeIcon.addEventListener("click", () => {
   overlay.classList.add("hide");
});

document.body.addEventListener("click", () => {
   overlay.classList.add("hide");
});

overlay.addEventListener("click", (event) => {
   event.stopPropagation();
});