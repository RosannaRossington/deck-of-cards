import React, { useState, useEffect, useCallback } from 'react';
//import './Deck.css';

const Deck = () => {
  const [deck, setDeck] = useState([]);
  const [shuffled, setShuffled] = useState(false);


  const createDeck = () => {
    const ranks = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
    ];
    const suits = ['♥', '♦', '♠', '♣'];

    let id = 1;
    let cards = [];

    for (let suit = 0; suit < suits.length; suit++) {
      for (let rank = 0; rank < ranks.length; rank++) {
        let card = {
          id: id,
          rank: ranks[rank],
          suit: suits[suit],
        };
        cards.push(card);
        id++;
      }
    }
    setDeck(cards);
  };

  const handleShuffle = useCallback(() => {
    setShuffled(true);
    for (let i = deck.length - 1; i > 0; i--) {
      let randomNumber = Math.floor(Math.random() * i); //20
      let temp = deck[i]; //0
      // 0 moves to 20
      // 20 moves to 0
      deck[i] = deck[randomNumber];
      deck[randomNumber] = temp;
    }
  }, [deck]);

  useEffect(() => {
    createDeck();
  }, []);

  return (
    <>
      <div className='column'>
        <h1>Deck</h1>
        {!shuffled && <button onClick={handleShuffle}>Shuffle</button>}
        {shuffled &&
          deck.map((card) => {
            return (
              <li key={card.id}>
                {card.rank}
                {card.suit}
              </li>
            );
          })}
      </div>
    </>
  );
};

export default Deck;
