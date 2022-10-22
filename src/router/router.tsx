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
import { useStore } from '../store';
import HowItWorks from '../pages/how-it-works';
import AdminLogin from '../pages/admin-login';
import AdminControlls from '../pages/admin-controlls';

export const routes = [
  {
    path: 'introduce-yourself',
    name: 'Introduce yourself',
  },
  {
    path: 'how-it-works',
    name: 'How it works',
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
  const email = useStore(state => state.email);
  const isEmail = () => {
    if (email) return true;
  };

  const userInfo = useStore(state => state.userInfo);
  const isUserInfo = () => {
    if (userInfo.firstName && userInfo.lastName && userInfo.jobTitle) return true;
  };

  const { filenames, stepsData } = useStore(state => ({
    filenames: state.filenames,
    stepsData: state.stepsData,
    currentFragmentName: state.currentFragmentName,
    setCurrentFragmentName: state.setCurrentFragmentName,
    switchCurrentStep: state.switchCurrentStep,
  }));

  const isFilenamesChosen = () => {
    if (filenames.length) return true;
  };

  const isStepsData = () => {
    let isValid = true;
    filenames.forEach((filename: string) => {
      if (
        !(
          Boolean(stepsData[filename].fragmentData) &&
          Boolean(stepsData[filename].fragmentFinishTime) &&
          Boolean(stepsData[filename].videoPreviewSrc)
        )
      ) {
        isValid = false;
      }
    });
    return isValid;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='introduce-yourself' />} />
          <Route path='introduce-yourself' element={<IntroduceYourself />} />
          <Route path='how-it-works' element={<HowItWorks />} />
          <Route
            path='select-questions'
            element={isEmail() && isUserInfo() ? <SelectQuestions /> : <Navigate to='/' />}
          />
          <Route
            path='upload-and-edit'
            element={
              isEmail() && isUserInfo() && isFilenamesChosen() ? (
                <UploadAndEdit />
              ) : (
                <Navigate to='/select-questions' />
              )
            }
          />
          <Route
            path='add-music'
            element={isEmail() && isUserInfo() ? <AddMusic /> : <Navigate to='/select-questions' />}
          />
          <Route
            path='/ready'
            element={
              isEmail() && isUserInfo() && isStepsData() ? (
                <Finish />
              ) : (
                <Navigate to='/upload-and-edit' />
              )
            }
          />
          {/*           <Route path='step-:id' element={<Step />} /> */}

          {/*           <Route path='upload' element={<VideoFragment />} />
          <Route path='recorder' element={<Recorder />} /> */}
        </Route>
        <Route path='/admin' element={<AdminLogin />} />
        <Route path='/controls' element={<AdminControlls />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
