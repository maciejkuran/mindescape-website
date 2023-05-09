import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div>
        <p>Credit to Unsplash artists for providing amazing photos</p>
        <p>Designed & developed by Maciej Kuran-Janowski</p>
      </div>
      <h4>mindescape</h4>
    </footer>
  );
};

export default Footer;
