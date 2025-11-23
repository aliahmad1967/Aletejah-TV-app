import React, { useState, useEffect } from 'react';
import { Search, Globe, Moon, Sun, ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBack }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      day: 'numeric',
      month: 'short'
  });
  
  const formattedTime = currentTime.toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
  });

  // Determine header content based on context
  if (showBack) {
    return (
      <div className="sticky top-0 z-40 bg-primary text-main p-4 flex items-center justify-between shadow-md border-b border-gray-800/10 transition-colors duration-300">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-500/10 rounded-full">
                <ArrowLeft size={24} className="rtl:rotate-180" />
            </button>
         </div>
         <div className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-lg w-full text-center pointer-events-none">
             <span className="pointer-events-auto">{title}</span>
         </div>
         <div className="flex items-center gap-2">
            <button onClick={toggleLanguage} className="text-xs font-medium text-muted uppercase hover:text-main">
                {language}
            </button>
         </div>
      </div>
    )
  }

  return (
    <div className="sticky top-0 z-40 bg-primary text-main px-4 py-3 flex items-center justify-between shadow-sm border-b border-gray-800/10 transition-colors duration-300">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
         {/* Logo Construction */}
         <div className="flex flex-col items-start rtl:items-end">
             <div className="flex items-center gap-1">
                <div className="relative w-8 h-8 bg-secondary flex items-center justify-center rounded-sm overflow-hidden border border-gray-200 dark:border-gray-700">
                     <div className="absolute inset-0 bg-primary m-[2px] dark:bg-primary"></div>
                     <ArrowUpRight size={24} className="text-main relative z-10 transform rtl:-scale-x-100" strokeWidth={3} />
                     <div className="absolute bottom-0 right-0 w-3 h-3 bg-gold"></div>
                </div>
                <div className="flex flex-col leading-none">
                    <h1 className="text-2xl font-black tracking-tighter text-main italic" style={{fontFamily: 'Arial, sans-serif'}}>
                        ALETEJAH
                    </h1>
                </div>
             </div>
             <span className="text-[10px] text-gold font-medium mt-0.5 ltr:ml-1 rtl:mr-1 tracking-wide opacity-90">
                 للحقيقة اتجاه واحد
             </span>
         </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Time Display */}
        <div className="hidden sm:flex flex-col items-end text-[10px] font-medium text-muted leading-tight">
            <span>{formattedDate}</span>
            <span>{formattedTime}</span>
        </div>

        {/* Theme Toggle */}
        <button 
            onClick={toggleTheme} 
            className="p-2 text-muted hover:text-gold hover:bg-gray-500/10 rounded-full transition"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div 
          className="flex items-center bg-secondary border border-gray-200 dark:border-gray-700 px-2 py-1 rounded-md gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition" 
          onClick={toggleLanguage}
        >
            <span className={`text-xs font-bold ${language === 'ar' ? 'text-gold' : 'text-muted'}`}>AR</span>
            <div className="h-3 w-[1px] bg-gray-300 dark:bg-gray-600"></div>
            <span className={`text-xs font-bold ${language === 'en' ? 'text-gold' : 'text-muted'}`}>EN</span>
        </div>
        
        {location.pathname === '/' && (
             <button className="p-2 text-muted hover:text-gold hover:bg-gray-500/10 rounded-full transition" onClick={() => navigate('/search')}>
                <Search size={20} />
             </button>
        )}

      </div>
    </div>
  );
};

export default Header;