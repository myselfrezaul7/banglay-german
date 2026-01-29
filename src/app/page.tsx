'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { allWords } from '@/data/vocabulary';
import { Word } from '@/types';

const features = [
  {
    icon: '📚',
    title: 'Vocabulary',
    titleBn: 'শব্দভাণ্ডার',
    description: 'Learn 500+ words per level with translations',
  },
  {
    icon: '🎯',
    title: 'Practice',
    titleBn: 'অনুশীলন',
    description: 'Interactive quizzes to test your knowledge',
  },
  {
    icon: '🔊',
    title: 'Audio',
    titleBn: 'অডিও',
    description: 'Hear correct German pronunciation',
  },
  {
    icon: '📈',
    title: 'Progress',
    titleBn: 'অগ্রগতি',
    description: 'Track your learning journey',
  },
];

const levels = [
  {
    level: 'A1',
    title: 'Beginner',
    titleBn: 'প্রাথমিক',
    description: 'Start your German journey with basic vocabulary and phrases',
    words: 500,
    color: 'var(--level-a1)',
    href: '/vocabulary/a1',
  },
  {
    level: 'A2',
    title: 'Elementary',
    titleBn: 'প্রাথমিক+',
    description: 'Expand your vocabulary for everyday conversations',
    words: 500,
    color: 'var(--level-a2)',
    href: '/vocabulary/a2',
  },
  {
    level: 'B1',
    title: 'Intermediate',
    titleBn: 'মধ্যম',
    description: 'Master more complex vocabulary and expressions',
    words: 500,
    color: 'var(--level-b1)',
    href: '/vocabulary/b1',
  },
  {
    level: 'B2',
    title: 'Upper Int.',
    titleBn: 'উচ্চ মধ্যম',
    description: 'Advanced concepts for professional life',
    words: 500,
    color: 'var(--level-b2)',
    href: '/vocabulary/b2',
  },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [wordOfDay, setWordOfDay] = useState<Word | null>(null);

  useEffect(() => {
    setMounted(true);
    // Random word of the day logic (simple version)
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const wordIndex = dayOfYear % allWords.length;
    setWordOfDay(allWords[wordIndex] || allWords[0]);
  }, []);

  return (
    <div className={`page-transition ${mounted ? '' : 'opacity-0'}`}>
      {/* Hero Section - Cleaner & Lighter */}
      <section className="relative min-h-[85vh] flex items-center bg-white dark:bg-slate-900 overflow-hidden">
        {/* Abstract Shapes Background */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-50 dark:bg-blue-900/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-green-50 dark:bg-green-900/10 blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="text-left animate-slideUp">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                New: B2 Level Added
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-slate-800 dark:text-white font-poppins">
                Master German <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Effortlessly</span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-8 max-w-lg font-inter">
                Learn with English explanations and <span className="text-slate-700 dark:text-slate-200 font-semibold font-bengali">বাংলা</span> translations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/vocabulary" className="btn-primary text-lg px-8 py-4 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30">
                  <span>Start Learning</span>
                </Link>
                <Link href="/practice" className="btn-secondary text-lg px-8 py-4">
                  <span>Take a Quiz</span>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 flex items-center gap-8 text-slate-500 dark:text-slate-400">
                <div>
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">2000+</div>
                  <div className="text-sm">Words</div>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700"></div>
                <div>
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">4</div>
                  <div className="text-sm">Levels</div>
                </div>
                <div className="w-px h-10 bg-slate-200 dark:bg-slate-700"></div>
                <div>
                  <div className="text-2xl font-bold text-slate-800 dark:text-white">Free</div>
                  <div className="text-sm">Forever</div>
                </div>
              </div>
            </div>

            {/* Right Content - Daily Cards */}
            <div className="relative hidden lg:block">
              {/* Daily Practice Card - Floating */}
              <div className="absolute top-0 right-10 z-20 w-72 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-100 dark:border-slate-700 animate-float" style={{ animationDelay: '0s' }}>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-xl">🔥</div>
                  <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-full">DAILY GOAL</span>
                </div>
                <h3 className="text-lg font-bold mb-1">Keep it up!</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">You're on a 3-day streak. Practice 5 mins today.</p>
                <Link href="/practice" className="w-full btn-primary text-sm py-2">Quick Practice</Link>
              </div>

              {/* Word of the Day Card - Floating Delayed */}
              <div className="absolute top-40 right-20 z-10 w-80 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 animate-float" style={{ animationDelay: '2s', transform: 'scale(0.95)' }}>
                {wordOfDay && (
                  <>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Word of the Day</span>
                      <span className={`badge badge-${wordOfDay.level}`}>{wordOfDay.level.toUpperCase()}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{wordOfDay.german}</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-2">{wordOfDay.english}</p>
                    <p className="text-slate-400 dark:text-slate-500 font-bengali text-sm">{wordOfDay.bangla}</p>
                  </>
                )}
              </div>

              {/* Background Blob */}
              <div className="absolute top-10 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-xl opacity-70 animate-blob"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Levels Section - Clean Cards */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 font-poppins">Choose Your Level</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bengali">আপনার দক্ষতার স্তর নির্বাচন করুন</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {levels.map((level, index) => (
              <Link
                key={level.level}
                href={level.href}
                className="clean-card group p-6 hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-white dark:bg-slate-800"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white shadow-md" style={{ background: level.color }}>
                    {level.level}
                  </div>
                  <div className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">{level.words} words</div>
                </div>

                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">{level.title}</h3>
                <p className="text-sm font-bengali text-slate-500 dark:text-slate-400 mb-4">{level.titleBn}</p>
                <p className="text-sm text-slate-400 dark:text-slate-500">{level.description}</p>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions / Daily Practice (Mobile Visible) */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Daily Practice</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Word of Day Mobile */}
            <div className="lg:hidden clean-card p-6 bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💡</span>
                <h3 className="font-bold">Word of the Day</h3>
              </div>
              {wordOfDay && (
                <div>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">{wordOfDay.german}</h4>
                  <p className="text-slate-600 dark:text-slate-300">{wordOfDay.english} • <span className="font-bengali">{wordOfDay.bangla}</span></p>
                </div>
              )}
            </div>

            <Link href="/sentence-builder" className="clean-card p-6 flex items-center gap-4 hover:bg-orange-50 dark:hover:bg-orange-900/10 group transition-colors">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🧩</div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">Sentence Builder</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Arrange words to form sentences</p>
              </div>
            </Link>

            <Link href="/practice" className="clean-card p-6 flex items-center gap-4 hover:bg-green-50 dark:hover:bg-green-900/10 group transition-colors">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">⚡</div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">Speed Quiz</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Test your vocabulary speed</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
