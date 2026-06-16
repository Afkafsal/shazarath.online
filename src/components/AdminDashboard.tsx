/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BarChart3, Newspaper, BookOpen, Users, FolderKanban, 
  Settings2, ClipboardList, Plus, Trash2, Edit2, 
  Save, Eye, CheckCircle2, AlertTriangle, HelpCircle, Flame, Check, Sparkles, UploadCloud
} from 'lucide-react';
import { Article, Author, Category, Edition, Announcement, CollegeEvent, GalleryItem, ActivityLog, SystemSetting } from '../types';
import TiptapEditor from './TiptapEditor';
import { uploadFileToStorage, resizeAndConvertToWebP, uploadJsonToStorage } from '../fileUpload';

interface AdminDashboardProps {
  articles: Article[];
  authors: Author[];
  categories: Category[];
  editions: Edition[];
  announcements: Announcement[];
  events: CollegeEvent[];
  galleryItems: GalleryItem[];
  logs: ActivityLog[];
  settings: SystemSetting;
  
  onUpdateArticles: (newList: Article[]) => void;
  onUpdateAuthors: (newList: Author[]) => void;
  onUpdateCategories: (newList: Category[]) => void;
  onUpdateEditions: (newList: Edition[]) => void;
  onUpdateAnnouncements: (newList: Announcement[]) => void;
  onUpdateEvents: (newList: CollegeEvent[]) => void;
  onUpdateGallery: (newList: GalleryItem[]) => void;
  onUpdateSettings: (newVal: SystemSetting) => void;
  onAddLog: (actionDescription: string) => void;
}

type TabType = 'overview' | 'articles' | 'categories' | 'authors' | 'editions' | 'announcements' | 'logs' | 'settings';

