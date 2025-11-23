
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { Play, Pause, Volume2, Volume1, VolumeX, Maximize, Minimize, Captions, Settings, ChevronRight, ChevronLeft, Check, Gauge, Languages } from 'lucide-react';
import ImageWithFallback from '../components/ImageWithFallback';
import { useLanguage } from '../context/LanguageContext';

const Live: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(80);
  const [isVolumeHovered, setIsVolumeHovered] = useState(false);
  const [currentTime, setCurrentTime] = useState(745); // Mock start time (e.g. 12:25)
  const [duration] = useState(3600); // Mock total duration (1 hour)
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Settings State
  const [showSettings, setShowSettings] = useState(false);
  const [settingsView, setSettingsView] = useState<'main' | 'quality' | 'speed' | 'captions'>('main');
  const [quality, setQuality] = useState('Auto');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  // Captions State
  const [isCaptionsEnabled, setIsCaptionsEnabled] = useState(false);
  const [captionLanguage, setCaptionLanguage] = useState<'en' | 'ar'>('en');
  const [currentCaption, setCurrentCaption] = useState('');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const currentProgramTitle = language === 'en' ? 'World News Hour' : 'ساعة الأخبار العالمية';
  const currentProgramDesc = language === 'en' ? 'Live coverage from the international summit.' : 'تغطية حية من القمة العالمية.';
  const nextProgramTitle = language === 'en' ? 'The Evening Report' : 'التقرير المسائي';
  const breakingNewsTitle = language === 'en' ? 'GLOBAL SUMMIT UNDERWAY' : 'القمة العالمية جارية';
  const breakingNewsLabel = language === 'en' ? 'Breaking News:' : 'خبر عاجل:';

  // Mock Captions Data
  const captionsData = {
      en: [
        { start: 745, end: 749, text: "Welcome back to the Global Summit coverage." },
        { start: 750, end: 754, text: "Leaders are gathering for the final statement." },
        { start: 755, end: 759, text: "This agreement could change everything." },
        { start: 760, end: 765, text: "Let's listen in to the opening remarks." },
        { start: 766, end: 770, text: "[Applause]" },
        { start: 771, end: 776, text: "Thank you everyone for being here today." }
      ],
      ar: [
        { start: 745, end: 749, text: "أهلاً بكم من جديد في تغطية القمة العالمية." },
        { start: 750, end: 754, text: "يجتمع القادة لإلقاء البيان الختامي." },
        { start: 755, end: 759, text: "هذا الاتفاق قد يغير كل شيء." },
        { start: 760, end: 765, text: "لنستمع إلى الملاحظات الافتتاحية." },
        { start: 766, end: 770, text: "[تصفيق]" },
        { start: 771, end: 776, text: "شكراً للجميع لحضوركم اليوم." }
      ]
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Simulate playback progress
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => (prev < duration ? prev + 1 : prev));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  // Update Captions
  useEffect(() => {
    if (!isCaptionsEnabled) {
        setCurrentCaption('');
        return;
    }
    
    const activeCaption = captionsData[captionLanguage].find(
        cap => currentTime >= cap.start && currentTime <= cap.end
    );
    
    if (activeCaption) {
        setCurrentCaption(activeCaption.text);
    } else {
        setCurrentCaption('');
    }
  }, [currentTime, isCaptionsEnabled, captionLanguage]);

  // Handle showing controls on interaction
  const handleInteraction = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    // Auto-hide after 3 seconds if playing and settings are closed
    if (isPlaying && !showSettings) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Handle Fullscreen changes
  useEffect(() => {
      const handleFullscreenChange = () => {
          setIsFullscreen(!!document.fullscreenElement);
      };
      
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => {
          document.removeEventListener('fullscreenchange', handleFullscreenChange);
      }
  }, []);

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false);
        setSettingsView('main');
      }
    };
    
    if (showSettings) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  const toggleFullscreen = (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (!document.fullscreenElement) {
          if (containerRef.current) {
              containerRef.current.requestFullscreen().catch(err => {
                  console.error(`Error attempting to enable fullscreen: ${err.message}`);
              });
          }
      } else {
          document.exitFullscreen();
      }
      setShowSettings(false);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlaying(!isPlaying);
    setShowControls(true);
    
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    
    // Only auto-hide if we are switching TO playing state
    if (!isPlaying && !showSettings) { 
       controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const toggleSettings = (e: React.MouseEvent) => {
      e.stopPropagation();
      setShowSettings(!showSettings);
      setSettingsView('main');
      handleInteraction(); // Keep controls visible
  };

  const toggleMute = (e: React.MouseEvent) => {
      e.stopPropagation();
      const newMutedState = !isMuted;
      setIsMuted(newMutedState);
      if (newMutedState) setVolume(0);
      else setVolume(80);
      handleInteraction();
  };

  const toggleCaptions = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsCaptionsEnabled(!isCaptionsEnabled);
      handleInteraction();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      const val = parseInt(e.target.value);
      setVolume(val);
      setIsMuted(val === 0);
      handleInteraction();
  };

  useEffect(() => {
      // Initial auto-hide
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
      return () => {
          if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      }
  }, []);

  // Settings Data
  const qualities = ['Auto', '1080p', '720p', '480p'];
  const speeds = [0.5, 1, 1.25, 1.5, 2];

  return (
    <>
      <Header />
      <div className={`flex flex-col h-full ${isFullscreen ? 'p-0' : 'p-4'}`}>
        {/* Video Player Container */}
        <div 
            ref={containerRef}
            className={`bg-black overflow-hidden relative shadow-2xl group cursor-pointer select-none transition-all duration-300
                ${isFullscreen 
                    ? 'w-full h-full fixed inset-0 z-50 rounded-none' 
                    : 'w-full aspect-video rounded-xl mb-6 border border-gray-800'
                }`}
            onMouseMove={handleInteraction}
            onClick={togglePlay}
            onMouseLeave={() => {
                if (isPlaying && !showSettings) setShowControls(false);
                setIsVolumeHovered(false);
            }}
        >
            <ImageWithFallback 
                src="https://images.unsplash.com/photo-1596627829657-f448989603a0?auto=format&fit=crop&q=80&w=1000" 
                className={`w-full h-full ${isFullscreen ? 'object-contain' : 'object-cover'} transition-opacity duration-300 ${!isPlaying ? 'opacity-60' : 'opacity-90'}`} 
                alt="Live Stream"
            />
            
            {/* Center Play Button (visible when paused) */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <button 
                        onClick={togglePlay} 
                        title="Play"
                        className="w-16 h-16 bg-accent/90 text-white rounded-full flex items-center justify-center hover:scale-105 transition transform shadow-lg hover:shadow-accent/20"
                    >
                        <Play size={32} fill="currentColor" className="ltr:ml-1 rtl:mr-1"/>
                    </button>
                </div>
            )}

            {/* Live Badge */}
            <div className={`absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-md text-xs font-bold flex items-center z-10 shadow-sm rtl:left-auto rtl:right-4 ${isFullscreen ? 'mt-4 ml-4 rtl:mr-4' : ''}`}>
                <div className={`w-2 h-2 bg-white rounded-full ltr:mr-2 rtl:ml-2 ${isPlaying ? 'animate-pulse' : ''}`}></div>
                LIVE
            </div>

            {/* Captions Overlay */}
            {isCaptionsEnabled && currentCaption && (
                <div className={`absolute left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white text-sm md:text-base font-medium px-4 py-2 rounded-lg shadow-lg transition-all duration-300 text-center z-10 max-w-[80%] ${showControls ? 'bottom-24' : 'bottom-8'}`}>
                    {currentCaption}
                </div>
            )}

            {/* Breaking News Overlay */}
            <div className={`absolute left-4 right-4 bg-red-700/90 text-white px-3 py-2 rounded-sm text-sm font-bold transition-all duration-300 ${showControls ? 'bottom-20' : 'bottom-4'} ${isCaptionsEnabled && currentCaption ? 'opacity-0' : 'opacity-100'}`}>
                 <span className="block text-[10px] opacity-80 uppercase mb-1">{breakingNewsLabel}</span>
                 {breakingNewsTitle}
            </div>

            {/* Controls Overlay */}
            <div 
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-4 py-3 transition-opacity duration-300 z-20 ${showControls || showSettings ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={(e) => e.stopPropagation()} // Prevent click on controls from toggling play
            >
                {/* Progress Bar */}
                <div className="w-full h-1 bg-gray-600/50 rounded-full mb-4 cursor-pointer group/progress relative pointer-events-auto select-none">
                     {/* Buffered */}
                     <div className="absolute top-0 left-0 h-full bg-gray-400/50 rounded-full rtl:right-0 rtl:left-auto" style={{ width: '75%' }}></div>
                     {/* Progress */}
                     <div className="absolute top-0 left-0 h-full bg-red-600 rounded-full relative rtl:right-0 rtl:left-auto" style={{ width: `${(currentTime / duration) * 100}%` }}>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-red-600 rounded-full scale-0 group-hover/progress:scale-100 transition-transform shadow rtl:left-0 rtl:right-auto"></div>
                     </div>
                </div>

                <div className="flex items-center justify-between pointer-events-auto relative">
                    <div className="flex items-center gap-3">
                        <button onClick={togglePlay} className="text-white hover:text-accent transition p-1" title={isPlaying ? 'Pause' : 'Play'}>
                            {isPlaying ? <Pause size={22} fill="currentColor"/> : <Play size={22} fill="currentColor" className="rtl:rotate-180"/>}
                        </button>
                        
                        {/* Volume Control */}
                        <div 
                            className="flex items-center group/volume relative"
                            onMouseEnter={() => setIsVolumeHovered(true)}
                            onMouseLeave={() => setIsVolumeHovered(false)}
                        >
                            <div className={`
                                flex items-center transition-all duration-300 ease-out rounded-full h-8
                                ${isVolumeHovered ? 'bg-white/20 ltr:pr-3 rtl:pl-3 border border-white/10 backdrop-blur-sm' : 'bg-transparent border border-transparent px-0'}
                            `}>
                                <button 
                                    onClick={toggleMute} 
                                    title={isMuted ? 'Unmute' : 'Mute'}
                                    className="text-white hover:text-accent transition p-1.5 rounded-full z-10 relative flex-shrink-0"
                                >
                                    {isMuted || volume === 0 ? <VolumeX size={20} /> : volume < 50 ? <Volume1 size={20} /> : <Volume2 size={20} />}
                                </button>
                                
                                <div className={`overflow-hidden transition-all duration-300 ease-out flex items-center ${isVolumeHovered ? 'w-20 opacity-100 ltr:mr-2 rtl:ml-2' : 'w-0 opacity-0'}`}>
                                     <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        value={isMuted ? 0 : volume} 
                                        onChange={handleVolumeChange}
                                        className="w-full h-1 rounded-lg appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-md hover:[&::-webkit-slider-thumb]:scale-110 transition-all"
                                        style={{
                                            background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${isMuted ? 0 : volume}%, #9ca3af ${isMuted ? 0 : volume}%, #9ca3af 100%)`
                                        }}
                                     />
                                </div>
                            </div>
                        </div>

                        {/* Time Display */}
                        <div className="text-[10px] font-medium text-gray-200 tabular-nums ltr:ml-1 rtl:mr-1 hidden sm:block">
                            <span>{formatTime(currentTime)}</span>
                            <span className="text-gray-400 mx-1">/</span>
                            <span className="text-gray-400">{formatTime(duration)}</span>
                        </div>

                        <div className="h-4 w-[1px] bg-white/20 mx-1 hidden sm:block"></div>
                        
                        <div className="text-xs font-medium text-gray-300 flex items-center">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full ltr:mr-1.5 rtl:ml-1.5 animate-pulse"></div>
                            {t('live')}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-300">
                        <button className="hover:text-white font-bold text-[10px] bg-white/10 px-1.5 py-0.5 rounded border border-white/10">HD</button>
                        
                        {/* Quick Captions Toggle */}
                        <button 
                            onClick={toggleCaptions}
                            className={`p-1 transition-colors ${isCaptionsEnabled ? 'text-accent' : 'hover:text-white'}`}
                            title="Toggle Captions"
                        >
                            <Captions size={18} strokeWidth={isCaptionsEnabled ? 2.5 : 2} />
                        </button>

                        {/* Settings Button */}
                        <div className="relative" ref={settingsRef}>
                            <button 
                                onClick={toggleSettings}
                                title="Settings" 
                                className={`hover:text-white p-1 transition-transform duration-300 ${showSettings ? 'rotate-45 text-white' : ''}`}
                            >
                                <Settings size={18}/>
                            </button>
                            
                            {/* Settings Menu */}
                            {showSettings && (
                                <div className="absolute bottom-12 right-0 w-48 bg-black/90 backdrop-blur-md text-white rounded-xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                                    {settingsView === 'main' && (
                                        <div className="p-2 space-y-1">
                                            <button 
                                                onClick={() => setSettingsView('quality')}
                                                className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/15 rounded-lg text-xs font-medium transition"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Settings size={14} className="text-gray-300" />
                                                    <span>Quality</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-gray-400">
                                                    <span>{quality}</span>
                                                    <ChevronRight size={12} className="rtl:rotate-180" />
                                                </div>
                                            </button>
                                            <button 
                                                onClick={() => setSettingsView('speed')}
                                                className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/15 rounded-lg text-xs font-medium transition"
                                            >
                                                 <div className="flex items-center gap-2">
                                                    <Gauge size={14} className="text-gray-300" />
                                                    <span>Speed</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-gray-400">
                                                    <span>{playbackSpeed === 1 ? 'Normal' : `${playbackSpeed}x`}</span>
                                                    <ChevronRight size={12} className="rtl:rotate-180" />
                                                </div>
                                            </button>
                                            <button 
                                                onClick={() => setSettingsView('captions')}
                                                className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/15 rounded-lg text-xs font-medium transition"
                                            >
                                                 <div className="flex items-center gap-2">
                                                    <Languages size={14} className="text-gray-300" />
                                                    <span>Captions</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-gray-400">
                                                    <span>{isCaptionsEnabled ? (captionLanguage === 'en' ? 'English' : 'العربية') : 'Off'}</span>
                                                    <ChevronRight size={12} className="rtl:rotate-180" />
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                    
                                    {settingsView === 'quality' && (
                                        <div>
                                            <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2 text-xs font-bold text-gray-300">
                                                <button onClick={() => setSettingsView('main')} className="hover:text-white"><ChevronLeft size={14} className="rtl:rotate-180" /></button>
                                                <span>Quality</span>
                                            </div>
                                            <div className="p-1 max-h-48 overflow-y-auto">
                                                {qualities.map(q => (
                                                    <button 
                                                        key={q}
                                                        onClick={() => { setQuality(q); setShowSettings(false); }}
                                                        className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/15 rounded-lg text-xs transition"
                                                    >
                                                        <span>{q}</span>
                                                        {quality === q && <Check size={12} className="text-accent" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {settingsView === 'speed' && (
                                        <div>
                                            <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2 text-xs font-bold text-gray-300">
                                                <button onClick={() => setSettingsView('main')} className="hover:text-white"><ChevronLeft size={14} className="rtl:rotate-180" /></button>
                                                <span>Playback Speed</span>
                                            </div>
                                            <div className="p-1">
                                                {speeds.map(s => (
                                                    <button 
                                                        key={s}
                                                        onClick={() => { setPlaybackSpeed(s); setShowSettings(false); }}
                                                        className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/15 rounded-lg text-xs transition"
                                                    >
                                                        <span>{s === 1 ? 'Normal' : `${s}x`}</span>
                                                        {playbackSpeed === s && <Check size={12} className="text-accent" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {settingsView === 'captions' && (
                                        <div>
                                            <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2 text-xs font-bold text-gray-300">
                                                <button onClick={() => setSettingsView('main')} className="hover:text-white"><ChevronLeft size={14} className="rtl:rotate-180" /></button>
                                                <span>Captions</span>
                                            </div>
                                            <div className="p-1">
                                                <button 
                                                    onClick={() => { setIsCaptionsEnabled(false); setShowSettings(false); }}
                                                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/15 rounded-lg text-xs transition"
                                                >
                                                    <span>Off</span>
                                                    {!isCaptionsEnabled && <Check size={12} className="text-accent" />}
                                                </button>
                                                <button 
                                                    onClick={() => { setIsCaptionsEnabled(true); setCaptionLanguage('en'); setShowSettings(false); }}
                                                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/15 rounded-lg text-xs transition"
                                                >
                                                    <span>English</span>
                                                    {isCaptionsEnabled && captionLanguage === 'en' && <Check size={12} className="text-accent" />}
                                                </button>
                                                <button 
                                                    onClick={() => { setIsCaptionsEnabled(true); setCaptionLanguage('ar'); setShowSettings(false); }}
                                                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/15 rounded-lg text-xs transition"
                                                >
                                                    <span>العربية</span>
                                                    {isCaptionsEnabled && captionLanguage === 'ar' && <Check size={12} className="text-accent" />}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={toggleFullscreen} 
                            className="hover:text-white p-1"
                            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                        >
                            {isFullscreen ? <Minimize size={18}/> : <Maximize size={18}/>}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Now Playing Info */}
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-main mb-2 leading-tight">
                {t('nowPlaying')}:<br />
                <span className="text-main">{currentProgramTitle}</span>
            </h1>
            <p className="text-muted text-sm">{currentProgramDesc}</p>
        </div>

        {/* Countdown Card */}
        <div className="bg-secondary rounded-2xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-800 transition-colors duration-300">
             <h3 className="text-muted mb-4">{t('upcomingProgram')}</h3>
             
             <div className="text-5xl font-mono font-bold text-main mb-4 tracking-wider dir-ltr">
                 00:14:32
             </div>

             <p className="text-muted text-sm">
                 {t('until')} <span className="text-main font-bold">{nextProgramTitle}</span>
             </p>
        </div>
      </div>
    </>
  );
};

export default Live;
