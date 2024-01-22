import './App.css';
import AdminDashboard from './components/adminDashboard';
import SuperAdminDashboard from './components/dashboard';
import FormExample from './components/dashboard';
import Details from './components/detailPage';
import BasicExample from './components/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/signUp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasicExample />} />
          <Route path="/dashboard/superadmin" element={<SuperAdminDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
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
