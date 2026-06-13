/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Author, Category, Article, Edition, Announcement, CollegeEvent, GalleryItem, ActivityLog, SystemSetting } from './types';

export const INITIAL_AUTHORS: Author[] = [
  {
    id: 1,
    name: "الأستاذ موسى الفيضي",
    bio: "كاتب وباحث إسلامي قدير، متخصص في الفقه المقارن، وقضايا التربية والفكر المعاصر بالهند ومليبار.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
    role: "رئيس التحرير"
  },
  {
    id: 2,
    name: "هيئة تحرير الاعتصام",
    bio: "المكتب الإعلامي واللجنة العلمية بجمعية الإحسان الطلابية، جامعة عين الهدى الإسلامية كاباد.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80",
    role: "إدارة المجلة"
  },
  {
    id: 3,
    name: "محمد نضير الودادي",
    bio: "باحث ومترجم لغوي متميز في ولاية كيرالا، يُعنى بالأدب العربي وتاريخ اللغة وتواصلها الحضاري.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
    role: "كاتب وباحث"
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "دراسات",
    slug: "studies",
    description: "دراسات وبحوث أكاديمية معمقة في شروح الشريعة والفكر التحرري المعاصر المعتمد.",
    color: "bg-emerald-600/10 text-emerald-400 border-emerald-600/20"
  },
  {
    id: 2,
    name: "أدبيات",
    slug: "literature",
    description: "إبداعات من روائع الموهبة الأدبية والشعر الرصين وتأملات في جمال وبلاغة الضاد.",
    color: "bg-indigo-600/10 text-indigo-450 border-indigo-600/20"
  },
  {
    id: 5,
    name: "رئيسية",
    slug: "home-featured",
    description: "المقالات والبحوث الرئيسية التي تتصدر أعداد مجلة الاعتصام وتوجه الخط العام.",
    color: "bg-rose-600/10 text-rose-400 border-rose-600/20"
  },
  {
    id: 6,
    name: "مراجعة",
    slug: "reviews",
    description: "مراجعات علمية للكتب الهادفة، والإصدارات الحديثة، وقراءة نقدية في النصوص والمصنفات.",
    color: "bg-sky-600/10 text-sky-400 border-sky-600/20"
  },
  {
    id: 7,
    name: "دينيات",
    slug: "religion",
    description: "مقالات شرعية ونفحات فقهية معاصرة ومواعظ دينية مباركة تلامس الفكر القويم.",
    color: "bg-teal-600/10 text-teal-400 border-teal-600/20"
  }
];

export const INITIAL_EDITIONS: Edition[] = [];

export const INITIAL_ARTICLES: Article[] = [];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [];

export const INITIAL_EVENTS: CollegeEvent[] = [
  {
    id: 1,
    title: "المؤتمر العلمي الدولي حول تواصل اللغة العربية في كيرالا والهند",
    description: "مؤتمر سنوي بحضور أساتذة متميزين من دول مختلفة وعمداء المعاهد الشرعية والتربوية لمناقشة آفاق ومستقبل لغة الضاد بالهند وميكانيزمات تعزيز حضورها بالساحات المعرفية المعاصرة.",
    date: "2026-06-25",
    location: "القاعة الكبرى للمحاضرات، جامعة عين الهدى الإسلامية - كاباد"
  },
  {
    id: 2,
    title: "أمسية منبر الأدب والخطابة وكتابة المقالات الإبداعية السنوية",
    description: "أمسية أدبية واحتفالية برعاية جمعية الإحسان ويقدم الطلبة المبدعون خلالها قراءات شعرية ونثرية وحوارات ثقافية هادفة تبرز جدارتهم البلاغية واللغوية.",
    date: "2026-07-15",
    location: "ستوديو ومدرج الواحة الأدبية، كاباد - كيرالا"
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 1,
    title: "حفل توزيع جوائز الاعتصام السنوية للبحوث والأدب",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=80",
    category: "فعاليات وأنشطة",
    date: "رمضان ١٤٤٧"
  },
  {
    id: 2,
    title: "الندوة الفكرية الأكاديمية الأولى في كلية عين الهدى",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&auto=format&fit=crop&q=80",
    category: "ندوات طلابية",
    date: "ذو القعدة ١٤٤٧"
  },
  {
    id: 3,
    title: "الحرم الجامعي لجامعة عين الهدى بمدينة كاباد الساحلية كيرالا",
    imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?w=400&auto=format&fit=crop&q=80",
    category: "أروقة الجامعة",
    date: "شوال ١٤٤٧"
  }
];

