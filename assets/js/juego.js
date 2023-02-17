(() => {
    'use strict';
    // 2C = Two of Clubs    --->    Trebol 
    // 2D = Two of Diaminds --->    Diamantes    
    // 2H = Two of Heaths   --->    Corazones
    // 2S = Two of Spades   --->    Espadas

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];
    let playersPoints = [];

    //buttons
    const btnStop = document.querySelector('#btn-stop'),
        btnGetCard = document.querySelector('#btn-pedir'),
        btnNewGame = document.querySelector('#btn-new-game'),
        divPlayers = document.querySelectorAll('.divCartas'),
        //smalls
        htmlPoints = document.querySelectorAll('small');

    //Function to create a new deck
    const crearDeck = () => {
        deck = [];
        for (let typ of types) {
            for (let i = 2; i <= 10; i++) {
                deck.push(i + typ);
            }
            for (const special of specials) {
                deck.push(special + typ);

            }
        }
        return _.shuffle(deck);

    };
    //Inicializa el juego
    const startGame = (numPlayers = 2) => {
        deck=crearDeck();
        playersPoints = [];
        for (let i = 0; i < numPlayers; i++) {
            playersPoints.push(0);
        }
        console.clear();
        htmlPoints.forEach(element => element.innerText = 0);
        divPlayers.forEach(element => element.innerHTML = '');

        btnGetCard.disabled = false;

    };


    // Function to take a card
    const takeCard = () => {
        if (deck.length === 0) {
            throw 'No cards into the deck';
        }
        return deck.pop();
    };

    const valueOfCard = (card) => {
        let value = card.substring(0, card.length - 1);
        return (isNaN(value)) ? value = (value === 'A') ? 11
            : 10 : value = parseInt(value);


    };
    const setPoints = (card, turn) => {
        playersPoints[turn] = playersPoints[turn] + valueOfCard(card);
        htmlPoints[turn].innerText = playersPoints[turn];
        return playersPoints[turn];
    };
    const createCard = (card, turn) => {

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`;
        imgCard.classList.add('img-fluid');
        imgCard.classList.add('cardd');
        divPlayers[turn].append(imgCard);
    };
    const getWinner = () => {
        const [limitPoints, computerPoints] = playersPoints;
        setTimeout(() => {
            (computerPoints === limitPoints ? alert('Nadie gana :(') :
                (limitPoints > 21 ? alert('La computadora gana') :
                    (computerPoints > 21 ? alert('Jugador Gana') :
                        (limitPoints < computerPoints ? alert('Computadora gana') : alert('Jugador Gana')))));

        }, 100);
    };
    const computerTurn = (limitPoints) => {
        console.log(limitPoints);
        let computerPoints = 0;
        do {
            const card = takeCard();
            computerPoints = setPoints(card, playersPoints.length - 1);
            createCard(card, playersPoints.length - 1);
        }

        while ((computerPoints <= limitPoints) && (limitPoints <= 21));
        getWinner();

    };

    btnGetCard.addEventListener('click', () => {
        const card = takeCard();
        const playerPoints = setPoints(card, 0);
        createCard(card, 0);
        
        if (playerPoints > 21) {
            console.warn('Lo siento perdiste');
            btnGetCard.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);
        }
        else if (playerPoints === 21) {
            console.warn('Ganastee!!');
            btnGetCard.disabled = true;
            btnStop.disabled = true;
            computerTurn(playerPoints);



        }
        btnStop.disabled = false;

    });
    btnStop.addEventListener('click', () => {
        btnGetCard.disabled = true;
        btnStop.disabled = true;
        computerTurn(playersPoints[0]);
    });

    btnNewGame.addEventListener('click', () => {
        startGame();




    });
})();