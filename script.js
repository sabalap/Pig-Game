'use strict';

// select elements
const player1Section = document.querySelector('.player--0');
const player2Section = document.querySelector('.player--1');
const player1TotalScore = document.querySelector('#score--0');
const player2TotalScore = document.querySelector('#score--1');
const player1CurrentScore = document.getElementById('current--0');
const player2CurrentScore = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

// declare total scores, current score, active player, playing variables
let totalScores, currentScore, activePlayer, playing;

// reset function
const init = function () {
  // Everything in this function is for reset, so here every value is init

  // array of total scores, first element in array is first player's score, and second element in array is second player's score
  totalScores = [0, 0];
  // current score
  currentScore = 0;
  // which is active player, activePlayer = 0 is first player and activePlayer = 1 is second player
  activePlayer = 0;
  // if playing game, its true, if finished its false
  playing = true;

  // first player total score
  player1TotalScore.textContent = 0;
  // second player total score
  player2TotalScore.textContent = 0;
  // first player current score
  player1CurrentScore.textContent = 0;
  // second player current score
  player2CurrentScore.textContent = 0;
  // dice element hide
  dice.classList.add('hidden');
  // remove winner class from player 1 section
  player1Section.classList.remove('player--winner');
  // remove winner class from player 2 section
  player2Section.classList.remove('player--winner');
  // player 1 is active player by default
  player1Section.classList.add('player--active');
  // player 2 is not active by default
  player2Section.classList.remove('player--active');
};
// reset function call
init();

// switch player function
const switchPlayer = function () {
  // before switch player, active player current score should be 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // when switched players, current score should be 0
  currentScore = 0;
  // if player 1 is active then, it wont be active, player 2 will be active, And vice versa
  activePlayer = activePlayer === 0 ? 1 : 0;
  // if player1 section has class name "player--active" then remove, if it has not "player--active" class name then add
  player1Section.classList.toggle('player--active');
  // if player2 section has class name "player--active" then remove, if it has not "player--active" class name then add
  player2Section.classList.toggle('player--active');
};

// roll btn event listener
rollBtn.addEventListener('click', function () {
  // check if playing is in action
  if (playing) {
    // random dice number
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    // dice element hide
    dice.classList.remove('hidden');
    // dice image change by dice number
    dice.src = `dice-${diceNumber}.png`;
    // if dice number is not 1
    if (diceNumber !== 1) {
      // current score = current score + dice number
      currentScore += diceNumber;
      // display current score for active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if dice number is 1, then switch player
      // switch player function call
      switchPlayer();
    }
  }
});

// hold btn event listener
holdBtn.addEventListener('click', function () {
  // check if playing is in action
  if (playing) {
    // in total scores array access with active player number and this select element = select element + current score
    totalScores[activePlayer] += currentScore;
    // display total score for active player
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    // in total scores array access with active player number and if select element is >= 100
    if (totalScores[activePlayer] >= 100) {
      // play is over
      playing = false;
      // dice element hide
      dice.classList.add('hidden');
      // on active player add winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // on active player remove active class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      // winner text display for active player
      document
        .querySelector(`.player--${activePlayer}`)
        .children[2].classList.remove('hidden');
    } else {
      // if active player score is not >= 100
      // switch player function call
      switchPlayer();
    }
  }
});

// new game btn event listener
newGameBtn.addEventListener('click', function () {
  // active player who won, remove winner text
  document
    .querySelector(`.player--${activePlayer}`)
    .children[2].classList.add('hidden');
  // reset function call
  init();
});
