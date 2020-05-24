import { promises as fs } from 'fs';

const checkIfLettersEmpty = (letters) => {
  const splitLetters = letters.split(',');
  const emptyLetters = splitLetters.filter((letter) => letter === 'empty');

  return emptyLetters.length === splitLetters.length;
};

const getWords = async () => {
  const filePath = `${process.env.ROOT}/utils/words.txt`;
  const wordsFile = await fs.readFile(filePath, 'utf8');

  return wordsFile.split('\n');
};

const getMatchingWordsByLength = (numberOfLetters, wordsList) => {
  return wordsList.filter((word) => word.length === Number(numberOfLetters));
};

export const getMatchingWordsByLetters = (letters, wordsList) => {
  const lettersArray = letters.split(',');

  const matchingWords = wordsList.reduce((acc, word) => {
    const splitWord = word.split('');

    const letterMatchInfo = splitWord.map((letter, index) => {
      if (letter === lettersArray[index] || lettersArray[index] === 'empty') {
        return true;
      }

      return false;
    });

    const isMatch = letterMatchInfo.filter((x) => x === false).length === 0;

    if (isMatch) {
      acc.push(word);
    }

    return acc;
  }, []);

  return matchingWords;
};

export default async (req, res) => {
  const numberOfLetters = req.query.numberOfLetters;
  const letters = req.query.letters;

  const allLettersAreEmpty = checkIfLettersEmpty(letters);

  let matches = [];

  if (!allLettersAreEmpty) {
    const wordsList = await getWords();

    const wordsListByLength = getMatchingWordsByLength(
      numberOfLetters,
      wordsList
    );

    matches = getMatchingWordsByLetters(letters, wordsListByLength);
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(matches));
};
