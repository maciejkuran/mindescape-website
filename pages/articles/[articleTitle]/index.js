import classes from './index.module.scss';
import formatUrlToTitle from '@/utils/formatUrlToTitle';
import formatTitleToUrl from '@/utils/formatTitleToUrl';
import Image from 'next/image';
import shortDate from '@/utils/shortDate';
import parse from 'html-react-parser';
import Card from '@/components/UI/Card';
import Form from '../../../components/Form/Form';
import CommentsList from '@/components/Comments/CommentsList';
import PrimaryButton from '@/components/UI/Buttons/PrimaryButton';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter/Newsletter';
import Error from '@/components/UI/Error';

const ArticlePage = ({ article, errCode, errMessage }) => {
  //TODO: Handle POST comment request
  //............................

  if (errCode && errMessage) {
    return <Error message={errMessage} code={errCode} />;
  }
  return (
    <>
      <header className={classes.header}>
        <Image
          className={classes['header__main-img']}
          src={article.mainImage}
          height={600}
          width={1100}
          alt={article.title}
        />
        <div className={classes['header__meta']}>
          <h1>{article.title}</h1>
          <div className={classes['header__meta__data']}>
            <Image
              src={article.authorImage}
              height={100}
              width={100}
              alt={`${article.authorName} ${article.authorLastName}`}
            />
            <div className={classes['header__meta__data--author']}>
              <p>{`${article.authorName} ${article.authorLastName}`}</p>
              <p>Published: {shortDate(article.creationDate)}</p>
            </div>
          </div>
        </div>
      </header>

      <article className={classes.article}>
        <section className={classes['article__excerpt']}>
          <Card className={classes['article__excerpt__card']}>
            <p>{article.excerpt}</p>
          </Card>
        </section>

        <section className={classes['article__body']}>{parse(article.body)}</section>
      </article>

      <section className={classes['comment-form']}>
        <Form comments={false} heading="Leave a comment" textarea="Share your thoughts..." />
      </section>

      <section className={classes['comments-list']}>
        <CommentsList
          quantity={article.comments ? article.comments.length : 0}
          comments={article.comments}
        />
        <div className={classes['comments-list__btn--back']}>
          <Link href="/articles">
            <PrimaryButton>Back to articles</PrimaryButton>
          </Link>
        </div>
      </section>

      <section className={classes.newsletter}>
        <Newsletter homePage={false} />
      </section>
    </>
  );
};

export default ArticlePage;

const getArticleData = async title => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/article-title/${title}`);
  const data = await res.json();
  const errCode = res.ok ? false : res.status;
  const errMessage = data.message ? data.message : false;

  return { articles: data.articles, errCode, errMessage };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  const data = await res.json();

  //Get titles as URLs
  const titlesAsUrls =
    data.articles &&
    data.articles.map(article => {
      return {
        params: { articleTitle: formatTitleToUrl(article.title) },
      };
    });

  return {
    fallback: 'blocking',
    paths: titlesAsUrls ? titlesAsUrls : [],
  };
};

export const getStaticProps = async context => {
  const title = context.params.articleTitle;

  const data = await getArticleData(title);
  const { articles, errCode, errMessage } = data;

  //articles === array of different articles (as API returns with REGEX). I want specific article that matches URL.

  const article =
    articles && articles.find(article => article.title.toLowerCase() === formatUrlToTitle(title));

  if (!article && !errMessage) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article: article ? article : null,
      errCode,
      errMessage,
    },
  };
};
