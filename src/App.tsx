/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Download, Calendar, Image as ImageIcon, Terminal, 
  User, Search, Award, ShieldCheck, ArrowLeft, AlertCircle, 
  Clock, Heart, ListFilter, Lock, Sparkles, Flame, CheckCircle2, ChevronRight,
  Feather, PenTool, FileText, X
} from 'lucide-react';

import { 
  Article, Author, Category, Edition, Announcement, 
  CollegeEvent, GalleryItem, ActivityLog, SystemSetting 
} from './types';

import { 
  INITIAL_ARTICLES, INITIAL_AUTHORS, INITIAL_CATEGORIES, INITIAL_EDITIONS,
  INITIAL_ANNOUNCEMENTS, INITIAL_EVENTS, INITIAL_GALLERY, INITIAL_LOGS,
  INITIAL_SETTINGS, getStoredData, setStoredData 
} from './data';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Reader from './components/Reader';
import AdminDashboard from './components/AdminDashboard';
import CreativeOasis from './components/CreativeOasis';

const POEMS_LIST = [
  {
    id: 1,
    lines: ["عليك بالعلم فاطلبه بلا كسلِ", "واعمل بهِ هادياً تنجو من الزللِ"],
    author: "ابن الوردي"
  },
  {
    id: 2,
    lines: ["العلمُ يَبني بيوتاً لا عِمادَ لها", "والجهلُ يَهدمُ بيتَ العِزّ والشَّرَفِ"],
    author: "أحمد شوقي"
  },
  {
    id: 3,
    lines: ["تَمَسَّكْ بِحَبْلِ اللهِ وَاتَّبِعِ الْهُدَى", "وَلَا تَكُ بَدْعِيّاً لَعَلَّكَ تُفْلِحُ"],
    author: "ابن أبي داود"
  },
  {
    id: 4,
    lines: ["بصوتِ الحقِّ ندعو في بِلادٍ", "رواها العلم من نورِ الرشادِ"],
    author: "شاعر شذرات"
  }
];

