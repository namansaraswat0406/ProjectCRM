import './App.css';
import AdminDashboard from './components/adminDashboard';
import SuperAdminDashboard from './components/dashboard';
import FormExample from './components/dashboard';
import BasicExample from './components/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BasicExample />} />
          <Route path="/dashboard/superadmin" element={<SuperAdminDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
    // <BasicExample></BasicExample>
    // <FormExample></FormExample>
  );
}

export default App;
