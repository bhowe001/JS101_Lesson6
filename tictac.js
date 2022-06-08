// This is a tic tac toe game from Lesson 6 of JS 101 in Launch School

console.clear();
const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const colors = require('colors'); // allows terminal to access npm colors
const HUMAN_MARKER = 'X'.cyan;
const COMPUTER_MARKER = 'O'.green;
const WINNING_MATCH = 2;

// eight possible ways to win
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // winning rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // winning columns
  [1, 5, 9], [3, 5, 7] // winning diagonals
];

function displayBoard(board){
  console.clear();
  // 
  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`)

  // the tic tac toe board
  // spaces are numbered from 1 - 9 from left to right and top to bottom
  console.log('');
console.log('      |      |');
console.log(`   ${board['1']}  |  ${board['2']}   |  ${board['3']}`);
console.log('      |      |');
console.log('------+------+------');
console.log('      |      |');
console.log(`   ${board['4']}  |  ${board['5']}   |  ${board['6']}`);
console.log('      |      |');
console.log('------+------+------');
console.log('      |      |');
console.log(`   ${board['7']}  |  ${board['8']}   |  ${board['9']}`);
console.log('      |      |');
console.log('');
}

// ask player who will make the first move in the game
function askFirstPlayer() {
  console.clear();
  console.log('Welcome to Tic-Tac-Toe!'.inverse);
  prompt(`${'Who makes the first move?'}\n${'(1) Me'.cyan} ${'(2) Computer'.green}`);

  let firstPlayer = readline.question().toLowerCase().trim();

  while (!['1', 'player', '2', 'computer'].includes(firstPlayer)) {
    prompt('Please choose 1 (player) or 2 (computer)!');
    firstPlayer = readline.question().toLowerCase.trim();
  }
  return firstPlayer;
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }
  return board;
}

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function chooseSquare(board, currentPlayer) {
  if (currentPlayer === '1') {
    playerChoosesSquare(board);
  } else {
    computerChoosesSquare(board);
  }
}

function alternatePlayer(currentPlayer) {
  if (['1', 'player'].includes(currentPlayer)) {
    return '2';
  } else {
    return '1';
  }
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

// asks player what move they would like to make
function playerChoosesSquare(board) {
  let square;

  while(true) {
    prompt(`Choose a square: ${joinOr(emptySquares(board))}`);
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;
  
     prompt("That's not a valid choice.");
  
    }
    board[square] = HUMAN_MARKER;
  }

  function joinOr(arr, delimiter = ', ', word = 'or') {
  switch (arr.length) {
    case 0:
    return '';
    case 1:
    return `${arr[0]}`;
    case 2:
      return arr.join(` ${word} `);
      default:
        return arr.slice(0, arr.length -1).join(delimiter) + 
        `${delimiter}${word} ${arr[arr.length -1]}`;
  }
  }

  // scoreboard display
  function displayScore (playerScore, computerScore) {
    console.log(`${`You: ${playerScore}`.cyan} ${`Computer: ${computerScore}`.green}`);
  }
  

function computerChoosesSquare(board) {
let square;

// computer AI defense 1st
for (let i = 0; i < WINNING_LINES.length; i++) {
  let line = WINNING_LINES[i];
  square = findAtRiskSquare(line, board, HUMAN_MARKER);
  if (square) break;
}

// computer AI offense 2nd
if (!square) {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    let line = WINNING_LINES[i];
    square = findAtRiskSquare(line, board, COMPUTER_MARKER);
    if (square) break;
  }
}

// computer picks random square 3rd
if (!square) {
let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
square = emptySquares(board)[randomIndex];
}

board[square] = COMPUTER_MARKER;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function detectWinner(board) {

  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [sq1, sq2, sq3] = WINNING_LINES[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER 
    ) {
      return 'You';
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }
 return null;
}

// Computer AI Defense
function findAtRiskSquare (line, board, marker) {
  let markersInLine = line.map(square => board[square]);

  if(markersInLine.filter(val => val === marker).length === 2) {
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare;
        }
  }
  return null;
}

function displayChampion (winner) {
  if (winner === 'You') {
    prompt('\nCongratulations! You are the champion!');
  } else if (winner === 'Computer') {
    prompt('The computer is the champion. Better luck next time!');
  }
}

// Program loop
while (true) {
  let playerScore = 0;
  let computerScore = 0;

  while (true) {

    let currentPlayer = askFirstPlayer();

    let board = initializeBoard();

    function addPlayerScore(playerScore, board) {
  if (detectWinner(board) === 'You') {
    return playerScore + 1;
  } else {
    return playerScore;
  }
}

function addComputerScore(computerScore, board) {
  if (detectWinner(board) === 'Computer') {
    return computerScore + 1;
  } else {
    return computerScore;
  }
}

//Game begins
while (true) {
  displayBoard(board);
  chooseSquare(board, currentPlayer);
  currentPlayer = alternatePlayer(currentPlayer);
  if (someoneWon(board) || boardFull(board)) break;
  displayScore(playerScore, computerScore);
}

displayBoard(board);

if (someoneWon(board)) {
  detectWinner(board);
  playerScore = addPlayerScore(playerScore, board);
  computerScore = addComputerScore(computerScore, board);
  prompt(`${detectWinner(board)} won!`);
} else {
  prompt("It's a tie!");
};

displayScore(playerScore, computerScore);

// checks to see who won the match
let winner = checkChampion(playerScore, computerScore);
displayChampion(winner);

function checkChampion(playerScore, computerScore) {
  if (playerScore === WINNING_MATCH ) {
    return 'You';
  } else if (computerScore === WINNING_MATCH) {
    return 'Computer';
} 
return null;
}

function displayChampion (winner) {
  if (winner === 'You') {
    prompt('Congratulations! You are the champion!');
     playerScore = 0;
     computerScore = 0;
  } else if (winner === 'Computer') {
    prompt('The computer is the champion. Better luck next time!');
    playerScore = 0;
    computerScore = 0;
  }
}

// asks if player would like to play again
// 'y' reinitiates game loop
// 'n' exits the game loop
prompt("Would you like to play again? \n=> Enter 'y' to continue or 'n' to exit the game");
let answer = readline.question().toLowerCase()[0];
if (answer !== 'n' && answer !== 'y') {
  prompt("That's not a valid response");
} else if 
 (answer === 'y') {
    continue;
  } else if 
  (answer === 'n') break;
}

// exit message and end credits
console.log('\nThanks for playing Tic-Tac-Toe!'.cyan) 
console.log('\nCreated by Brianna Howell on May 28th, 2022'.cyan);
console.log('Last modified on June 8th, 2022\n'.cyan)
break;
}