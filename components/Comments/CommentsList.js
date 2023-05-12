import classes from './CommentsList.module.scss';
import Card from '../UI/Card';
import dateWithTime from '@/utils/dateWithTime';
import LoadingSpinner from '../UI/Modals/LoadingSpinner';

const CommentsList = props => {
  const { quantity, comments } = props;
  const { commentsAreLoading, commentsError, commentsSuccess } = props.state;

  return (
    <>
      {commentsAreLoading && <LoadingSpinner />}
      {commentsError && (
        <div>
          <h5>⚠ Failed to get the comments!</h5>
          <p>{commentsError}</p>
        </div>
      )}
      {!commentsAreLoading && commentsSuccess && (
        <div className={classes.list}>
          <h5>Comments: {quantity}</h5>
          {quantity === 0 && <p>🙄 No one left a comment yet. Be the first!</p>}
          {comments && (
            <ul className={classes['list__comments']}>
              {comments.map(comment => (
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
      )}
    </>
  );
};

export default CommentsList;
