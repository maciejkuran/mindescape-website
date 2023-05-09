import classes from './Error.module.scss';
import Image from 'next/image';

const Error = props => {
  return (
    <section>
      <div>
        <h1>Oh no! Error {props.code} occured.</h1>
        <p>{props.message}</p>
        <Image
          className={classes['err__img']}
          src="/images/error.svg"
          height={400}
          width={400}
          alt="error"
        />
      </div>
    </section>
  );
};

export default Error;
