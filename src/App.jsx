import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import TenantManagement from './pages/TenantManagement';
import AdminUsers from './pages/AdminUsers';
import TenantSignUp from './pages/TenantSignUp';



const App = () => {
  return (

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TenantManagement />} />
          <Route path="tenant-management" element={<TenantManagement />} />
          <Route path="admin-users" element={<AdminUsers />} />
          <Route path="tenant-signup" element={<TenantSignUp />} />
        </Route>
      </Routes>

  );
};
export default App;