import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import AdminUsers from './pages/AdminUsers';
import TenantSignUp from './pages/TenantSignUp';
import TenantDashboard from './pages/TenantDashboard';
import CreateTenant from './pages/CreateTenant';



const App = () => {
  
  return (

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TenantDashboard />} />
          <Route path="tenant-management" element={<TenantDashboard />} />
          <Route path="admin-users" element={<AdminUsers />} />
          <Route path="tenant-signup" element={<CreateTenant />} />
        </Route>
      </Routes>

  );
};
export default App;