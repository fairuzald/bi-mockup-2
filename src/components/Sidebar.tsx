import {
  BarChart3,
  Files,
  FileText,
  LayoutDashboard,
  Users,
  Wallet,
} from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/metrics', label: 'Model Metrics', icon: BarChart3 },
  { path: '/transactions', label: 'Transactions', icon: Wallet },
  { path: '/accounts', label: 'Accounts', icon: Users },
  { path: '/cases', label: 'Case Management', icon: Files }, // Baru
  { path: '/reports', label: 'Reports', icon: FileText },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-light-card/50 dark:bg-dark-card/50 backdrop-blur-xl flex-shrink-0 flex flex-col border-r border-light-border/50 dark:border-dark-border/50">
      <div className="h-20 flex items-center gap-3 px-6">
        <img
          src="/logo.png"
          width={24}
          height={24}
          className="object-contain w-6 aspect-square"
        />
        <h1 className="text-xl font-bold bg-gradient-to-r from-brand-green to-brand-green-light bg-clip-text text-transparent">
          Green Intel Net
        </h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-brand-green/10 text-brand-green-light font-semibold'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
export default Sidebar;
