import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import style from './Sidebar.module.scss';

function Sidebar() {
  const location = useLocation();

  return (
    <div>
      <div className={style.logo_container}>
        <div className={style.logo} />
        <p className={style.app_tit}>NODE FS</p>
      </div>
      <div className={style.menu_box}>
        <Link className={cn(style.menu_item, { [style.active_item]: location.pathname === '/' })} to="/">上传文件</Link>
        <Link className={cn(style.menu_item, { [style.active_item]: location.pathname === '/about' })} to="/about">虚无的 About</Link>
      </div>
    </div>
  );
}

export default Sidebar;
