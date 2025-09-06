import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';



const Layout = () => {
  return (
    <div className="h-full w-full flex flex-col rounded-md overflow-hidden  justify-center">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-white  overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;