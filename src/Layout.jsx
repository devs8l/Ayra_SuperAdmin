import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-full w-full flex flex-col rounded-2xl overflow-hidden justify-center">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main 
          className={`flex-1 bg-white p-2 overflow-auto transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'ml-0' : 'ml-0'
          }`}
          style={{
            marginLeft: sidebarOpen ? '0px' : '0px' // Let sidebar handle its own width
          }}
        >
          <Outlet />
        </main>
      </div>  
    </div>
  );
};

export default Layout;