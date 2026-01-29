'use client';

import Link from 'next/link';
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
          Learn German for Free • সহজ জার্মান শিক্ষা
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight font-poppins">
          Master German <span className="text-blue-600">Effortlessly.</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-inter">
          A completely free, open-source platform to learn German with simple <span className="text-slate-900 dark:text-white font-medium">English</span> explanations and <span className="text-slate-900 dark:text-white font-medium font-bengali">বাংলা</span> translations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/vocabulary/a1" className="min-w-[200px] px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:transform hover:-translate-y-1 transition-all duration-200">
            Start A1 Course
          </Link>
          <Link href="/practice" className="min-w-[200px] px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200">
            Take a Quiz
          </Link>
        </div>
      </section>

      {/* Main Grid: Features & Levels */}
      <section className="px-4 pb-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Daily Card (Left Large) */}
          <div className="md:col-span-5 lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-400 uppercase tracking-widest">Word of the Day</h3>
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
            <Link href="/sentence-builder" className="group bg-blue-50 dark:bg-blue-900/10 rounded-3xl p-6 hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform">🧩</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Sentence Builder</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Practice grammar by arranging words.</p>
            </Link>

            {/* Quiz */}
            <Link href="/practice" className="group bg-orange-50 dark:bg-orange-900/10 rounded-3xl p-6 hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Speed Quiz</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Test your vocabulary speed.</p>
            </Link>



            {/* Levels: Full Width Row across the grid col */}
            <div className="col-span-1 sm:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm mt-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Course Levels</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {levels.map((level) => (
                  <Link key={level.level} href={level.href} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all text-center group">
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
      <section className="px-4 pb-20 max-w-5xl mx-auto">
        <a href="https://www.nextepedu.com" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden bg-gradient-to-br from-indigo-900 to-blue-900 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-900/20 hover:shadow-blue-900/30 transition-all transform hover:-translate-y-1">
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 group-hover:opacity-30 transition-opacity"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 opacity-20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold mb-4 border border-white/10 uppercase tracking-wider">
                Education Partner
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Dreaming of Germany?</h2>
              <p className="text-blue-100 text-lg mb-0 max-w-xl leading-relaxed">
                While you master the language here, let <span className="font-bold text-white">NexTep Edu</span> handle your university admission and visa process.
              </p>
            </div>

            <div className="flex-shrink-0">
              <div className="px-8 py-4 bg-white text-blue-900 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-3">
                Visit NexTep Edu <span className="text-xl">→</span>
              </div>
            </div>
          </div>
        </a>
      </section>

      {/* Footer Area / Call to Action */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 font-poppins">Ready to start your journey?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">Join thousands of learners mastering German with our simplified, dual-language approach.</p>
          <Link href="/login" className="inline-block px-10 py-4 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/50">
            Create Free Account
          </Link>
        </div>
      </section>

    </div>
  );
}
