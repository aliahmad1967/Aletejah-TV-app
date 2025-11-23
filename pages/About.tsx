import React from 'react';
import Header from '../components/Header';
import { Target, Globe, Mail, Phone, Facebook, Twitter, Instagram, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageWithFallback from '../components/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <>
       <Header />
       <div className="p-4 pt-2">
          <h1 className="text-3xl font-bold mb-6 text-main">{t('aboutTitle')}</h1>
          
          <div className="bg-secondary rounded-2xl p-6 mb-6 relative overflow-hidden border border-gray-200 dark:border-gray-800">
               <h2 className="text-xl font-bold mb-2 text-main">{t('channelProfileTitle')}</h2>
               <p className="text-muted text-sm leading-relaxed relative z-10">
                   {t('channelProfileText')}
               </p>
               {/* Abstract dish icon representation */}
               <div className="absolute top-4 right-4 opacity-10 rtl:right-auto rtl:left-4">
                    <Globe size={80} className="text-muted"/>
               </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-secondary p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
                   <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3 text-accent">
                        <Target size={20} />
                   </div>
                   <h3 className="font-bold mb-2 text-main">{t('missionTitle')}</h3>
                   <p className="text-[10px] text-muted">{t('missionText')}</p>
              </div>
              <div className="bg-secondary p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
                   <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3 text-accent">
                        <Globe size={20} />
                   </div>
                   <h3 className="font-bold mb-2 text-main">{t('visionTitle')}</h3>
                   <p className="text-[10px] text-muted">{t('visionText')}</p>
              </div>
          </div>

          <div className="mb-8">
              <h3 className="text-lg font-bold mb-3 text-main">{t('coverageMap')}</h3>
              <div className="bg-secondary rounded-xl overflow-hidden h-40 relative border border-gray-200 dark:border-gray-800">
                  {/* Placeholder Map */}
                   <ImageWithFallback src="https://picsum.photos/id/10/400/200" className="w-full h-full object-cover opacity-50 grayscale" />
                   <div className="absolute inset-0 flex items-center justify-center">
                       <span className="bg-black/60 text-white px-3 py-1 rounded text-xs">{t('globalCoverage')}</span>
                   </div>
              </div>
          </div>

          {/* Contact Navigation */}
          <button 
            onClick={() => navigate('/contact')}
            className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition mb-6"
          >
            {t('contactUs')}
          </button>
       </div>
    </>
  );
};

export default About;