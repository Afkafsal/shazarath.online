/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Author, Category, Article, Edition, Announcement, CollegeEvent, GalleryItem, ActivityLog, SystemSetting } from './types';

export const INITIAL_AUTHORS: Author[] = [
  {
    id: 1,
    name: "رئاسة تحرير مجلة شذرات",
    bio: "الهيئة العلمية والاستشارية لشؤون النشر والتحكيم بقسم اللغة العربية وآدابها بمجمع ك أم أو الإسلامي.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&q=80",
    role: "رئاسة التحرير"
  },
  {
    id: 2,
    name: "أركان قسم اللغة العربية",
    bio: "أعضاء هيئة الندوة العلمية بقسم اللغة العربية وآدابها بمجمع ك أم أو الإسلامي.",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80",
    role: "هيئة التدريس والعلماء"
  },
  {
    id: 3,
    name: "بلال عبد الوهاب المليباري",
    bio: "مترجم لغوي وباحث متميز في اللسانيات وعلوم البلاغة العربية وتواصلها الحضاري بمليبار والهند.",
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
    color: "bg-indigo-600/10 text-indigo-400 border-indigo-600/20"
  },
  {
    id: 5,
    name: "رئيسية",
    slug: "home-featured",
    description: "المقالات والبحوث الرئيسية التي تتصدر أعداد مجلة شذرات وتوجه الخط العام.",
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

export const INITIAL_EDITIONS: Edition[] = [
  {
    id: 1,
    title: "العدد الأول من مجلة شذرات الورقية",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&auto=format&fit=crop&q=80",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    publishDate: "ذو القعدة ١٤٤٧",
    description: "طبعة خاصة من مجلة شذرات تضم بحوث الكلية والأشعار الخالدة وقسماً مستقلاً لتاريخ النحو في مليبار.",
    downloadCount: 45
  },
  {
    id: 2,
    title: "شذرات - العدد الثاني تواصل اللغات في الهند",
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=80",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    publishDate: "شوال ١٤٤٧",
    description: "طبعة ترصد حركة النثر والتأليف العربي في شبه القارة الهندية، ومجموعة مقالات علمية ومحكّمة لأعضاء هيئة التدريس.",
    downloadCount: 32
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 1,
    title: "تأثير لغة الضاد في تطور البلاغة واللسانيات ببهارات ومليبار",
    excerpt: "دراسة استقصائية أكاديمية تبحث الجذور المشتركة للتواصل والأثر البلاغي والفكري للأدب العربي بساحل مليبار الجنوبي وجنوب آسيا.",
    content: "لقد كان ساحل مليبار الهندي دائمًا واحة غناء تلتقي فيها لغات وحضارات المحيط الهندي بروح الضاد وجمالها النثري والشعري الفسيح. إن دخول اللغة العربية إلى هذه الديار لم يكن مقتصرًا على الجوانب التعبدية بل جلب معه مدرسة لغوية متكاملة صهرت روح البلاغة وصنوف الفصاحة في بيئات النثر المحلي والترجمات العلمية والشعرية العميقة. في هذا البحث، نستعرض أهم الإنجازات الأكاديمية التي حققها الباحثون الأوائل والمعاصرون لترقية حضور لغة الضاد بالصروح التعليمية في مجمع ك أم أو الإسلامي وتتبع تطور النحو والأساليب الإنشائية عبر القرون المنصرمة لبيان الجدارية الحضارية التي تنهض عليها مجلتنا.",
    categoryId: 1,
    authorId: 1,
    editionId: 1,
    imageUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80",
    views: 124,
    likes: 42,
    readTime: "7 دقائق",
    isFeatured: true,
    isPublished: true,
    createdAt: "2026-06-12"
  },
  {
    id: 2,
    title: "مفهوم البلاغة الإنسانية في شروح المعلقات والقصائد الخالدة",
    excerpt: "مراجعة نقدية وجوانب فكرية حول تفكيك المعلقات السبع ومكانتها الجوهرية لترقية الفهم التحريري المعاصر لقراء مجلتنا الحكيمة.",
    content: "البلاغة هي ليست مجرد تزويق للألفاظ أو زخرفة للسطر المكتوب، بل هي تجسيد لحكمة النفوس وعمق تجارب الإنسانية في سياق بياني معجز وسهل ممتنع. من هذا المنطلق، يطرح هذا البحث قراءة متجددة للعيون الشعرية البارزة وقصائد المعلقات التي تربط جمال العصر القديم بروح المعمورة والضمير الإنساني الواعد. إن المعلقات تبسط قضايا التسامي والمكارم والحكمة العملية الصالحة لمواجهة التحديات الثقافية والتربوية المعاصرة بلغة ترتقي بروح المناقشة لتجعل الواحة الأدبية في مجلتنا ملاذاً آمناً للأقلام والعلماء الساعين لإحياء الإرث البلاغي النبيل.",
    categoryId: 2,
    authorId: 3,
    editionId: 1,
    imageUrl: "https://images.unsplash.com/photo-1519789143224-89c7cd49dfbc?w=800&auto=format&fit=crop&q=80",
    views: 89,
    likes: 27,
    readTime: "5 دقائق",
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-06-13"
  },
  {
    id: 3,
    title: "مقاصد الشريعة في تدبير المعاملات وفقه النوازل المعاصرة",
    excerpt: "نفحات فقهية ومقاصدية متزنة تبسط معالم اليسر الشرعي والمرونة الفقهية في رعاية وحفظ مصالح الخلق ودفع المفاسد.",
    content: "إن تميز الشريعة الإسلامية يكمن في صلاحيتها لكل زمان ومكان بفضل قواعدها الكلية ومقاصدها الغراء المرتبطة برعاية مصالح العباد وتأصيل مفاهيم المودة والتآزر الاجتماعي. يسلط هذا البحث الفقهي بالقسم الديني الضوء على ميكانيزمات استخراج الأجوبة للنوازل الاقتصادية والتربوية المعاصرة بروح المقاصد الشرعية الخمسة الأساسية، مع مراجعة تاريخ الاجتهاد الرصين في مليبار ودور كبار المفتين والجمعيات العلمية في التوجيه والإرشاد الواعي المتزن.",
    categoryId: 7,
    authorId: 2,
    editionId: 2,
    imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?w=800&auto=format&fit=crop&q=80",
    views: 110,
    likes: 38,
    readTime: "6 دقائق",
    isFeatured: false,
    isPublished: true,
    createdAt: "2026-06-11"
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: "بدء فتح باب تقديم المقالات والبحوث للعدد الثالث من مجلة شذرات",
    content: "تعلن أمانة قسم اللغة العربية وآدابها بمجمع ك أم أو الإسلامي السادة الأساتذة والطلبة الأفاضل والباحثين في كل مكان عن بدء استقبال البحوث والمراجعات للعدد الثالث من المجلة، ويرجى إرسال المشاركات بصيغتها النهائية قبل نهاية الشهر الجاري للمراجعة السريعة.",
    publishDate: "2026-06-12",
    isImportant: true
  }
];

export const INITIAL_EVENTS: CollegeEvent[] = [
  {
    id: 1,
    title: "المؤتمر العلمي الدولي حول تواصل اللغة العربية في كيرالا والهند",
    description: "مؤتمر سنوي بحضور أساتذة متميزين من أنحاء مختلفة لعمداء المعاهد ورؤساء أقسام اللغة العربية لمناقشة آفاق ومستقبل لغة الضاد بالهند ومجمع ك أم أو الإسلامي والبحث في آليات تعزيز لغة الحوار السامية بالساحات المعرفية المعاصرة.",
    date: "2026-06-25",
    location: "القاعة الكبرى والمسرح الرئيسي، مجمع ك أم أو الإسلامي"
  },
  {
    id: 2,
    title: "أمسية منبر الأدب والخطابة وكتابة مجلة شذرات",
    description: "أمسية إبداعية لتبادل النقد الأدبي وقراءة المساهمات الأدبية بصفة دورية وقصائد لغة الضاد المعبرة بمجمع ك أم أو الإسلامي.",
    date: "2026-06-28",
    location: "مسرح الكلية، مجمع ك أم أو الإسلامي"
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 1,
    title: "مبنى مجمع ك أم أو الإسلامي الرئيسي",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
    category: "المباني",
    date: "2026-06-10"
  },
  {
    id: 2,
    title: "مكتبة قسم اللغة العربية المركزية",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&auto=format&fit=crop&q=80",
    category: "الأنشطة الأكاديمية",
    date: "2026-06-11"
  }
];

export const INITIAL_LOGS: ActivityLog[] = [
  {
    id: 1,
    userName: "بريد الإدارة العامة",
    action: "تحديث وتهيئة المنصة الرقمية لمجلة شذرات - قسم اللغة العربية بمجمع ك أم أو الإسلامي",
    ipAddress: "192.168.1.100",
    date: new Date().toISOString().replace('T', ' ').substring(0, 16)
  }
];

export const INITIAL_SETTINGS: SystemSetting = {
  siteName: "شذرات",
  collegeName: "قسم اللغة العربية وآدابها بمجمع ك أم أو الإسلامي",
  contactEmail: "shadharat@gmail.com",
  contactPhone: "+91 95444 47144",
  aboutText: "مجلة شذرات هي منصة دينية وفكرية وثقافية وأكاديمية رصينة تصدرها أركان قسم اللغة العربية وآدابها بمجمع ك أم أو الإسلامي، كيرالا، الهند. تعنى المجلة بالدراسات الإسلامية الأكاديمية وبحوث التربية وأدبيات لغة الضاد، مع تسليط الضوء على إبداعات القراء بمختلف مجالات الفن والأدب العربي الفصيح ونشر ثقافة الوسطية والاعتدال لخدمة اللسان العربي.",
  submissionGuideUrl: "mailto:shadharat@gmail.com?subject=تقديم مشاركة في مجلة شذرات",
  footerAbout: "منصة دينية وأكاديمية وثقافية رصينة صادرة عن قسم اللغة العربية وآدابها بمجمع ك أم أو الإسلامي لتنمية الوعي الأدبي والبحوث الأكاديمية بلغة الضاد.",
  footerCopyright: "جميع الحقوق محفوظة لقسم اللغة العربية وآدابها بمجمع ك أم أو الإسلامي وصوتها التحريري المبارك.",
  submissionEmail: "shadharat@gmail.com",
  articlesSectionTitle: "أحدث المقالات المتاحة للمطالعة",
  editionsSectionTitle: "النسخة الورقية المطبوعة PDF",
  eventsSectionTitle: "الندوات والفعاليات الأكاديمية لمجلتنا",
  gallerySectionTitle: "ألبوم صور الكلية والمجمع",
  creativeSectionBadge: "القسم الإبداعي والواحة الأدبية بمجلة شذرات",
  creativeSectionTitle: "الواحة الأدبية والأقلام الواعدة",
  creativeSectionDesc: "مساحة مخصصة لقراء مجلة شذرات للإبحار في فضاء المعلقات والقصائد الخالدة، ومطالعة طيف من الروايات والقصص المعبرة المليئة بالحكمة، وتتبع أثر الرحالة الأوائل في أسفارهم حول الآفاق.",
  creativeSectionBtnSubmit: "أضف مساهمتك المكتوبة",
  creativeSectionBtnContact: "مراسلة هيئة التحرير",
  instagramUrl: "https://www.instagram.com/shadharat_kms",
  whatsappUrl: "https://whatsapp.com/channel/0029Shadh",
  youtubeUrl: "https://www.youtube.com/@shadharat_kms",
  adminId: "admin",
  adminPass: "admin123"
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
