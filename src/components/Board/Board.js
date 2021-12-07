import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';

const Board = () => {
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [draw, setDraw] = useState(0);
  const [shuffled, setShuffled] = useState(false);
  const [sortedCards, setSortedCards] = useState();

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
    const suits = [' hearts', ' diamonds ', ' spades', ' clubs'];

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

  const handleDrawNumber = (e) => {
    setDraw(e.target.value);
  };

  const handleDeal = useCallback(
    (draw) => {
      console.log(hand, 'deal');
      for (let i = 0; i < draw; i++) {
        console.log(draw, 'here');
        console.log(i, 'here');
        let dealtCard = {
          id: deck[i].id,
          rank: deck[i].rank,
          suit: deck[i].suit,
        };
        hand.push(dealtCard);
        deck.splice([i], 1);
        console.log('set', hand);
        setHand(hand);
      }
    },
    [deck, hand]
  );


  const handleSort = () => {
    let sorted = _.orderBy(hand, ['rank', 'suit'], ['asc', 'asc']);
    return setSortedCards(sorted)
  };

  useEffect(() => {
    createDeck();
  }, []);

  return (
    <>
      <div className='wrapper'>
        <div className='column'>
          <h1>Deck</h1>
          {!shuffled && <button onClick={handleShuffle}> Shuffle</button>}
          {shuffled &&
            deck.map((card, i) => {
              return (
                <li key={card.id}>
                  {card.rank}
                  {card.suit}
                </li>
              );
            })}
        </div>
        <div className='column'>
          {' '}
          <h1>Controls</h1> <h3>Draw Cards</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDeal(draw);
            }}>
            <br />
            <input
              type='number'
              min='1'
              max='100'
              onChange={handleDrawNumber}
            />
            {deck.length > 2 && <button type='submit'> Draw</button>}
          </form>
        </div>
        <div className='column'>
          <h1>HAND</h1>
          {hand.length >= 2 && <button onClick={handleSort}>Sort</button>}
          {sortedCards ? sortedCards.map((card) => {
            return (
              <li key={card.id}>
                {card.rank}
                {card.suit}
              </li>
            );
          }): hand.map((card) => {
            return (
              <li key={card.id}>
                {card.rank}
                {card.suit}
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Board;

//I have also started to create folders how I would split out the components of the board

//Given I have shuffled and drawn cards and clicked "save",
// When I refresh the page,
// Then I can resume from my previous state.
// PROPOSED SOLUTION: Using Local Storage to track changes and update the LocalStorage.
// as well as retrieve the stored value from LcoalStorage at the initialization.

// useEffect(() => {
//   setDeck(JSON.parse(window.localStorage.getItem('deck')));
//   setHand(JSON.parse(window.localStorage.getItem('deck')));
// }, []);

// useEffect(() => {
//   window.localStorage.setItem('deck', deck);
//   window.localStorage.setItem('hand', hand);
// }, [deck, hand]);


// Reset
// Given I have saved a game state,
// When I click "reset",
// Then the game resets with all the cards moved to the deck
// PROPOSED SOLUTION: window.localStorage.clear(); -> This would clear all keys in local storage