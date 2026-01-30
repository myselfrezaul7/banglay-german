'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { allWords } from '@/data/vocabulary';
import { Word } from '@/types';

const levels = [
  { level: 'A1', title: 'Beginner', titleBn: 'প্রাথমিক', words: 500, color: 'bg-green-500', href: '/vocabulary/a1' },
  { level: 'A2', title: 'Elementary', titleBn: 'প্রাথমিক+', words: 500, color: 'bg-blue-500', href: '/vocabulary/a2' },
  { level: 'B1', title: 'Intermediate', titleBn: 'মধ্যম', words: 500, color: 'bg-orange-500', href: '/vocabulary/b1' },
  { level: 'B2', title: 'Upper Int.', titleBn: 'উচ্চ মধ্যম', words: 500, color: 'bg-pink-500', href: '/vocabulary/b2' },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [wordOfDay, setWordOfDay] = useState<Word | null>(null);

  useEffect(() => {
    setMounted(true);
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const wordIndex = dayOfYear % allWords.length;
    setWordOfDay(allWords[wordIndex] || allWords[0]);
  }, []);

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>

      {/* Hero Section: Simple, Centered, High Contrast */}
      <section className="px-6 py-24 md:py-32 max-w-5xl mx-auto text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold tracking-wide">
          ফ্রিতে জার্মান শিখুন • Learn German for Free
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight font-poppins">
          Master German <span className="text-blue-600">Effortlessly.</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-inter">
          একদম ফ্রি, ওপেন-সোর্স প্ল্যাটফর্ম - সহজ <span className="text-slate-900 dark:text-white font-medium">ইংরেজি</span> ব্যাখ্যা আর <span className="text-slate-900 dark:text-white font-medium font-bengali">বাংলা</span> অর্থ সহ জার্মান শিখুন।
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/vocabulary/a1" className="min-w-[200px] px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:transform hover:-translate-y-1 transition-all duration-200">
            A1 শুরু করুন
          </Link>
          <Link href="/practice" className="min-w-[200px] px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200">
            কুইজ দিন
          </Link>
        </div>
      </section>

      {/* Main Grid: Features & Levels */}
      <section className="px-4 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Daily Card (Left Large) */}
          <div className="md:col-span-5 lg:col-span-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest font-bengali">আজকের শব্দ</h3>
              <span className="text-2xl">💡</span>
            </div>
            {wordOfDay ? (
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white border-l-4 border-blue-500 pl-4">{wordOfDay.german}</h2>
                <div className="pl-5 space-y-1">
                  <p className="text-xl text-slate-600 dark:text-slate-300 font-medium">{wordOfDay.english}</p>
                  <p className="text-lg text-slate-500 dark:text-slate-400 font-bengali">{wordOfDay.bangla}</p>
                </div>
                <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800">
                  <Link href="/vocabulary" className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-2">
                    See all words <span className="text-lg">→</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="animate-pulse h-32 bg-slate-100 rounded-xl"></div>
            )}
          </div>

          {/* Quick Links Grid (Right) */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Practice */}
            <Link href="/sentence-builder" className="group bg-blue-100/50 dark:bg-blue-900/20 backdrop-blur-xl rounded-3xl p-6 border border-blue-200/50 dark:border-blue-800/30 hover:bg-blue-200/60 dark:hover:bg-blue-900/30 hover:border-blue-300/50 dark:hover:border-blue-700/50 transition-all duration-300 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/20 cursor-pointer">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform">🧩</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Sentence Builder</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Practice grammar by arranging words.</p>
            </Link>

            {/* Quiz */}
            <Link href="/practice" className="group bg-orange-100/50 dark:bg-orange-900/20 backdrop-blur-xl rounded-3xl p-6 border border-orange-200/50 dark:border-orange-800/30 hover:bg-orange-200/60 dark:hover:bg-orange-900/30 hover:border-orange-300/50 dark:hover:border-orange-700/50 transition-all duration-300 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/20 cursor-pointer">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Speed Quiz</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Test your vocabulary speed.</p>
            </Link>



            {/* Levels: Full Width Row across the grid col */}
            <div className="col-span-1 sm:col-span-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 mt-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Course Levels</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {levels.map((level) => (
                  <Link key={level.level} href={level.href} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-100/60 dark:bg-slate-800/60 backdrop-blur-lg border border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 hover:border-slate-300/50 dark:hover:border-slate-600/50 transition-all duration-300 text-center group">
                    <div className={`w-10 h-10 ${level.color} rounded-lg flex items-center justify-center text-white font-bold mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                      {level.level}
                    </div>
                    <div className="font-semibold text-slate-800 dark:text-white text-sm">{level.title}</div>
                    <div className="text-xs text-slate-400 font-bengali">{level.titleBn}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Partner Section: Separated for better flow */}
      <section className="px-4 pb-20 max-w-5xl mx-auto relative">
        {/* Background Decorative Blur for Glass Effect - Softened and color-matched */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/4 right-0 w-48 h-48 bg-amber-400/5 rounded-full blur-[100px] pointer-events-none"></div>

        <a href="https://www.nextepedu.com" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden glass-ios-premium rounded-[2.5rem] p-8 md:p-12 transition-all transform hover:-translate-y-1 border-white/20 dark:border-slate-800/30 shadow-lg shadow-blue-900/5">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
            <div className="flex-1 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-300 text-xs font-bold mb-4 border border-blue-500/20 uppercase tracking-wider">
                Education Partner
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Dreaming of Germany?</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-xl leading-relaxed font-inter">
                While you master the language here, let <span className="font-bold text-blue-600 dark:text-blue-400">NexTep Edu</span> handle your university admission and visa process.
              </p>
              <div className="inline-flex items-center px-8 py-3.5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                Visit NexTep Edu <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>

            {/* Illustration - New Modern Image */}
            <div className="flex-shrink-0 order-1 md:order-2 w-56 h-56 md:w-72 md:h-72 relative transform group-hover:scale-105 transition-transform duration-700 ease-out">
              <div className="absolute inset-4 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all"></div>
              <Image
                src="/nextep_promo_modern_v1_1769733262037.png"
                alt="Study in Germany Illustration"
                fill
                className="object-contain drop-shadow-2xl relative z-10 p-2"
              />
            </div>
          </div>
        </a>
      </section>

      {/* Footer Area / Call to Action */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 font-poppins text-slate-900 dark:text-white">Ready to start your journey?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto">Join thousands of learners mastering German with our simplified, dual-language approach.</p>
          <Link href="/login" className="inline-block px-10 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30">
            Create Free Account
          </Link>
        </div>
      </section>

    </div>
  );
}
