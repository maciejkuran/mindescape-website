import useInput from '@/hooks/useInput';
import { useEffect } from 'react';
import classes from './Form.module.scss';
import TextArea from '../UI/Inputs/TextArea';
import Input from '../UI/Inputs/Input';
import PrimaryButton from '../UI/Buttons/PrimaryButton';
import LoadingSpinner from '@/components/UI/Modals/LoadingSpinner';

const Form = props => {
  const {
    inputValue: textAreaValue,
    storeValueHandler: getTextAreaValue,
    removeValueHandler: removeTextAreaValue,
  } = useInput();
  const {
    inputValue: nameValue,
    storeValueHandler: getNameValue,
    removeValueHandler: removeNameValue,
  } = useInput();
  const {
    inputValue: emailValue,
    storeValueHandler: getEmailValue,
    removeValueHandler: removeEmailValue,
  } = useInput();

  const {
    postReqIsLoading: isLoading,
    postError: error,
    postSuccess: success,
    postRes: data,
  } = props.state;
  const { sendPostRequest } = props;

  //Clean input fields if POST request succeded
  useEffect(() => {
    if (success) {
      removeTextAreaValue();
      removeEmailValue();
      removeNameValue();
    }
  }, [success, removeTextAreaValue, removeNameValue, removeEmailValue]);

  const submitFormHandler = e => {
    e.preventDefault();
    const data = {
      content: textAreaValue,
      email: emailValue,
      name: nameValue,
    };
    sendPostRequest(data);
  };

  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      {props.heading && <h3>{props.heading}</h3>}
      <div>
        <TextArea
          attributes={{
            value: textAreaValue,
            onChange: getTextAreaValue,
            rows: 3,
            placeholder: props.textarea,
          }}
        />
      </div>
      <div className={classes['form__user']}>
        <div className={classes['form__user__email']}>
          {props.comments && <label htmlFor="email">ℹ Your email will not be published.</label>}
          <Input
            attributes={{
              value: emailValue,
              onChange: getEmailValue,
              id: 'email',
              type: 'email',
              placeholder: 'Email',
            }}
          />
        </div>
        <div className={classes['form__user__name']}>
          <Input
            attributes={{
              value: nameValue,
              onChange: getNameValue,
              type: 'text',
              placeholder: 'Name',
            }}
          />
        </div>
      </div>
      {error && (
        <p className={`${classes['form__notification']} ${classes['form__notification--error']}`}>
          ⚠ {error}
        </p>
      )}
      {success && <p className={classes['form__notification']}>ℹ {data.message}</p>}
      {isLoading && <LoadingSpinner />}
      <div className={classes['form__btn']}>
        <PrimaryButton attributes={{ disabled: isLoading ? true : false }}>Submit</PrimaryButton>
      </div>
    </form>
  );
};

export default Form;
