import { ThreeDots } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#989898"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      visible={true}
    />
  );
};

export default LoadingSpinner;
