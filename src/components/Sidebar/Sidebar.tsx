import { Link, useLocation } from 'react-router-dom';

import style from './Sidebar.module.scss';

function Sidebar() {
  const location = useLocation();
  // TODO 将 active 加到 menuItem 上
  return (
    <div>
      <div className={style.appTit}>NODE FS</div>
      <div className={style.menuBox}>
        <Link className={style.menuItem} to="/">上传文件</Link>
        <Link className={style.menuItem} to="/about">虚无的 About</Link>
      </div>
    </div>
  );
}

export default Sidebar;
