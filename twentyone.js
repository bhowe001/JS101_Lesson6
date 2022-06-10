// Objective 

// The goal of Twenty-One is to try and get as close to 21 as possible while
// having a higher valued hand than your opponent and not going over 21.

// Gameplay

// 1. Initialize deck
// 2. Deal cards to player and dealer
// 3. Player's turn: choice to hit or stay
//    - repeat choice until bust or stay
// 4. If the player busts, the dealer wins.
// 5. Dealer's turn: choice to hit or stay
//    - Dealer must repeat until total is greater or equal to 17
// 6. If the dealer busts, the player wins.
// 7. Compare the dealer and the player's hands and declare the winner.

// Cards
// nested array data structure


// Calculating Aces
// aces are worth either 1 or 11 

const readline = require('readline-sync');
const colors = require('colors');
const emoji = require('node-emoji');
const SUITS = [emoji.get('heart') + ' ', emoji.get('diamonds') + ' ', emoji.get('spades') + ' ', emoji.get('clubs') + ' '];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

function prompt(message) {
  console.log(`=> ${message}`);
}

console.clear();
// Shuffle cards
function shuffle(array) {
  for (let first = array.length - 1; first > 0; first--) {
    let second = Math.floor(Math.random() * (first + 1)); // random index from 0 to i
    [array[first], array[second]] = [array[second], array[first]]; // swap elements
  }

  return array;
}

function initalizeDeck() {
  let deck = [];

  for (let suitIndex = 0; suitIndex < SUITS.length; suitIndex++) {
    let suit = SUITS[suitIndex];

    for (let valueIndex = 0; valueIndex < VALUES.length; valueIndex++) {
      let value = VALUES[valueIndex];
      deck.push([suit, value]);
    }
  }

  return shuffle(deck);
}

function total(cards) {
 
  let values = cards.map(card => card[1]);

  let sum = 0;
  values.forEach(value => {
    if (value === "Ace") {
      sum += 11;
    } else if (['Jack', 'Queen', 'King'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  // accounting for Aces
  values.filter(value => value === "Ace").forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

function busted(cards) {
  return total(cards) > 21;
}

function detectResult(dealerCards, playerCards) {
  let playerTotal = total(playerCards);
  let dealerTotal = total(dealerCards);

  if (playerTotal > 21) {
    return 'PLAYER_BUSTED';
  } else if (dealerTotal > 21) {
    return 'DEALER_BUSTED';
  } else if (dealerTotal < playerTotal) {
    return 'PLAYER';
  } else if (dealerTotal > playerTotal) {
    return 'DEALER';
  } else {
    return 'TIE';
  }
}

function displayResults(dealerCards, playerCards) {
  let result = detectResult(dealerCards, playerCards);

  switch (result) {
    case 'PLAYER_BUSTED':
      prompt(`${`Oh no! You busted! Dealer wins!`} ${emoji.get('yum')}\n`);
      break;
    case 'DEALER_BUSTED':
      prompt(`${`Dealer busted! You win`} ${emoji.get('trophy')}`);
      break;
    case 'PLAYER':
      prompt(`${`You win!`} ${emoji.get('trophy')}`);
      break;
    case 'DEALER':
      prompt(`${`${emoji.get('robot_face')} Dealer wins!`} ${emoji.get('yum')}`);
      break;
    case 'TIE':
      prompt("It's a tie!");
  }
}

function playAgain() {
  console.log('-------------');
  prompt('Do you want to play again? (y or n)');
  let answer = readline.question();
  if (answer === 'y') {
    console.clear();
  } 
  return answer.toLowerCase()[0] === 'y';
}

function popTwoFromDeck(deck) {
  return [deck.pop(), deck.pop()];
}

function hand(cards) {
  return cards.map(card => `${card[1]}${card[0]}`).join(' ');
}

// Game loop begins
while (true) {
  prompt('Welcome to Twenty-One!'.inverse);


  let deck = initalizeDeck();
  let playerCards = [];
  let dealerCards = [];

playerCards.push(...popTwoFromDeck(deck));
  dealerCards.push(...popTwoFromDeck(deck));

prompt(`Dealer has a ${dealerCards[0]} and an unknown card`);
  prompt(`You have the following cards: ${playerCards[0]} and ${playerCards[1]}, for a total of ${total(playerCards)}.`);


// Player turn
while (true) {
  let playerTurn;
  while (true) {
    prompt('Would you like to Hit ' + '(h)'.red + ' or Stay ' + '(s)'.cyan + '?');
    playerTurn = readline.question().toLowerCase();
    if (['h', 's'].includes(playerTurn)) break;
    prompt("Sorry, must enter 'h' or 's'.");
  }

if (playerTurn === 'h') {
  playerCards.push(deck.pop());
  prompt('You chose to hit!');
  prompt(`Your cards are now: ${hand(playerCards)}`);
  prompt(`Your total is now: ${total(playerCards)}`);
}

if (playerTurn === 's' || busted(playerCards)) break;
}

if (busted(playerCards)) {
  displayResults(dealerCards, playerCards);
  if (playAgain()) {
    continue;
  } else {
    break;
  }
} else {
  prompt(`You stayed at ${total(playerCards)}`);
}

// dealer turn
prompt('Dealer turn...');

while (total(dealerCards) < 17) {
  prompt(`Dealer hits!`);
  dealerCards.push(deck.pop());
  prompt(`Dealer's cards are now: ${hand(dealerCards)}`);
}

if (busted(dealerCards)) {
  prompt(`Dealer total is now: ${total(dealerCards)}`);
  displayResults(dealerCards, playerCards);
  if (playAgain()) {
    continue;
  } else {
    break;
  }
} else {
  prompt(`Dealer stays at ${total(dealerCards)}`);
}
  
// compare cards
console.log('==============');
  prompt(`Dealer has ${dealerCards}, for a total of: ${total(dealerCards)}`);
  prompt(`Player has ${playerCards}, for a total of: ${total(playerCards)}`);
  console.log('==============');

  displayResults(dealerCards, playerCards);


    console.log('\nThanks for playing Twenty One!'.cyan) 
    console.log('\nCreated by Brianna Howell on June 9th, 2022'.cyan);
    console.log('Last modified on June 9th, 2022\n'.cyan)
    break;
}