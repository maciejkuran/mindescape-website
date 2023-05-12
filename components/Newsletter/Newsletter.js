import useHttp from '@/hooks/useHttp';
import { useRef } from 'react';
import classes from './Newsletter.module.scss';
import Input from '../UI/Inputs/Input';
import PrimaryButton from '../UI/Buttons/PrimaryButton';
import LoadingSpinner from '../UI/Modals/LoadingSpinner';
import reqConfig from '@/utils/reqConfig';

const Newsletter = props => {
  const emailInputRef = useRef();

  const { sendFetchReq: sendPostReq, isLoading, data, error, success } = useHttp();

  const heading = props.homePage ? (
    <h1>Get Inspired with mindescape.</h1>
  ) : (
    <h3>Get Inspired with mindescape.</h3>
  );

  const signNewsletterHandler = async e => {
    e.preventDefault();

    await sendPostReq(
      `${process.env.NEXT_PUBLIC_API_URL}/newsletter`,
      reqConfig('POST', { email: emailInputRef.current.value })
    );

    emailInputRef.current.value = '';
  };

  return (
    <section className={classes.newsletter}>
      {heading}
      <p>Be the first to access premium articles & news. We share our love to art for free.</p>
      <form onSubmit={signNewsletterHandler} className={classes.form}>
        <div className={classes['form__input']}>
          <Input ref={emailInputRef} attributes={{ placeholder: 'Email address', type: 'email' }} />
        </div>

        <div className={classes['form__button']}>
          <PrimaryButton attributes={{ disabled: isLoading ? true : false }}>Sign up</PrimaryButton>
        </div>
        {success && (
          <p className={classes['form__notification']}>👋 Hello! You signed up successfully!</p>
        )}
        {error && (
          <p className={`${classes['form__notification']} ${classes['form__notification--error']}`}>
            ⚠ {error}
          </p>
        )}
        {isLoading && <LoadingSpinner />}
      </form>
    </section>
  );
};

export default Newsletter;
