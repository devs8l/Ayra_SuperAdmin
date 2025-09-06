import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, Users, Building2, FileText, UserPlus } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Building2, label: 'Tenant Management', path: '/tenant-management' },
    { icon: Users, label: 'Admin Users', path: '/admin-users' },
    { icon: FileText, label: 'Create Tenant', path: '/tenant-signup' },
    { icon: UserPlus, label: 'Audit Logs', path: '/audit-logs' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm cursor-pointer ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
export default Sidebar;