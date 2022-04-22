// 2C = Two of Clubs    --->    Trebol 
// 2D = Two of Diaminds --->    Diamantes    
// 2H = Two of Heaths   --->    Corazones
// 2S = Two of Spades   --->    Espadas

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];
let playerPoints = 0;
let computerPoints = 0;

//buttons
const btnStop = document.querySelector('#btn-stop');
const btnPedir = document.querySelector('#btn-pedir');
const btnNewGame = document.querySelector('#btn-new-game');

//smalls
const htmlPoints = document.querySelectorAll('small');

//Function to create a new deck
const crearDeck = () => {
    for (typ of types) {
        for (let i = 2; i <= 10; i++) {
            deck.push(i + typ);
        }
        for (const special of specials) {
            deck.push(special + typ);

        }
    }
    deck = _.shuffle(deck);
    console.log(deck);

};
crearDeck();

// Function to take a card
const takeCard = () => {
    if (deck.length === 0) {
        throw 'No cards into the deck';
    }
    const card = deck.pop();
    console.log(card);
    return card;
};

const valueOfCard = (card) => {
    let value = card.substring(0, card.length - 1);
    return (isNaN(value)) ? value = (value === 'A') ? 11
        : 10 : value = parseInt(value);


};

btnPedir.addEventListener('click', () => {
    const card = takeCard();
    playerPoints = playerPoints + valueOfCard(card);
    htmlPoints[0].innerHTML = playerPoints;

});