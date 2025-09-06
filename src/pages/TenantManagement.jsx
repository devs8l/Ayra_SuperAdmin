import React from 'react'

const TenantManagement = () => {
  return (
    <div className='bg-white  p-6'>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Tenant Management</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-200 rounded-md h-20 p-4 flex items-center justify-center">
          Tenant Card 1
        </div>
        <div className="bg-gray-200 rounded-md h-20 p-4 flex items-center justify-center">
          Tenant Card 2
        </div>
        
      </div>
    </div>
  );
};

export default TenantManagement