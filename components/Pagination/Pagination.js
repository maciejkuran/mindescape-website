import classes from './Pagination.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ totalArticlesLength, maxItemsPerPage, currentPage, featured }) => {
  const pagesCount = Math.ceil(totalArticlesLength / maxItemsPerPage);

  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  const curPageIndex = currentPage - 1;

  //pages = e.g. [1,2,3,4];
  const renderedPaginationNumbs = () => {
    //If page no. 1 => render current & the next two
    if (currentPage === 1) return pages.slice(curPageIndex, 3);

    //If last page => render the current & prev. 2 pages
    if (currentPage === pagesCount) return pages.slice(pagesCount - 3);

    // Render previous, current and the next page
    return pages.slice(curPageIndex - 1, curPageIndex + 2);
  };

  const paginationNumbs = renderedPaginationNumbs();

  const prevLink = !featured
    ? `/articles?page=${currentPage - 1}&featured=false`
    : `/articles?page=${currentPage - 1}&featured=true`;
  const nextLink = !featured
    ? `/articles?page=${currentPage + 1}&featured=false`
    : `/articles?page=${currentPage + 1}&featured=true`;

  const numbLink = page => {
    if (!featured) return `/articles?page=${page}&featured=false`;

    return `/articles?page=${page}&featured=true`;
  };

  return (
    <div className={classes.pagination}>
      {currentPage !== 1 && (
        <Link href={prevLink}>
          <button className={classes['pagination__btn']}>
            <FontAwesomeIcon icon={faArrowLeftLong} /> Previous
          </button>
        </Link>
      )}
      <ul className={classes['pagination__list']}>
        {paginationNumbs.map(page => (
          <li
            key={page}
            className={
              page === currentPage
                ? classes['pagination__list__item--active']
                : classes['pagination__list__item--inactive']
            }
          >
            <Link href={numbLink(page)}>{page}</Link>
          </li>
        ))}
      </ul>
      {currentPage !== pagesCount && (
        <Link href={nextLink}>
          <button className={classes['pagination__btn']}>
            Next <FontAwesomeIcon icon={faArrowRightLong} />
          </button>
        </Link>
      )}
    </div>
  );
};
export default Pagination;
