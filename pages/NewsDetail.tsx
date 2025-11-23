import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { NEWS_ITEMS_EN, NEWS_ITEMS_AR } from '../constants';
import { Share2, Bookmark } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

// Brand Icons
const TwitterIcon = ({ size = 20, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = ({ size = 20, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.648 0-2.928 1.67-2.928 3.403v1.518h3.921l-.528 3.667h-3.393v7.98h-4.944z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

const NewsDetail: React.FC = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  
  const newsItems = language === 'en' ? NEWS_ITEMS_EN : NEWS_ITEMS_AR;
  const newsItem = newsItems.find(i => i.id === id) || newsItems[0];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = newsItem.title;
    let shareUrl = '';

    switch (platform) {
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
    }
    
    if (shareUrl) window.open(shareUrl, '_blank');
  };

  const handleNativeShare = () => {
      if (navigator.share) {
          navigator.share({
              title: newsItem.title,
              text: newsItem.title,
              url: window.location.href
          }).catch(console.error);
      }
  };

  return (
    <>
      <Header showBack title={newsItem.category} />
      <div className="bg-secondary min-h-screen text-main pb-20 transition-colors duration-300">
          <div className="p-4">
              <div className="flex justify-between items-start mb-4 gap-4">
                   <h1 className="text-2xl font-bold text-main leading-tight flex-1">
                       {newsItem.title}
                   </h1>
                   <button onClick={handleNativeShare} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                       <Share2 size={20} className="text-muted"/>
                   </button>
              </div>
              
              <div className="flex items-center justify-between text-xs text-muted mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
                  <div className="flex items-center gap-2">
                      <span>{newsItem.date || 'Oct 26, 2023'}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                      <span className="text-accent font-medium">{t('author')}</span>
                  </div>
                  <ImageWithFallback src="https://picsum.photos/id/64/40/40" className="w-8 h-8 rounded-full object-cover" />
              </div>

              <ImageWithFallback src={newsItem.image} className="w-full h-64 object-cover rounded-xl mb-6 shadow-sm" />

              <div className="prose prose-sm max-w-none text-main leading-relaxed">
                  {/* Display content if available, or fallback description */}
                  <p className="font-medium text-lg mb-4">
                     {newsItem.content ? newsItem.content.substring(0, 100) + '...' : newsItem.title}
                  </p>
                  <p className="mb-4 text-muted">
                     {newsItem.content || 'Full article content placeholder...'}
                  </p>
                  <p className="mb-4 text-muted">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-muted">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
              </div>

              {/* Action Bar */}
              <div className="mt-8 mb-6">
                   <button className="w-full bg-gray-100 dark:bg-gray-800 py-3 rounded-lg flex items-center justify-center space-x-2 text-accent font-medium mb-6">
                       <Bookmark size={18} className="ltr:mr-2 rtl:ml-2" />
                       <span>{t('saveForLater')}</span>
                   </button>

                   <h3 className="text-xs font-bold text-muted mb-3 uppercase tracking-wider">{t('share')}</h3>
                   <div className="flex gap-3">
                       <button 
                            onClick={() => handleShare('twitter')} 
                            className="flex-1 bg-black text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-80 transition shadow-sm"
                       >
                           <TwitterIcon size={18} />
                           <span className="font-medium text-sm">X</span>
                       </button>
                       <button 
                            onClick={() => handleShare('facebook')} 
                            className="flex-1 bg-[#1877F2] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-80 transition shadow-sm"
                       >
                           <FacebookIcon size={18} />
                           <span className="font-medium text-sm">Facebook</span>
                       </button>
                       <button 
                            onClick={() => handleShare('whatsapp')} 
                            className="flex-1 bg-[#25D366] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-80 transition shadow-sm"
                       >
                           <WhatsAppIcon size={18} />
                           <span className="font-medium text-sm">WhatsApp</span>
                       </button>
                   </div>
              </div>
          </div>
      </div>
    </>
  );
};

export default NewsDetail;