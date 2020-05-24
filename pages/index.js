import { useState } from 'react';
import styles from './index.module.css';
import Letter from '../components/letter';
import NumberInput from '../components/number-input';

const INITIAL_NUMBER_VALUE = 4;

const getLettersQuery = (lettersArray) => {
  const lettersWithSpaces = lettersArray.map((letter) => {
    if (!letter || letter === '' || letter === ' ') {
      return 'empty';
    }

    return letter.toLowerCase();
  });

  return lettersWithSpaces.join(',');
};

const HomePage = () => {
  const [numberOfLetters, _setNumberOfLetters] = useState(INITIAL_NUMBER_VALUE);
  const [letters, _setLetters] = useState([...Array(numberOfLetters)]);
  const [suggestions, setSuggestions] = useState([]);

  const numberOfLettersRef = React.useRef(numberOfLetters);
  const lettersRef = React.useRef(letters);

  const setNumberOfLetters = (data) => {
    numberOfLettersRef.current = data;
    _setNumberOfLetters(data);
  };

  const setLetters = (data) => {
    lettersRef.current = data;
    _setLetters(data);
  };

  const getSuggestions = async () => {
    const numberOfLettersQuery = numberOfLettersRef.current;
    const lettersQuery = getLettersQuery(lettersRef.current);

    const results = await fetch(
      `/api/word?numberOfLetters=${numberOfLettersQuery}&letters=${lettersQuery}`
    ).then((res) => res.json());

    setSuggestions(results);
  };

  const onSelectChange = async (event) => {
    const newNumberOfLetters = Number(event.target.value);
    let newLettersValue;

    // add extra values to end of letters array since number has increased
    if (newNumberOfLetters > numberOfLetters) {
      newLettersValue = [
        ...letters,
        ...Array(newNumberOfLetters - numberOfLetters),
      ];
    }

    // remove values from the array if number has decreased
    if (newNumberOfLetters < numberOfLetters) {
      newLettersValue = letters.slice(0, newNumberOfLetters);
    }

    setLetters(newLettersValue);
    setNumberOfLetters(newNumberOfLetters);

    getSuggestions();
  };

  const onLetterInput = async (value, index) => {
    const newLettersValue = [...letters];

    newLettersValue[index] = value;

    setLetters(newLettersValue);

    getSuggestions();
  };

  return (
    <div className={styles.body}>
      <h1 className={styles.title}>Crossword Solver</h1>
      <div className={styles.inputSection}>
        <div className={styles.inputs}>
          <div className={styles.numberInput}>
            <NumberInput
              numberOfLetters={numberOfLetters}
              onChange={onSelectChange}
            />
          </div>
          <div className={styles.letterInputs}>
            <p className={styles.instruction}>
              Enter the letters you already have:
            </p>
            {[...Array(numberOfLetters)].map((_, index) => (
              <Letter onInput={onLetterInput} key={index} index={index} />
            ))}
          </div>
        </div>
      </div>
      {!!suggestions.length && (
        <div className={styles.suggestionsSection}>
          <h2 className={styles.suggestionsTitle}>Matching Words</h2>
          <div className={styles.suggestions}>
            {suggestions.map((word) => (
              <span className={styles.suggestion} key={word}>
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
