import styles from './letter.module.css';

const Letter = ({ onInput, index }) => {
  return (
    <>
      <label htmlFor={`letter-${index + 1}`} className={styles.label}>
        {`Letter ${index + 1}`}
      </label>
      <input
        type="text"
        name={`letter ${index + 1}`}
        id={`letter-${index + 1}`}
        className={styles.letter}
        maxLength="1"
        onInput={(event) => onInput(event.target.value, index)}
      ></input>
    </>
  );
};

export default Letter;
