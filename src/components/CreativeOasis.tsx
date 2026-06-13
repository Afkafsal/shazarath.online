/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, PenTool, Compass, BookOpen, Heart, Share2, Plus, X, ChevronLeft, MapPin, Quote, Calendar, Bookmark, FileText, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { SystemSetting } from '../types';

// Static Literary Datasets (highly refined Arabic literature)
const INITIAL_POEMS = [
  {
    id: 1,
    title: "قصيدة المتنبي في عزة النفس وترسيخ القيم",
    author: "أبو الطيب المتنبي",
    era: "العصر العباسي",
    intro: "من روائع درر المتنبي التي يتغنى فيها بالمجد والمبادئ الراسخة التي لا تزول بزوال الأيام.",
    verses: [
      { id: 1, front: "على قَدْرِ أهْلِ العَزْم تأتي العَزائِمُ", back: "وتأتي علَى قَدْرِ الكِرامِ المَكارِمُ" },
      { id: 2, front: "وتَعْظُمُ في عَينِ الصّغيرِ صغارُها", back: "وتَصْغُرُ في عَين العَظيمِ العَظائِمُ" },
      { id: 3, front: "يُكَلّفُ سَيفُ الدّوْلَةِ الجيشَ هَمّهُ", back: "وقد عَجِزَتْ عنهُ الجُيُوشُ الخَضارِمُ" },
      { id: 4, front: "إذا غامَرْتَ في شَرَفٍ مَرُومِ", back: "فَلا تَقْنَعْ بما دُونَ النّجُومِ" },
      { id: 5, front: "فَطَعْمُ المَوْتِ في أمْرٍ صَغيرِ", back: "كَعَطْمِ المَوْتِ في أمْرٍ عَظيمِ" }
    ],
    explanation: "يدعو الشاعر فيها إلى عزة النفس وعلو الهمة، حيث يؤكد أن عظَمة الأعمال تقاس بهمة وعوازم فاعليها، وأن أصحاب العزائم الكبيرة يستصغرون الشدائد الجسام."
  },
  {
    id: 2,
    title: "العروة الوثقى ومصابيح الهدى",
    author: "الشيخ يوسف المنصوري",
    era: "قصيدة معاصرة (مجمع KMU)",
    intro: "أبيات شعرية نظمها فضيلة الشيخ بمناسبة إصدار العدد الأول للمجلة لتكون شعاع ضياء لطلاب المجمع.",
    verses: [
      { id: 1, front: "تمسّك بالعروة الوثقى ولا تَهُنِ", back: "إن الهدى لنورٌ ليس بالطَّفِنِ" },
      { id: 2, front: "وسر بنهجِ نبيٍّ زان مجمعنا", back: "طال الصعود لعرشِ العلم والمننِ" },
      { id: 3, front: "هنا المآذن بالتوحيد صادحةٌ", back: "ترمي الجهالة بالإرشاد والسننِ" },
      { id: 4, front: "يا طالب العلمِ في الصرح المباركِ كُنْ", back: "رمزاً لجيل كفاحٍ كاشف المحنِ" }
    ],
    explanation: "قصيدة وعظية توجيهية تحث الطلاب على التمسك بحبل الله المتين (العروة الوثقى)، وامتلاك ثقة التبصر العلمي لنفع الدين والمجتمع."
  }
];

