
//Make video play slower
const video = document.querySelector("video");
video.playbackRate = 0.4;

//different hue filters for the background video
const videoFilterArr = [-100, -300, -400, -500, -700, -800];


//links to the dice images
const diceLinks = ["images/dice-1.svg", "images/dice-2.svg", "images/dice-3.svg", "images/dice-4.svg", "images/dice-5.svg", "images/dice-6.svg"];


//get random number between 1 and 6
const randomNum = (min, max) => Math.floor(Math.random() * (max - min) + 1);


const amountOfDice = document.querySelector(".amount-of-dice"); //container for amount options

//to change display on click on amount of dice or on back
const startScreen = document.querySelector(".start-screen");
const rollScreen = document.querySelector(".roll-screen");

const newAmountButton = document.querySelector(".new-roll");

const diceDisplay = document.querySelector(".dice-display");
const diceImages = document.querySelectorAll(".dice-display img");

//inititally no amount of dice chosen
let diceTotal;



const amount = e => {
  if (e.target && e.target.tagName === "BUTTON") {

    //amount of dice = number in the element
    diceTotal = e.target.firstElementChild.innerHTML;

    //Show the amount of dice that was chosen
    for (let i = 0; i < diceTotal; i++) {
      diceImages[i].style.display = "flex";
    }

    //hide amount of dice options when one has been chosen
    startScreen.style.display = "none";

    //show dice screen / roll screen
    rollScreen.style.display = "grid";

    //change bg video filter on click
    video.style.filter = `hue-rotate(${videoFilterArr[randomNum(1,6)]}deg)`;
    video.style.transition = "filter 7s";

  }
}

amountOfDice.addEventListener("click", amount);




//When back button clicked, go back to first screen
const newAmount = e => {

  //go back to start screen when button is clicked
  startScreen.style.display = "grid";

  //hide roll screen
  rollScreen.style.display = "none";

  //to reset amount of dice when back button is clicked
  [...diceImages].map(img => img.style.display = "none");

  //to reset if any buttons are locked / being kept
  [...diceImages].map(img => img.classList.remove("keep"));

  //change filter on bg video
  video.style.filter = `hue-rotate(${videoFilterArr[randomNum(1,6)]}deg)`;
  video.style.transition = "filter 7s";

}

newAmountButton.addEventListener("click", newAmount);




//generate numbers on dice when roll button is clicked
const rollButton = document.querySelector(".roll-button");

const rollDice = e => {
  for (let i = 0; i < diceTotal; i++) {

    if (diceImages[i].className === "keep" ) {

      diceImages[i].src = diceImages[i].src;

    } else {

      let diceEyes = randomNum(1, 6);
      diceImages[i].src = diceLinks[diceEyes]

    }

  }
}

rollButton.addEventListener("click", rollDice);




//To keep dice and roll the others (not clicked dice) on roll
const keepDice = e => {
  if (e.target.tagName === "IMG") {

    if (e.target.className === "keep") {
      e.target.classList.remove("keep");
    } else {
      e.target.classList.add("keep");
    }

  }
}

diceDisplay.addEventListener("click", keepDice);
