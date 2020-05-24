const { getMatchingWordsByLetters } = require('./word');

describe('getMatchingWordsByLetters', () => {
  it('should return correct result', () => {
    const letters = 'empty,e,l,empty,empty';
    const wordsList = ['hello', 'blah'];

    const result = getMatchingWordsByLetters(letters, wordsList);

    expect(result).toBe();
  });
});
