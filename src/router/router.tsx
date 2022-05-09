import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useStore } from '../store';
import Layout from '../components/layout';
import Step1 from '../pages/step-1';
import Step2 from '../pages/step-2';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Step1 />} />
          <Route path='/step-2' element={<Step2 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
