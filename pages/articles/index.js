import classes from './index.module.scss';
import GridItem from '@/components/Post/GridItem';
import Error from '@/components/UI/Error';
import Pagination from '@/components/Pagination/Pagination';
import paginate from '@/utils/paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import MetaData from '@/components/MetaData/MetaData';

const ArticlesPage = ({
  paginatedArticles,
  totalArticlesLength,
  maxItemsPerPage,
  currentPage,
  errCode,
  errMessage,
  featured,
}) => {
  const meta = !featured ? (
    <MetaData
      title="All Articles - mindescape"
      description="Browse all amazing and valuable mindescape articles."
    />
  ) : (
    <MetaData
      title="Featured Articles - mindescape"
      description="Browse featured articles, the best of the best articles selected by mindescape editorial team."
    />
  );

  //Render error section if client or srv side error occured
  if (errCode && errMessage) {
    return (
      <>
        {meta}
        <section className={classes.articles}>
          <Error code={errCode} message={errMessage} />
        </section>
      </>
    );
  }

  const renderHeading = () => {
    if (!featured && currentPage === 1) return <h1>All Articles</h1>;
    if (!featured && currentPage !== 1) return <h1>All Articles: page {currentPage}</h1>;

    if (featured && currentPage === 1) return <h1>Featured Articles</h1>;

    if (featured && currentPage !== 1) return <h1>Featured Articles: page {currentPage}</h1>;
  };

  //Render proper list with pre-fetched/pre-generated on the srv content
  return (
    <>
      {meta}
      <section className={classes.articles}>
        {renderHeading()}

        {currentPage == 1 && (
          <p className={classes['articles__page-nb']}>
            <FontAwesomeIcon icon={faArrowRightLong} /> Browsing Page {currentPage}
          </p>
        )}

        <ul className={classes['articles__list']}>
          {paginatedArticles.map(article => (
            <li key={article._id}>
              <GridItem data={article} />
            </li>
          ))}
        </ul>
        {
          <Pagination
            totalArticlesLength={totalArticlesLength}
            currentPage={currentPage}
            maxItemsPerPage={maxItemsPerPage}
            featured={featured}
          />
        }
      </section>
    </>
  );
};

export default ArticlesPage;

//I chose server side rendering due dynamic query strings & SEO reasons. I paginate all articles and I want all pages to be pre-generated on the server (based on query string 'page=number' & featured=true or false) before served so the search engine radar can get full source code.

export const getServerSideProps = async ctx => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  const data = await res.json();

  const currentPage = +ctx.query.page;
  const featuredQuery = ctx.query.featured;
  const maxItemsPerPage = 4;

  const totalArticlesLength = data.articles && data.articles.length;

  const featuredArticles = data.articles && data.articles.filter(article => article.featured);
  const totalFeaturedArticlesLength = featuredArticles && featuredArticles.length;

  // => paginating all articles
  const paginatedArticles = paginate(data.articles, currentPage, maxItemsPerPage);

  // => paginating featured articles
  const paginatedFeaturedArticles = paginate(featuredArticles, currentPage, maxItemsPerPage);

  const errCode = res.ok ? false : res.status;
  const errMessage = data.message ? data.message : false;

  //Permanent redirection
  if (ctx.req.url === '/articles' || !featuredQuery || !currentPage) {
    return {
      redirect: {
        destination: '/articles?page=1&featured=false',
        permanent: true,
      },
    };
  }

  //throw 404 if no articles
  if (paginatedArticles && featuredQuery === 'false' && paginatedArticles.length === 0) {
    return {
      notFound: true,
    };
  }

  if (
    paginatedFeaturedArticles &&
    featuredQuery === 'true' &&
    paginatedFeaturedArticles.length === 0
  ) {
    return {
      notFound: true,
    };
  }

  //If query string is 'featured=true' => return featured articles
  if (featuredQuery === 'true') {
    return {
      props: {
        paginatedArticles: paginatedFeaturedArticles ? paginatedFeaturedArticles : null,
        totalArticlesLength: totalFeaturedArticlesLength ? totalFeaturedArticlesLength : null,
        maxItemsPerPage,
        currentPage,
        errCode,
        errMessage,
        featured: true,
      },
    };
  }

  //If 'featured=false' return all articles
  return {
    props: {
      paginatedArticles: paginatedArticles ? paginatedArticles : null,
      totalArticlesLength: totalArticlesLength ? totalArticlesLength : null,
      maxItemsPerPage,
      currentPage,
      errCode,
      errMessage,
      featured: false,
    },
  };
};
