import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classes from './index.module.scss';
import GridItem from '@/components/Post/GridItem';
import Error from '@/components/UI/Error';
import Pagination from '@/components/Pagination/Pagination';
import paginate from '@/utils/paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

const ArticlesPage = ({
  paginatedArticles,
  totalArticlesLength,
  maxItemsPerPage,
  currentPage,
  errCode,
  errMessage,
}) => {
  //Render error section if client or srv side error occured
  if (errCode && errMessage) {
    return (
      <section className={classes.articles}>
        <Error code={errCode} message={errMessage} />
      </section>
    );
  }

  //Render proper list with pre-fetched/pre-generated on the srv content
  return (
    <section className={classes.articles}>
      <h1>Browse All Articles</h1>

      <p className={classes['articles__page-nb']}>
        <FontAwesomeIcon icon={faArrowRightLong} /> Browsing Page {currentPage}
      </p>

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
        />
      }
    </section>
  );
};

export default ArticlesPage;

//I chose server side rendering due SEO reasons. I paginate all articles and I want all pages to be pre-generated on the server (based on query string 'page=number') before served so the search engine radar can get full source code.

export const getServerSideProps = async ctx => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  const data = await res.json();

  const currentPage = +ctx.query.page;
  const maxItemsPerPage = 4;
  const totalArticlesLength = data.articles && data.articles.length;

  const paginatedArticles = paginate(data.articles, currentPage, maxItemsPerPage);

  const errCode = res.ok ? false : res.status;
  const errMessage = data.message ? data.message : false;

  //Permanent redirection for /articles
  if (ctx.req.url === '/articles') {
    return {
      redirect: {
        destination: '/articles?page=1',
        permanent: true,
      },
    };
  }

  //throw 404 if no articles
  if (paginatedArticles && paginatedArticles.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      paginatedArticles: paginatedArticles ? paginatedArticles : null,
      totalArticlesLength: totalArticlesLength ? totalArticlesLength : null,
      maxItemsPerPage,
      currentPage,
      errCode,
      errMessage,
    },
  };
};
