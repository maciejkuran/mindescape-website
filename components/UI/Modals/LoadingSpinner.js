import { ThreeDots } from 'react-loader-spinner';
import classes from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={classes.spinner}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#989898"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    </div>
  );
};

export default LoadingSpinner;
