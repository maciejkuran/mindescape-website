import classes from './Tag.module.scss';

const Tag = props => {
  return (
    <button onClick={props.onClick} className={classes.tag}>
      {props.name}
    </button>
  );
};

export default Tag;
