import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Layout from '../components/layout';
import EmaleChosing from '../pages/emale-chosing';
import IntroduceYourself from '../pages/introduce-yourself';
import Finish from '../pages/finish';
import SelectQuestions from '../pages/select-questions';
import AddMusic from '../pages/add-music';

import { GeneralInfo } from '../pages/general-info';
import { Recorder } from '../pages/recorder';
import UploadAndEdit from '../pages/upload-and-edit';

export const routes = [
  {
    path: 'introduce-yourself',
    name: 'Introduce yourself',
  },
  {
    path: 'select-questions',
    name: 'Select questions',
  },
  {
    path: 'upload-and-edit',
    name: 'Upload and edit',
  },
  {
    path: 'add-music',
    name: 'Add music',
  },
  {
    path: 'ready',
    name: 'Ready',
  },
];
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='/introduce-yourself' />} />
          <Route path='introduce-yourself' element={<IntroduceYourself />} />
          <Route path='select-questions' element={<SelectQuestions />} />
          <Route path='upload-and-edit' element={<UploadAndEdit />} />
          <Route path='add-music' element={<AddMusic />} />
          <Route path='/ready' element={<Finish />} />
          {/*           <Route path='step-:id' element={<Step />} /> */}

          {/*           <Route path='upload' element={<VideoFragment />} />
          <Route path='recorder' element={<Recorder />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
