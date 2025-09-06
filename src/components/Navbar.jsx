import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center w-20">
        <img src="/Ayra.svg" alt="Ayra Logo" className="w-full h-full" />
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2">
        <span>+</span>
        <span>Create Tenant</span>
      </button>
    </nav>
  );
};

export default Navbar;