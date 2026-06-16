/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Author, Category, Article, Edition, Announcement, CollegeEvent, GalleryItem, ActivityLog, SystemSetting } from './types';

export const INITIAL_AUTHORS: Author[] = [];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "دراسات",
    slug: "studies",
    description: "دراسات وبحوث أكاديمية معمقة في شروح الشريعة والفكر التحرري المعاصر المعتمد.",
    color: "tag-culture"
  },
  {
    id: 2,
    name: "أدبيات",
    slug: "literature",
    description: "إبداعات من روائع الموهبة الأدبية والشعر الرصين وتأملات في جمال وبلاغة الضاد.",
    color: "tag-tech"
  },
  {
    id: 5,
    name: "رئيسية",
    slug: "home-featured",
    description: "المقالات والبحوث الرئيسية التي تتصدر أعداد مجلة شذرات وتوجه الخط العام.",
    color: "tag-featured"
  },
  {
    id: 6,
    name: "مراجعة",
    slug: "reviews",
    description: "مراجعات علمية للكتب الهادفة، والإصدارات الحديثة، وقراءة نقدية في النصوص والمصنفات.",
    color: "tag-tech"
  },
  {
    id: 7,
    name: "دينيات",
    slug: "religion",
    description: "مقالات شرعية ونفحات فقهية معاصرة ومواعظ دينية مباركة تلامس الفكر القويم.",
    color: "tag-culture"
  }
];

export const INITIAL_EDITIONS: Edition[] = [];

export const INITIAL_ARTICLES: Article[] = [];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [];

export const INITIAL_EVENTS: CollegeEvent[] = [];

export const INITIAL_GALLERY: GalleryItem[] = [];

export const INITIAL_LOGS: ActivityLog[] = [];

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
  adminId: "",
  adminPass: "",
  poems: [
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
  ]
};


