import React from 'react';
import Header from '../components/Header';
import BreakingNews from '../components/BreakingNews';
import { NEWS_ITEMS_EN, NEWS_ITEMS_AR, PROGRAMS_EN, PROGRAMS_AR } from '../constants';
import { Play, Settings, Maximize2, RotateCcw, RotateCw, Radio, Tv, Newspaper, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageWithFallback from '../components/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const newsItems = language === 'en' ? NEWS_ITEMS_EN : NEWS_ITEMS_AR;
  const programs = language === 'en' ? PROGRAMS_EN : PROGRAMS_AR;

  const quickLinks = [
    { icon: Radio, label: t('quickLinks.live'), color: 'bg-yellow-500', path: '/live' },
    { icon: Tv, label: t('quickLinks.programs'), color: 'bg-yellow-600', path: '/search' },
    { icon: Newspaper, label: t('quickLinks.news'), color: 'bg-yellow-600', path: '/library' },
    { icon: Calendar, label: t('quickLinks.schedule'), color: 'bg-yellow-600', path: '/schedule' },
  ];

  const breakingNewsText = language === 'en' 
             ? 'Breaking: Global Summit reaches landmark agreement on climate change action...  •  Local markets see uptake in trading volume...' 
             : 'خبر عاجل: القمة العالمية تتوصل إلى اتفاق تاريخي بشأن العمل المناخي... • الأسواق المحلية تشهد ارتفاعاً في حجم التداول...';

  return (
    <>
      <Header />
      <BreakingNews text={breakingNewsText} />
      
      {/* Live Player Section */}
      <div className="relative w-full aspect-video bg-black group">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1596627829657-f448989603a0?auto=format&fit=crop&q=80&w=1000" 
          alt="Live Broadcast" 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition duration-500"
        />
        
        <div className="absolute top-3 left-3 bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center animate-pulse text-white z-10 rtl:left-auto rtl:right-3 shadow-md">
            <div className="w-1.5 h-1.5 bg-white rounded-full ltr:mr-1 rtl:ml-1 animate-ping absolute inline-flex opacity-75"></div>
            <div className="w-1.5 h-1.5 bg-white rounded-full ltr:mr-1 rtl:ml-1 relative inline-flex"></div>
            {t('liveNow')}
        </div>
        
        {/* Player Controls Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
             <div className="flex items-center gap-8">
                <button className="text-white/80 hover:text-white hover:scale-110 transition"><RotateCcw size={24} /> <span className="text-[10px] block text-center">10</span></button>
                <button 
                    onClick={() => navigate('/live')}
                    className="w-16 h-16 bg-accent/90 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-accent transition transform hover:scale-110 shadow-xl ring-4 ring-white/10"
                >
                    <Play size={32} fill="currentColor" className="ltr:ml-1 rtl:mr-1" />
                </button>
                <button className="text-white/80 hover:text-white hover:scale-110 transition"><RotateCw size={24} /> <span className="text-[10px] block text-center">10</span></button>
             </div>
        </div>

        {/* Bottom Bar Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-3 flex justify-between items-center">
             <div className="flex items-center gap-3 text-white">
                 <button><Play size={18} fill="currentColor" className="rtl:rotate-180" /></button>
                 <div className="h-1 w-24 bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-red-600"></div>
                 </div>
             </div>
             <div className="flex items-center gap-3 text-white">
                 <button><Settings size={18} /></button>
                 <button><Maximize2 size={18} /></button>
             </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 dark:border-gray-800/50">
        {quickLinks.map((link, idx) => (
            <div key={idx} className="flex flex-col items-center cursor-pointer group" onClick={() => navigate(link.path)}>
                <div className={`w-14 h-14 rounded-2xl ${idx === 0 ? 'bg-gold text-primary-foreground' : 'bg-secondary border border-gray-200 dark:border-gray-700 text-gold'} flex items-center justify-center mb-2 transition-transform group-hover:scale-105 shadow-lg`}>
                    <link.icon size={24} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-medium text-muted group-hover:text-main transition-colors">{link.label}</span>
            </div>
        ))}
      </div>

      {/* News Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4 border-l-4 border-gold pl-3 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-3">
            <h2 className="text-lg font-bold text-main w-full uppercase tracking-tight">{t('latestNews')}</h2>
        </div>
        
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
            {newsItems.map((item) => (
                <div key={item.id} className="min-w-[280px] bg-secondary rounded-xl overflow-hidden shadow-sm cursor-pointer border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition" onClick={() => navigate(`/news/${item.id}`)}>
                    <div className="h-36 overflow-hidden relative">
                         <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
                         <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-white border border-white/10 rtl:right-auto rtl:left-2">{item.category}</div>
                    </div>
                    <div className="p-3">
                        <h3 className="text-sm font-bold mb-2 line-clamp-2 h-10 text-main">{item.title}</h3>
                        <div className="flex justify-between items-center text-[10px] text-muted">
                             <span>{item.timeAgo}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Programs Section */}
      <div className="p-4 pt-0">
        <div className="flex justify-between items-center mb-4 border-l-4 border-gold pl-3 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-3">
            <h2 className="text-lg font-bold text-main w-full uppercase tracking-tight">{t('featuredPrograms')}</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
            {programs.slice(0, 2).map((prog) => (
                <div key={prog.id} className="bg-secondary rounded-xl overflow-hidden shadow-sm relative group border border-gray-200 dark:border-gray-800">
                    <ImageWithFallback src={prog.image} alt={prog.title} className="w-full h-32 object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-3">
                         <span className="text-gold text-[10px] font-bold mb-0.5 uppercase tracking-wider">{prog.category}</span>
                         <h3 className="text-xs font-bold text-white leading-tight">{prog.title}</h3>
                    </div>
                    {prog.isLive && (
                         <div className="absolute top-2 left-2 w-2 h-2 bg-red-600 rounded-full animate-pulse rtl:left-auto rtl:right-2 ring-2 ring-red-900"></div>
                    )}
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;