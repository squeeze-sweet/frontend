import { HashRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Layout from '../components/layout';
import IntroduceYourself from '../pages/introduce-yourself';
import Finish from '../pages/finish';
import SelectQuestions from '../pages/select-questions';
import AddMusic from '../pages/add-music';
import useLang from '../hooks/useLang';
import UploadAndEdit from '../pages/upload-and-edit';
import { useStore } from '../store';
import HowItWorks from '../pages/how-it-works';
import AdminLogin from '../pages/admin-login';
import AdminControlls from '../pages/admin-controlls';

function Router() {
  const { tr, toggleLang } = useLang();

  const { email, password } = useStore(({ email, password }) => ({
    email,
    password,
  }));

  const isAdmin = () => {
    if (email && password) return true;
  };

  const questionsAndCategories = useStore(state => state.questionsAndCategories);
  const isCategoriesAndQuestions = () => {
    if (questionsAndCategories) return true;
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
    if (filenames.length > 1) return true;
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
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Navigate to='introduce-yourself' />} />
          <Route path='introduce-yourself' element={<IntroduceYourself />} />
          <Route path='how-it-works' element={<HowItWorks />} />
          <Route
            path='select-questions'
            element={
              isCategoriesAndQuestions() && isUserInfo() ? <SelectQuestions /> : <Navigate to='/' />
            }
          />
          <Route
            path='upload-and-edit'
            element={
              isCategoriesAndQuestions() && isUserInfo() && isFilenamesChosen() ? (
                <UploadAndEdit />
              ) : (
                <Navigate to='/select-questions' />
              )
            }
          />
          <Route
            path='add-music'
            element={
              isCategoriesAndQuestions() && isUserInfo() && isStepsData() && isFilenamesChosen() ? (
                <AddMusic />
              ) : (
                <Navigate to='/select-questions' />
              )
            }
          />
          <Route
            path='/ready'
            element={
              isCategoriesAndQuestions() && isUserInfo() && isStepsData() && isFilenamesChosen() ? (
                <Finish />
              ) : (
                <Navigate to='/upload-and-edit' />
              )
            }
          />
        </Route>
        <Route path='/admin' element={<AdminLogin />} />
        <Route
          path='/controls'
          element={isAdmin() ? <AdminControlls /> : <Navigate to='/admin' />}
        />
      </Routes>
    </HashRouter>
  );
}

export default Router;