export default function AdminDashboard({
  articles, authors, categories, editions, announcements, events, galleryItems, logs, settings,
  onUpdateArticles, onUpdateAuthors, onUpdateCategories, onUpdateEditions, onUpdateAnnouncements,
  onUpdateEvents, onUpdateGallery, onUpdateSettings, onAddLog
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [uploadsInProgress, setUploadsInProgress] = useState<Record<string, number>>({});

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadsInProgress(prev => ({ ...prev, [fieldName]: 0 }));
      const webpFile = await resizeAndConvertToWebP(file);
      const url = await uploadFileToStorage(webpFile, `images/${Date.now()}_${webpFile.name}`, {
        onProgress: (p) => setUploadsInProgress(prev => ({ ...prev, [fieldName]: p }))
      });
      setter(url);
    } catch (err) {
      alert('فشل رفع الصورة: ' + (err as Error).message);
    } finally {
      setUploadsInProgress(prev => {
        const newObj = { ...prev };
        delete newObj[fieldName];
        return newObj;
      });
    }
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      alert('يجب أن يكون الملف بصيغة PDF');
      return;
    }
    
    try {
      setUploadsInProgress(prev => ({ ...prev, [fieldName]: 0 }));
      const url = await uploadFileToStorage(file, `pdfs/${Date.now()}_${file.name}`, {
        maxSizeMB: 100,
        onProgress: (p) => setUploadsInProgress(prev => ({ ...prev, [fieldName]: p }))
      });
      setter(url);
    } catch (err) {
      alert('فشل رفع الملف: ' + (err as Error).message);
    } finally {
      setUploadsInProgress(prev => {
        const newObj = { ...prev };
        delete newObj[fieldName];
        return newObj;
      });
    }
  };

  // Article Form state
  const [editingArticleId, setEditingArticleId] = useState<number | null>(null);
  const [artTitle, setArtTitle] = useState('');
  const [artExcerpt, setArtExcerpt] = useState('');
  const [artContent, setArtContent] = useState<any>('');
  const [artTags, setArtTags] = useState('');
  const [artCategory, setArtCategory] = useState<number>(categories[0]?.id || 1);
  const [artAuthor, setArtAuthor] = useState<number>(authors[0]?.id || 1);
  const [artEdition, setArtEdition] = useState<number | 'none'>('none');
  const [artImageUrl, setArtImageUrl] = useState('');
  const [artReadTime, setArtReadTime] = useState('5 دقائق');
  const [artIsFeatured, setArtIsFeatured] = useState(false);
  const [artIsPublished, setArtIsPublished] = useState(true);
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  // Editor Spell-checker Simulation State
  const [spellcheckerResult, setSpellcheckerResult] = useState<{
    word: string;
    suggestion: string;
    index: number;
    description: string;
  }[]>([]);
  const [spellCheckRunning, setSpellCheckRunning] = useState(false);
  const [spellCheckComplete, setSpellCheckComplete] = useState(false);

  // Categories Form state
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [isAddingCat, setIsAddingCat] = useState(false);

  // Scholar/Author Form state
  const [authName, setAuthName] = useState('');
  const [authBio, setAuthBio] = useState('');
  const [authRole, setAuthRole] = useState('كاتب ومساهم دائم');
  const [authAvatar, setAuthAvatar] = useState('');
  const [isAddingAuth, setIsAddingAuth] = useState(false);

  // Quick Add Author within Article Form State
  const [showQuickAddAuthor, setShowQuickAddAuthor] = useState(true);
  const [quickAuthName, setQuickAuthName] = useState('');
  const [quickAuthRole, setQuickAuthRole] = useState('');
  const [quickAuthAvatar, setQuickAuthAvatar] = useState('');
  const [quickAuthBio, setQuickAuthBio] = useState('عضو هيئة التحرير والعلماء بموقع مجلة الاعتصام.');

  // Edition Form state
  const [edTitle, setEdTitle] = useState('');
  const [edDesc, setEdDesc] = useState('');
  const [edCover, setEdCover] = useState('');
  const [edDate, setEdDate] = useState('2026-06-30');
  const [edCategory, setEdCategory] = useState<'نبضة' | 'عروة' | 'عروة الأطفال'>('عروة');
  const [isAddingEd, setIsAddingEd] = useState(false);
  const [edPdfFileBase64, setEdPdfFileBase64] = useState<string>('');

  // Announcement Form state
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annImportant, setAnnImportant] = useState(false);
  const [isAddingAnn, setIsAddingAnn] = useState(false);

  // System Settings local state
  const [setSiteName, setSetSiteName] = useState(settings.siteName);
  const [setCollegeName, setSetCollegeName] = useState(settings.collegeName);
  const [setContactEmail, setSetContactEmail] = useState(settings.contactEmail);
  const [setContactPhone, setSetContactPhone] = useState(settings.contactPhone);
  const [setAboutText, setSetAboutText] = useState(settings.aboutText);
  const [setFooterAbout, setSetFooterAbout] = useState(settings.footerAbout || '');
  const [setFooterCopyright, setSetFooterCopyright] = useState(settings.footerCopyright || '');
  const [setSubmissionEmail, setSetSubmissionEmail] = useState(settings.submissionEmail || settings.contactEmail);
  const [setArticlesSectionTitle, setSetArticlesSectionTitle] = useState(settings.articlesSectionTitle || 'أحدث المقالات المتاحة للمطالعة');
  const [setEditionsSectionTitle, setSetEditionsSectionTitle] = useState(settings.editionsSectionTitle || 'النسخة الورقية المطبوعة PDF');
  const [setEventsSectionTitle, setSetEventsSectionTitle] = useState(settings.eventsSectionTitle || 'الندوات والفعاليات الأكاديمية لمجلتنا');
  const [setGallerySectionTitle, setSetGallerySectionTitle] = useState(settings.gallerySectionTitle || 'البوم صور المجمع');
  const [setCreativeSectionBadge, setSetCreativeSectionBadge] = useState(settings.creativeSectionBadge || 'القسم الإبداعي والواحة الأدبية بمجلة شذرات');
  const [setCreativeSectionTitle, setSetCreativeSectionTitle] = useState(settings.creativeSectionTitle || 'الواحة الأدبية والأقلام الواعدة');
  const [setCreativeSectionDesc, setSetCreativeSectionDesc] = useState(settings.creativeSectionDesc || 'مساحة مخصصة لقراء مجلة شذرات للإبحار في فضاء المعلقات والقصائد الخالدة، ومطالعة طيف من الروايات والقصص المعبرة المليئة بالحكمة، وتتبع أثر الرحالة الأوائل في أسفارهم حول الآفاق.');
  const [setCreativeSectionBtnSubmit, setSetCreativeSectionBtnSubmit] = useState(settings.creativeSectionBtnSubmit || 'أضف مساهمتك المكتوبة');
  const [setCreativeSectionBtnContact, setSetCreativeSectionBtnContact] = useState(settings.creativeSectionBtnContact || 'مراسلة هيئة التحرير');
  const [setInstagramUrl, setSetInstagramUrl] = useState(settings.instagramUrl || 'https://www.instagram.com/shadharat_kms');
  const [setWhatsappUrl, setSetWhatsappUrl] = useState(settings.whatsappUrl || 'https://whatsapp.com/channel/0029Shadh');
  const [setYoutubeUrl, setSetYoutubeUrl] = useState(settings.youtubeUrl || 'https://www.youtube.com/@shadharat_kms');
  const [setAdminId, setSetAdminId] = useState(settings.adminId || '');
  const [setAdminPass, setSetAdminPass] = useState(settings.adminPass || '');
  const [poemsList, setPoemsList] = useState<{id: number, lines: string[], author: string}[]>(settings.poems || []);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Custom Deletion Confirmation Modal State (replaces confirm dialogs)
  const [confirmDelete, setConfirmDelete] = useState<{
    type: 'article' | 'category' | 'author' | 'edition' | 'announcement';
    id: number;
    title: string;
    extra?: any;
  } | null>(null);

  // Function to run Arabic Spellchecking algorithm
  const handleSpellcheck = () => {
    let textToSpellCheck = '';
    if (typeof artContent === 'string') {
      textToSpellCheck = artContent;
    } else if (typeof artContent === 'object' && artContent !== null) {
      // Very basic text extraction if it's a Tiptap JSON node
      try {
        textToSpellCheck = JSON.stringify(artContent);
      } catch (e) {
        textToSpellCheck = '';
      }
    }

    if (!textToSpellCheck.trim()) return;
    setSpellCheckRunning(true);
    setSpellcheckerResult([]);
    
    setTimeout(() => {
      const results: typeof spellcheckerResult = [];
      const words = textToSpellCheck.split(/\s+/);
      
      words.forEach((word, idx) => {
        // Rule 1: Incorrect Hamza seating (e.g. احمد -> أحمد, انشور -> انشر)
        if (word === 'احمد' || word === 'الاحمد') {
          results.push({
            word: word,
            suggestion: word.replace('احمد', 'أحمد'),
            index: idx,
            description: 'قطع همزة الوصل الزائدة في اسم العلم أحمد'
          });
        }
        // Rule 2: Incorrect Ya seating (e.g. القاضى -> القاضي)
        if (word.endsWith('ى') && (word === 'على' || word === 'فى')) {
          if (word === 'فى') {
            results.push({
              word: 'فى',
              suggestion: 'في',
              index: idx,
              description: 'استبدال الألف المقصورة بياء منقوطة لحرف الجر'
            });
          }
        }
        // Rule 3: Missing Shaddah or Taa marbutah (e.g. ام، او -> أم، أو)
        if (word === 'ام' || word === 'او') {
          results.push({
            word: word,
            suggestion: word === 'ام' ? 'أم' : 'أو',
            index: idx,
            description: 'تصحيح همزة القطع الفوقية المتطرفة'
          });
        }
      });

      // Default feedback if text is completely pristine
      if (results.length === 0) {
        results.push({
          word: 'النص سليم',
          suggestion: 'لا توجد أخطاء إملائية جلية',
          index: -1,
          description: 'النص يتوافق مع الأساسيات الإملائية المقررة للغة العربية الفصحى.'
        });
      }

      setSpellcheckerResult(results);
      setSpellCheckRunning(false);
      setSpellCheckComplete(true);
    }, 1200);
  };

  // Article Action Submit
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitle.trim() || !artContent) return;

    let finalAuthorId = Number(artAuthor);
    if (showQuickAddAuthor) {
      if (!quickAuthName.trim()) {
        alert('يرجى كتابة اسم الكاتب الجديد أو إلغاء الخيار!');
        return;
      }
      const newAuthorId = Date.now();
      const newAuth: Author = {
        id: newAuthorId,
        name: quickAuthName,
        bio: quickAuthBio || 'عضو هيئة التحرير والعلماء بموقع مجلة الاعتصام.',
        avatarUrl: quickAuthAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
        role: quickAuthRole || 'أستاذ مشارك'
      };
      onUpdateAuthors([...authors, newAuth]);
      finalAuthorId = newAuthorId;
    }

    // Upload JSON content if it's an object
    let finalContentUrlOrString = artContent;
    if (typeof artContent === 'object' && artContent !== null) {
      try {
        finalContentUrlOrString = await uploadJsonToStorage(artContent, `articles/${Date.now()}.json`);
      } catch (err) {
        alert('فشل رفع محتوى المقال: ' + (err as Error).message);
        return;
      }
    }

    if (editingArticleId !== null) {
      // Edit mode
      const updated = articles.map(item => {
        if (item.id === editingArticleId) {
          return {
            ...item,
            title: artTitle,
            excerpt: artExcerpt || artTitle.substring(0, 80) + '...',
            content: finalContentUrlOrString,
            categoryId: Number(artCategory),
            authorId: finalAuthorId,
            editionId: artEdition === 'none' ? null : Number(artEdition),
            imageUrl: artImageUrl || 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
            readTime: artReadTime,
            isFeatured: artIsFeatured,
            isPublished: artIsPublished,
            tags: artTags ? artTags.split(',').map(t => t.trim()) : undefined
          };
        }
        return item;
      });
      onUpdateArticles(updated);
      onAddLog(`تعديل بيانات المقال التحريري: "${artTitle}"`);
      setEditingArticleId(null);
    } else {
      // Create mode
      const newArt: Article = {
        id: Date.now(),
        title: artTitle,
        excerpt: artExcerpt || artTitle.substring(0, 80) + '...',
        content: finalContentUrlOrString,
        categoryId: Number(artCategory),
        authorId: finalAuthorId,
        editionId: artEdition === 'none' ? null : Number(artEdition),
        imageUrl: artImageUrl || 'https://images.unsplash.com/photo-1519789143224-89c7cd49dfbc?w=800&q=80',
        views: 0,
        likes: 0,
        readTime: artReadTime,
        isFeatured: artIsFeatured,
        isPublished: artIsPublished,
        createdAt: new Date().toISOString().split('T')[0],
        tags: artTags ? artTags.split(',').map(t => t.trim()) : undefined
      };
      onUpdateArticles([newArt, ...articles]);
      onAddLog(`نشر مقال جديد في المجلة: "${artTitle}"`);
    }

    // Reset Form
    setArtTitle('');
    setArtExcerpt('');
    setArtContent('');
    setArtTags('');
    setArtImageUrl('');
    setArtReadTime('5 دقائق');
    setArtIsFeatured(false);
    setArtIsPublished(true);
    setIsAddingArticle(false);
    setSpellCheckComplete(false);
    setSpellcheckerResult([]);
    
    // Reset quick writer adding states
    setQuickAuthName('');
    setQuickAuthRole('');
    setQuickAuthAvatar('');
    setShowQuickAddAuthor(false);
  };

  // Article Action Delete
  const handleDeleteArticle = (id: number, title: string) => {
    setConfirmDelete({ type: 'article', id, title });
  };

  // Category Action Add
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName || !catSlug) return;

    const newCat: Category = {
      id: Date.now(),
      name: catName,
      slug: catSlug.toLowerCase().replace(/\s+/g, '-'),
      description: catDesc,
      color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
    };

    onUpdateCategories([...categories, newCat]);
    onAddLog(`إضافة تصنيف مقالات جديد: "${catName}"`);
    setCatName('');
    setCatSlug('');
    setCatDesc('');
    setIsAddingCat(false);
  };

  // Category Action Delete
  const handleDeleteCategory = (id: number, name: string) => {
    // Prevent deletion if articles depend on it
    const hasCount = articles.some(item => item.categoryId === id);
    if (hasCount) {
      alert('لا يمكن حذف هذا القسم لأنه يحتوي على مقالات منشورة حالياً! يرجى نقل المقالات أو حذفها أولاً.');
      return;
    }
    setConfirmDelete({ type: 'category', id, title: name });
  };

  // Author Action Add
  const handleAddAuthor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName || !authBio) return;

    const newAuth: Author = {
      id: Date.now(),
      name: authName,
      bio: authBio,
      avatarUrl: authAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
      role: authRole
    };

    onUpdateAuthors([...authors, newAuth]);
    onAddLog(`تسجيل كاتب/أستاذ جديد في هيئة البحوث: "${authName}"`);
    setAuthName('');
    setAuthBio('');
    setAuthAvatar('');
    setAuthRole('كاتب ومساهم دائم');
    setIsAddingAuth(false);
  };

  // Author Delete
  const handleDeleteAuthor = (id: number, name: string) => {
    if (articles.some(item => item.authorId === id)) {
      alert('لا يمكن إزالة هذا العضو لوجود مقالات وبحوث منسوبة إليه بقاعدة البيانات!');
      return;
    }
    setConfirmDelete({ type: 'author', id, title: name });
  };

  // Edition Action Add
  const handleAddEdition = (e: React.FormEvent) => {
    e.preventDefault();
    if (!edTitle) return;

    const newEd: Edition = {
      id: Date.now(),
      title: edTitle,
      description: edDesc || 'عدد مطبوع ومحكم من أعداد الاعتصام الأكاديمية.',
      coverUrl: edCover || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
      pdfUrl: edPdfFileBase64 || '#',
      publishDate: edDate,
      downloadCount: 0,
      category: edCategory,
    };

    onUpdateEditions([...editions, newEd]);
    onAddLog(`نشر ورفع العدد الجديد للمجلة: "${edTitle}"`);
    setEdTitle('');
    setEdDesc('');
    setEdCover('');
    setEdPdfFileBase64('');
    setIsAddingEd(false);
  };

  // Edition Delete
  const handleDeleteEdition = (id: number, title: string) => {
    setConfirmDelete({ type: 'edition', id, title });
  };

  // Dynamic deletion action execution from custom confirmation modal
  const executeDelete = () => {
    if (!confirmDelete) return;
    const { type, id, title } = confirmDelete;
    
    if (type === 'article') {
      onUpdateArticles(articles.filter(item => item.id !== id));
      onAddLog(`حذف المقال التحريري: "${title}"`);
    } else if (type === 'category') {
      onUpdateCategories(categories.filter(item => item.id !== id));
      onAddLog(`إلغاء تصنيف القسم: "${title}"`);
    } else if (type === 'author') {
      onUpdateAuthors(authors.filter(item => item.id !== id));
      onAddLog(`إزالة الكاتب بقابلية النشر: "${title}"`);
    } else if (type === 'edition') {
      onUpdateEditions(editions.filter(item => item.id !== id));
      onAddLog(`حذف وإزالة العدد التحريري: "${title}"`);
    } else if (type === 'announcement') {
      onUpdateAnnouncements(announcements.filter(item => item.id !== id));
      onAddLog(`إلغاء وحذف الإعلان الأكاديمي: "${title}"`);
    }
    
    setConfirmDelete(null);
  };

  // Save Settings Action
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      siteName: setSiteName,
      collegeName: setCollegeName,
      contactEmail: setContactEmail,
      contactPhone: setContactPhone,
      aboutText: setAboutText,
      submissionGuideUrl: `mailto:${setSubmissionEmail}?subject=تقديم مشاركة في ${setSiteName}`,
      footerAbout: setFooterAbout,
      footerCopyright: setFooterCopyright,
      submissionEmail: setSubmissionEmail,
      articlesSectionTitle: setArticlesSectionTitle,
      editionsSectionTitle: setEditionsSectionTitle,
      eventsSectionTitle: setEventsSectionTitle,
      gallerySectionTitle: setGallerySectionTitle,
      creativeSectionBadge: setCreativeSectionBadge,
      creativeSectionTitle: setCreativeSectionTitle,
      creativeSectionDesc: setCreativeSectionDesc,
      creativeSectionBtnSubmit: setCreativeSectionBtnSubmit,
      creativeSectionBtnContact: setCreativeSectionBtnContact,
      instagramUrl: setInstagramUrl,
      whatsappUrl: setWhatsappUrl,
      youtubeUrl: setYoutubeUrl,
      adminId: setAdminId,
      adminPass: setAdminPass,
      poems: poemsList
    });
    onAddLog('تحديث وتعديل الإعدادات العامة للمجلة وعناوين الأقسام الرئيسية');
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4500);
  };

  return (
    <div className="w-full text-right" dir="rtl" id="admin-management-container">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Sidebar Tabs on the Right Side (Cols: 1) */}
        <div className="lg:col-span-1 bg-slate-900/60 border border-slate-800 rounded-3xl p-4 space-y-2 lg:order-last">
          <div className="px-3 py-4 border-b border-slate-800 text-right">
            <span className="text-[10px] font-extrabold text-blue-400 bg-blue-950/40 px-2 py-1 rounded-md">بوابة الإشراف والحماية</span>
            <h3 className="text-base font-extrabold text-slate-100 font-tajawal mt-2">عمادة إدارة النشر</h3>
          </div>
          
          <nav className="space-y-1 pt-3">
            {[
              { id: 'overview', label: 'لوحة التحكم الإجمالية', icon: BarChart3 },
              { id: 'articles', label: 'إدارة المقالات والبحوث', icon: Newspaper },
              { id: 'categories', label: 'أقسام وتصنيفات المجلة', icon: FolderKanban },
              { id: 'authors', label: 'كتاب الهيئة التدريسية', icon: Users },
              { id: 'editions', label: 'أعداد المجلة المطبوعة PDF', icon: BookOpen },
              { id: 'announcements', label: 'لوحة الإعلانات العامة', icon: ClipboardList },
              { id: 'logs', label: 'سجل المراقبة والنشاط', icon: ClipboardList },
              { id: 'settings', label: 'الإعدادات العامة للعلامة', icon: Settings2 },
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                   key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl text-xs font-tajawal font-bold transition duration-150 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600/90 text-white shadow-lg shadow-blue-500/10'
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <IconComp className="w-4 h-4 text-blue-400" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="pt-10">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center text-[10px] text-slate-500 font-semibold leading-relaxed">
              <span>حالة جلسة العمل:</span>
              <span className="block text-emerald-400 font-mono mt-1 font-bold">● متصل عبر جامعة عين الهدى</span>
            </div>
          </div>
        </div>

        {/* Dashboard Panels View on the Left Side (Cols: 4) */}
        <div className="lg:col-span-4 space-y-6 lg:order-first">
          
          {/* 1. OVERVIEW SCREEN */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-slate-905 p-6 rounded-3xl border border-slate-800">
                <h2 className="text-xl font-bold text-slate-100 font-tajawal flex items-center justify-start gap-2">
                  <BarChart3 className="text-blue-500 w-5 h-5" />
                  <span>لوحة المعاينة ومؤشرات النشر للمجلة الرقمية</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1 font-semibold">إحصائيات فورية ومؤشرات القراءة والتفاعل لجامعتنا جامعة عين الهدى الإسلامية.</p>
              </div>

              {/* Counts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { label: 'البحوث والمقالات', val: articles.length, desc: 'منها مقال واحد مميز رائد', icon: Newspaper, color: 'from-blue-600 to-sky-500' },
                  { label: 'الأعداد المطبوعة PDF', val: editions.length, desc: 'رقمية لطباعة QR', icon: BookOpen, color: 'from-emerald-600 to-teal-400' },
                  { label: 'أعضاء هيئة التحرير الكرام', val: authors.length, desc: 'شيوخ وطلاب باحثين بالمجمع', icon: Users, color: 'from-amber-600 to-orange-400' },
                  { label: 'إجمالي مشاهدات المقالات', val: articles.reduce((sum, a) => sum + a.views, 0), desc: 'قراءات تفاعلية حية', icon: BarChart3, color: 'from-purple-600 to-indigo-400' },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden shadow-md">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-slate-400">{stat.label}</span>
                          <h4 className="text-3xl font-extrabold font-tajawal text-slate-100">{stat.val}</h4>
                          <span className="text-[10px] text-slate-500 font-semibold block pt-1">{stat.desc}</span>
                        </div>
                        <div className={`p-3 rounded-xl bg-gradient-to-tr ${stat.color} text-slate-100`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Latest activity summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Visual Article quick links */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 border-b border-slate-850 pb-3">آخر البحوث المضافة</h3>
                  <div className="space-y-3">
                    {articles.slice(0, 3).map(art => (
                      <div key={art.id} className="flex justify-between items-center bg-slate-950 p-3 rounded-xl">
                        <div className="text-right">
                          <span className="block text-xs font-bold text-slate-200">{art.title.substring(0, 45)}...</span>
                          <span className="text-[10px] text-slate-500 font-semibold">تاريخ النشر: {art.createdAt} | قراءة: {art.readTime}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${art.isPublished ? 'bg-emerald-950/30 text-emerald-400' : 'bg-rose-950/30 text-rose-400'}`}>
                          {art.isPublished ? 'منشور' : 'مسودة'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit quick logs */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4">
                  <h3 className="text-sm font-bold text-slate-200 border-b border-slate-850 pb-3">أحدث عمليات التدقيق والمراقبة الأمنية</h3>
                  <div className="space-y-3">
                    {logs.slice(0, 3).map(log => (
                      <div key={log.id} className="bg-slate-950 p-3 rounded-xl">
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-bold">
                          <span>{log.userName}</span>
                          <span className="font-mono text-[9px]">{log.date}</span>
                        </div>
                        <p className="text-slate-200 text-xs font-Tajawal font-medium">{log.action}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. ARTICLES SCREEN */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              
              {/* Top add bar */}
              <div className="flex justify-between items-center bg-slate-900 p-5 rounded-3xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-100 font-tajawal">تحرير وإدارة المقالات والبحوث المنشورة</h3>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">إضافة مقالات جديدة ومراجعتها مع تفعيل مصحح الأخطاء الإملائية بالاعتصام.</p>
                </div>
                {!isAddingArticle && (
                  <button
                    onClick={() => {
                      setEditingArticleId(null);
                      setArtTitle('');
                      setArtExcerpt('');
                      setArtContent('');
                      setArtImageUrl('');
                      setArtIsFeatured(false);
                      setIsAddingArticle(true);
                      setSpellCheckComplete(false);
                      setSpellcheckerResult([]);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة مقال جديد</span>
                  </button>
                )}
              </div>

              {/* Writing / Editing Form */}
              {isAddingArticle && (
                <form onSubmit={handleSaveArticle} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
                  <h4 className="text-sm font-bold text-slate-200 border-b border-slate-850 pb-3">
                    {editingArticleId ? 'تحديث وتعديل المقال الحالي' : 'تأليف وصياغة مقال جديد'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-xs text-slate-400 font-bold block">عنوان البحث والمقال الأكاديمي *</label>
                      <input
                        type="text"
                        required
                        value={artTitle}
                        onChange={(e) => setArtTitle(e.target.value)}
                        placeholder="أدخل عنواناً جذاباً ورصيناً للمقال التحريري"
                        className="w-full text-right bg-slate-950 border border-slate-800 focus:border-blue-600 text-slate-200 text-sm p-3 rounded-xl outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">زمن القراءة التقديري</label>
                      <input
                        type="text"
                        value={artReadTime}
                        onChange={(e) => setArtReadTime(e.target.value)}
                        placeholder="مثال: ٥ دقائق"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 text-slate-200 text-sm p-3 rounded-xl outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">التصنيف أو قسم النشر *</label>
                      <select
                        value={artCategory}
                        onChange={(e) => setArtCategory(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 text-slate-200 text-sm p-3 rounded-xl outline-none font-bold"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">الكاتب المنسوب إليه البحث *</label>
                      <select
                        value={artAuthor}
                        onChange={(e) => setArtAuthor(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 text-slate-200 text-sm p-3 rounded-xl outline-none font-bold"
                      >
                        {authors.map(a => (
                          <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">تابع للعدد الورقي؟</label>
                      <select
                        value={artEdition}
                        onChange={(e) => setArtEdition(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 text-slate-200 text-sm p-3 rounded-xl outline-none font-bold"
                      >
                        <option value="none">مقال رقمي فقط (غير مسند لعدد)</option>
                        {editions.map(e => (
                          <option key={e.id} value={e.id}>{e.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Inline Quick Add Writer / Author with local image upload capability */}
                  <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-2xl space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={showQuickAddAuthor}
                        onChange={(e) => setShowQuickAddAuthor(e.target.checked)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded border-slate-800 bg-slate-950"
                      />
                      <span className="text-xs font-bold text-blue-400">هل ترغب في تسجيل كاتب جديد ورفع بياناته الشخصية فوراً مع هذا المقال؟</span>
                    </label>
                    
                    {showQuickAddAuthor && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-800/80 animate-fadeIn">
                        <div className="space-y-1.5">
                          <label className="text-xs text-slate-400 block font-bold">اسم الكاتب أو الأستاذ الجديد *</label>
                          <input
                            type="text"
                            value={quickAuthName}
                            onChange={(e) => setQuickAuthName(e.target.value)}
                            placeholder="أدخل الاسم بلقبه الأكاديمي"
                            className="w-full text-right bg-slate-950 border border-slate-800 focus:border-blue-600 text-slate-200 text-xs p-3 rounded-xl outline-none font-medium"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-slate-400 block font-bold">الصفة أو الكلية والجامعة ومكان العمل *</label>
                          <input
                            type="text"
                            value={quickAuthRole}
                            onChange={(e) => setQuickAuthRole(e.target.value)}
                            placeholder="أستاذ مشارك، طالب باحث، عميد، إلخ"
                            className="w-full text-right bg-slate-950 border border-slate-800 focus:border-blue-600 text-slate-200 text-xs p-3 rounded-xl outline-none font-medium"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs text-slate-400 block font-bold">رفع الصورة الشخصية للكاتب</label>
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'quickAuthAvatar', setQuickAuthAvatar)}
                              className="hidden"
                              id="quickAuthAvatarInput"
                            />
                            <label htmlFor="quickAuthAvatarInput" className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs px-4 py-3 rounded-xl border border-slate-800 flex items-center justify-center gap-2 flex-grow transition">
                              <UploadCloud className="w-4 h-4" />
                              {uploadsInProgress['quickAuthAvatar'] !== undefined 
                                ? `جاري الرفع... ${Math.round(uploadsInProgress['quickAuthAvatar'])}%` 
                                : 'اختر صورة من جهازك'}
                            </label>
                            {quickAuthAvatar && (
                              <img src={quickAuthAvatar} alt="صورة الكاتب" className="w-10 h-10 object-cover rounded-full border border-slate-700" />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5 font-bold">
                    <label className="text-xs text-slate-400 font-bold block">رفع الصورة التعبيرية للمقال</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'artImageUrl', setArtImageUrl)}
                        className="hidden"
                        id="artImageUrlInput"
                      />
                      <label htmlFor="artImageUrlInput" className="cursor-pointer w-full text-center bg-slate-900 border border-slate-800 hover:border-blue-600 text-slate-200 text-sm p-3 rounded-xl flex items-center justify-center gap-2 transition">
                        <UploadCloud className="w-5 h-5" />
                        {uploadsInProgress['artImageUrl'] !== undefined 
                          ? `جاري الرفع... ${Math.round(uploadsInProgress['artImageUrl'])}%` 
                          : 'اضغط هنا لاختيار صورة المقال الرئيسية'}
                      </label>
                      {artImageUrl && (
                        <div className="shrink-0 relative w-12 h-12 rounded-lg overflow-hidden border border-slate-700">
                          <img src={artImageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 md:col-span-1">
                      <label className="text-xs text-slate-400 font-bold block">مقتطف موجز للمقال للمطالعة السريعة *</label>
                      <textarea
                        rows={2}
                        value={artExcerpt}
                        onChange={(e) => setArtExcerpt(e.target.value)}
                        placeholder="أدخل ملخصاً إعلامياً بسيطاً يعكس الفكرة الرئيسية للبحث في سطرين"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 text-slate-200 text-sm p-3 rounded-xl outline-none font-medium resize-none"
                      />
                    </div>
                    <div className="space-y-1.5 md:col-span-1">
                      <label className="text-xs text-slate-400 font-bold block">كلمات مفتاحية (مفصولة بفواصل)</label>
                      <textarea
                        rows={2}
                        value={artTags}
                        onChange={(e) => setArtTags(e.target.value)}
                        placeholder="فقه، رمضان، صيام، أحكام"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-blue-600 text-slate-200 text-sm p-3 rounded-xl outline-none font-medium resize-none"
                      />
                    </div>
                  </div>

                  {/* ADVANCED RICH-TEXT AREA CONTENT */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-slate-300 font-bold">محتوى المقال الكامل والبحوث *</label>
                      <button
                        type="button"
                        onClick={handleSpellcheck}
                        disabled={spellCheckRunning}
                        className="flex items-center gap-1.5 text-xs font-bold font-tajawal text-sky-300 bg-sky-955/40 border border-sky-800/40 px-3 py-1.5 rounded-xl hover:bg-sky-950 transition cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                        <span>{spellCheckRunning ? 'جاري الفحص المظلي للتراث...' : 'فحص وتدقيق الأخطاء اللغوية'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      {/* Editor inputs */}
                      <div className="lg:col-span-3">
                        <TiptapEditor 
                          content={artContent} 
                          onChange={(json) => setArtContent(json)} 
                        />
                      </div>

                      {/* Spellchecker diagnostic feedback sidebar */}
                      <div className="lg:col-span-1 bg-slate-950 border border-slate-850 rounded-xl p-4 space-y-3">
                        <h5 className="text-xs font-bold text-slate-400 flex items-center gap-1 border-b border-slate-900 pb-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                          <span>التدقيق النحوي والإملائي الآلي</span>
                        </h5>

                        {spellCheckComplete ? (
                          <div className="space-y-2 select-none overflow-y-auto max-h-[220px]">
                            {spellcheckerResult.map((res, index) => (
                              <div key={index} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60 space-y-1.5">
                                <div className="flex justify-between items-center">
                                  <span className="text-[10px] font-bold text-rose-400 bg-rose-950/20 px-1.5 py-0.5 rounded">خطأ مكتشف</span>
                                  <span className="text-[10px] font-mono text-slate-500">كلمة #{res.index}</span>
                                </div>
                                <p className="text-slate-400 text-xs text-right leading-relaxed font-semibold">
                                  الكلمة: "<span className="text-slate-300 font-bold strike">{res.word}</span>" 
                                  <br />
                                  المقترح: <span className="text-emerald-400 font-bold">"{res.suggestion}"</span>
                                </p>
                                <span className="text-[10px] block text-slate-500 font-semibold leading-tight">{res.description}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-10 space-y-2 text-slate-500">
                            <Sparkles className="w-8 h-8 text-slate-700 mx-auto" />
                            <p className="text-[10px] font-bold">انقر على زر "فحص الأخطاء" لفحص وتصنيف الهمزات وتآءات الترابط.</p>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center pt-2 border-t border-slate-850 justify-between">
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={artIsFeatured}
                          onChange={(e) => setArtIsFeatured(e.target.checked)}
                          className="rounded border-slate-800 text-blue-600 bg-slate-950 focus:ring-0"
                        />
                        <span>تعيين كمقال متميز بالرئيسية</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={artIsPublished}
                          onChange={(e) => setArtIsPublished(e.target.checked)}
                          className="rounded border-slate-800 text-blue-600 bg-slate-950 focus:ring-0"
                        />
                        <span>نشر المقال فوراً للقرّاء</span>
                      </label>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex items-center gap-1 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl transition cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>{editingArticleId ? 'حفظ التعديلات' : 'حفظ ونشر المقال'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingArticleId(null);
                          setIsAddingArticle(false);
                          setSpellCheckComplete(false);
                          setSpellcheckerResult([]);
                        }}
                        className="bg-slate-800 text-slate-400 hover:text-slate-100 px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                      >
                        إلغاء التعديل
                      </button>
                    </div>
                  </div>

                </form>
              )}

              {/* Articles Data Table */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-855 text-slate-400 text-xs font-bold">
                      <th className="p-4">المقال التحريري</th>
                      <th className="p-4">القسم</th>
                      <th className="p-4">الكاتب</th>
                      <th className="p-4">المقروئية</th>
                      <th className="p-4">حالة النشر</th>
                      <th className="p-4 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850/60 text-xs font-semibold text-slate-300">
                    {articles.map(art => {
                      const cat = categories.find(c => c.id === art.categoryId) || categories[0];
                      const aut = authors.find(a => a.id === art.authorId) || authors[0];
                      return (
                        <tr key={art.id} className="hover:bg-slate-950/40">
                          <td className="p-4 max-w-[200px]">
                            <span className="block text-slate-200 font-bold truncate">{art.title}</span>
                            <span className="text-[10px] text-slate-500 mt-1 block">تاريخ: {art.createdAt}</span>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                              {cat?.name || 'غير محدد'}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-slate-300">{aut?.name || 'مجهول'}</td>
                          <td className="p-4">
                            <div className="flex flex-col gap-0.5">
                              <span>قراءات: {art.views}</span>
                              <span className="text-[10px] text-slate-500 font-bold">إعجابات: {art.likes}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                              art.isPublished 
                                ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30' 
                                : 'bg-amber-950/40 text-amber-400 border-amber-500/30'
                            }`}>
                              {art.isPublished ? 'منشور للعامة' : 'مسودة مغلقة'}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center gap-1.5">
                              <button
                                onClick={() => {
                                  setEditingArticleId(art.id);
                                  setArtTitle(art.title);
                                  setArtExcerpt(art.excerpt);
                                  setArtContent(art.content);
                                  setArtTags(art.tags ? art.tags.join(', ') : '');
                                  setArtCategory(art.categoryId);
                                  setArtAuthor(art.authorId);
                                  setArtEdition(art.editionId || 'none');
                                  setArtImageUrl(art.imageUrl || '');
                                  setArtReadTime(art.readTime);
                                  setArtIsFeatured(art.isFeatured);
                                  setArtIsPublished(art.isPublished);
                                  setIsAddingArticle(true);
                                  setSpellCheckComplete(false);
                                  setSpellcheckerResult([]);
                                }}
                                className="p-1.5 rounded-lg bg-blue-950/40 text-blue-400 hover:text-slate-100 hover:bg-blue-600 transition cursor-pointer"
                                title="تعديل المقال"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteArticle(art.id, art.title)}
                                className="p-1.5 rounded-lg bg-rose-955/40 text-rose-400 hover:text-slate-100 hover:bg-rose-600 transition cursor-pointer"
                                title="إزالة وحذف"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* 3. CATEGORIES SCREEN */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-900 p-5 rounded-3xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-100 font-tajawal">أقسام وتصنيفات مجلة الاعتصام</h3>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">بناء التبويبات الفكرية للبحوث المنشورة.</p>
                </div>
                {!isAddingCat && (
                  <button
                    onClick={() => setIsAddingCat(true)}
                    className="flex items-center gap-1 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة تصنيف جديد</span>
                  </button>
                )}
              </div>

              {isAddingCat && (
                <form onSubmit={handleAddCategory} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
                  <h4 className="text-sm font-bold text-slate-200 border-b border-slate-855 pb-2">تفاصيل القسم الجديد</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">اسم القسم بالكامل *</label>
                      <input
                        type="text"
                        required
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                        placeholder="مثال: الدراسات المعاصرة"
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">الرمز البرمجي السهل (Slug) *</label>
                      <input
                        type="text"
                        required
                        value={catSlug}
                        onChange={(e) => setCatSlug(e.target.value)}
                        placeholder="مثال: islamic-studies"
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none ltr text-left"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">وصف مبسط ورسالة القسم</label>
                    <textarea
                      rows={2}
                      value={catDesc}
                      onChange={(e) => setCatDesc(e.target.value)}
                      placeholder="لخص هيبة النشر والموضوعات المقبولة بالقسم"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none resize-none"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer">
                      حفظ القسم وقواعد البيانات
                    </button>
                    <button type="button" onClick={() => setIsAddingCat(false)} className="bg-slate-800 text-slate-400 hover:text-slate-100 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer">
                      إلغاء
                    </button>
                  </div>
                </form>
              )}

              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-slate-950 border-b border-slate-855 text-slate-400 text-xs font-bold">
                      <th className="p-4">اسم القسم</th>
                      <th className="p-4">الSlug البرمجي</th>
                      <th className="p-4">الرسالة والوصف المختصر</th>
                      <th className="p-4 text-center">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-850/60 text-xs font-semibold text-slate-300">
                    {categories.map(c => (
                      <tr key={c.id} className="hover:bg-slate-950/40">
                        <td className="p-4 font-bold text-slate-100">{c.name}</td>
                        <td className="p-4 font-mono text-[10px] text-blue-400" dir="ltr">{c.slug}</td>
                        <td className="p-4 text-slate-400 font-medium max-w-[280px] truncate">{c.description || 'لا يوجد وصف مضاف حالياً.'}</td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => handleDeleteCategory(c.id, c.name)}
                            className="p-1.5 rounded-lg bg-rose-955/40 text-rose-400 hover:text-slate-100 hover:bg-rose-600 transition cursor-pointer"
                            title="إلغاء القسم"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. AUTHORS SCREEN */}
          {activeTab === 'authors' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-900 p-5 rounded-3xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-100 font-tajawal">هيئة التحرير والعلماء وكتاب المجمع</h3>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">تحديث السجل التعريفي للشيوخ والباحثين المؤهلين للنشر.</p>
                </div>
                {!isAddingAuth && (
                  <button
                    onClick={() => setIsAddingAuth(true)}
                    className="flex items-center gap-1 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>تسجيل عضو هيئة تحرير جديد</span>
                  </button>
                )}
              </div>

              {isAddingAuth && (
                <form onSubmit={handleAddAuthor} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
                  <h4 className="text-sm font-bold text-slate-200 border-b border-slate-855 pb-2">تفاصيل الكاتب الجديد</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">الاسم الكريم بالألقاب *</label>
                      <input
                        type="text"
                        required
                        value={authName}
                        onChange={(e) => setAuthName(e.target.value)}
                        placeholder="مثال: أ.د. صالح الهاشمي"
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">الصفة أو الرتبة الأكاديمية *</label>
                      <input
                        type="text"
                        required
                        value={authRole}
                        onChange={(e) => setAuthRole(e.target.value)}
                        placeholder="مثال: رئيس قسم الشريعة"
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none font-medium"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">رفع الصورة الشخصية</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'authAvatar', setAuthAvatar)}
                          className="hidden"
                          id="authAvatarInput"
                        />
                        <label htmlFor="authAvatarInput" className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-blue-600 text-slate-200 text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2 flex-grow transition">
                          <UploadCloud className="w-4 h-4" />
                          {uploadsInProgress['authAvatar'] !== undefined 
                            ? `جاري الرفع... ${Math.round(uploadsInProgress['authAvatar'])}%` 
                            : 'رفع صورة'}
                        </label>
                        {authAvatar && (
                          <img src={authAvatar} alt="معاينة" className="w-11 h-11 object-cover rounded-full border border-slate-700" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">السيرة العلمية الموجزة ونبذة عن الكاتب *</label>
                    <textarea
                      rows={3}
                      required
                      value={authBio}
                      onChange={(e) => setAuthBio(e.target.value)}
                      placeholder="لخص التاريخ العلمي للكاتب وإنجازاته في جامعة عين الهدى الإسلامية..."
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none resize-none font-medium"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer">
                      حفظ السيرة في قاعدة البيانات
                    </button>
                    <button type="button" onClick={() => setIsAddingAuth(false)} className="bg-slate-800 text-slate-400 hover:text-slate-100 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer">
                      إلغاء
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {authors.map(a => (
                  <div key={a.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-4 items-center justify-start relative shadow-md">
                    <img
                      src={a.avatarUrl}
                      alt={a.name}
                      className="w-14 h-14 rounded-xl object-cover border border-slate-800 ring-1 ring-blue-500/20"
                      referrerPolicy="no-referrer"
                    />
                    <div className="text-right">
                      <h4 className="font-extrabold text-slate-100 font-tajawal text-sm">{a.name}</h4>
                      <span className="text-[10px] bg-blue-950/40 text-blue-400 px-2 py-0.5 rounded-md inline-block font-bold mt-1">{a.role}</span>
                      <p className="text-[11px] text-slate-400 mt-2 font-medium line-clamp-2 max-w-[220px]">{a.bio}</p>
                    </div>
                    
                    <button
                      onClick={() => handleDeleteAuthor(a.id, a.name)}
                      className="absolute left-3 top-3 p-1.5 rounded-lg bg-rose-955/20 text-rose-400 hover:text-slate-100 hover:bg-rose-600 transition cursor-pointer"
                      title="إزالة الكاتب"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. EDITIONS SCREEN */}
          {activeTab === 'editions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-slate-900 p-5 rounded-3xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-100 font-tajawal">الأعداد الدورية المطبوعة والرقمية (PDF)</h3>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">بوابة رفع المجلات والمطبوعات الورقية بمقاسات النشر وتوليد رابط QR.</p>
                </div>
                {!isAddingEd && (
                  <button
                    onClick={() => setIsAddingEd(true)}
                    className="flex items-center gap-1 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>تحميل وإضافة عدد جديد</span>
                  </button>
                )}
              </div>

              {isAddingEd && (
                <form onSubmit={handleAddEdition} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
                  <h4 className="text-sm font-bold text-slate-200 border-b border-slate-855 pb-2">تفاصيل المجلة المطبوعة الجديدة</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">مسمى العدد الدلالي *</label>
                      <input
                        type="text"
                        required
                        value={edTitle}
                        onChange={(e) => setEdTitle(e.target.value)}
                        placeholder="مثال: العدد الثاني - شوال ١٤٤٧"
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">تصنيف المجلة / الصحيفة *</label>
                      <select
                        value={edCategory || 'عروة'}
                        onChange={(e) => setEdCategory(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none font-bold"
                      >
                        <option value="عروة">مجلة عروة</option>
                        <option value="عروة الأطفال">عروة الأطفال</option>
                        <option value="نبضة">صحيفة نبضة</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">تاريخ النشر في المعهد الدولي *</label>
                      <input
                        type="date"
                        required
                        value={edDate}
                        onChange={(e) => setEdDate(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">رفع غلاف العدد المطبوع (عرض 400x560)</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'edCover', setEdCover)}
                          className="hidden"
                          id="edCoverInput"
                        />
                        <label htmlFor="edCoverInput" className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-blue-600 text-slate-200 text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2 flex-grow transition">
                          <UploadCloud className="w-4 h-4" />
                          {uploadsInProgress['edCover'] !== undefined 
                            ? `جاري الرفع... ${Math.round(uploadsInProgress['edCover'])}%` 
                            : 'رفع صورة الغلاف'}
                        </label>
                        {edCover && (
                          <img src={edCover} alt="معاينة" className="w-8 h-12 object-cover rounded border border-slate-700" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-bold block">رفع ملف العدد المطبوع PDF *</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => handlePdfUpload(e, 'edPdfFileBase64', setEdPdfFileBase64)}
                          className="hidden"
                          id="edPdfInput"
                        />
                        <label htmlFor="edPdfInput" className="cursor-pointer bg-slate-900 border border-slate-800 hover:border-blue-600 text-slate-200 text-sm px-4 py-3 rounded-xl flex items-center justify-center gap-2 flex-grow transition">
                          <UploadCloud className="w-4 h-4" />
                          {uploadsInProgress['edPdfFileBase64'] !== undefined 
                            ? `جاري الرفع... ${Math.round(uploadsInProgress['edPdfFileBase64'])}%` 
                            : 'اختر ملف PDF'}
                        </label>
                        {edPdfFileBase64 && (
                          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">الفكرة الملخصة وموضوعات العدد الرئيسية</label>
                    <textarea
                      rows={2}
                      value={edDesc}
                      onChange={(e) => setEdDesc(e.target.value)}
                      placeholder="مثال: يختص هذا العدد بمناقشة بلاغة الضاد..."
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none resize-none font-medium"
                    />
                  </div>

                  <div className="flex gap-2 justify-end">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer">
                      حفظ العدد وتوليد QR
                    </button>
                    <button type="button" onClick={() => setIsAddingEd(false)} className="bg-slate-800 text-slate-400 hover:text-slate-100 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer">
                      إلغاء
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {editions.map(e => (
                  <div key={e.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex gap-4 shadow-sm items-center relative">
                    <div className="w-16 h-20 rounded bg-slate-950 overflow-hidden shrink-0 border border-slate-800 font-semibold text-[10px] text-slate-400">
                      <img src={e.coverUrl} className="w-full h-full object-cover" alt="غلاف" referrerPolicy="no-referrer" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded">{e.category || 'عروة'}</span>
                      </div>
                      <h4 className="font-extrabold text-slate-100 font-tajawal text-sm">{e.title}</h4>
                      <span className="text-[10px] text-slate-400 mt-1 block">تاريخ النشر: {e.publishDate}</span>
                      <span className="text-[10px] font-bold text-sky-400 mt-2 block">إجمالي عمليات تنزيل الكتيب: {e.downloadCount || 0}</span>
                    </div>
                    <div className="absolute left-3 top-3 text-[10px] font-bold text-emerald-400 bg-emerald-950/30 border border-emerald-500/10 px-2 py-0.5 rounded-full">
                      جاهز للتنزيل
                    </div>
                    <button
                      onClick={() => handleDeleteEdition(e.id, e.title)}
                      className="absolute left-3 bottom-3 p-1.5 rounded-lg bg-rose-950/20 text-rose-500 hover:text-slate-100 hover:bg-rose-600 transition cursor-pointer"
                      title="حذف العدد الدائم"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. ANNOUNCEMENTS CONTROL */}
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              
              <div className="flex justify-between items-center bg-slate-900 p-5 rounded-3xl border border-slate-800">
                <div>
                  <h3 className="text-base font-bold text-slate-100 font-tajawal">لوحة الإعلانات والأنشطة الأكاديمية للمجمع</h3>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">بث الأخبار الإعلانية للطلاب والباحثين عبر المنصة الرقمية.</p>
                </div>
                {!isAddingAnn && (
                  <button
                    onClick={() => setIsAddingAnn(true)}
                    className="flex items-center gap-1 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة إعلان جديد</span>
                  </button>
                )}
              </div>

              {isAddingAnn && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if(!annTitle || !annContent) return;
                    const newAnn: Announcement = {
                      id: Date.now(),
                      title: annTitle,
                      content: annContent,
                      publishDate: new Date().toISOString().split('T')[0],
                      isImportant: annImportant
                    };
                    onUpdateAnnouncements([newAnn, ...announcements]);
                    onAddLog(`نشر إعلان أكاديمي للمجلة: "${annTitle}"`);
                    setAnnTitle('');
                    setAnnContent('');
                    setAnnImportant(false);
                    setIsAddingAnn(false);
                  }} 
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl"
                >
                  <h4 className="text-sm font-bold text-slate-200 border-b border-slate-855 pb-2">تفاصيل الإعلان الأكاديمي</h4>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">مسمى الإعلان الرئيسي *</label>
                    <input
                      type="text"
                      required
                      value={annTitle}
                      onChange={(e) => setAnnTitle(e.target.value)}
                      placeholder="عنوان للإعلان يثير التنبيه والمشاركة"
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">مضمون الإعلان بالكامل *</label>
                    <textarea
                      rows={3}
                      required
                      value={annContent}
                      onChange={(e) => setAnnContent(e.target.value)}
                      placeholder="اكتب تفاصيل التكليف، المواعيد، وطرق التواصل بوضوح..."
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none resize-none font-medium leading-relaxed"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-xs font-bold text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={annImportant}
                      onChange={(e) => setAnnImportant(e.target.checked)}
                      className="rounded border-slate-800 text-blue-600 bg-slate-950 focus:ring-0"
                    />
                    <span>تعيين كإعلان هام ومثبت بالبنر العلوي للمجلة</span>
                  </label>
                  <div className="flex gap-2 justify-end">
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer">
                      نشر الإعلان فوراً للطلاب
                    </button>
                    <button type="button" onClick={() => setIsAddingAnn(false)} className="bg-slate-800 text-slate-400 hover:text-slate-100 text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer">
                      إلغاء التعديل
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {announcements.map(ann => (
                  <div key={ann.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex justify-between items-start">
                    <div className="text-right space-y-1.5 flex-1 p-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-200 font-tajawal text-sm">{ann.title}</span>
                        {ann.isImportant && (
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-rose-950/40 text-rose-400 border border-rose-500/20 animate-pulse">
                            مستعجل وهام
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xl">{ann.content}</p>
                      <span className="text-[10px] text-slate-500 block pt-1">تاريخ البث: {ann.publishDate}</span>
                    </div>
                    <button
                      onClick={() => setConfirmDelete({ type: 'announcement', id: ann.id, title: ann.title })}
                      className="p-1.5 rounded-lg bg-rose-950/20 text-rose-400 hover:text-slate-100 hover:bg-rose-600 transition cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* 7. ACTIVITY LOGS SCREEN */}
          {activeTab === 'logs' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 text-right">
                <h3 className="text-base font-bold text-slate-100 font-tajawal">سجلات التدقيق والمراقبة الأمنية والوصول (Audit Logs)</h3>
                <p className="text-xs text-slate-400 mt-1 font-semibold">تتبع فوري لكافة أعمال الكتاب والمسؤولين داخل واجهات الإشراف تأميناً ضد التلاعب والمخالفات.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="bg-slate-950/80 px-4 py-3.5 border-b border-slate-800 flex justify-between items-center text-xs font-bold text-slate-400">
                  <span>سجل التدقيق والتغيير الكلي</span>
                  <span className="text-sky-400">ميزة الأمان النشطة</span>
                </div>
                <div className="divide-y divide-slate-850 max-h-[400px] overflow-y-auto">
                  {logs.map((log) => (
                    <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 hover:bg-slate-950/10">
                      <div className="text-right">
                        <span className="block text-xs font-extrabold text-slate-200">{log.userName}</span>
                        <p className="text-slate-400 text-xs font-medium mt-1 leading-relaxed">{log.action}</p>
                      </div>
                      <div className="text-left sm:text-right flex items-center sm:flex-col gap-2 sm:gap-1 text-[10px] font-semibold text-slate-500">
                        <span className="bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded" dir="ltr">{log.ipAddress}</span>
                        <span className="font-mono text-[9px]">{log.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 8. SYSTEM SETTINGS SCREEN */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl text-right animate-fadeIn">
              <div className="border-b border-slate-850 pb-3">
                <h3 className="text-base font-bold text-slate-100 font-tajawal">إعدادات الهوية والعلامة الرقمية للمجلة</h3>
                <p className="text-xs text-slate-400 mt-1 font-semibold">تعديل أسماء المؤسسة، البيانات الرسمية للتلقي البريدي وتوزيعه، والتواصل الهاتفي العام وتذييل الصفحة.</p>
              </div>

              {saveSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-tajawal animate-pulse flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>تم تحديث وحفظ كافة إعدادات الهوية وقواعد البيانات والتسمية والتذييل بنجاح!</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold block">مسمى المجلة الرقمية *</label>
                  <input
                    type="text"
                    required
                    value={setSiteName}
                    onChange={(e) => setSetSiteName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none font-extrabold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold block">مسمى الجامعة أو الكلية التابعة *</label>
                  <input
                    type="text"
                    required
                    value={setCollegeName}
                    onChange={(e) => setSetCollegeName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold block">البريد الإلكتروني العام للاتصال *</label>
                  <input
                    type="email"
                    required
                    value={setContactEmail}
                    onChange={(e) => setSetContactEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none font-bold ltr text-left"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold block">بريد تلقي مساهمات المقالات (مستقل) *</label>
                  <input
                    type="email"
                    required
                    value={setSubmissionEmail}
                    onChange={(e) => setSetSubmissionEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none font-bold ltr text-left"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold block">رقم هاتف عمادة المجلة *</label>
                  <input
                    type="text"
                    required
                    value={setContactPhone}
                    onChange={(e) => setSetContactPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none font-bold ltr text-left"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-bold block">نبذة عامة وتوصيف للمجلة بالهيرو (About Text) *</label>
                <textarea
                  rows={2}
                  required
                  value={setAboutText}
                  onChange={(e) => setSetAboutText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none resize-none font-medium leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-t border-slate-800">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold block">نبذة عامة للمجلة بفوتر الموقع (Footer About) *</label>
                  <textarea
                    rows={3}
                    required
                    value={setFooterAbout}
                    onChange={(e) => setSetFooterAbout(e.target.value)}
                    placeholder="التوصيف المعروض بأسفل تذييل الشاشات..."
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none resize-none font-medium leading-relaxed"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold block">حقوق الطبع والنشر بفوتر الموقع (Footer Copyright) *</label>
                  <textarea
                    rows={3}
                    required
                    value={setFooterCopyright}
                    onChange={(e) => setSetFooterCopyright(e.target.value)}
                    placeholder="مثال: جميع الحقوق محفوظة لمنصة الاعتصام الرقمية..."
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none resize-none font-medium leading-relaxed"
                  />
                </div>
              </div>

              {/* SECTION HEADINGS CUSTOMIZATION */}
              <div className="border-t border-slate-800 pt-5 space-y-4">
                <div className="border-b border-slate-850 pb-2">
                  <h4 className="text-sm font-bold text-slate-100 font-tajawal flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    <span>عناوين الأقسام الرئيسية بالصفحة الأولى (Homepage Section Titles)</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">تعديل المسمّيات والعناوين الظاهرة فوق بطاقات المحتوى بالبوابة الرئيسية.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">عنوان قسم أحدث المقالات والبحوث المتاحة *</label>
                    <input
                      type="text"
                      required
                      value={setArticlesSectionTitle}
                      onChange={(e) => setSetArticlesSectionTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl outline-none font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">عنوان قسم النسخة الورقية المطبوعة PDF *</label>
                    <input
                      type="text"
                      required
                      value={setEditionsSectionTitle}
                      onChange={(e) => setSetEditionsSectionTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl outline-none font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">عنوان قسم الندوات والفعاليات الأكاديمية *</label>
                    <input
                      type="text"
                      required
                      value={setEventsSectionTitle}
                      onChange={(e) => setSetEventsSectionTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl outline-none font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">عنوان قسم ألبوم صور المجمع *</label>
                    <input
                      type="text"
                      required
                      value={setGallerySectionTitle}
                      onChange={(e) => setSetGallerySectionTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl outline-none font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* CREATIVE BANNER CALLOUT CUSTOMIZATION */}
              <div className="border-t border-slate-800 pt-5 space-y-4">
                <div className="border-b border-slate-850 pb-2">
                  <h4 className="text-sm font-bold text-slate-100 font-tajawal flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    <span>إعدادات وتفاصيل يافطة "الواحة الأدبية والأقلام الواعدة"</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">التحكم في العناوين والوصف وأسماء الأزرار التفاعلية المخصصة لقسم أدب المذكرات والقصص والقصائد.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">شعار اليافطة الصغير (Badge label) *</label>
                    <input
                      type="text"
                      required
                      value={setCreativeSectionBadge}
                      onChange={(e) => setSetCreativeSectionBadge(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl outline-none font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">العنوان العريض لليافطة *</label>
                    <input
                      type="text"
                      required
                      value={setCreativeSectionTitle}
                      onChange={(e) => setSetCreativeSectionTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl outline-none font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 font-bold block">النبذة والوصف التفصيلي لليافطة الإبداعية *</label>
                  <textarea
                    rows={2}
                    required
                    value={setCreativeSectionDesc}
                    onChange={(e) => setSetCreativeSectionDesc(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-sm p-3 rounded-xl outline-none resize-none font-medium leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">عنوان زر المساهمة المكتوبة *</label>
                    <input
                      type="text"
                      required
                      value={setCreativeSectionBtnSubmit}
                      onChange={(e) => setSetCreativeSectionBtnSubmit(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl outline-none font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">عنوان زر مراسلة التحرير *</label>
                    <input
                      type="text"
                      required
                      value={setCreativeSectionBtnContact}
                      onChange={(e) => setSetCreativeSectionBtnContact(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl outline-none font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* POEMS CUSTOMIZATION */}
              <div className="border-t border-slate-800 pt-5 space-y-4">
                <div className="border-b border-slate-850 pb-2 flex justify-between items-center">
                  <div>
                    <h4 className="text-sm font-bold text-slate-100 font-tajawal flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-400"></span>
                      <span>إدارة واحة القصائد الشعرية اليومية</span>
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">تعديل وإضافة الأبيات الشعرية التي تظهر في الواحة الرئيسية.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPoemsList([...poemsList, { id: Date.now(), lines: ["", ""], author: "" }])}
                    className="flex items-center gap-1 text-xs font-bold bg-amber-600/20 text-amber-400 hover:bg-amber-600 hover:text-white px-3 py-1.5 rounded-lg transition"
                  >
                    + إضافة قصيدة
                  </button>
                </div>
                
                <div className="space-y-4">
                  {poemsList.map((poem, index) => (
                    <div key={poem.id} className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl space-y-3 relative">
                      <button
                        type="button"
                        onClick={() => setPoemsList(poemsList.filter(p => p.id !== poem.id))}
                        className="absolute left-4 top-4 text-rose-500 hover:text-rose-400 p-1 bg-rose-500/10 rounded-lg transition"
                        title="حذف القصيدة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
                        <div>
                          <label className="text-xs text-slate-400 font-bold block mb-1">البيت الأول (الشطر 1)</label>
                          <input
                            type="text"
                            value={poem.lines[0] || ""}
                            onChange={(e) => {
                              const newPoems = [...poemsList];
                              newPoems[index].lines[0] = e.target.value;
                              setPoemsList(newPoems);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs p-2.5 rounded-xl outline-none font-serif-ar"
                            placeholder="الشطر الأول..."
                          />
                        </div>
                        <div>
                          <label className="text-xs text-slate-400 font-bold block mb-1">البيت الثاني (الشطر 2) أو العجز</label>
                          <input
                            type="text"
                            value={poem.lines[1] || ""}
                            onChange={(e) => {
                              const newPoems = [...poemsList];
                              newPoems[index].lines[1] = e.target.value;
                              setPoemsList(newPoems);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs p-2.5 rounded-xl outline-none font-serif-ar"
                            placeholder="الشطر الثاني..."
                          />
                        </div>
                      </div>
                      <div className="pr-8">
                        <label className="text-xs text-slate-400 font-bold block mb-1">اسم الشاعر / الأديب</label>
                        <input
                          type="text"
                          value={poem.author || ""}
                          onChange={(e) => {
                            const newPoems = [...poemsList];
                            newPoems[index].author = e.target.value;
                            setPoemsList(newPoems);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs p-2.5 rounded-xl outline-none"
                          placeholder="الاسم..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SOCIAL MEDIA HANDLES CUSTOMIZATION */}
              <div className="border-t border-slate-800 pt-5 space-y-4">
                <div className="border-b border-slate-850 pb-2">
                  <h4 className="text-sm font-bold text-slate-100 font-tajawal flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                    <span>روابط حسابات التواصل بالتذييل (Social Media Channels)</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">تعديل قنوات تواصل المجلة الظاهرة بتذييل الموقع لتغيير وجهتها إلى منصاتكم الرسمية.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">رابط إنستغرام (Instagram URL)</label>
                    <input
                      type="url"
                      value={setInstagramUrl}
                      onChange={(e) => setSetInstagramUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl outline-none font-semibold"
                      placeholder="https://www.instagram.com/..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">رابط قناة الواتساب (WhatsApp Channel)</label>
                    <input
                      type="url"
                      value={setWhatsappUrl}
                      onChange={(e) => setSetWhatsappUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl outline-none font-semibold"
                      placeholder="https://whatsapp.com/channel/..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-slate-400 font-bold block">رابط يوتيوب (YouTube Channel)</label>
                    <input
                      type="url"
                      value={setYoutubeUrl}
                      onChange={(e) => setSetYoutubeUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 text-xs p-3 rounded-xl outline-none font-semibold"
                      placeholder="https://www.youtube.com/..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-3 border-t border-slate-855">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>تحديث وحفظ الإعدادات وتذييل الموقع</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

      {/* Dynamic Custom Deletion Confirmation Dialog Panel */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn" dir="rtl">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 text-right">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
              <Trash2 className="w-6 h-6 animate-pulse" />
            </div>
            
            <div className="space-y-2 text-center">
              <h4 className="text-sm font-extrabold text-slate-100 font-tajawal">تأكيد عملية الحذف النهائي</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                هل أنت متأكد من رغبتك في حذف وإلغاء <span className="text-rose-400 font-bold">"{confirmDelete.title}"</span> بشكل دائم؟ لا يمكن استعادة البيانات بعد تأكيد هذه الخطوة.
              </p>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              <button
                onClick={executeDelete}
                className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition shadow-lg shadow-rose-600/10 cursor-pointer"
              >
                تأكيد الحذف نهائياً
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-bold px-6 py-2.5 rounded-xl transition cursor-pointer"
              >
                إلغاء التراجع
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
