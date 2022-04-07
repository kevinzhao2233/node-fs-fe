import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import style from './Sidebar.module.scss';

function Sidebar() {
  const location = useLocation();

  return (
    <div>
      <div className={style.logoContainer}>
        <div className={style.logo} />
        <p className={style.appTit}>NODE FS</p>
      </div>
      <div className={style.menuBox}>
        <Link className={cn(style.menuItem, { [style.activeItem]: location.pathname === '/' })} to="/">上传文件</Link>
        <Link className={cn(style.menuItem, { [style.activeItem]: location.pathname === '/about' })} to="/about">虚无的 About</Link>
      </div>
    </div>
  );
}

export default Sidebar;
