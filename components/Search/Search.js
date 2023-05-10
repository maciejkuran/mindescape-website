import useHttp from '@/hooks/useHttp';
import { useState, useEffect } from 'react';
import classes from './Search.module.scss';
import Card from '../UI/Card';
import Input from '../UI/Inputs/Input';
import Tag from '../UI/Buttons/Tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import formatTitleToUrl from '@/utils/formatTitleToUrl';
import LoadingSpinner from '../UI/Modals/LoadingSpinner';

const Search = props => {
  const [searchTitle, setSearchTitle] = useState('');
  const { sendFetchReq, isLoading, data, error } = useHttp();

  const articles = data && data.articles;
  const quantity = data && data.quantity;

  const searchTitleHandler = e => {
    let input = e.target.value.trim();
    setSearchTitle(input);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      let title = formatTitleToUrl(searchTitle);
      if (title) {
        sendFetchReq(`https://mindescape-cms.vercel.app/api/articles/article-title/${title}`);
      }
    }, 1500);

    //cleanup function to reset timer if user keeps typing in input (preventing too many requests being sent)
    return () => clearTimeout(timer);
  }, [searchTitle]);

  return (
    <Card className={classes.search}>
      <h3>Search</h3>
      <div className={classes['search__tags']}>
        <Link href="/articles/featured">
          <Tag name="Featured" />
        </Link>
      </div>
      <form>
        <Input
          attributes={{
            onChange: searchTitleHandler,
            type: 'text',
            placeholder: 'Search by title or phrase',
          }}
        />
      </form>
      <div className={classes['search__results']}>
        {data && <p>Results: {quantity}</p>}
        <ul>
          {articles &&
            articles.map(article => (
              <li key={article._id}>
                <Link href={`/articles/${formatTitleToUrl(article.title)}`}>
                  {article.title}
                  <span>
                    <FontAwesomeIcon icon={faArrowRightLong} />
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      {isLoading && (
        <div className={classes['loading-spinner']}>
          <LoadingSpinner />
        </div>
      )}
      {error && <p className={classes.error}>{error}</p>}
      <button onClick={props.onClick} className={classes['search__btn--close']}>
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </Card>
  );
};

export default Search;
