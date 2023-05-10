import classes from './Form.module.scss';
import TextArea from '../UI/Inputs/TextArea';
import Input from '../UI/Inputs/Input';
import PrimaryButton from '../UI/Buttons/PrimaryButton';

const CommentForm = props => {
  return (
    <form className={classes.form}>
      <h3>{props.heading}</h3>
      <div>
        <TextArea attributes={{ rows: 3, placeholder: props.textarea }} />
      </div>
      <div className={classes['form__user']}>
        <div className={classes['form__user__email']}>
          {props.comments && <label htmlFor="email">ℹ Your email will not be published.</label>}
          <Input attributes={{ id: 'email', type: 'email', placeholder: 'Email' }} />
        </div>
        <div className={classes['form__user__name']}>
          <Input attributes={{ type: 'text', placeholder: 'Name' }} />
        </div>
      </div>
      <div className={classes['form__btn']}>
        <PrimaryButton>Submit</PrimaryButton>
      </div>
    </form>
  );
};

export default CommentForm;
