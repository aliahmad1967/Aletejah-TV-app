import React from 'react';
import Header from '../components/Header';
import { VIDEO_LIBRARY_EN, VIDEO_LIBRARY_AR } from '../constants';
import { Play } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

const Library: React.FC = () => {
  const { t, language } = useLanguage();
  const videoLibrary = language === 'en' ? VIDEO_LIBRARY_EN : VIDEO_LIBRARY_AR;

  return (
    <>
      <Header title={t('videoLibrary')} />
      <div className="p-4 pt-6">
         <h1 className="text-2xl font-bold mb-2 text-main">{t('videoLibrary')}</h1>
         <h2 className="text-muted text-lg mb-6">{t('episodes')}</h2>

         <div className="space-y-8">
             {videoLibrary.map((section) => (
                 <div key={section.category}>
                     <h3 className="text-xl font-bold mb-4 text-main">{section.category}</h3>
                     <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
                         {section.videos.map((video) => (
                             <div key={video.id} className="min-w-[200px] w-[200px] group cursor-pointer">
                                 <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                                     <ImageWithFallback src={video.image} alt={video.title} className="w-full h-full object-cover transition group-hover:scale-105" />
                                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                                         <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                                             <Play size={20} fill="white" className="text-white ltr:ml-1 rtl:mr-1"/>
                                         </div>
                                     </div>
                                     <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded rtl:right-auto rtl:left-2">
                                         {video.duration}
                                     </div>
                                     {/* Progress bar mockup */}
                                     <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                                        <div className="h-full bg-red-600 w-1/3"></div>
                                     </div>
                                 </div>
                                 <h4 className="font-bold text-sm leading-tight mb-1 text-main">{video.title}</h4>
                                 <div className="flex items-center gap-2">
                                     <span className="bg-gray-200 dark:bg-gray-700 text-[10px] px-1 rounded text-muted">CC</span>
                                     <span className="text-[10px] text-muted">EN/AR</span>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             ))}
         </div>
      </div>
    </>
  );
};

export default Library;