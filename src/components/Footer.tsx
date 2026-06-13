/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, BookOpen, Globe, Award, ShieldCheck, Instagram, Youtube } from 'lucide-react';
import { SystemSetting } from '../types';

interface FooterProps {
  settings: SystemSetting;
  setActiveView: (view: 'home' | 'articles' | 'editions' | 'creative' | 'admin' | 'reader') => void;
}

export default function Footer({ settings, setActiveView }: FooterProps) {
  return (
    <footer className="glass-light border-t border-white/10 text-slate-400 font-tajawal text-right py-12 shadow-[0_-10px_30px_rgba(0,0,0,0.3)]" dir="rtl" id="app-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand and Description */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center font-extrabold text-white text-base">
              <span>أ</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-100 font-serif-ar">
              {settings.siteName}
            </h3>
          </div>
          <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-md">
            {settings.footerAbout || settings.aboutText}
          </p>
          <div className="text-xs text-sky-400 flex items-center gap-1.5 font-bold pt-1">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>عمادة التحرير بمواصفات أكاديمية محكمة - {settings.collegeName}</span>
          </div>
        </div>

        {/* Categories / Navigation links */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-200 tracking-wider font-serif-ar">روابط سريعة</h4>
          <ul className="space-y-2 text-sm font-medium">
            <li>
              <button
                onClick={() => setActiveView('home')}
                className="hover:text-blue-400 transition cursor-pointer"
              >
                الرئيسية للمجلة
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('articles')}
                className="hover:text-blue-400 transition cursor-pointer"
              >
                تصفح المقالات والبحوث
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('editions')}
                className="hover:text-blue-400 transition cursor-pointer"
              >
                أرشيف المطبوعات PDF
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveView('creative')}
                className="hover:text-blue-400 transition cursor-pointer"
              >
                الواحة الأدبية (قصائد وروايات)
              </button>
            </li>
          </ul>
        </div>

        {/* Contacts Area */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold text-slate-200 tracking-wider font-serif-ar">قنوات التواصل والمنشورات</h4>
          <ul className="space-y-3 text-xs leading-relaxed">
            <li className="flex items-center gap-2.5 justify-start">
              <Mail className="w-4 h-4 text-blue-500 shrink-0" />
              <a href={settings.submissionGuideUrl} className="hover:text-sky-400 transition break-all">
                {settings.contactEmail}
              </a>
            </li>
            <li className="flex items-center gap-2.5 justify-start">
              <Phone className="w-4 h-4 text-blue-500 shrink-0" />
              <span dir="ltr" className="font-mono">{settings.contactPhone}</span>
            </li>
            <li className="flex items-center gap-2.5 justify-start">
              <Globe className="w-4 h-4 text-blue-500 shrink-0" />
              <span>المدخل الدراسي لـ {settings.collegeName}</span>
            </li>
          </ul>

          {/* Social Media Channels Section */}
          <div className="pt-4 border-t border-white/5 space-y-2.5">
            <p className="text-xs font-bold text-slate-300">متابعة حساباتنا الرسمية:</p>
            <div className="flex items-center gap-2.5 justify-start pt-1">
              {/* Instagram URL */}
              <a 
                href={settings.instagramUrl || "https://www.instagram.com/aiathisam_monthly"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-pink-600/20 hover:text-pink-400 border border-white/5 hover:border-pink-500/30 flex items-center justify-center text-slate-300 transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
                title="إنستغرام مجلة الاعتصام"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              
              {/* WhatsApp Channel URL */}
              <a 
                href={settings.whatsappUrl || "https://whatsapp.com/channel/0029Va9N"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-emerald-600/20 hover:text-emerald-400 border border-white/5 hover:border-emerald-500/30 flex items-center justify-center text-slate-300 transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
                title="قناة الواتساب الرسمية للبحوث والمقالات"
              >
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>

              {/* YouTube Channel URL */}
              <a 
                href={settings.youtubeUrl || "https://www.youtube.com/@aiathisam"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800/80 hover:bg-red-600/20 hover:text-red-400 border border-white/5 hover:border-red-500/30 flex items-center justify-center text-slate-300 transition-all duration-300 shadow-md hover:scale-105 cursor-pointer"
                title="قناة اليوتيوب الرسمية للمحاضرات والندوات"
              >
                <Youtube className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs font-semibold text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>منصة متوافقة مع شروط النشر وحماية الهوية والأمان.</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/10 text-center text-xs font-medium text-slate-500">
        <p>© {new Date().getFullYear()} {settings.footerCopyright || `جميع الحقوق محفوظة لـ ${settings.siteName}`}</p>
        <p className="mt-1 text-slate-650">{settings.collegeName}</p>
      </div>
    </footer>
  );
}
