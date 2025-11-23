import React, { useState } from 'react';
import Header from '../components/Header';
import { SCHEDULE_ITEMS_EN, SCHEDULE_ITEMS_AR } from '../constants';
import ImageWithFallback from '../components/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

const Schedule: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  
  const scheduleItems = language === 'en' ? SCHEDULE_ITEMS_EN : SCHEDULE_ITEMS_AR;

  const filterKeys: {[key: string]: string} = {
      'All': 'filters.all',
      'News': 'filters.news',
      'Documentary': 'filters.documentary',
      'Sports': 'filters.sports'
  };

  const filters = ['All', 'News', 'Documentary', 'Sports'];
  
  const days = [
      { day: t('today'), date: 'Oct 26', active: true },
      { day: language === 'en' ? 'Sun' : 'أحد', date: 'Oct 27', active: false },
      { day: language === 'en' ? 'Mon' : 'إثنين', date: 'Oct 28', active: false },
  ]

  const getLocalizedFilterName = (key: string) => t(filterKeys[key]);

  const currentFilteredSchedule = activeFilter === 'All'
    ? scheduleItems
    : scheduleItems.filter(item => item.category === getLocalizedFilterName(activeFilter));

  return (
    <>
      <Header />
      <div className="p-4">
        {/* Date Selector */}
        <div className="flex space-x-3 rtl:space-x-reverse overflow-x-auto no-scrollbar mb-6">
            {days.map((d, i) => (
                <button key={i} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${d.active ? 'bg-main text-inverted' : 'text-muted hover:text-main'}`}>
                    {d.day}, {d.date}
                </button>
            ))}
        </div>

        {/* Filter Pills */}
        <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto no-scrollbar mb-6">
            {filters.map(filterKey => (
                <button 
                    key={filterKey}
                    onClick={() => setActiveFilter(filterKey)}
                    className={`px-5 py-2 rounded-full text-sm border transition-all whitespace-nowrap ${
                        activeFilter === filterKey 
                        ? 'bg-accent border-accent text-white' 
                        : 'bg-transparent border-gray-200 dark:border-gray-700 text-muted hover:border-gray-400'
                    }`}
                >
                    {t(filterKeys[filterKey])}
                </button>
            ))}
        </div>

        {/* Featured/Current Card */}
        {scheduleItems.length > 0 && (
        <div className="mb-6">
             <div className="bg-accent rounded-2xl p-4 relative overflow-hidden">
                 <div className="flex justify-between items-start mb-3 relative z-10">
                     <span className="text-white/90 text-sm font-medium">18:00 - 19:00</span>
                     <span className="bg-white text-accent text-[10px] px-2 py-1 rounded font-bold">{t('now')}</span>
                 </div>
                 <div className="flex gap-4 relative z-10">
                     <ImageWithFallback src={scheduleItems[0].image} className="w-16 h-16 rounded-lg object-cover border-2 border-white/20" />
                     <div>
                         <h3 className="text-xl font-bold text-white mb-1">{scheduleItems[0].title}</h3>
                         <span className="text-orange-100 text-xs mb-2 block">{scheduleItems[0].category}</span>
                         <p className="text-white/80 text-xs leading-relaxed line-clamp-2">
                             {scheduleItems[0].description}
                         </p>
                     </div>
                 </div>
                 {/* Decorative background circle */}
                 <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl rtl:right-auto rtl:-left-10"></div>
             </div>
        </div>
        )}

        {/* Schedule List */}
        <div className="space-y-4">
            {currentFilteredSchedule.slice(1).map((item) => (
                <div key={item.id} className="bg-secondary rounded-xl p-4 flex items-center gap-4 border border-gray-200 dark:border-gray-800 shadow-sm">
                     <div className="text-muted text-xs font-medium w-16 text-center flex flex-col">
                         <span className="text-main text-sm font-bold">{item.startTime}</span>
                         <span>- {item.endTime}</span>
                     </div>
                     <div className="h-10 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
                     <div className="flex-1">
                         <h4 className="font-bold text-main mb-1">{item.title}</h4>
                         <div className="flex items-center gap-2 text-xs text-muted">
                            <span>{item.category}</span>
                            <span>•</span>
                            <span>15 {t('duration')}</span>
                         </div>
                         <p className="text-muted text-xs mt-1 line-clamp-1">{item.description}</p>
                     </div>
                     <ImageWithFallback src={item.image} className="w-16 h-12 rounded-md object-cover" />
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Schedule;