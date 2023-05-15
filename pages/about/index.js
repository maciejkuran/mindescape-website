import classes from './index.module.scss';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <>
      <header className={classes.header}>
        <div>
          <h1>We Promote Talents.</h1>
          <p>
            Mindescape promotes artists and allows them to stay recognized. We appreciate the beauty
            of art in any form.
          </p>
        </div>

        <div className={classes['header__img']}>
          <Image alt="about mindescape" width={900} height={500} src="/images/about-1.jpg" />
        </div>
      </header>

      <section className={classes.section}>
        <div className={classes['section__text']}>
          <h2>Excepteur sint occaecat</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div>
        <div className={classes['section__img']}>
          <Image alt="about mindescape" width={900} height={500} src="/images/about-2.jpg" />
        </div>
      </section>

      <section className={classes.section}>
        <div className={classes['section__text']}>
          <h3>Duis aute irure</h3>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
