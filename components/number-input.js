import styles from './number-input.module.css';

const NumberInput = ({ numberOfLetters, onChange }) => {
  return (
    <>
      <label htmlFor="letters-number" className={styles.numberInputLabel}>
        Number of Letters:
      </label>
      <select
        name="letters-number"
        id="letters-number"
        onChange={onChange}
        className={styles.numberInputSelect}
        value={numberOfLetters}
      >
        {[...Array(15)].map((_, index) => {
          const number = index + 1;

          return (
            <option value={number} key={number}>
              {number}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default NumberInput;