const INITIAL_STORIES = [
  {
    id: 1,
    title: "رحلة النور في براري خراسان",
    author: "د. أسماء بنت عبد الله",
    readTime: "٤ دقائق",
    publishDate: "2026-06-03",
    excerpt: "عبرة مستوحاة من دفاتر التاريخ حول صبي يرتحل مشياً على الأقدام بحثاً عن نسخة فريدة من لسان العرب.",
    content: `كانت الشمس تميل للمغيب حينما أشرف الفتى يحيى على أبواب مدينة مرو العريقة بناحيات خراسان. لقد مضى على مغادرته لبلدته الصغيرة أكثر من أربعين يوماً، حاملاً في جعبته بضع كِسرات من الخبز اليابس، وقربة من الجلد البالي، وشغفًا لا ينطفئ لحث الخطى وطلب العلم.
    
    لم يكن يحيى يطلب مالاً ولا جاهاً، بل كان يقتفي أثر نسخة خطية وحيدة نادرة من غريب لسان الضاد، قيل له إنها ترقد في خزانة شيخ مقدّم هناك. في عصرٍ لم تكن فيه الطرق معبدة ولا الرحلات آمنة، كانت البراري المترامية تخبئ المجهول، لكن الشاب كان يدرك أن الحرف الذي يدونه هو وثيقة البقاء والنور.
    
    حين التقى بالشيخ الجليل في مسجده الكبير، سأله الشيخ مستغربًا: "أكلُّ هذا العناء لأجل كلمة مستغربة يا بني؟" فتبسم يحيى قائلاً: "يا سيدي، الكلمة هي الوعاء الذي يحفظ الوحي، وبلاغتها هي حبل الاتصال، وإذا ضعفت الألسن انقطعت العرى." فدمعت عينا الشيخ وفتح له خبيئته، ليدوّن الفتى نسخته ويعود بها ملهماً لأهل بلده.`,
    lesson: "العبرة: إن عظمة الأمم تُقاس بمدى اهتمام شبابها وتضحيتهم في سبيل حفظ قيم علمهم ومبادئ لغتهم السامية."
  },
  {
    id: 2,
    title: "لوحة الحطاب الحكيم",
    author: "د. عبد الرحمن السعدي",
    readTime: "٣ دقائق",
    publishDate: "2026-06-05",
    excerpt: "قصة رمزية وجيزة تجسّد الفرق بين من يبحث عن المظاهر البراقة وبين من يطلب الثمر الدائم النافع.",
    content: `يروى أنه كان يعيش في قرية غناء حطاب يضرب فيه الناس المثل بحكمته ورزقه المبارك. في أحد الأيام سافر صبي ذكي ليتعلم منه أسرار الصنعة. لاحظ الصبي أن الحطاب يقضي الساعات الأولى من كل صباح يشحذ فأس الحديد بعزم وصبر صامت، بينما يستعجل غيره من الحطابين الذهاب فوراً للأشجار بفؤوس ثلمة.
    
    سأل الصبي: "لمَ تضيع جل يومك في حك المعادن؟" فأجابه الشيخ الحكيم: "الجهد العشوائي من غير تهيئة وإعداد يبعث على الإعياء دون ثمر، إن حد الفأس المهيأ جيداً ينجز العمل بيسر ويحمي الشجر وينتج حطباً ممتازاً."
    
    وهكذا كان الطلاب المجدون يفهمون الدرس كاستعارة واضحة؛ فشحذ العقل بالقراءة والتعليم والتأصيل يسبق دوماً ممارسة الإنتاج والكتابة في الفكر والحروب التنويرية.`,
    lesson: "العبرة: شحذ الذهن والاستعداد المعرفي العالي بالدرس والتدقيق يثمر الإبداع ويختصر دروب العناء الشاقة."
  }
];

const INITIAL_TRAVELOGUES = [
  {
    id: 1,
    title: "مذكرات الرحلة إلى الأندلس ومآثر قرطبة",
    traveler: "أحمد بن قاسم الهاشمي",
    date: "٢٠٢٦/٠٥/١٥",
    journeyRoute: "من دمشق إلى قرطبة",
    destination: "الأندلس العظيمة",
    content: `ما كاد القارب يستقر على الساحل الغربي حتى بدت ملامح الأندلس تأسر العيون بجمال هندستها وخضرة طبيعتها البهية. دخلنا مدينة قرطبة في صباح ربيعي دافئ، فكان أول ما استوقفنا هو منارات جامعاتها والمكتبة الكبرى التي تضم مئات الآلاف من المخطوطات والطلبة والباحثين من شتى بقاع الأطلسي.
    
    رأينا الناس في أسواقها يتداولون الورق والكتب كما يتداولون الذهب والطعام، وهناك يمتزج صوت الأذان بجمال الزخارف والجسور الحجرية الرائدة على نهر الوادي الكبير. لقد كانت مذكراتنا هذه محفلاً لتسجيل عبقرية العمارة الإسلامية التي طوعت الجبال والحجارة لتخدم العلم وتكريم الإنسان وتنمية واحات الخير والتدين.`,
    coord: "37.8882° N, 4.7794° W"
  },
  {
    id: 2,
    title: "من مكة شرفها الله إلى جزر ومرافئ أرخبيل جاوة",
    traveler: "الشيخ يوسف المنصوري",
    date: "٢٠٢٦/٠٤/١٠",
    journeyRoute: "بحر العرب - جاوة",
    destination: "جنوب شرق آسيا",
    content: `امتدت رحلتنا البحرية لأكثر من سبعين ليلة طالعنا فيها عجائب البحار والجزائر، حتى رسونا بسلام في مرافئ جزر جاوة الخضراء بآسيا. عجيب هذا الشعب بطيب معشره، وتواضعه الجم، وكيف دخل الإيمان قلوبهم عبر أخلاق التجار والعلماء الأوائل دون نزاع أو عتاد.
    
    أقمنا مجالس علم لتدريس العربية وأصول الفقه، فكان إقبال الأهالي من الصغار والكبار يبعث على الشجن والمحبة، وتنساب الساعات كالأحلام ببركة نشر هدي الإسلام الرصين الصادق في أقطار الأرض البعيدة.`,
    coord: "7.2501° S, 110.1250° E"
  }
];

