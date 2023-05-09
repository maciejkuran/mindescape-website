import classes from './Search.module.scss';
import Card from '../UI/Card';
import Input from '../UI/Inputs/Input';
import Tag from '../UI/Buttons/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Search = () => {
  return (
    <Card className={classes.search}>
      <h3>Search</h3>
      <div className={classes['search__tags']}>
        <Tag name="Featured" />
      </div>
      <div>
        <Input attributes={{ type: 'text', placeholder: 'Search by title' }} />
      </div>
      <div className={classes['search__results']}>
        <p>Results: 2</p>
        <ul>
          <li>
            <Link href="/">
              Excepteur sint occaecat cupidatat non
              <span>
                <FontAwesomeIcon icon={faArrowRightLong} />
              </span>
            </Link>
          </li>
          <li>
            <Link href="/">
              Excepteur sint occaecat cupidatat non
              <span>
                <FontAwesomeIcon icon={faArrowRightLong} />
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <button className={classes['search__btn--close']}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </Card>
  );
};

export default Search;
