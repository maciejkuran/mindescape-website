import '@/styles/globals.scss';
import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>mindescape</title>
        <meta
          name="description"
          content="By Artists, for Artists. We support worldwide contemporary independent artists."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/images/favicon.png" />
      </Head>
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </>
  );
}
