import React from 'react';
import BottomNav from './BottomNav';
import { useLanguage } from '../context/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { dir } = useLanguage();
  
  return (
    <div className="min-h-screen bg-primary text-main flex justify-center transition-colors duration-300" dir={dir}>
      <div className="w-full max-w-md bg-primary min-h-screen relative shadow-2xl overflow-hidden flex flex-col border-x border-gray-800/10">
        <div className="flex-1 pb-20 overflow-y-auto no-scrollbar">
          {children}
        </div>
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;