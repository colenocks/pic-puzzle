/* The event "DOMContentLoaded" will be fired when the document has been parsed completely, that is without stylesheets* and additional images. If you need to wait for images and stylesheets, use "load" instead. */

const getAll = (selector) => document.querySelectorAll(selector);
const get = (selector) => document.querySelector(selector);

let isFlipped = false;
let boardLocked = false;
let firstCard, secondCard;

let cards = getAll(".card");

let flipCard = function () {
  if (boardLocked) return;

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
};

const checkMatch = function () {
  firstCard.dataset.panel === secondCard.dataset.panel
    ? disableFlip()
    : unFlip();
};

const unFlip = function () {
  boardLocked = true; //lock the board
  setTimeout(function () {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    boardLocked = false; //unlock after flip
  }, 1500);
};

const disableFlip = function () {
  //Matched
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
};

cards.forEach((card) => card.addEventListener("click", flipCard));
