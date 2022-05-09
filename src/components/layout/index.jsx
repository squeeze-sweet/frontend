import { Outlet } from 'react-router-dom';
import Header from '../header';
import styles from './layout.module.scss';

function Layout() {
  return (
    <>
      <Header />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
