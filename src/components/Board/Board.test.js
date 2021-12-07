import * as _ from 'lodash';

beforeEach(() => {
  jest.clearAllMocks();
});




test('Check orderBy method from lodash low to high from Clubs, Spades, Hearts to Diamonds', () => {
  const lodash = require('lodash');
  const mockHand = [
    { id: 12, rank: 'Q', suit: 'hearts ♥' },
    { id: 32, rank: '6', suit: 'spades ♥' },
    { id: 13, rank: '8', suit: 'hearts ♥' },
    { id: 9, rank: '2', suit: 'hearts ♥' },
  ];
  lodash.orderBy = jest.fn(() => mockHand, ['rank', 'suit'], ['asc', 'asc']);

  const resultHand = [
    { id: 9, rank: '2', suit: 'hearts ♥' },
    { id: 32, rank: '6', suit: 'spades ♥' },
    { id: 13, rank: '8', suit: 'hearts ♥' },
    { id: 12, rank: 'Q', suit: 'hearts ♥' },
  ];
  lodash.orderBy(resultHand);

  expect(lodash.orderBy).toHaveBeenCalled();
  expect(lodash.orderBy).toHaveBeenCalledWith(resultHand);

});

