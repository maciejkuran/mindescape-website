import classes from './NoItems.module.scss';
import Image from 'next/image';
import Card from './Card';

const NoItems = () => {
  return (
    <section>
      <Card className={classes.empty}>
        <div>
          <h4>Oh no! We found no content.</h4>
          <Image src="/images/error.svg" height={250} width={250} alt="error" />
        </div>
      </Card>
    </section>
  );
};

export default NoItems;
