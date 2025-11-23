import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface BreakingNewsProps {
  text: string;
}

const BreakingNews: React.FC<BreakingNewsProps> = ({ text }) => {
  const { t, dir } = useLanguage();

  return (
    <div className="bg-red-600 text-white flex items-stretch overflow-hidden shadow-md border-b border-red-800 relative z-20 h-10">
      <div className="bg-red-700 px-3 py-2 flex items-center justify-center z-10 shadow-[4px_0_10px_rgba(0,0,0,0.3)] rtl:shadow-[-4px_0_10px_rgba(0,0,0,0.3)] relative h-full">
        <span className="font-black uppercase text-[10px] tracking-wider whitespace-nowrap animate-pulse">
            {t('breakingNews')}
        </span>
        {/* Diagonal cut effect */}
        <div className="absolute top-0 -right-4 w-0 h-0 border-t-[40px] border-t-red-700 border-r-[16px] border-r-transparent rtl:right-auto rtl:-left-4 rtl:border-r-0 rtl:border-l-[16px] rtl:border-l-transparent rtl:border-t-red-700"></div>
      </div>
      
      <div className="flex-1 flex items-center overflow-hidden relative">
        <div className={`whitespace-nowrap inline-block absolute top-1/2 -translate-y-1/2 ${dir === 'rtl' ? 'animate-marquee-rtl' : 'animate-marquee'}`}>
          <span className="mx-8 font-medium text-sm">{text}</span>
          <span className="mx-8 font-medium text-sm opacity-50">•</span>
          <span className="mx-8 font-medium text-sm">{text}</span>
          <span className="mx-8 font-medium text-sm opacity-50">•</span>
          <span className="mx-8 font-medium text-sm">{text}</span>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;