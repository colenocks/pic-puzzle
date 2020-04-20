/* The event "DOMContentLoaded" will be fired when the document has been parsed completely, that is without stylesheets* and additional images. If you need to wait for images and stylesheets, use "load" instead. */

const getAll = (selector) => document.querySelectorAll(selector);
const get = (selector) => document.querySelector(selector);

let flipCount = 0;
let matchedCount = 0;
const allMatched = 6;
let isFlipped = false;
let boardLocked = false;
let firstCard, secondCard;

let cards = getAll(".card");
let frontFace = getAll(".front-face");

let pictures = [];

//get card images and store in an array
frontFace.forEach((face) => {
  let card = {
    src: face.getAttribute("src"),
    data: face.parentNode.getAttribute("data-panel"),
    alt: face.getAttribute("alt"),
  };
  pictures.push(card);
});
shuffle(pictures);

function flipCard() {
  if (boardLocked) return;
  if (this === firstCard) return;

  flipCount++;

  this.classList.add("flip");

  if (!isFlipped) {
    //first click
    isFlipped = true;
    firstCard = this; //element that fired the event
    return;
  }
  //second click
  isFlipped = false;
  secondCard = this;
  checkMatch();
}

function checkMatch() {
  firstCard.dataset.panel === secondCard.dataset.panel
    ? disableFlip()
    : unFlip();
}

function unFlip() {
  boardLocked = true; //lock the board
  setTimeout(function () {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    boardLocked = false; //unlock after flip
  }, 1500);
}

function disableFlip() {
  //Matched
  matchedCount++;
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetClickAfterMatch();

  if (matchedCount === allMatched) {
    displayInfo("You have matched all Cards. Total Attempts: " + flipCount);
  }
}

function resetClickAfterMatch() {
  //reset board after matching
  [isFlipped, boardLocked] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//set the attributes of the cards
function setCardAttributes(array) {
  frontFace.forEach((card, index) => {
    card.setAttribute("src", array[index].src);
    card.setAttribute("alt", array[index].alt);
    card.parentNode.setAttribute("data-panel", array[index].data);
  });
}

//shuffle the array (random)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    // swap elements array[i] and array[j]
    [array[i], array[j]] = [array[j], array[i]];
  }
  setCardAttributes(array);
  return array;
}

function displayInfo(msg) {
  //Alert Display
  let paragraph = document.createElement("p");
  paragraph.classList.add("p-info");
  paragraph.append(document.createTextNode(msg));

  // Alert Close button
  let closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.append(document.createTextNode("X"));
  paragraph.append(closeButton);

  if (
    document.querySelector(".modal") &&
    document.querySelector(".alert-box")
  ) {
    let modal = document.querySelector(".modal");
    let alertBox = document.querySelector(".alert-box");
    alertBox.appendChild(paragraph);
    modal.appendChild(alertBox);
  } else {
    // background
    let modal = document.createElement("div");
    modal.classList.add("modal");
    let alertBox = document.createElement("div");
    alertBox.classList.add("alert-box");
    alertBox.appendChild(paragraph);
    modal.appendChild(alertBox);
    document.body.appendChild(modal);
  }
  closeButton.onclick = function () {
    let modal = document.querySelector(".modal");
    let alertBox = document.querySelector(".alert-box");
    alertBox.removeChild(paragraph);
    if (document.querySelectorAll(".p-info").length == 0) {
      document.body.removeChild(modal);
    }
  };
}

cards.forEach((card) => card.addEventListener("click", flipCard));
