import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { routes } from '../../router/router';
import styles from './layout.module.scss';

function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log('location', pathname);
  const handleClick = (path: string) => [navigate(path)];
  return (
    <>
      <div className={styles.breadcrumbs}>
        {routes.map(({ path, name }, index: number) => (
          <>
            <p
              onClick={() => handleClick(path)}
              className={cn(styles.link, { [styles.active]: pathname.includes(path) })}
            >
              {name}
            </p>
            {index !== routes.length - 1 && <div className={styles.line} />}
          </>
        ))}
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