export const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 1,
    userName: "الأستاذ موسى الفيضي (رئيس التحرير)",
    action: "تحديث وتهيئة المنصة الرقمية لمجلة الاعتصام - جامعة عين الهدى الإسلامية",
    ipAddress: "192.168.1.100",
    date: new Date().toISOString().replace('T', ' ').substring(0, 16)
  }
];

export const INITIAL_SETTINGS: SystemSetting = {
  siteName: "الاعتصام",
  collegeName: "جامعة عين الهدى الإسلامية، كيرالا",
  contactEmail: "iathisammonthly@gmail.com",
  contactPhone: "+91 95444 47144",
  aboutText: "مجلة الاعتصام هي منصة دينية وفكرية وثقافية رصينة تصدرها جمعية الإحسان الطلابية بجامعة عين الهدى الإسلامية كاباد بكيرالا، الهند. تعنى المجلة بالدراسات الإسلامية الأكاديمية وبحوث التربية وأدبيات لغة الضاد، مع تسليط الضوء على إبداعات الباحثين باللغة العربية وقضايا المجتمع المسلم لإعلاء ثقافة الوسطية والاعتدال والتميز الأدبي الخالد.",
  submissionGuideUrl: "mailto:iathisammonthly@gmail.com?subject=تقديم مشاركة في مجلة الاعتصام",
  footerAbout: "منصة دينية وأكاديمية وثقافية رصينة صادرة عن جمعية الإحسان الطلابية بكيرالا لترقية الوعي الأدبي والبحوث الشرعية الرائدة بلغة الضاد.",
  footerCopyright: "جميع الحقوق محفوظة لجامعة عين الهدى الإسلامية وصوتها التحريري الممثل بجمعية الإحسان الطلابية.",
  submissionEmail: "iathisammonthly@gmail.com",
  articlesSectionTitle: "أحدث المقالات المتاحة للمطالعة",
  editionsSectionTitle: "النسخة الورقية المطبوعة PDF",
  eventsSectionTitle: "الندوات والفعاليات الأكاديمية لمجلتنا",
  gallerySectionTitle: "البوم صور المجمع",
  creativeSectionBadge: "القسم الإبداعي والواحة الأدبية بمجلة الاعتصام",
  creativeSectionTitle: "الواحة الأدبية والأقلام الواعدة",
  creativeSectionDesc: "مساحة مخصصة لقراء مجلة الاعتصام للإبحار في فضاء المعلقات والقصائد الخالدة، ومطالعة طيف من الروايات والقصص المعبرة المليئة بالحكمة، وتتبع أثر الرحالة الأوائل في أسفارهم حول الآفاق.",
  creativeSectionBtnSubmit: "أضف مساهمتك المكتوبة",
  creativeSectionBtnContact: "مراسلة هيئة التحرير",
  instagramUrl: "https://www.instagram.com/aiathisam_monthly",
  whatsappUrl: "https://whatsapp.com/channel/0029Va9N",
  youtubeUrl: "https://www.youtube.com/@aiathisam",
  adminId: "afsal",
  adminPass: "afsal007"
};

// Simple helper functions to read and write database to localStorage to facilitate full SPA editing capability!
export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(`al_urwah_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading storage key ${key}:`, error);
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`al_urwah_${key}`, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving storage key ${key}:`, error);
  }
}
