import classes from './index.module.scss';
import Newsletter from '@/components/Newsletter/Newsletter';
import GridItem from '@/components/Post/GridItem';
import Error from '@/components/UI/Error';
import NoItems from '@/components/UI/NoItems';
import Card from '@/components/UI/Card';
import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';
import Link from 'next/link';

export default function Home(props) {
  const { featuredArticles, errCode, errMessage } = props;

  if (errCode && errMessage) {
    return <Error message={errMessage} code={errCode} />;
  }

  return (
    <>
      <Newsletter homePage={true} />

      {!featuredArticles && <NoItems />}

      {featuredArticles && (
        <section className={classes.featured}>
          <ul className={classes['featured__listing']}>
            {featuredArticles.map((article, i) => (
              <li className={classes[`featured__listing__item--${i + 1}`]} key={article._id}>
                <GridItem data={article} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={classes['browse-all']}>
        <Card className={classes['browse-all__card']}>
          <h3>We value a good content.</h3>
          <p>Do you?</p>
          <div>
            <Link href="/articles">
              <PrimaryButton>Browse articles</PrimaryButton>
            </Link>
          </div>
        </Card>
      </section>
    </>
  );
}

export const getStaticProps = async context => {
  //get featured articles
  const res = await fetch('https://mindescape-cms.vercel.app/api/articles');
  const data = await res.json();
  const errCode = res.ok ? false : res.status;
  const errMessage = data.message ? data.message : false;

  //Get 3 featured articles
  const featuredArticles =
    data.articles && data.articles.filter(article => article.featured).slice(0, 3);

  return {
    props: {
      featuredArticles,
      errCode,
      errMessage,
    },
    revalidate: 10,
  };
};
