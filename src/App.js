import './App.css';
import AdminDashboard from './components/adminDashboard';

import Details from './components/detailPage';
import BasicExample from './components/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/signUp';
import FormComponent from './components/adminDashboard';
import Dashboard from './components/dashboard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasicExample />} />
          <Route path="/dashboard/superadmin" element={<Dashboard />} />
          <Route path="/dashboard/admin" element={<FormComponent />} />
          <Route path="/dashboard/user" element={<AdminDashboard />} />
          <Route path="/dashboard/admin/detail" element={<Details />} />
          <Route path="/signup" element={<SignUp />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
    // <BasicExample></BasicExample>
    // <FormExample></FormExample>
  );
}

export default App;
