import classes from './GridItem.module.scss';
import PrimaryButton from '../UI/Buttons/PrimaryButton';
import Image from 'next/image';
import Link from 'next/link';
import formatTitleToUrl from '@/utils/formatTitleToUrl';

const GridItem = props => {
  const { mainImage, title, _id: articleId } = props.data ?? {};

  const titleToUrl = title && formatTitleToUrl(title);

  return (
    <div className={classes.item}>
      <Image className={classes['item__img']} src={mainImage} height={1200} width={800} alt="" />
      <div className={classes['item__data']}>
        <h3>{title}</h3>
        <Link href={`/articles/${titleToUrl}`}>
          <PrimaryButton className={classes['item__data__btn']}>Read article</PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default GridItem;
