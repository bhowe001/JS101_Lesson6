 const emoji = require('node-emoji');

// let spade = emoji.get('spades');
// console.log(spade);

// let heart = emoji.get('heart');
// console.log(heart);

// let club = emoji.get('clubs');
// console.log(club);

// let diamond = emoji.get('diamonds');
// console.log(diamond);
const SUITS = ['H', 'D', 'S', 'C'];
const SUITS_EMOJIS = [SUITS[0].emoji.get('hearts'), SUITS[1].emoji.get('diamonds'), SUITS[2].emoji.get('spades'), SUITS[3].emoji.get('clubs')];

console.log(SUITS_EMOJIS);