export default function App() {
  const [activePoemIndex, setActivePoemIndex] = useState(0);
  const [announcementPage, setAnnouncementPage] = useState(0);

  // Auto scroll poem timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActivePoemIndex(prev => (prev + 1) % POEMS_LIST.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);
  // Proactive automatic data sync & state upgrade
  useEffect(() => {
    try {
      const stored = localStorage.getItem('al_urwah_settings');
      const storedCats = localStorage.getItem('al_urwah_categories');
      let shouldReset = false;
      
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (parsed.siteName === 'العروة' || parsed.siteName === 'الاعتصام' || parsed.siteName === 'مجلة الاعتصام' || parsed.siteName === '')) {
          shouldReset = true;
        }
      }
      
      if (storedCats) {
        const cats = JSON.parse(storedCats);
        if (cats && cats.length < 5) {
          shouldReset = true;
        }
      }
      
      if (shouldReset) {
        const keysToReset = ['articles', 'authors', 'categories', 'editions', 'announcements', 'events', 'gallery', 'logs', 'settings', 'user_likes'];
        keysToReset.forEach(k => localStorage.removeItem(`al_urwah_${k}`));
        window.location.reload();
      }
    } catch (e) {
      console.error('Data state migration failed:', e);
    }
  }, []);

  // 1. DATA CORE STATES (Synced to localStorage for persistence)
  const [articles, setArticles] = useState<Article[]>(() => getStoredData('articles', INITIAL_ARTICLES));
  const [authors, setAuthors] = useState<Author[]>(() => getStoredData('authors', INITIAL_AUTHORS));
  const [categories, setCategories] = useState<Category[]>(() => getStoredData('categories', INITIAL_CATEGORIES));
  const [editions, setEditions] = useState<Edition[]>(() => getStoredData('editions', INITIAL_EDITIONS));
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => getStoredData('announcements', INITIAL_ANNOUNCEMENTS));
  const [events, setEvents] = useState<CollegeEvent[]>(() => getStoredData('events', INITIAL_EVENTS));
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() => getStoredData('gallery', INITIAL_GALLERY));
  const [logs, setLogs] = useState<ActivityLog[]>(() => getStoredData('logs', INITIAL_LOGS));
  const [settings, setSettings] = useState<SystemSetting>(() => getStoredData('settings', INITIAL_SETTINGS));

  // 1.1 THEME CONTROLLER & DARK MODE FOR THEME COHESION (Pure CSS override pattern)
  const [darkMode] = useState<boolean>(true);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
  }, []);

  // Sync state helpers
  const updateArticles = (newList: Article[]) => { setArticles(newList); setStoredData('articles', newList); };
  const updateAuthors = (newList: Author[]) => { setAuthors(newList); setStoredData('authors', newList); };
  const updateCategories = (newList: Category[]) => { setCategories(newList); setStoredData('categories', newList); };
  const updateEditions = (newList: Edition[]) => { setEditions(newList); setStoredData('editions', newList); };
  const updateAnnouncements = (newList: Announcement[]) => { setAnnouncements(newList); setStoredData('announcements', newList); };
  const updateEvents = (newList: CollegeEvent[]) => { setEvents(newList); setStoredData('events', newList); };
  const updateGallery = (newList: GalleryItem[]) => { setGalleryItems(newList); setStoredData('gallery', newList); };
  const updateSettings = (newVal: SystemSetting) => { setSettings(newVal); setStoredData('settings', newVal); };

  // Write new Security Activity Log
  const addLog = (actionDescription: string) => {
    const newLog: ActivityLog = {
      id: Date.now(),
      userName: isAdminLoggedIn ? "الأستاذ موسى الفيضي (رئيس التحرير)" : "مستخدم عمومي",
      action: actionDescription,
      ipAddress: "192.168.1." + Math.floor(Math.random() * 254 + 1),
      date: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    setStoredData('logs', updatedLogs);
  };

  // 2. VIEWPORT & NAVIGATION STATES
  const [activeView, setActiveView] = useState<'home' | 'articles' | 'editions' | 'creative' | 'admin' | 'reader'>('home');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  // Reset window scroll to top whenever the active view or selected article changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView, selectedArticleId]);

  const [creativeTab, setCreativeTab] = useState<'poems' | 'stories' | 'travelogues'>('poems');
  const [isCreativeSubmitOpen, setIsCreativeSubmitOpen] = useState(false);
  const [selectedEditionForIndex, setSelectedEditionForIndex] = useState<number | null>(null);
  
  // Public Filters states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<number | null>(null);

  // Administrative Access state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('al_urwah_admin_auth') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // Reader context tracking
  const [likedArticles, setLikedArticles] = useState<number[]>(() => getStoredData('user_likes', []));

  // Toggle dynamic like incrementing
  const handleLikeToggle = (id: number) => {
    let newLikesList: number[];
    if (likedArticles.includes(id)) {
      newLikesList = likedArticles.filter(item => item !== id);
    } else {
      newLikesList = [...likedArticles, id];
    }
    setLikedArticles(newLikesList);
    setStoredData('user_likes', newLikesList);
    
    // Auto increment visual database counter as audit proxy
    const updatedArticles = articles.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.likes + (likedArticles.includes(id) ? -1 : 1)
        };
      }
      return item;
    });
    updateArticles(updatedArticles);
  };

  // Trigger file download count registering
  const handleRegisterDownload = (editionId: number, title: string) => {
    const edObj = editions.find(e => e.id === editionId);
    const updated = editions.map(ed => {
      if (ed.id === editionId) {
        return { ...ed, downloadCount: ed.downloadCount + 1 };
      }
      return ed;
    });
    updateEditions(updated);
    addLog(`تنزيل الكتيب الرقمي للعدد: "${title}"`);
    
    // Programmatic actual file download trigger!
    if (edObj && edObj.pdfUrl && edObj.pdfUrl !== '#') {
      try {
        const link = document.createElement('a');
        link.href = edObj.pdfUrl;
        link.download = `${title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.error('Download failed:', err);
      }
    } else {
      // Clean modern client-side PDF down-generation mock or blob anchor download
      try {
        const link = document.createElement('a');
        link.href = "data:application/pdf;base64,JVBERi0xLjQKJVRlc3QgUERGIGRvd25sb2FkIGZvciBBbC1VcndhaA==";
        link.download = `${title}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        alert(`جاري تنزيل العدد: ${title}`);
      }
    }
  };

  // Secure Administrative authentication login check
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const expectedId = settings.adminId || 'afsal';
    const expectedPass = settings.adminPass || 'afsal007';

    if (usernameInput.trim() === expectedId && passwordInput === expectedPass) {
      setIsAdminLoggedIn(true);
      localStorage.setItem('al_urwah_admin_auth', 'true');
      addLog(`عملية تسجيل دخول ناجحة للوحة تحرير ${settings.siteName || 'شذرات'}`);
      setLoginError('');
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setLoginError('اسم المستخدم أو كلمة المرور غير صالحة!');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('al_urwah_admin_auth');
    addLog("عملية تسجيل خروج وإنهاء صلاحية الجلسة الإدارية");
    setActiveView('home');
  };

  // Reader loading handler
  const handleOpenArticle = (id: number) => {
    // Automatically increment views count metric
    const updated = articles.map(item => {
      if (item.id === id) {
        return { ...item, views: item.views + 1 };
      }
      return item;
    });
    updateArticles(updated);
    setSelectedArticleId(id);
    setActiveView('reader');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Filters calculation
  const filteredArticles = articles.filter(art => {
    if (!art.isPublished) return false; // Hide unpublished from guest reader view
    
    const matchesSearch = searchQuery.trim() === '' || 
      art.title.includes(searchQuery) || 
      art.content.includes(searchQuery) ||
      art.excerpt.includes(searchQuery);

    const matchesCategory = filterCategory === null || art.categoryId === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredArticle = articles.find(art => art.isFeatured && art.isPublished) || articles.find(art => art.isPublished);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-900 text-slate-200 selection:bg-blue-600 selection:text-white" dir="rtl">
      
      {/* 0. PREMIUM STATUS BAR */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 text-xs font-tajawal py-3.5 px-6 sm:px-10 lg:px-12 flex justify-between items-center transition z-50 sticky top-0 md:relative" id="dark-mode-toggle-bar">
        <div className="flex items-center gap-2 text-slate-400">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span>اليوم: {new Date().toLocaleDateString('ar-LY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <span className="hidden sm:inline h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="hidden sm:inline-block text-slate-500">منصة {settings.siteName} آمنة ومحمية</span>
        </div>
        
        <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
          <span>جهة الترخيص:</span>
          <span className="text-emerald-400 font-bold">{settings.collegeName}</span>
        </div>
      </div>
      
      {/* 1. STICKY GLASSMORPHIC HEADERS */}
      <Navigation 
        settings={settings}
        activeView={activeView}
        setActiveView={setActiveView}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogout={handleAdminLogout}
        setFilterCategory={setFilterCategory}
        activeCreativeTab={creativeTab}
        setActiveCreativeTab={setCreativeTab}
      />

      {/* 2. MAIN WORKSPACE */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 py-16 md:py-24 space-y-20">
        
        {/* VIEW: HOME PAGE */}
        {/* VIEW: HOME PAGE */}
        {activeView === 'home' && (
          <div className="space-y-20 sm:space-y-28">
            
            {/* HERO HERO SECTION WITH ISLAMIC COLLEGE COMPLEX BRAND */}
            <div className="relative rounded-3xl overflow-hidden glass border border-white/10 p-10 sm:p-16 lg:p-20 text-right flex flex-col justify-center min-h-[440px] md:min-h-[500px] lg:min-h-[560px] shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-l from-slate-950/90 via-slate-900/40 to-transparent z-0"></div>
              {/* Overlay abstract background */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
              
              <div className="relative z-10 space-y-6 max-w-3xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/60 border border-white/10 text-blue-300">
                  <Award className="w-3.5 h-3.5 text-blue-400" />
                  <span>المجلة الأكاديمية الرقمية الرسمية للجامعة</span>
                </span>
                
                <h1 className="text-4xl sm:text-6xl font-black font-serif-ar text-slate-100 leading-tight tracking-tight">
                  {settings.siteName}
                </h1>
                
                <p className="text-base sm:text-lg font-medium text-slate-300 leading-relaxed max-w-2xl">
                  {settings.aboutText}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => setActiveView('articles')}
                    className="bg-blue-600 hover:bg-blue-500 font-bold font-tajawal text-sm px-8 py-3.5 rounded-xl transition shadow-lg shadow-blue-500/15 cursor-pointer"
                  >
                    تصفح البحوث والمقالات
                  </button>
                  <button
                    onClick={() => setActiveView('editions')}
                    className="bg-slate-900/80 hover:bg-slate-800/80 font-bold font-tajawal text-sm px-8 py-3.5 rounded-xl border border-slate-700/60 transition cursor-pointer"
                  >
                    تحميل أعداد الكتيب PDF
                  </button>
                </div>
              </div>

              {/* Float complex logo accent */}
              <div className="absolute left-10 bottom-10 hidden lg:block select-none opacity-20 transform rotate-12 scale-150">
                <BookOpen className="w-64 h-64 text-sky-500" />
              </div>
            </div>

            {/* NEW PROMOTIONAL & SUBMISSION CALLOUT SECTION ("القسم الإبداعي والواحة الأدبية بمجلة شذرات") */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-950/20 via-slate-905 to-slate-950 border border-amber-500/15 p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="absolute inset-0 bg-[radial-gradient(#d97706_0.5px,transparent_0.5px)] [background-size:20px_20px] opacity-5 pointer-events-none"></div>
              
              <div className="space-y-4 text-right max-w-2xl z-10">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/10 border border-amber-500/25 text-amber-400">
                  <Feather className="w-3 h-3 text-amber-400" />
                  <span>{settings.creativeSectionBadge || `القسم الإبداعي والواحة الأدبية بمجلة ${settings.siteName || 'شذرات'}`}</span>
                </span>
                
                <h2 className="text-2xl sm:text-3xl font-black font-serif-ar text-slate-100 leading-tight">
                  {settings.creativeSectionTitle || "الواحة الأدبية والأقلام الواعدة"}
                </h2>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-tajawal font-medium">
                  {settings.creativeSectionDesc || `مساحة مخصصة لقراء مجلة ${settings.siteName || 'شذرات'} للإبحار في فضاء المعلقات والقصائد الخالدة، ومطالعة طيف من الروايات والقصص المعبرة المليئة بالحكمة، وتتبع أثر الرحالة الأوائل في أسفارهم حول الآفاق.`}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 z-10">
                <button
                  onClick={() => {
                    setActiveView('creative');
                    setCreativeTab('poems');
                    setIsCreativeSubmitOpen(true);
                  }}
                  className="flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-slate-100 hover:text-white font-bold font-tajawal text-xs px-6 py-3.5 rounded-xl transition shadow-lg shadow-amber-600/15 cursor-pointer text-center"
                >
                  <PenTool className="w-4 h-4" />
                  <span>{settings.creativeSectionBtnSubmit || "أضف مساهمتك المكتوبة"}</span>
                </button>
                <a
                  href={`mailto:${settings.submissionEmail || 'shadharat@gmail.com'}?subject=مساهمة في الواحة الأدبية - مجلة ${settings.siteName || 'شذرات'}`}
                  className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white font-semibold font-tajawal text-xs px-6 py-3.5 rounded-xl border border-slate-800 transition text-center"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>{settings.creativeSectionBtnContact || "مراسلة هيئة التحرير"}</span>
                </a>
              </div>
            </div>

            {/* DECORATIVE DAILY POEM SECTION (CAROUSEL) */}
            <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-slate-950 to-blue-950/40 border border-amber-500/10 text-center space-y-4 shadow-xl overflow-hidden" id="daily-poem-box">
              <div className="absolute top-0 right-0 p-3 text-amber-500/5 select-none pointer-events-none text-9xl font-serif">"</div>
              <div className="relative z-10 flex flex-col items-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>الواحة الروحية وعيون الشعر العربي اليومي</span>
                </span>
                <div className="mt-6 space-y-2 min-h-[80px] flex flex-col justify-center">
                  {POEMS_LIST[activePoemIndex].lines.map((line, idx) => (
                    <p key={idx} className="text-xl md:text-2xl font-serif-ar tracking-wide text-slate-100 font-semibold italic">
                      {line}
                    </p>
                  ))}
                  <span className="block mt-4 text-xs md:text-sm text-amber-300 font-bold font-tajawal">
                    — الأديب/الشاعر: {POEMS_LIST[activePoemIndex].author}
                  </span>
                </div>
              </div>
              <div className="flex justify-center gap-2 pt-4">
                {POEMS_LIST.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePoemIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${activePoemIndex === idx ? 'bg-amber-400 w-6' : 'bg-slate-700 hover:bg-slate-500'}`}
                  />
                ))}
              </div>
            </div>

            {/* MULTI ANNOUNCEMENT CAROUSEL - SHOWING UP TO 3 NEWS AT ONE TIME */}
            {announcements.length > 0 && (
              <div className="space-y-6" id="important-announcements-carousel">
                <div className="flex justify-between items-center px-2">
                  <h3 className="text-md sm:text-lg font-extrabold text-slate-100 flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500 animate-pulse"></span>
                    <span>مجلس الإعلانات والتبليغات الرسمية للإدارة ({announcements.length})</span>
                  </h3>
                  {announcements.length > 3 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setAnnouncementPage(prev => Math.max(0, prev - 1))}
                        disabled={announcementPage === 0}
                        className="p-1.5 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition cursor-pointer text-xs font-bold"
                      >
                        السابق
                      </button>
                      <button
                        onClick={() => setAnnouncementPage(prev => (prev + 3 < announcements.length ? prev + 3 : prev))}
                        disabled={announcementPage + 3 >= announcements.length}
                        className="p-1.5 px-4 rounded-xl bg-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition cursor-pointer text-xs font-bold"
                      >
                        التالي
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {announcements.slice(announcementPage, announcementPage + 3).map((ann) => (
                    <div key={ann.id} className="bg-gradient-to-b from-slate-905 to-slate-950 border border-slate-850 rounded-2xl p-6 hover:border-blue-500/20 transition relative flex flex-col justify-between shadow-lg">
                      <div className="space-y-3 text-right">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-black ${ann.isImportant ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                            {ann.isImportant ? 'هام عاجل' : 'تبليغات عامة'}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 font-semibold">{ann.publishDate}</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-slate-100 leading-snug">{ann.title}</h4>
                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-5 font-semibold">{ann.content}</p>
                      </div>
                      <div className="mt-6 pt-3 border-t border-slate-800/60 flex justify-end">
                        <button
                          onClick={() => alert(`[إعلان الحرم الجامعي] \n\n${ann.title}\n\n${ann.content}`)}
                          className="text-[10px] text-blue-400 font-bold hover:text-white transition flex items-center gap-1 cursor-pointer"
                        >
                          <span>قراءة الإعلان بالكامل</span>
                          <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TWO COLUMN GRID CONTENT: Featured Article & Library Shelf */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* PRIMARY FEED COLS: 2 */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* 1. FEATURED ARTICLE JUMBOTRON */}
                {featuredArticle && (
                  <div 
                    onClick={() => handleOpenArticle(featuredArticle.id)}
                    className="glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-2xl transition duration-300 cursor-pointer group hover:border-blue-500/30"
                  >
                    <div className="w-full h-[220px] sm:h-[300px] overflow-hidden relative">
                      <img
                        src={featuredArticle.imageUrl}
                        alt="غلاف المقال المميز"
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-blue-600 text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                        موضوع مميز رائد
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 space-y-3.5 text-right">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 font-serif-ar leading-snug group-hover:text-blue-300 transition duration-300">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-850">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-blue-400">
                            {authors.find(a => a.id === featuredArticle.authorId)?.name}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenArticle(featuredArticle.id);
                          }}
                          className="flex items-center gap-1 text-xs font-bold text-sky-400 hover:text-white transition font-tajawal cursor-pointer"
                        >
                          <span>قراءة البحث بالكامل</span>
                          <ChevronRight className="w-4 h-4 transform rotate-180" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. ARTICLES GRID CARD */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold font-serif-ar text-slate-100">{settings.articlesSectionTitle || "أحدث المقالات المتاحة للمطالعة"}</h3>
                    <button
                      onClick={() => setActiveView('articles')}
                      className="text-xs font-semibold text-blue-400 hover:text-white transition"
                    >
                      عرض جميع المقالات ({articles.length})
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {articles.filter(a => a.id !== featuredArticle?.id && a.isPublished).slice(0, 4).map(art => {
                      const category = categories.find(c => c.id === art.categoryId) || categories[0];
                      return (
                        <div 
                          key={art.id} 
                          onClick={() => handleOpenArticle(art.id)}
                          className="glass hover:bg-blue-50/50 dark:hover:bg-blue-950/40 hover:border-blue-500/30 border border-white/10 p-5 rounded-2xl flex flex-col justify-between h-[210px] shadow-lg transition hover:-translate-y-1 cursor-pointer group"
                        >
                          <div className="space-y-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${category.color} inline-block`}>
                              {category.name}
                            </span>
                            <h4 className="text-sm font-extrabold text-slate-100 font-serif-ar line-clamp-2 leading-snug group-hover:text-blue-300 transition duration-300">
                              {art.title}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-medium line-clamp-2 leading-relaxed">
                              {art.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-3">
                            <span className="text-[10px] font-semibold text-slate-500">
                              قراءة: {art.readTime}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenArticle(art.id);
                              }}
                              className="text-xs font-bold text-sky-400 hover:text-white transition cursor-pointer"
                            >
                              اقرأ الآن
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* SIDEBAR COLS: 1 (Announcements archive, events list, print edition shelf) */}
              <div className="space-y-6">
                
                {/* PDF LIBRARY CARDS VIEW */}
                <div className="glass border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <h3 className="text-sm font-bold text-slate-200 font-serif-ar">{settings.editionsSectionTitle || "النسخة الورقية المطبوعة PDF"}</h3>
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                  </div>
                  
                  {editions.slice(0, 1).map(ed => (
                    <div key={ed.id} className="space-y-3">
                      <div className="w-full h-44 rounded-xl bg-slate-900/80 overflow-hidden relative border border-white/10">
                        <img 
                          src={ed.coverUrl} 
                          alt="غلاف العدد الكامل" 
                          className="w-full h-full object-cover opacity-80"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                        <span className="absolute bottom-3 right-3 text-xs font-mono font-bold text-emerald-400 bg-slate-900/90 px-2 py-1 rounded">
                          طبعة جامعة عين الهدى
                        </span>
                      </div>

                      <div className="text-right space-y-1">
                        <h4 className="font-bold text-slate-200 text-sm font-serif-ar">{ed.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                          {ed.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRegisterDownload(ed.id, ed.title)}
                        className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-tajawal text-xs py-3 rounded-xl transition shadow-lg shadow-emerald-500/10 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>تحميل العدد كاملاً PDF</span>
                      </button>

                      <span className="text-[9px] font-bold text-slate-500 block text-center mt-1">
                        إجمالي التنزيلات: {ed.downloadCount} مسجلة
                      </span>
                    </div>
                  ))}
                </div>

                {/* EVENTS Bento Grid component */}
                <div className="glass border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
                  <h3 className="text-sm font-bold text-slate-200 border-b border-white/10 pb-3 font-serif-ar">
                    {settings.eventsSectionTitle || "الندوات والفعاليات الأكاديمية لمجلتنا"}
                  </h3>
                  
                  <div className="space-y-3">
                    {events.map(ev => (
                      <div key={ev.id} className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                        <h4 className="font-extrabold text-slate-200 text-xs leading-normal font-serif-ar">{ev.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{ev.description}</p>
                        <div className="flex justify-between items-center text-[9px] font-bold text-blue-400 pt-1">
                          <span>{ev.date}</span>
                          <span className="bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 text-[8px]">{ev.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PHOTOGRAPHY OF EDUCATION GALLERY */}
                <div className="glass border border-white/10 rounded-3xl p-6 space-y-4 shadow-2xl">
                  <h3 className="text-sm font-bold text-slate-200 border-b border-white/10 pb-3 font-serif-ar">{settings.gallerySectionTitle || "البوم صور المجمع"}</h3>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {galleryItems.slice(0, 2).map((pic, idx) => (
                      <div key={pic.id} className="group relative rounded-xl overflow-hidden h-24 bg-slate-800 border border-white/10 cursor-pointer" title={pic.title}>
                        <img src={pic.imageUrl} alt={pic.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-200" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                        <span className="absolute bottom-1 right-2 text-[8px] font-bold text-slate-300 truncate max-w-[100px]">{pic.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* VIEW: ARTICLES ARCHIVE LIST */}
        {activeView === 'articles' && (
          <div className="space-y-8">
            
            {/* Search and filters bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                
                {/* Search query box */}
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`ابحث بلغة عربية فصيحة في مجلة ${settings.siteName || 'شذرات'} (مثال: الشريعة، البلاغة، التراث)...`}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 p-3.5 pr-11 rounded-2xl text-sm outline-none font-bold"
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                </div>
                
                {/* Clear and filter triggers */}
                {(searchQuery || filterCategory !== null) && (
                  <button
                    onClick={() => { setSearchQuery(''); setFilterCategory(null); }}
                    className="px-4 py-2 text-xs font-bold font-tajawal bg-slate-800 text-slate-300 rounded-xl hover:text-white transition cursor-pointer"
                  >
                    إعادة ضبط الفلاتر
                  </button>
                )}
              </div>

              {/* Category selector pills */}
              <div className="space-y-2">
                <span className="text-xs text-slate-500 font-bold flex items-center gap-1">
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>تصفية بحسب الأقسام التحريرية لجامعة عين الهدى الإسلامية:</span>
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => setFilterCategory(null)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      filterCategory === null
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                        : 'bg-slate-950 border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    جميع الأقسام ({articles.filter(a=>a.isPublished).length})
                  </button>

                  {categories.map(c => {
                    const count = articles.filter(a => a.categoryId === c.id && a.isPublished).length;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setFilterCategory(c.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          filterCategory === c.id
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : 'bg-slate-950 border-slate-850 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {c.name} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Results Grid counts */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredArticles.map(art => {
                  const category = categories.find(c => c.id === art.categoryId) || categories[0];
                  const scholar = authors.find(a => a.id === art.authorId) || authors[0];
                  return (
                    <div 
                      key={art.id} 
                      onClick={() => handleOpenArticle(art.id)}
                      className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between h-[380px] hover:shadow-xl hover:bg-blue-50/50 dark:hover:bg-blue-950/40 hover:border-blue-500/30 transition cursor-pointer group"
                    >
                      <div>
                        {/* Optional photo banner */}
                        {art.imageUrl && (
                          <div className="w-full h-40 bg-slate-950 overflow-hidden relative">
                            <img src={art.imageUrl} className="w-full h-full object-cover shrink-0 group-hover:scale-[1.02] transition duration-500" alt="صورة المقال" referrerPolicy="no-referrer" />
                          </div>
                        )}
                        <div className="p-5 space-y-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${category.color} inline-block`}>
                            {category.name}
                          </span>
                          <h4 className="text-base font-extrabold text-slate-200 font-tajawal line-clamp-2 leading-relaxed group-hover:text-blue-300 transition duration-300">
                            {art.title}
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-semibold">
                            {art.excerpt}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 border-t border-slate-850 justify-between flex items-center bg-slate-950/20">
                        <span className="text-[10px] font-bold text-blue-400 font-tajawal">
                          الشيخ: {scholar?.name.replace('أ.د. ', '')}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenArticle(art.id);
                          }}
                          className="text-xs font-bold text-sky-400 hover:text-white transition cursor-pointer"
                        >
                          قراءة المقال
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-lg font-bold text-slate-300 font-tajawal">لا توجد نتائج بحث تطابق مدخلاتك</h4>
                <p className="text-xs text-slate-500 font-semibold max-w-sm mx-auto">
                  حاول تغيير الكلمات المفتاحية لمطابقة دلالة البحوث الشرعية أو اضغط على إعادة ضبط الفلاتر بالأعلى.
                </p>
              </div>
            )}

          </div>
        )}

        {/* VIEW: EDITIONS ARCHIVE */}
        {activeView === 'editions' && (
          <div className="space-y-8">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-right">
              <h2 className="text-xl font-bold text-slate-100 font-tajawal">أرشيف الأعداد الدورية والمطبوعات الورقية</h2>
              <p className="text-xs text-slate-400 mt-1 font-semibold">
                تقدم جامعة عين الهدى الإسلامية طبعة ورقية مخملية مع طبعة رقمية PDF تتيح التحميل وقراءة البحوث الفقهية ككتيب مطبوع.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {editions.map(ed => (
                <div key={ed.id} className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center shadow shadow-blue-900/5">
                  <div className="w-36 h-48 bg-slate-950 rounded-2xl overflow-hidden shrink-0 border border-slate-800">
                    <img src={ed.coverUrl} className="w-full h-full object-cover" alt="غلاف الكتيب" referrerPolicy="no-referrer" />
                  </div>
                  <div className="space-y-3 text-right">
                    <h3 className="text-lg font-bold text-slate-200 font-tajawal">{ed.title}</h3>
                    <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                      {ed.description}
                    </p>
                    <span className="text-[10px] text-slate-500 font-bold block pt-1">تاريخ الإصدار الأكاديمي: {ed.publishDate}</span>
                    
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => handleRegisterDownload(ed.id, ed.title)}
                        className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>تحميل كتيب PDF</span>
                      </button>
                      <button
                        onClick={() => setSelectedEditionForIndex(ed.id)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-700/50 transition cursor-pointer"
                      >
                        مطالعة الفهرس التكراري
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* EDITIONS INDEX MODAL */}
            {selectedEditionForIndex !== null && (
              (() => {
                const ed = editions.find(e => e.id === selectedEditionForIndex);
                if (!ed) return null;
                const filteredEditionArticles = articles.filter(art => art.editionId === ed.id);

                return (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
                      onClick={() => setSelectedEditionForIndex(null)}
                    ></div>
                    
                    {/* Modal Content container */}
                    <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in duration-200">
                      
                      {/* Modal Header */}
                      <div className="p-6 border-b border-slate-800/80 flex items-center justify-between text-right" dir="rtl">
                        <div className="space-y-1">
                          <span className="inline-block text-[10px] bg-blue-900/40 text-blue-400 border border-blue-500/10 px-2.5 py-0.5 rounded-md font-extrabold">الفهرس التحليلي للعدد</span>
                          <h3 className="text-base font-black text-slate-100 font-tajawal">
                            {ed.title}
                          </h3>
                        </div>
                        <button 
                          onClick={() => setSelectedEditionForIndex(null)}
                          className="text-slate-400 hover:text-slate-205 p-1 rounded-lg hover:bg-slate-800 transition shrink-0 cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Modal Inner List */}
                      <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4" dir="rtl">
                        {filteredEditionArticles.length === 0 ? (
                          <div className="text-center py-10 space-y-3">
                            <BookOpen className="w-12 h-12 text-slate-700 mx-auto" />
                            <p className="text-sm font-semibold text-slate-400 font-tajawal">لا توجد مقالات أو بحوث شرعية مرتبطة بهذا العدد حالياً.</p>
                            <p className="text-xs text-slate-500 font-tajawal">سيقوم كادر التحرير بإضافة الفهرس والمحتويات قريباً.</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-xs text-slate-400 font-bold mb-2 font-tajawal">البحوث والمقالات المنشورة في هذا الإصدار ({filteredEditionArticles.length}):</p>
                            {filteredEditionArticles.map(art => {
                              const authorObj = authors.find(a => a.id === art.authorId);
                              const catObj = categories.find(c => c.id === art.categoryId);
                              return (
                                <div 
                                  key={art.id} 
                                  className="group bg-slate-950/40 hover:bg-slate-900/60 border border-slate-800 hover:border-blue-500/30 rounded-2xl p-4 transition duration-200 flex items-start sm:items-center justify-between gap-4 text-right"
                                >
                                  <div className="flex items-start sm:items-center gap-4 min-w-0">
                                    {art.imageUrl && (
                                      <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-slate-800 hidden sm:block">
                                        <img src={art.imageUrl} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                                      </div>
                                    )}
                                    <div className="space-y-1 flex-1 min-w-0">
                                      <div className="flex flex-wrap items-center gap-2">
                                        {catObj && (
                                          <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md ${catObj.color || 'bg-slate-800 text-slate-300'}`}>
                                            {catObj.name}
                                          </span>
                                        )}
                                        <span className="text-[9px] text-slate-500 font-bold flex items-center gap-1">
                                          <Clock className="w-3 h-3" />
                                          <span>وقت القراءة: {art.readTime}</span>
                                        </span>
                                      </div>
                                      <h4 className="text-xs font-extrabold text-slate-200 group-hover:text-blue-400 transition truncate">
                                        {art.title}
                                      </h4>
                                      {authorObj && (
                                        <p className="text-[10px] text-slate-400 font-bold">
                                          بقلم الشيخ/الباحث: {authorObj.name}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      setSelectedArticleId(art.id);
                                      setActiveView('reader');
                                      setSelectedEditionForIndex(null);
                                    }}
                                    className="bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/10 hover:border-transparent text-[11px] font-extrabold px-3 py-2 rounded-xl transition cursor-pointer shrink-0"
                                  >
                                    قراءة البحث
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Modal Footer */}
                      <div className="p-6 bg-slate-950/60 border-t border-slate-850 flex justify-end" dir="rtl">
                        <button
                          onClick={() => setSelectedEditionForIndex(null)}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs px-6 py-2.5 rounded-xl border border-slate-700 transition cursor-pointer font-tajawal"
                        >
                          إغلاق
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}

        {/* VIEW: CREATIVE OASIS (POEMS, STORIES, TRAVELOGUES) */}
        {activeView === 'creative' && (
          <CreativeOasis 
            initialTab={creativeTab}
            autoOpenSubmit={isCreativeSubmitOpen}
            onCloseSubmit={() => setIsCreativeSubmitOpen(false)}
            settings={settings}
          />
        )}

        {/* VIEW: SINGLE READER VIEW */}
        {activeView === 'reader' && selectedArticleId && (
          (() => {
            const art = articles.find(a => a.id === selectedArticleId);
            if (!art) return null;
            const cat = categories.find(c => c.id === art.categoryId) || categories[0];
            const aut = authors.find(a => a.id === art.authorId) || authors[0];
            return (
              <Reader 
                article={art} 
                category={cat} 
                author={aut} 
                onBack={() => {
                  setActiveView('home'); 
                  setSelectedArticleId(null);
                }}
                onLikeToggle={handleLikeToggle}
                isLikedByUser={likedArticles.includes(art.id)}
              />
            );
          })()
        )}

        {/* VIEW: SECURE ADMINISTRATIVE PANEL */}
        {activeView === 'admin' && (
          <div>
            {isAdminLoggedIn ? (
              <AdminDashboard 
                articles={articles}
                authors={authors}
                categories={categories}
                editions={editions}
                announcements={announcements}
                events={events}
                galleryItems={galleryItems}
                logs={logs}
                settings={settings}
                
                onUpdateArticles={updateArticles}
                onUpdateAuthors={updateAuthors}
                onUpdateCategories={updateCategories}
                onUpdateEditions={updateEditions}
                onUpdateAnnouncements={updateAnnouncements}
                onUpdateEvents={updateEvents}
                onUpdateGallery={updateGallery}
                onUpdateSettings={updateSettings}
                onAddLog={addLog}
              />
            ) : (
              /* Administrative verification login modal panel */
              <div className="max-w-md mx-auto bg-slate-905 border border-blue-900/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-sky-400 flex items-center justify-center mx-auto text-white shadow-lg">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100 font-tajawal">هيئة الرقابة: بوابة الإشراف والمصادقة للناشرين</h3>
                  <p className="text-xs text-slate-400 font-medium">الوصول لملفات إدارة المجلة والكود المصدري مقيَّد بمدير النظام.</p>
                </div>

                {loginError && (
                  <div className="p-3.5 rounded-xl bg-orange-950/40 border border-orange-500/20 text-orange-400 text-xs font-semibold leading-relaxed text-right flex gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-400 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold">اسم الحساب الإداري (ID) *</label>
                    <input
                      type="text"
                      required
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      placeholder="أدخل اسم الحساب الإداري"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none text-right"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold">رقم المرور السري (البوابة) *</label>
                    <input
                      type="password"
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none text-right"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold font-tajawal text-xs py-3 rounded-xl transition shadow-lg cursor-pointer"
                  >
                    تسجيل التحقق الآمن والدخول
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

      </main>

      {/* 3. MULTI-COLUMN COMPREHENSIVE FOOTER */}
      <Footer settings={settings} setActiveView={setActiveView} />

    </div>
  );
}
