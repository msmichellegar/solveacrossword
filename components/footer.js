import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Made with ♥ by{' '}
        <a href="www.twitter.com/msmichellegar">@msmichellegar</a>.
      </p>
      <p>
        © {new Date().getFullYear()} Solve a Crossword. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
