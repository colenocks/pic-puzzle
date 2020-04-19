/* The event "DOMContentLoaded" will be fired when the document has been parsed completely, that is without stylesheets* and additional images. If you need to wait for images and stylesheets, use "load" instead. */

// document.addEventListener("load", function () {
const getAll = (selector) => document.querySelectorAll(selector);
const get = (selector) => document.querySelector(selector);

let cards = getAll(".card");

let flipCard = function () {
  //   console.log(this);
  this.classList.toggle("flip");
};

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
// });
