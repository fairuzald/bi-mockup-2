import { Bell, Moon, Sun } from 'lucide-react';
import React from 'react';
import { useTheme } from '../hooks/useTheme';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="fixed top-0 right-0 left-64 z-40 h-20 flex items-center justify-end px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-light-text_secondary dark:text-dark-text_secondary hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
        <div className="relative">
          <button className="p-2 rounded-full text-light-text_secondary dark:text-dark-text_secondary hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
        <div className="w-10 h-10 bg-gradient-to-br from-brand-green to-brand-green-light rounded-full"></div>
      </div>
    </header>
  );
};
export default Header;
