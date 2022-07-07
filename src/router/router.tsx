import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Layout from '../components/layout';
import EmaleChosing from '../pages/emale-chosing';
import Finish from '../pages/finish';
import FilenamesSetting from '../pages/filenames-setting';
import Step from '../pages/step';
import { GeneralInfo } from '../pages/general-info';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<EmaleChosing />} />
          <Route path='general-info' element={<GeneralInfo />} />
          <Route path='/filenames-setting' element={<FilenamesSetting />} />
          <Route path='step-:id' element={<Step />} />
          <Route path='/finish' element={<Finish />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
