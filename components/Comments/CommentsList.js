import classes from './CommentsList.module.scss';
import Card from '../UI/Card';
import dateWithTime from '@/utils/dateWithTime';

const CommentsList = props => {
  return (
    <div className={classes.list}>
      <h5>Comments: {props.quantity}</h5>
      {props.quantity === 0 && <p>🙄 No one left a comment yet. Be the first!</p>}
      {props.comments && props.comments.length !== 0 && (
        <ul className={classes['list__comments']}>
          {props.comments.map(comment => (
            <li key={comment._id} className={classes['list__comments__item']}>
              <Card className={classes['list__comments__item__card']}>
                <div>
                  <h6>{comment.name}</h6>
                  <p>{dateWithTime(comment.date)}</p>
                </div>
                <p>{comment.content}</p>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsList;
