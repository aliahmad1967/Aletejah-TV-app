import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Tv, Calendar, MoreHorizontal, LayoutGrid } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: Home, label: t('home'), path: '/' },
    { icon: Tv, label: t('live'), path: '/live' },
    { icon: Calendar, label: t('schedule'), path: '/schedule' },
    { icon: LayoutGrid, label: t('library'), path: '/library' },
    { icon: MoreHorizontal, label: t('more'), path: '/about' }, 
  ];

  // Don't show on news detail page for cleaner look
  if (location.pathname.includes('/news/')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 pb-2 z-50 max-w-md mx-auto transition-colors duration-300">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center space-y-1 w-16 ${
              isActive(item.path) ? 'text-accent' : 'text-muted'
            }`}
          >
            <item.icon size={24} strokeWidth={isActive(item.path) ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;