/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Newspaper, FileText, Calendar, Image, Feather, Settings, LogOut, Menu, X, Compass, Quote, ChevronDown } from 'lucide-react';
import { SystemSetting } from '../types';

interface NavigationProps {
  settings: SystemSetting;
  activeView: 'home' | 'articles' | 'editions' | 'creative' | 'admin' | 'reader';
  setActiveView: (view: 'home' | 'articles' | 'editions' | 'creative' | 'admin' | 'reader') => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
  setFilterCategory: (id: number | null) => void;
  activeCreativeTab?: 'poems' | 'stories' | 'travelogues';
  setActiveCreativeTab?: (tab: 'poems' | 'stories' | 'travelogues') => void;
}

export default function Navigation({
  settings,
  activeView,
  setActiveView,
  isAdminLoggedIn,
  onLogout,
  setFilterCategory,
  activeCreativeTab = 'poems',
  setActiveCreativeTab
}: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [creativeDropdownOpen, setCreativeDropdownOpen] = useState(false);
  const [mobileCreativeOpen, setMobileCreativeOpen] = useState(false);

  const navItems = [
    { label: 'الرئيسية', icon: HomeIcon, view: 'home' as const },
    { label: 'جميع المقالات', icon: Newspaper, view: 'articles' as const },
    { label: 'أعداد المجلة PDF', icon: BookOpen, view: 'editions' as const },
    { label: 'الشعر والقصص والرحلات', icon: Feather, view: 'creative' as const },
  ];

  function HomeIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-4 h-4"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    );
  }

  const handleNavClick = (view: 'home' | 'articles' | 'editions' | 'creative' | 'admin' | 'reader') => {
    setActiveView(view);
    setMobileMenuOpen(false);
    if (view === 'articles') {
      setFilterCategory(null);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass-light border-b border-white/10 text-white shadow-2xl" id="main-navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo & Branding Area */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/15 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <span className="font-tajawal font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">أ</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-tajawal font-extrabold text-xl tracking-tight text-white leading-tight">
                {settings.siteName}
              </span>
              <span className="block font-tajawal text-[10px] text-blue-300 font-medium">
                {settings.collegeName}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeView === item.view;

              if (item.view === 'creative') {
                return (
                  <div
                    key={item.view}
                    className="relative"
                    onMouseEnter={() => setCreativeDropdownOpen(true)}
                    onMouseLeave={() => setCreativeDropdownOpen(false)}
                  >
                    <button
                      onClick={() => {
                        handleNavClick('creative');
                        if (setActiveCreativeTab) setActiveCreativeTab('poems');
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-tajawal font-semibold transition cursor-pointer ${
                        isActive
                          ? 'bg-blue-600 shadow-md shadow-blue-600/10 text-white'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{item.label}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${creativeDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Animated Dropdown Menu */}
                    <div
                      className={`absolute right-0 mt-1 w-64 bg-slate-905 bg-slate-900 border border-slate-850 border-slate-800 rounded-2xl shadow-xl py-2 z-50 transition-all duration-200 origin-top text-right ${
                        creativeDropdownOpen
                          ? 'opacity-100 scale-100 translate-y-0 visible'
                          : 'opacity-0 scale-95 -translate-y-2 invisible'
                      }`}
                    >
                      <button
                        onClick={() => {
                          handleNavClick('creative');
                          if (setActiveCreativeTab) setActiveCreativeTab('poems');
                          setCreativeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-start gap-3 px-4 py-3 text-xs font-semibold text-right transition-colors cursor-pointer ${
                          activeView === 'creative' && activeCreativeTab === 'poems'
                            ? 'bg-amber-600/15 text-amber-300'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Quote className="w-4 h-4 text-amber-500 shrink-0" />
                        <div className="text-right">
                          <span className="block font-bold font-serif-ar text-white">القصائد والدواوين</span>
                          <span className="text-[10px] text-slate-400 block font-tajawal">أبيات من عيون الشعر العربي</span>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          handleNavClick('creative');
                          if (setActiveCreativeTab) setActiveCreativeTab('stories');
                          setCreativeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-start gap-3 px-4 py-3 text-xs font-semibold text-right transition-colors cursor-pointer ${
                          activeView === 'creative' && activeCreativeTab === 'stories'
                            ? 'bg-blue-600/15 text-blue-300'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <BookOpen className="w-4 h-4 text-blue-500 shrink-0" />
                        <div className="text-right">
                          <span className="block font-bold font-serif-ar text-white">القصص والعِبر الصالحة</span>
                          <span className="text-[10px] text-slate-400 block font-tajawal">سرد نثري راقي يقدّم الحكمة</span>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          handleNavClick('creative');
                          if (setActiveCreativeTab) setActiveCreativeTab('travelogues');
                          setCreativeDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-start gap-3 px-4 py-3 text-xs font-semibold text-right transition-colors cursor-pointer ${
                          activeView === 'creative' && activeCreativeTab === 'travelogues'
                            ? 'bg-emerald-600/15 text-emerald-300'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <Compass className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div className="text-right">
                          <span className="block font-bold font-serif-ar text-white">أدب ومذكرات الرحلات</span>
                          <span className="text-[10px] text-slate-400 block font-tajawal">مذكرات الأسفار والرحالة</span>
                        </div>
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-tajawal font-semibold transition cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 shadow-md shadow-blue-600/10 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons (Admin & System Controls) */}
          <div className="hidden md:flex items-center gap-3">
            {isAdminLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`p-2.5 rounded-xl border transition cursor-pointer ${
                    activeView === 'admin'
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg'
                      : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900'
                  }`}
                  title="لوحة المعاينة الإدارية"
                >
                  <Settings className="w-4 h-4 text-emerald-300 animate-spin-slow" style={{ animationDuration: '8s' }} />
                </button>
                <button
                  onClick={onLogout}
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition cursor-pointer"
                  title="تسجيل خروج"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('admin')}
                className={`p-2.5 rounded-xl border transition cursor-pointer ${
                  activeView === 'admin'
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-slate-800/80 hover:bg-blue-900/50 border border-slate-700/50 hover:border-blue-700 text-slate-300 hover:text-white'
                }`}
                title="دخول الإدارة"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Mobile Hamburguer Trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-b border-white/10 px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeView === item.view;

            if (item.view === 'creative') {
              return (
                <div key={item.view} className="space-y-1">
                  <button
                    onClick={() => setMobileCreativeOpen(!mobileCreativeOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-tajawal font-bold text-right transition cursor-pointer bg-slate-900/40 border border-white/5`}
                  >
                    <span className="flex items-center gap-3">
                      <IconComponent className="w-5 h-5 text-amber-400" />
                      <span className="text-white">{item.label}</span>
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileCreativeOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {mobileCreativeOpen && (
                    <div className="mr-4 space-y-1 border-r border-slate-800 pr-3 pt-1 pb-2">
                      <button
                        onClick={() => {
                          handleNavClick('creative');
                          if (setActiveCreativeTab) setActiveCreativeTab('poems');
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-bold text-right transition ${
                          activeView === 'creative' && activeCreativeTab === 'poems'
                            ? 'bg-amber-600/15 text-amber-300'
                            : 'text-slate-400 hover:text-white hover:bg-slate-850'
                        }`}
                      >
                        <Quote className="w-4 h-4 text-amber-500" />
                        <span>القصائد والدواوين</span>
                      </button>

                      <button
                        onClick={() => {
                          handleNavClick('creative');
                          if (setActiveCreativeTab) setActiveCreativeTab('stories');
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-bold text-right transition ${
                          activeView === 'creative' && activeCreativeTab === 'stories'
                            ? 'bg-blue-600/15 text-blue-300'
                            : 'text-slate-400 hover:text-white hover:bg-slate-855'
                        }`}
                      >
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span>القصص والعِبر الصالحة</span>
                      </button>

                      <button
                        onClick={() => {
                          handleNavClick('creative');
                          if (setActiveCreativeTab) setActiveCreativeTab('travelogues');
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-bold text-right transition ${
                          activeView === 'creative' && activeCreativeTab === 'travelogues'
                            ? 'bg-emerald-600/15 text-emerald-300'
                            : 'text-slate-400 hover:text-white hover:bg-slate-855'
                        }`}
                      >
                        <Compass className="w-4 h-4 text-emerald-500" />
                        <span>أدب ومذكرات الرحلات</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-tajawal font-bold text-right transition cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <IconComponent className="w-5 h-5 text-blue-400" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-800 space-y-2">
            {isAdminLoggedIn ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-tajawal font-bold bg-emerald-900/80 text-emerald-200 cursor-pointer"
                >
                  <Settings className="w-5 h-5 text-emerald-400" />
                  <span>لوحة المعاينة الإدارية</span>
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-tajawal font-bold bg-rose-950/80 text-rose-300 cursor-pointer"
                >
                  <LogOut className="w-5 h-5 text-rose-400" />
                  <span>تسجيل تصفح الخروج</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-tajawal font-bold bg-slate-800 hover:bg-slate-750 text-slate-200 cursor-pointer"
              >
                <Settings className="w-5 h-5 text-blue-400" />
                <span>بوابة الإدارة والمقالات</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
