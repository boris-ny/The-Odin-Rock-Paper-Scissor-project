// DOM elements
const winsEl = document.getElementById("wins");
const userPick = document.getElementById("user-pick");
const housePick = document.getElementById("house-pick");
const restartBtn = document.getElementById("restart-btn");
const resultContainer = document.querySelector(".result-container");
const resultEl = document.getElementById("result");
const scoreContainer = document.querySelector(".score-container");
const userScore = document.getElementById("user-score");
const houseScore = document.getElementById("house-score");
const userEmoji = document.querySelector(".user-outcome");
const houseEmoji = document.querySelector(".house-outcome");
const outcomeText = document.getElementById("outcome");
const choicesEl = document.querySelectorAll(".circle");
const rulesBtn = document.getElementById("rules");
const overlay = document.getElementById("overlay");
const closeIcon = document.getElementById("close-icon");

// game variables
const choices = ["rock", "paper", "scissors"];
let gameover = false;
let active = false;

// functions
function chooseRandom() {
   return choices[Math.floor(Math.random() * 3)];
}

function playRound(user, house) {
   outcomeText.textContent = "";
   userEmoji.textContent = "";
   houseEmoji.textContent = "";

   setTimeout(() => {
      userPick.classList.add("large-circle", user);
      userPick.innerHTML = `<img src="./images/icon-${user}.svg">`;
   }, 300);

   setTimeout(() => {
      housePick.classList.add("large-circle", house);
      housePick.innerHTML = `<img src="./images/icon-${house}.svg">`;

      // determine outcome
      if (user === house) {
         outcomeText.textContent = "It's a Tie!!";
      } else if (
         (user == "rock" && house == "scissors") ||
         (user == "paper" && house == "rock") ||
         (user == "scissors" && house == "paper")
      ) {
         outcomeText.textContent = `${user} beats ${house}`;
         userEmoji.textContent = "✅";
         houseEmoji.textContent = "❌";
         userScore.textContent = +parseInt(userScore.innerText) + 1;
      } else {
         outcomeText.textContent = `${user} loses to ${house}`;
         houseEmoji.textContent = "✅";
         userEmoji.textContent = "❌";
         houseScore.textContent = +parseInt(houseScore.innerText) + 1;
      }
      isGameover();
      active = false;
   }, 400);
}

function isGameover() {
   if (userScore.innerText == "3" || houseScore.innerText == "3") {
      gameover = true;
      setTimeout(() => {
         scoreContainer.classList.add("hide");
         resultContainer.classList.remove("hide");
         if (+userScore.innerText > +houseScore.innerText) {
            resultEl.innerText = "You Win!!";
            winsEl.textContent = +winsEl.innerText + 1;
         } else {
            resultEl.innerText = "You Lose 🥺";
         }
      }, 1100);
   }
}

function resetGame() {
   userScore.innerText = "0";
   houseScore.innerText = "0";
   userEmoji.innerText = "";
   houseEmoji.innerText = "";
   resultContainer.classList.add("hide");
   scoreContainer.classList.remove("hide");
   outcomeText.innerText = "Make a choice to begin";
   gameover = false;
}

function clearEl(element) {
   element.innerHTML = "";
   element.classList = "placeholder";
}

// event listeners
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