const INITIAL_NEWSPAPERS = [
  {
    id: 1,
    title: "نشرة الصحيفة العدد الأول",
    publishDate: "2026-06-01",
    excerpt: "العدد الأول من الصحيفة الدورية للقسم، شاملة لأخبار وفعاليات القسم الأدبية والثقافية والإصدارات الحديثة.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    coverUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&fit=crop&q=80"
  },
  {
    id: 2,
    title: "نشرة الصحيفة العدد الثاني",
    publishDate: "2026-07-01",
    excerpt: "العدد الثاني من الصحيفة يستعرض الندوات والمؤتمرات ومشاركات الطلبة في المحافل الأدبية.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    coverUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&fit=crop&q=80"
  }
];

interface CreativeOasisProps {
  initialTab?: 'poems' | 'stories' | 'travelogues' | 'newspapers';
  autoOpenSubmit?: boolean;
  onCloseSubmit?: () => void;
  settings?: SystemSetting;
}

export default function CreativeOasis({
  initialTab = 'poems',
  autoOpenSubmit = false,
  onCloseSubmit,
  settings
}: CreativeOasisProps) {
  const [activeTab, setActiveTab] = useState<'poems' | 'stories' | 'travelogues' | 'newspapers'>(initialTab);
  
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const [poems, setPoems] = useState(() => {
    const saved = localStorage.getItem('al_urwah_oasis_poems');
    return saved ? JSON.parse(saved) : INITIAL_POEMS;
  });
  const [stories, setStories] = useState(() => {
    const saved = localStorage.getItem('al_urwah_oasis_stories');
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });
  const [travelogues, setTravelogues] = useState(() => {
    const saved = localStorage.getItem('al_urwah_oasis_travelogues');
    return saved ? JSON.parse(saved) : INITIAL_TRAVELOGUES;
  });
  const [newspapers, setNewspapers] = useState(() => {
    const saved = localStorage.getItem('al_urwah_oasis_newspapers');
    return saved ? JSON.parse(saved) : INITIAL_NEWSPAPERS;
  });

  // User Interactive Action states
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [likedVerses, setLikedVerses] = useState<string[]>(() => {
    const saved = localStorage.getItem('al_urwah_liked_verses');
    return saved ? JSON.parse(saved) : [];
  });
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(autoOpenSubmit);

  React.useEffect(() => {
    if (autoOpenSubmit) {
      setIsSubmitOpen(true);
    }
  }, [autoOpenSubmit]);

  const setSubmitOpenState = (isOpen: boolean) => {
    setIsSubmitOpen(isOpen);
    if (!isOpen && onCloseSubmit) {
      onCloseSubmit();
    }
  };

  // Form submission state
  const [formData, setFormData] = useState({
    type: 'poem',
    title: '',
    author: '',
    eraOrTime: '',
    content: '',
    excerpt: '',
    lessonOrExp: ''
  });

  const handleLikeVerse = (poemId: number, verseId: number) => {
    const key = `${poemId}-${verseId}`;
    let updated;
    if (likedVerses.includes(key)) {
      updated = likedVerses.filter(k => k !== key);
    } else {
      updated = [...likedVerses, key];
    }
    setLikedVerses(updated);
    localStorage.setItem('al_urwah_liked_verses', JSON.stringify(updated));
  };

  const handleShareContent = (title: string, author: string) => {
    const textToCopy = `الواحة الأدبية - مجلة الاعتصام: "${title}" بقلم البديل الأديب ${author}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).catch(err => {
        console.error('Failed to copy to clipboard', err);
      });
    }
    setShowShareNotification(true);
    setTimeout(() => setShowShareNotification(false), 3000);
  };

  const handleSubmitCreative = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.content) {
      alert('الرجاء إدخال الحقول الأساسية: العنوان، الكاتب، والنص الإبداعي');
      return;
    }

    if (formData.type === 'poem') {
      // Parse multi-line couplets separated by space or tabular symbols
      const lines = formData.content.split('\n');
      const verses = lines.map((line, idx) => {
        const parts = line.split('..'); // Use double dots to separate front and back
        return {
          id: idx + 1,
          front: parts[0] || line,
          back: parts[1] || '...'
        };
      });

      const newPoem = {
        id: Date.now(),
        title: formData.title,
        author: formData.author,
        era: formData.eraOrTime || 'معاصر',
        intro: formData.excerpt || 'مساهمة أدبية جديدة لقراء الواحة.',
        verses: verses,
        explanation: formData.lessonOrExp || 'لا توجد شروحات مدرجة للقصيدة.'
      };

      const updated = [newPoem, ...poems];
      setPoems(updated);
      localStorage.setItem('al_urwah_oasis_poems', JSON.stringify(updated));
    } else if (formData.type === 'story') {
      const newStory = {
        id: Date.now(),
        title: formData.title,
        author: formData.author,
        readTime: formData.eraOrTime || '٣ دقائق',
        publishDate: new Date().toISOString().substring(0, 10),
        excerpt: formData.excerpt || 'نبذة عن القصة العبرة.',
        content: formData.content,
        lesson: formData.lessonOrExp ? `العبرة: ${formData.lessonOrExp}` : ''
      };

      const updated = [newStory, ...stories];
      setStories(updated);
      localStorage.setItem('al_urwah_oasis_stories', JSON.stringify(updated));
    } else {
      const newTravelogue = {
        id: Date.now(),
        title: formData.title,
        traveler: formData.author,
        date: new Date().toISOString().substring(0, 10),
        journeyRoute: formData.eraOrTime || 'رحلات معاصرة',
        destination: formData.excerpt || 'البلدان البعيدة',
        content: formData.content,
        coord: formData.lessonOrExp || 'موقع جغرافي غير متاح'
      };

      const updated = [newTravelogue, ...travelogues];
      setTravelogues(updated);
      localStorage.setItem('al_urwah_oasis_travelogues', JSON.stringify(updated));
    }

    // Reset form and close
    setFormData({
      type: 'poem',
      title: '',
      author: '',
      eraOrTime: '',
      content: '',
      excerpt: '',
      lessonOrExp: ''
    });
    setSubmitOpenState(false);
    alert('تم استقبال مساهمتك الإبداعية بنجاح وحفظها في الواحة الأدبية!');
  };

  return (
    <div className="w-full text-right space-y-8" dir="rtl" id="creative-oasis shadow-2xl">
      
      {/* 1. Header Banner */}
      <div className="relative rounded-3xl overflow-hidden glass p-8 sm:p-12 border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-l from-amber-950/20 via-blue-950/40 to-transparent z-0"></div>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        
        <div className="relative z-10 space-y-4 max-w-4xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/20 text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{settings?.creativeSectionBadge || "القسم الإبداعي والواحة الأدبية بمجلة الاعتصام"}</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif-ar text-white leading-tight">
            {settings?.creativeSectionTitle || "الواحة الأدبية والأقلام الواعدة"}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
            {settings?.creativeSectionDesc || "مساحة مخصصة لقراء مجلة الاعتصام للإبحار في فضاء المعلقات والقصائد الخالدة، ومطالعة طيف من الروايات والقصص المعبرة المليئة بالحكمة، وتتبع أثر الرحالة الأوائل في أسفارهم حول الآفاق."}
          </p>

          <div className="flex gap-4 pt-2">
            <button
              onClick={() => setSubmitOpenState(true)}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-slate-100 font-bold px-5 py-3 rounded-xl transition shadow-lg shadow-amber-600/10 cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
              <span>{settings?.creativeSectionBtnSubmit || "أضف مساهمتك المكتوبة"}</span>
            </button>
            <a
              href={`mailto:${settings?.submissionEmail || 'iathisammonthly@gmail.com'}?subject=الواحة الأدبية - اقتراح`}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-semibold px-5 py-3 rounded-xl border border-white/10 transition cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{settings?.creativeSectionBtnContact || "مراسلة هيئة التحرير"}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Share Toast Banner */}
      {showShareNotification && (
        <div className="bg-slate-950 border border-amber-500/40 text-amber-600 p-4 rounded-xl shadow-xl flex items-center justify-between text-sm font-semibold sticky top-24 z-50 animate-bounce">
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>تم نسخ الرابط الأدبي لمساهمتك وبديل الإرسال جاهز للحافظة!</span>
          </span>
        </div>
      )}

      {/* 2. Interactive Navigation Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" id="creative-tabs">
        <button
          onClick={() => { setActiveTab('poems'); setSelectedStory(null); }}
          className={`flex items-center justify-center gap-3 p-5 rounded-2xl border transition cursor-pointer ${
            activeTab === 'poems'
              ? 'bg-amber-600/10 border-amber-500 text-amber-300 shadow-md'
              : 'glass border-white/10 text-slate-400 hover:bg-white/5 hover:text-slate-200'
          }`}
        >
          <Quote className="w-6 h-6 shrink-0" />
          <div className="text-right">
            <h4 className="font-bold text-sm font-serif-ar text-white">القصائد والدواوين</h4>
            <span className="text-[10px] text-slate-400 font-medium block">أبيات من عيون الشعر وبحور الفصاحة</span>
          </div>
        </button>

        <button
          onClick={() => { setActiveTab('stories'); setSelectedStory(null); }}
          className={`flex items-center justify-center gap-3 p-5 rounded-2xl border transition cursor-pointer ${
            activeTab === 'stories'
              ? 'bg-blue-600/10 border-blue-500 text-blue-300 shadow-md'
              : 'glass border-white/10 text-slate-400 hover:bg-white/5 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-6 h-6 shrink-0" />
          <div className="text-right">
            <h4 className="font-bold text-sm font-serif-ar text-white">القصص والعِبر الصالحة</h4>
            <span className="text-[10px] text-slate-400 font-medium block">سرد نثري راقي يقدّم الحكمة</span>
          </div>
        </button>

        <button
          onClick={() => { setActiveTab('travelogues'); setSelectedStory(null); }}
          className={`flex items-center justify-center gap-3 p-5 rounded-2xl border transition cursor-pointer ${
            activeTab === 'travelogues'
              ? 'bg-emerald-600/10 border-emerald-500 text-emerald-300 shadow-md'
              : 'glass border-white/10 text-slate-400 hover:bg-white/5 hover:text-slate-200'
          }`}
        >
          <Compass className="w-6 h-6 shrink-0" />
          <div className="text-right">
            <h4 className="font-bold text-sm font-serif-ar text-white">أدب الرحلات</h4>
            <span className="text-[10px] text-slate-400 font-medium block">مذكرات الأسفار والرحالة</span>
          </div>
        </button>

        <button
          onClick={() => { setActiveTab('newspapers'); setSelectedStory(null); }}
          className={`flex items-center justify-center gap-3 p-5 rounded-2xl border transition cursor-pointer ${
            activeTab === 'newspapers'
              ? 'bg-indigo-600/10 border-indigo-500 text-indigo-300 shadow-md'
              : 'glass border-white/10 text-slate-400 hover:bg-white/5 hover:text-slate-200'
          }`}
        >
          <FileText className="w-6 h-6 shrink-0" />
          <div className="text-right">
            <h4 className="font-bold text-sm font-serif-ar text-white">صحيفة القسم</h4>
            <span className="text-[10px] text-slate-400 font-medium block">نشرات الأخبار الدورية</span>
          </div>
        </button>
      </div>

      {/* 3. Main Views Content Renderer */}
      <div className="min-h-[400px]">
        
        {/* VIEW 3A: POEMS SECTION */}
        {activeTab === 'poems' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {poems.map((poem: any) => (
              <div key={poem.id} className="glass border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {poem.era}
                    </span>
                    <button
                      onClick={() => handleShareContent(poem.title, poem.author)}
                      className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white transition cursor-pointer"
                      title="نسخ ومشاركة القصيدة"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-serif-ar text-white">{poem.title}</h3>
                    <p className="text-xs text-amber-300 font-semibold mt-1">نظم: {poem.author}</p>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-semibold italic bg-white/5 p-3.5 rounded-xl border border-white/5">
                    {poem.intro}
                  </p>

                  {/* Rendering Couplets */}
                  <div className="space-y-3 pt-3">
                    {poem.verses.map((v: any, index: number) => {
                      const idKey = `${poem.id}-${v.id}`;
                      const isLiked = likedVerses.includes(idKey);
                      return (
                        <div 
                          key={v.id}
                          className="group flex flex-col sm:flex-row items-center font-serif-ar text-sm text-slate-200 border-b border-white/5 pb-2.5 last:border-0 hover:bg-white/5 p-1 rounded-lg transition"
                        >
                          <div className="w-full sm:w-1/2 text-right pr-2 select-text font-semibold">
                            {v.front}
                          </div>
                          
                          {/* Centered break line or heartbeat like btn */}
                          <div className="flex py-1 sm:py-0 px-3 items-center justify-center shrink-0">
                            <button
                              onClick={() => handleLikeVerse(poem.id, v.id)}
                              className={`p-1 rounded-full transition cursor-pointer ${
                                isLiked ? 'text-rose-500 bg-rose-500/10' : 'text-slate-500 group-hover:text-amber-500'
                              }`}
                              title={isLiked ? "إحباط التفضيل" : "تفضيل هذا البيت الأدبي ورسمه"}
                            >
                              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} />
                            </button>
                          </div>

                          <div className="w-full sm:w-1/2 text-left pl-2 select-text text-slate-300 font-semibold sm:text-right">
                            {v.back}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Poetry explanation / comments footer */}
                <div className="bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10">
                  <h5 className="text-[11px] font-bold text-amber-300 mb-1 flex items-center gap-1.5 font-serif-ar">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>تحليل وشرح عمادة الأدب:</span>
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    {poem.explanation}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* VIEW 3B: STORIES SECTION */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {selectedStory === null ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stories.map((story: any) => (
                    <div 
                      key={story.id}
                      className="glass border border-white/10 rounded-3xl p-6 hover:border-blue-500/40 transition duration-300 shadow-2xl flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                            <span>نشرت في {story.publishDate}</span>
                          </span>
                          <span className="font-bold bg-blue-500/10 px-2.5 py-0.5 rounded-full text-blue-300 border border-blue-500/20">
                            مطالعة: {story.readTime}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold font-serif-ar text-white">{story.title}</h3>
                        <p className="text-[10px] text-blue-300 font-semibold">بقلم الأديب: {story.author}</p>
                        
                        <p className="text-xs text-slate-300 leading-relaxed font-semibold line-clamp-3">
                          {story.excerpt}
                        </p>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-white/5">
                        <button
                          onClick={() => setSelectedStory(story.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-white transition cursor-pointer"
                        >
                          <span>قراءة القصة كاملة ومطالعة العبرة</span>
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleShareContent(story.title, story.author)}
                          className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                          title="نسخ رابط القصة"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                (() => {
                  const s = stories.find((item: any) => item.id === selectedStory);
                  if (!s) return null;
                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="glass border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl"
                    >
                      {/* Back button and Meta */}
                      <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <button
                          onClick={() => setSelectedStory(null)}
                          className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4 transform rotate-180" />
                          <span>العودة لجميع القصص المتاحة</span>
                        </button>

                        <div className="flex gap-2">
                          <span className="text-xs font-medium text-slate-400">قراءة: {s.readTime}</span>
                        </div>
                      </div>

                      {/* Header Title */}
                      <div className="space-y-1.5 text-right font-serif-ar">
                        <h2 className="text-2xl sm:text-3.5xl font-extrabold text-white leading-snug">
                          {s.title}
                        </h2>
                        <span className="inline-block px-3 py-1 rounded-md text-xs font-bold bg-blue-900/40 text-blue-300 border border-blue-500/20">
                          المؤلف الكاتب: {s.author}
                        </span>
                      </div>

                      {/* Story Full Context */}
                      <div className="text-slate-200 leading-relaxed whitespace-pre-wrap select-text font-serif-ar text-sm sm:text-base border-r-2 border-blue-500/30 pr-4 sm:pr-6 py-2">
                        {s.content}
                      </div>

                      {/* Lesson highlighting frame */}
                      {s.lesson && (
                        <div className="bg-blue-600/5 border border-blue-500/20 p-5 rounded-2xl flex items-start gap-4">
                          <Bookmark className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                          <div className="text-right">
                            <h4 className="text-xs font-bold text-blue-300 mb-1">المدلول والعبرة الأدبية:</h4>
                            <p className="text-xs font-semibold text-slate-300 leading-relaxed">
                              {s.lesson}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Bottom shares info */}
                      <div className="flex justify-between items-center pt-4 border-t border-white/15">
                        <span className="text-[10px] text-slate-500 font-semibold">تاريخ النشر: {s.publishDate}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleShareContent(s.title, s.author)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/10 text-blue-300 hover:bg-blue-600 hover:text-white transition cursor-pointer text-xs font-bold"
                          >
                            <Share2 className="w-4 h-4" />
                            <span>مشاركة هذه الحكاية الآن</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()
              )}
            </AnimatePresence>
          </div>
        )}

        {/* VIEW 3C: TRAVELOGUES SECTION */}
        {activeTab === 'travelogues' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {travelogues.map((travel: any) => (
              <div 
                key={travel.id}
                className="glass border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl relative overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{travel.coord || 'الإحداثيات'}</span>
                    </span>
                    <span className="text-[10px] font-mono font-medium text-slate-400">
                      تاريخ التدوين: {travel.date}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-serif-ar text-white">{travel.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-emerald-300 font-semibold">{travel.traveler}</span>
                      <span className="text-slate-500 text-[10px]">•</span>
                      <span className="text-slate-400 text-[10px] font-medium">خط السير: {travel.journeyRoute}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif-ar select-text whitespace-pre-line border-l-2 border-emerald-500/20 pl-4 py-1">
                    {travel.content}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/5 text-xs">
                  <span className="font-semibold text-slate-500">من مدونات رحلات جامعة عين الهدى</span>
                  <button
                    onClick={() => handleShareContent(travel.title, travel.traveler)}
                    className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
                    title="نسخ مذكرات المدونة أدب الرحلة"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3D: NEWSPAPERS SECTION */}
        {activeTab === 'newspapers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newspapers.map((newspaper: any) => (
              <div 
                key={newspaper.id}
                className="glass border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none transition-transform group-hover:scale-150"></div>
                
                <div className="flex gap-4">
                  <div className="w-24 h-32 shrink-0 rounded-xl overflow-hidden border border-white/10 relative">
                    <img src={newspaper.coverUrl} alt={newspaper.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end justify-center pb-2">
                       <FileText className="w-5 h-5 text-indigo-300" />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center space-y-2">
                    <span className="text-[10px] text-indigo-400 font-bold tracking-wider">{newspaper.publishDate}</span>
                    <h3 className="font-bold text-white font-serif-ar leading-snug">{newspaper.title}</h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {newspaper.excerpt}
                </p>

                <div className="flex items-center pt-4 border-t border-white/5">
                  <a 
                    href={newspaper.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-600/30 rounded-xl transition cursor-pointer font-bold text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل الصحيفة (PDF)</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* 4. MODAL: Submission Drawer for Student Creative Articles */}
      <AnimatePresence>
        {isSubmitOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
            {/* Overlay backdrop */}
            <div 
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-md transition-opacity" 
              onClick={() => setSubmitOpenState(false)}
            ></div>

            {/* Content modal center */}
            <div className="flex min-h-screen items-center justify-center p-4">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative transform overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 text-right shadow-2xl max-w-lg w-full space-y-6"
              >
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold font-serif-ar text-slate-100 flex items-center justify-start gap-2">
                    <PenTool className="text-amber-500 w-5 h-5" />
                    <span>تقديم ومساهمة إبداعية جديدة للواحة الأدبية</span>
                  </h3>
                  <button 
                    type="button"
                    onClick={() => setSubmitOpenState(false)}
                    className="text-slate-400 hover:text-slate-250 p-1 rounded-lg hover:bg-slate-800 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmitCreative} className="space-y-4">
                  {/* Genre Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5">نوع المساهمة ونتاجها:</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 text-slate-205 p-2.5 text-xs font-bold focus:outline-none focus:border-amber-500"
                    >
                      <option value="poem">قصيدة / أبيات شعرية (مع تفضيل استخدام .. لفصل الصدر عن العجز)</option>
                      <option value="story">قصة قصيرة / عبرة وحكمة وعظية</option>
                      <option value="travelogue">أدب الرحلات والمسالك الاستكشافية</option>
                    </select>
                  </div>

                  {/* Title and Author row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">عنوان نتاجك الأدبي:</label>
                      <input
                        type="text"
                        placeholder="أدخل عنواناً جذاباً"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 text-slate-205 p-2.5 text-xs font-medium focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1">اسم الكاتب أو تخلص الشاعر:</label>
                      <input
                        type="text"
                        placeholder="مثال: الشاب عمرو الهاشكي"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        required
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 text-slate-205 p-2.5 text-xs font-medium focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Subtitle / tag info */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      {formData.type === 'poem' ? 'العصر أو سياق القصيدة' : formData.type === 'story' ? 'مدة المطالعة المقدرة' : 'خط السير والرحلات'}
                    </label>
                    <input
                      type="text"
                      placeholder={formData.type === 'poem' ? 'العصر العباسي، حديث' : formData.type === 'story' ? '٥ دقائق' : 'من مكة المكرمة إلى دمشق'}
                      value={formData.eraOrTime}
                      onChange={(e) => setFormData({ ...formData, eraOrTime: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 text-slate-205 p-2.5 text-xs font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">نبذة عن هذا العمل الأدبي (اختصار):</label>
                    <input
                      type="text"
                      placeholder="تلخيص للعمل يظهر كتمهيد في الواحة..."
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 text-slate-205 p-2.5 text-xs font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Content (The Poetry or story contexts) */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">متن النص الإبداعي أو الأبيات:</label>
                    <textarea
                      rows={6}
                      placeholder={
                        formData.type === 'poem' 
                          ? `اكتب بيتاً تلو الآخر، واستخدم نقطتتين متجاورتين للفصل بين شطري البيت، مثال:\nتمسك بالعروة الوثقى ولا تهنِ .. إن الهدى لنور ليس بالطفنِ`
                          : "اكتب القصة أو مدونات مذكرات أسفارك هنا بكل تفصيل أدبي..."
                      }
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      required
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 text-slate-205 p-2.5 text-xs font-medium focus:outline-none focus:border-amber-500 font-mono"
                    ></textarea>
                  </div>

                  {/* Lesson or coordinates */}
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">
                      {formData.type === 'poem' ? 'الشرح والتحليل الأدبي' : formData.type === 'story' ? 'الحكمة أو مغزى العبرة المستفادة' : 'الإحداثيات الجغرافية المرجعية'}
                    </label>
                    <input
                      type="text"
                      placeholder={formData.type === 'poem' ? 'شرح المعاني المستغلظة أو البلاغة' : formData.type === 'story' ? 'التعلم المستمر شريان النجاح الأبدي' : '37.8882° N, 4.7794° W'}
                      value={formData.lessonOrExp}
                      onChange={(e) => setFormData({ ...formData, lessonOrExp: e.target.value })}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 text-slate-205 p-2.5 text-xs font-medium focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Submission buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-grow bg-amber-600 hover:bg-amber-500 text-slate-100 font-bold py-2.5 rounded-xl transition cursor-pointer text-xs"
                    >
                      مشاركة في واحة الاعتصام
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmitOpenState(false)}
                      className="bg-white/5 hover:bg-white/10 text-slate-300 font-bold px-4 py-2.5 rounded-xl border border-white/10 transition cursor-pointer text-xs"
                    >
                      إلغاء الأمر
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
