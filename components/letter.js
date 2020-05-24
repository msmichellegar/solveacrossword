import styles from './letter.module.css';

const Letter = ({ onInput, index }) => {
  return (
    <>
      <input
        className={styles.letter}
        maxLength="1"
        onInput={(event) => onInput(event.target.value, index)}
      ></input>
    </>
  );
};

export default Letter;
