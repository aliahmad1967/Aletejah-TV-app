import React, { useState } from 'react';
import { PROGRAMS_EN, PROGRAMS_AR } from '../constants';
import { Search as SearchIcon, ArrowLeft, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageWithFallback from '../components/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const { t, language } = useLanguage();

  const programs = language === 'en' ? PROGRAMS_EN : PROGRAMS_AR;

  const filterKeys: {[key: string]: string} = {
    'All': 'filters.all',
    'News': 'filters.news',
    'Documentaries': 'filters.documentary',
    'Entertainment': 'filters.entertainment',
    'Sport': 'filters.sports'
  };
  const filters = ['All', 'News', 'Documentaries', 'Entertainment', 'Sport'];

  return (
    <>
      <div className="sticky top-0 z-40 bg-primary text-main p-4 flex items-center justify-between shadow-md transition-colors duration-300">
         <div className="flex items-center gap-3 w-full">
            <button onClick={() => navigate(-1)} className="p-1 hover:bg-gray-500/10 rounded-full">
                <ArrowLeft size={24} className="rtl:rotate-180" />
            </button>
            <span className="font-semibold text-lg flex-1 text-center ltr:pr-8 rtl:pl-8">{t('programsTitle')}</span>
            <div className="flex items-center gap-2">
                <Globe size={20} />
                <span className="text-xs uppercase">{language}</span>
            </div>
         </div>
      </div>

      <div className="p-4">
          {/* Search Bar */}
          <div className="relative mb-6">
              <SearchIcon className="absolute left-3 top-3.5 text-muted rtl:left-auto rtl:right-3" size={20} />
              <input 
                type="text" 
                placeholder={t('searchPlaceholder')}
                className="w-full bg-secondary rounded-xl py-3 pl-10 pr-4 rtl:pr-10 rtl:pl-4 text-main placeholder-muted focus:outline-none focus:ring-1 focus:ring-accent border border-gray-200 dark:border-transparent"
              />
          </div>

          {/* Filter Pills */}
           <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto no-scrollbar mb-6 pb-1">
            {filters.map(f => (
                <button 
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-xs font-medium border whitespace-nowrap transition-all ${
                        filter === f 
                        ? 'bg-accent border-accent text-white' 
                        : 'bg-secondary border-gray-200 dark:border-gray-700 text-muted'
                    }`}
                >
                    {t(filterKeys[f])}
                </button>
            ))}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 gap-4">
            {programs.map((prog) => (
                <div key={prog.id} className="bg-secondary rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                    <ImageWithFallback src={prog.image} className="w-full h-48 object-cover" />
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-main mb-1">{prog.title}</h3>
                        <div className="flex items-center justify-between text-muted text-sm">
                            <span>{prog.category}</span>
                            <span>{prog.time}</span>
                        </div>
                    </div>
                </div>
            ))}
            {/* Duplicating content to fill scroll */}
             {programs.map((prog) => (
                <div key={`${prog.id}-dup`} className="bg-secondary rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800">
                    <ImageWithFallback src={prog.image} className="w-full h-48 object-cover grayscale opacity-60" />
                    <div className="p-4">
                        <h3 className="text-lg font-bold text-main mb-1">{prog.title} ({t('rerun')})</h3>
                        <div className="flex items-center justify-between text-muted text-sm">
                            <span>{prog.category}</span>
                            <span>{prog.time}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Search;