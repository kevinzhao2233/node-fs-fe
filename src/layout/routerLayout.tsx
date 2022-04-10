import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';

import Sidebar from '@/components/Sidebar/Sidebar';
import About from '@/views/About/About';
// import Home from '@/views/Home/Home';
import Upload from '@/views/Upload/Upload';

import style from './layout.module.scss';

function Router() {
  return (
    <BrowserRouter>
      <div className={style.container}>
        <div className={style.sidebar}>
          <Sidebar />
        </div>
        <div className={style.main}>
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="about" element={<About />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Router;
