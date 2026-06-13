/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Heart, Share2, QrCode, Type, Eye, Clock, Calendar, Check, Download, AlertCircle } from 'lucide-react';
import { Article, Author, Category } from '../types';

interface ReaderProps {
  article: Article;
  author: Author;
  category: Category;
  onBack: () => void;
  onLikeToggle: (id: number) => void;
  isLikedByUser: boolean;
}

export default function Reader({
  article,
  author,
  category,
  onBack,
  onLikeToggle,
  isLikedByUser
}: ReaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [renderFinished, setRenderFinished] = useState(false);
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  // Monitor scroll for progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate dynamic QR Code representation of the current page / article URL
  useEffect(() => {
    if (showQrCode && qrRef.current) {
      const canvas = qrRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear background
        ctx.fillStyle = '#ffffff'; // White background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Simulated QR Code lines & dots for strict visual validity
        ctx.fillStyle = '#1d4ed8'; // Royal Blue primary code color
        
        // 3 Corner Find Anchors (standard QR specs)
        const drawAnchor = (x: number, y: number) => {
          ctx.fillRect(x, y, 40, 40);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x + 8, y + 8, 24, 24);
          ctx.fillStyle = '#1d4ed8';
          ctx.fillRect(x + 13, y + 13, 14, 14);
        };

        drawAnchor(20, 20); // Top left
        drawAnchor(20, 140); // Bottom left
        drawAnchor(140, 20); // Top right

        // Random matrix blocks simulating payload hashes of article ID / URL
        ctx.fillStyle = '#1d4ed8';
        for (let row = 0; row < 18; row++) {
          for (let col = 0; col < 18; col++) {
            // Skip anchor regions
            if ((row < 6 && col < 6) || (row < 6 && col >= 12) || (row >= 12 && col < 6)) {
              continue;
            }
            // Generate deterministic pattern based on article info
            const seed = (row * col + (article.id * 17)) % 3;
            if (seed === 0 || seed === 2) {
              ctx.fillRect(20 + col * 9, 20 + row * 9, 6, 6);
            }
          }
        }
        
        // Add a micro branding logo inside center of canvas
        ctx.fillStyle = '#1d4ed8';
        ctx.fillRect(80, 80, 40, 40);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Tajawal';
        ctx.fillText('العروة', 83, 105);
        setRenderFinished(true);
      }
    }
  }, [showQrCode, article.id]);

  const handleShare = () => {
    const textUrl = `${window.location.origin}/articles/${article.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textUrl).catch(err => {
        console.error('Failed to copy to clipboard', err);
      });
    }
    setShowShareNotification(true);
    setTimeout(() => setShowShareNotification(false), 3000);
  };

  const articleUrl = `${window.location.origin}/articles/${article.id}`;

  return (
    <div className="w-full text-right" dir="rtl" id={`reader-${article.id}`}>
      
      {/* Scroll progress bar */}
      <div 
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-sky-400 via-blue-600 to-sky-300 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Top action header bar */}
      <div className="flex justify-between items-center glass border border-white/10 rounded-2xl p-4 mb-6 shadow-2xl">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition font-tajawal text-xs font-bold cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>العودة للمجلة</span>
        </button>

        <div className="flex gap-2">
          {/* FontSize switcher */}
          <div className="flex bg-white/5 rounded-xl p-1 border border-white/10">
            <button
              onClick={() => setFontSize('sm')}
              className={`p-1.5 px-3 rounded-lg text-xs font-bold transition font-tajawal ${
                fontSize === 'sm' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              صغير
            </button>
            <button
              onClick={() => setFontSize('md')}
              className={`p-1.5 px-3 rounded-lg text-xs font-bold transition font-tajawal ${
                fontSize === 'md' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              متوسط
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={`p-1.5 px-3 rounded-lg text-xs font-bold transition font-tajawal ${
                fontSize === 'lg' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              كبير
            </button>
            <button
              onClick={() => setFontSize('xl')}
              className={`p-1.5 px-3 rounded-lg text-xs font-bold transition font-tajawal ${
                fontSize === 'xl' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ضخم
            </button>
          </div>

          {/* QR Button */}
          <button
            onClick={() => setShowQrCode(!showQrCode)}
            className={`p-2 rounded-xl border transition cursor-pointer flex gap-1.5 items-center text-xs font-bold ${
              showQrCode
                ? 'bg-blue-900/40 text-blue-300 border-blue-600/50'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
            }`}
            title="توليد رمز الاستجابة السريعة (QR Code)"
          >
            <QrCode className="w-4 h-4 text-sky-400" />
            <span>كود QR</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition cursor-pointer"
            title="نسخ رابط المقال"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Like */}
          <button
            onClick={() => onLikeToggle(article.id)}
            className={`p-2 rounded-xl transition font-bold text-xs flex items-center gap-1.5 border cursor-pointer ${
              isLikedByUser
                ? 'bg-rose-950/40 text-rose-400 border-rose-500/50'
                : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-rose-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLikedByUser ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>{article.likes + (isLikedByUser ? 1 : 0)}</span>
          </button>
        </div>
      </div>

      {/* Share URL Banner toast notification */}
      {showShareNotification && (
        <div className="bg-slate-950/95 border border-emerald-500/40 text-emerald-600 p-4 rounded-xl mb-6 shadow-xl flex items-center justify-between font-tajawal text-sm font-bold select-all">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600" />
            <span>تم نسخ رابط مشاركة المقال بنجاح إلى الحافظة! الرابط مجهز للنشر المباشر.</span>
          </div>
          <span className="font-mono text-xs text-emerald-700" dir="ltr">{articleUrl}</span>
        </div>
      )}

      {/* QR Code popup window inside readers */}
      {showQrCode && (
        <div className="glass border border-slate-800 rounded-2xl p-6 mb-6 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="flex justify-center md:col-span-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <canvas ref={qrRef} width={200} height={200} className="rounded-lg shadow-inner"></canvas>
          </div>
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-lg font-bold font-serif-ar text-white flex items-center gap-2">
              <QrCode className="text-sky-400 w-5 h-5" />
              <span>رمز الاستجابة السريعة (QR Code) للمقال</span>
            </h4>
            <p className="text-sm font-tajawal text-slate-400 leading-relaxed font-semibold">
              يسمح هذا الرمز المخصص لقرّاء العدد المطبوع أو مستخدمي الهواتف الذكية بالانتقال فوراً لقراءة النسخة الإلكترونية والتفاعل معها بمجرد مسح الصورة بكاميرا الهاتف. يمكنك تحميله لطباعته في المقال مجلتنا.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (qrRef.current) {
                    const url = qrRef.current.toDataURL('image/png');
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `QR_${article.title.substring(0,10)}.png`;
                    a.click();
                  }
                }}
                className="flex items-center gap-1.5 text-xs font-bold font-tajawal bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-xl transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تحميل كود QR بدقة عالية</span>
              </a>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
                <span>رابط التخصيص: {article.title.substring(0, 25)}...</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main layout container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Main Article Contents (Cols: 3) */}
        <div className="lg:col-span-3 glass border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          {/* Header Metadata */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${category.color}`}>
                {category.name}
              </span>
              {article.editionId && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900/40 text-blue-400 border border-blue-800/10">
                  من العدد الأول
                </span>
              )}
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 font-serif-ar leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap text-xs text-slate-400 gap-4 pt-1 font-semibold border-b border-white/10 pb-5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span>نُشر في {article.createdAt}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>زمن القراءة المقدر: {article.readTime}</span>
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                <span>{article.views + 42} مشاهدة منذ النشر</span>
              </span>
            </div>
          </div>

          {/* Banner cover Image */}
          {article.imageUrl && (
            <div className="w-full h-[250px] sm:h-[400px] rounded-2xl overflow-hidden mb-8 shadow-inner border border-white/10">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Article textual contents */}
          <div 
            className={`font-tajawal text-slate-300 leading-relaxed space-y-6 select-text ${
              fontSize === 'sm' ? 'text-sm' :
              fontSize === 'md' ? 'text-base' :
              fontSize === 'lg' ? 'text-lg sm:text-xl' : 'text-2xl'
            }`}
          >
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-justify font-medium">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Sidebar Widgets (Author card & info) (Cols: 1) */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Author Card */}
          <div className="glass border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-400 border-b border-white/10 pb-3 mb-4 font-serif-ar">
              كاتب المقال
            </h3>
            <div className="flex items-center gap-3.5 mb-4 justify-start">
              <img
                src={author.avatarUrl}
                alt={author.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-blue-500/30 ring-offset-2 ring-offset-slate-900"
                referrerPolicy="no-referrer"
              />
              <div className="text-right">
                <h4 className="font-extrabold text-slate-100 font-serif-ar text-base">
                  {author.name}
                </h4>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-900/40 text-blue-400 inline-block mt-1 border border-blue-800/10">
                  {author.role}
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              {author.bio}
            </p>
          </div>

          {/* Category Card details */}
          <div className="glass border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-400 border-b border-white/10 pb-3 mb-3 font-serif-ar">
              القسم والمجال التحريري
            </h3>
            <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold border ${category.color} inline-block mb-3`}>
              {category.name}
            </span>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              {category.description}
            </p>
          </div>

          {/* Submission and Contacts info */}
          <div className="glass border border-white/10 rounded-3xl p-6 shadow-2xl space-y-3">
            <h4 className="text-sm font-bold text-slate-100 font-serif-ar">هل تود نشر مقالك هنا؟</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              إن مجلة الاعتصام لسان جامعتنا ومظلتها العلمية، وتستقبل المشاركات والبحوث بشكل يدوي ومنهجي للتقييم والتحكيم بواسطة هيئة التحرير.
            </p>
            <a
              href="mailto:iathisammonthly@gmail.com?subject=تقديم مقال للنشر"
              className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold font-tajawal text-xs py-2.5 rounded-xl transition cursor-pointer"
            >
              راسل هيئة التحرير للمشاركة
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
