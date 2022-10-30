import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import useRouter from '../../router/useRouter';
import styles from './layout.module.scss';
import Preloader from '../ui-elements/preloader';

function Layout() {
  const { routes } = useRouter();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleClick = (path: string) => [navigate(path)];
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumbs}>
        {routes.map(({ path, name }, index: number) => (
          <div className={styles['link-container']}>
            <div className={styles.line} />
            <p
              onClick={() => handleClick(path)}
              className={cn(styles.link, { [styles.active]: pathname.includes(path) })}
            >
              {name}
            </p>
            <div className={styles.line} />
            {/*     {index !== routes.length - 1 && <div className={styles.line} />} */}
          </div>
        ))}
      </div>
      <div className={styles.outlet}>
        <Outlet />
        <div className={styles.preloader}>
          <Preloader />
        </div>
      </div>
    </div>
  );
}

export default Layout;
