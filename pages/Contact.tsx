import React from 'react';
import Header from '../components/Header';
import { Mail, Phone, Twitter, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <div className="p-4">
         <h1 className="text-3xl font-bold mb-6 text-main">{t('contactTitle')}</h1>
         
         <form className="space-y-4 mb-8">
             <div>
                 <input 
                    type="text" 
                    placeholder={t('formName')}
                    className="w-full bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-main placeholder-muted focus:outline-none focus:border-accent"
                 />
             </div>
             <div>
                 <input 
                    type="email" 
                    placeholder={t('formEmail')}
                    className="w-full bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-main placeholder-muted focus:outline-none focus:border-accent"
                 />
             </div>
             <div>
                 <input 
                    type="text" 
                    placeholder={t('formSubject')}
                    className="w-full bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-main placeholder-muted focus:outline-none focus:border-accent"
                 />
             </div>
             <div>
                 <textarea 
                    placeholder={t('formMessage')}
                    rows={4}
                    className="w-full bg-secondary border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-main placeholder-muted focus:outline-none focus:border-accent"
                 ></textarea>
             </div>

             <button className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-orange-500/20">
                 {t('sendMessage')}
             </button>
         </form>

         <div className="bg-secondary rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-4 text-muted">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                      <Mail size={16} />
                  </div>
                  <span className="text-sm">info@aletejahtv.com</span>
              </div>
              <div className="flex items-center gap-3 mb-6 text-muted">
                   <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                      <Phone size={16} />
                  </div>
                  <span className="text-sm">+123 456 7890</span>
              </div>

              <div className="flex space-x-4 rtl:space-x-reverse pt-4 border-t border-gray-200 dark:border-gray-700">
                  <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-muted dark:text-white transition">
                      <Twitter size={20} />
                  </a>
                   <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-muted dark:text-white transition">
                      <Facebook size={20} />
                  </a>
                   <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-muted dark:text-white transition">
                      <Instagram size={20} />
                  </a>
              </div>
         </div>
      </div>
    </>
  );
};

export default Contact;