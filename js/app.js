// shuffle the list of shapes using the provided "shuffle" method below
const shapes = ['fa-diamond', 'fa-diamond',
                  'fa-paper-plane-o', 'fa-paper-plane-o',
                  'fa-anchor', 'fa-anchor',
                  'fa-bolt','fa-bolt',
                  'fa-cube', 'fa-cube',
                  'fa-leaf', 'fa-leaf',
                  'fa-bomb', 'fa-bomb',
                  'fa-bicycle', 'fa-bicycle'];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
// shuffle deck
const shuffledCards = shuffle(shapes);

//create deck element dynamiclly when the game start/restart
const cardDeck = document.querySelector('.deck');
createDeck();
function createDeck() {
    shuffledCards.forEach(function(card) {
        const newCard = document.createElement('li');
        newCard.classList.add('card');
        newCard.innerHTML = `<i class="fa ${card}"></i>`;
        cardDeck.appendChild(newCard);
    });
};

// Create a list that holds all of your cards
let listOfcards = document.querySelectorAll(".card");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// stars list
// let starsList = document.querySelectorAll(".stars li");

// close icon in modal
let closeicon = document.querySelector(".close");

// declare modal
let modal = document.getElementById("popup1")

// array for opened cards
var openedCards = [];

// declaring variable of matchedCards
let matchedCard = document.querySelectorAll(".match");

//function to show and open cards
function isOpen() {
  if (!this.classList.contains('open') &&
      !this.classList.contains('show') &&
      !this.classList.contains('match'))
      {
        this.classList.add('open','show');
        openedCards.push(this);
        if(openedCards.length === 2){
            moveCounter();
            if(openedCards[0].innerHTML === openedCards[1].innerHTML){
                matched();
            } else {
                unmatched();
            }
        }
      }
};

//function to make the cards matched
function matched(){
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    openedCards[0].classList.remove("show", "open");
    openedCards[1].classList.remove("show", "open");
    openedCards = [];
}

//function to make the cards unmatched
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open","unmatched");
        openedCards[1].classList.remove("show", "open","unmatched");
        enable();
        openedCards = [];
    },1000);
}

// disable cards temporarily
function disable(){
  for(var i = 0; i < listOfcards.length; i++){
      listOfcards[i].classList.add("disabled");
  }
};

//enable cards and disable matched cards
function enable(){
  for(var i = 0; i < listOfcards.length; i++){
      listOfcards[i].classList.remove("disabled");
  }
  for(var i = 0; i < matchedCard.length; i++){
      matchedCard[i].classList.add("disabled");
  }
};

//count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

var second = 0, minute = 0; hour = 0;
var sec = document.querySelector("#seconds");
var min = document.querySelector("#mins");
var hr = document.querySelector("#hours");
var interval;
function startTimer(){
    interval = setInterval(function(){
        sec.textContent = second;
        min.textContent = minute;
        hr.textContent = hour;
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

//congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    // declaring variable of matchedCards
    matchedCard = document.querySelectorAll(".match");
    if (matchedCard.length == 16){
      clearInterval(interval);
      finalTime = `hours: ${hr.textContent} mins: ${min.textContent} sec: ${sec.textContent}`;

      // show congratulations modal
      modal.classList.add("show");

      // declare star rating variable
      var starRating = document.querySelector(".stars").innerHTML;

      //showing move, rating, time on modal
      document.getElementById("finalMove").innerHTML = moves;
      document.getElementById("starRating").innerHTML = starRating;
      document.getElementById("totalTime").innerHTML = finalTime;
    }
};

//restart button
document.querySelector('.restart').addEventListener('click', function (evt) {
  location.reload();
});

//final score popup
function finalScore(){
  var popup = document.querySelector("#myPopup");
  popup.classList.toggle("show");
};

//play again button
document.querySelector('#play-again').addEventListener('click', function (evt) {
  location.reload();
});

for (var i = 0; i < listOfcards.length; i++){
    listOfcards[i].addEventListener("click", isOpen);
    listOfcards[i].addEventListener("click", congratulations);
};
