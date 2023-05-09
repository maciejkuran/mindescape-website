import { useEffect, useState } from 'react';
import usePrevious from '@/hooks/usePrevious';
import classes from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Overlay from '../Modals/Overlay';
import Search from '../Search/Search';

const Navbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const prevScrollPosition = usePrevious(scrollPosition);
  const [activeNav, setActiveNav] = useState(false);

  const scrollHandler = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollPosition]);

  const setNavClassName = () => {
    if (scrollPosition < 200) return classes['navbar__container--active'];

    if (scrollPosition > prevScrollPosition) return classes['navbar__container--inactive'];
  };

  const showNavHandler = () => {
    setActiveNav(true);
  };

  const hideNavHandler = () => {
    setActiveNav(false);
  };

  return (
    <>
      <header className={classes.navbar}>
        <div className={`${classes['navbar__container']} ${setNavClassName()}`}>
          <Link className={classes['navbar__logo']} href="/">
            <h5>mindescape</h5>
          </Link>
          <div>
            <button title="search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <button onClick={showNavHandler} title="navigation">
              <FontAwesomeIcon icon={faBars} />
            </button>
          </div>
        </div>

        <nav className={`${classes['nav-list']} ${!activeNav && classes['nav-list--inactive']}`}>
          <ul>
            <li>
              <Link href="/articles">Articles</Link>
            </li>
            <li>
              <Link href="about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
          <button onClick={hideNavHandler} className={classes['nav-list__btn--close']}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </nav>
        {activeNav && <Overlay onClick={hideNavHandler} />}
      </header>
      <Search />
    </>
  );
};

export default Navbar;
