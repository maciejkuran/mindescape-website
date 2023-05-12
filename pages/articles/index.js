import classes from './index.module.scss';
import GridItem from '@/components/Post/GridItem';
import Error from '@/components/UI/Error';

const ArticlesPage = ({ articles, errCode, errMessage }) => {
  if (errCode && errMessage) {
    return (
      <section className={classes.articles}>
        <Error code={errCode} message={errMessage} />
      </section>
    );
  }

  return (
    <section className={classes.articles}>
      <h1>Browse All Articles</h1>

      <ul className={classes['articles__list']}>
        {articles &&
          articles.map(article => (
            <li key={article._id}>
              <GridItem data={article} />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default ArticlesPage;

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  const data = await res.json();

  const errCode = res.ok ? false : res.status;
  const errMessage = data.message ? data.message : false;

  if (!data.articles && !errMessage) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      articles: data.articles ? data.articles : null,
      errCode,
      errMessage,
    },
    revalidate: 10,
  };
};
