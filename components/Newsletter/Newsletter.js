import classes from './Newsletter.module.scss';
import Input from '../UI/Inputs/Input';
import PrimaryButton from '../UI/Buttons/PrimaryButton';

const Newsletter = props => {
  const heading = props.homePage ? (
    <h1>Get Inspired with mindescape.</h1>
  ) : (
    <h3>Get Inspired with mindescape.</h3>
  );

  return (
    <section className={classes.newsletter}>
      {heading}
      <p>Be the first to access premium articles & news. We share our love to art for free.</p>
      <form className={classes.form}>
        <div className={classes['form__input']}>
          <Input attributes={{ placeholder: 'Email address' }} />
        </div>

        <div className={classes['form__button']}>
          <PrimaryButton>Sign up</PrimaryButton>
        </div>
      </form>
    </section>
  );
};

export default Newsletter;
