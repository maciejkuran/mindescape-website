import classes from './LayoutWrapper.module.scss';
import Navbar from './Navbar';
import Footer from './Footer';

const LayoutWrapper = props => {
  return (
    <>
      <Navbar />
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </>
  );
};

export default LayoutWrapper;
