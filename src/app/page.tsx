'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { allWords } from '@/data/vocabulary';
import { Word } from '@/types';
import ScrollReveal from '@/components/animations/ScrollReveal';
import TextReveal from '@/components/animations/TextReveal';
import { useAuth } from '@/contexts/AuthContext';

import { PlayCircle, Bookmark, ArrowRight, BookOpen, Award, Zap, Puzzle, Globe, Volume2, MessageSquare, Flame } from 'lucide-react';

const levels = [
  { level: 'A1', title: 'Beginner', titleBn: 'প্রাথমিক', words: 500, colorFrom: 'from-emerald-400', colorTo: 'to-teal-500', href: '/vocabulary/a1', progress: 0 },
  { level: 'A2', title: 'Elementary', titleBn: 'প্রাথমিক+', words: 500, colorFrom: 'from-blue-400', colorTo: 'to-indigo-500', href: '/vocabulary/a2', progress: 0 },
  { level: 'B1', title: 'Intermediate', titleBn: 'মধ্যম', words: 500, colorFrom: 'from-orange-400', colorTo: 'to-rose-500', href: '/vocabulary/b1', progress: 0 },
  { level: 'B2', title: 'Upper Int.', titleBn: 'উচ্চ মধ্যম', words: 500, colorFrom: 'from-purple-400', colorTo: 'to-pink-500', href: '/vocabulary/b2', progress: 0 },
];

export default function HomePage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [wordOfDay, setWordOfDay] = useState<Word | null>(null);
  const [isWordFlipped, setIsWordFlipped] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const wordIndex = dayOfYear % allWords.length;
    setWordOfDay(allWords[wordIndex] || allWords[0]);
  }, []);

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 transition-opacity duration-500 overflow-hidden ${mounted ? 'opacity-100' : 'opacity-0'}`}>

      {/* Hero Section: Split Layout with Dynamic Aesthetics */}
      <section className="relative px-6 pt-20 pb-24 md:pt-32 md:pb-28 max-w-7xl mx-auto">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-40 left-0 -ml-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-bold tracking-wide border border-blue-200 dark:border-blue-800">
              <Globe className="w-4 h-4" />
              <span>ফ্রিতে জার্মান শিখুন • Free German Course</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 leading-[1.1] tracking-tight font-poppins drop-shadow-sm">
              <TextReveal text="Master German" /> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
                <TextReveal text="Effortlessly." delay={0.4} />
              </span>
            </h1>
            <ScrollReveal delay={0.2} direction="up">
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-inter">
                একদম ফ্রি, ওপেন-সোর্স প্ল্যাটফর্ম - সহজ <span className="text-slate-900 dark:text-white font-semibold">ইংরেজি</span> ব্যাখ্যা আর <span className="text-slate-900 dark:text-white font-semibold font-bengali">বাংলা</span> অর্থ সহ জার্মান শিখুন।
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/vocabulary/a1" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
                  <span className="relative z-10">A1 শুরু করুন</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 text-white"></div>
                </Link>
                <Link href="/practice" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:border-blue-500/50 transition-all hover:scale-105 active:scale-95">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <span>কুইজ দিন</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Visual Image (Hidden on Mobile) */}
          <div className="hidden lg:flex relative mx-auto w-full max-w-none aspect-square items-center justify-center">
            {/* Decorative background for image */}
            <div className="absolute inset-4 bg-gradient-to-br from-blue-100 to-teal-50 dark:from-blue-900/40 dark:to-teal-900/20 rounded-[3rem] transform rotate-3 scale-105 opacity-70"></div>
            <div className="absolute inset-4 bg-white dark:bg-slate-800 rounded-[3rem] transform -rotate-2 shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-700/50 flex flex-col justify-between p-6">
              {/* Mock App Interface Visual */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-semibold text-slate-500 dark:text-slate-300">Level A1</div>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center text-4xl mb-2 shadow-inner">
                  🇩🇪
                </div>
                <h3 className="text-3xl font-bold text-slate-900 dark:text-white font-poppins">Entschuldigung</h3>
                <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-medium">Excuse me / Sorry</div>
                <div className="text-slate-500 dark:text-slate-500 font-bengali">মাপ করবেন / দুঃখিত</div>
              </div>

              <div className="mt-8 flex gap-3">
                <div className="h-10 flex-1 bg-blue-600 rounded-xl opacity-90"></div>
                <div className="h-10 w-10 bg-slate-100 dark:bg-slate-700 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <ScrollReveal direction="up" delay={0.4}>
        <section className="border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-wrap justify-center md:justify-between gap-8 text-center md:text-left">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400"><BookOpen className="w-6 h-6" /></div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{user.learnedWords.length}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">Words Learned</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400"><Flame className="w-6 h-6" /></div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{user.streak} Days</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">Current Streak</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400"><Award className="w-6 h-6" /></div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{user.xp}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">Total XP Points</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400"><BookOpen className="w-6 h-6" /></div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">5,000+</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">Words & Entries</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400"><Award className="w-6 h-6" /></div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">A1-B2</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">CEFR Levels</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400"><Puzzle className="w-6 h-6" /></div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">100%</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase">Free & Interactive</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </ScrollReveal>

      {/* Main Grid: Features & Levels */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Interactive Word of the Day (Left Large) */}
          <div className="lg:col-span-5 relative group">
            <div className="relative w-full h-[420px]">
              <AnimatePresence mode="wait">
                {!isWordFlipped ? (
                  <motion.div
                    key="front"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsWordFlipped(true)}
                    className="absolute inset-0 bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-full text-sm font-bold uppercase tracking-widest font-bengali border border-rose-100 dark:border-rose-900/30">
                          আজকের শব্দ
                        </div>
                        <button onClick={() => setIsWordFlipped(true)} className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-600 dark:text-slate-400 active:scale-90">
                          <MessageSquare className="w-5 h-5" />
                        </button>
                      </div>

                      {wordOfDay ? (
                        <div className="space-y-6">
                          <h2 className="text-5xl font-bold text-slate-900 dark:text-white leading-tight">{wordOfDay.german}</h2>
                          <div className="space-y-2">
                            <p className="text-2xl text-slate-600 dark:text-slate-300 font-medium">{wordOfDay.english}</p>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-bengali font-medium">{wordOfDay.bangla}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="animate-pulse space-y-4">
                          <div className="h-12 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                          <div className="h-6 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors active:scale-[0.98]">
                        <Volume2 className="w-5 h-5" /> <span>Listen</span>
                      </button>
                      <button className="flex items-center justify-center w-12 h-12 bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-500 rounded-xl transition-colors active:scale-95">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="back"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsWordFlipped(false)}
                    className="absolute inset-0 bg-gradient-to-br from-blue-600 to-teal-500 rounded-[2.5rem] p-8 shadow-2xl flex flex-col items-center justify-center text-center text-white cursor-pointer"
                  >
                    <div className="bg-white/20 p-4 rounded-full mb-6 backdrop-blur-sm">
                      <PlayCircle className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 font-poppins">Practice Makes Perfect</h3>
                    <p className="text-blue-50 mb-8 max-w-[250px] leading-relaxed">Hear the native pronunciation and practice speaking out loud.</p>
                    <button onClick={() => setIsWordFlipped(false)} className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg active:scale-95">
                      Back to Word
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Links Grid & Levels (Right Large) */}
          <div className="lg:col-span-7 flex flex-col gap-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Sentence Builder */}
              <Link href="/sentence-builder" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition-all duration-300 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Puzzle className="w-24 h-24 text-blue-500 transform rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                </div>
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform relative z-10 shadow-sm"><Puzzle className="w-7 h-7" /></div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">Sentence Builder</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed relative z-10 max-w-[200px]">Practice grammar interactively by arranging blocks.</p>
              </Link>

              {/* Speed Quiz */}
              <Link href="/practice" className="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 hover:border-orange-500 transition-all duration-300 shadow-xl shadow-slate-200/20 dark:shadow-none hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap className="w-24 h-24 text-orange-500 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                </div>
                <div className="w-14 h-14 bg-orange-100 dark:bg-orange-900/50 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6 group-hover:scale-110 transition-transform relative z-10 shadow-sm"><Zap className="w-7 h-7" /></div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">Speed Quiz</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed relative z-10 max-w-[200px]">Test your vocabulary recall speed and accuracy.</p>
              </Link>
            </div>

            {/* Course Levels Upgrade */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none flex-1">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-poppins">Language Levels</h3>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">CEFR Standard</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {levels.map((level) => (
                  <Link key={level.level} href={level.href} className="group relative block overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-5 hover:border-transparent transition-all duration-300 hover:-translate-y-1">
                    {/* Hover Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${level.colorFrom} ${level.colorTo} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${level.colorFrom} ${level.colorTo} flex items-center justify-center text-white text-xl font-black shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                          {level.level}
                        </div>
                        <div className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                        </div>
                      </div>

                      <div className="font-bold text-slate-800 dark:text-white text-lg mb-0.5">{level.title}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 font-bengali mb-4">{level.titleBn}</div>

                      {/* Fake Progress UI */}
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1.5">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-slate-600 dark:text-slate-300">{level.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${level.colorFrom} ${level.colorTo} rounded-full`} style={{ width: `${level.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-gradient-to-b from-transparent to-slate-100 dark:to-slate-900/50 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 font-poppins text-slate-900 dark:text-white drop-shadow-sm">Ready to start your journey?</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">Join thousands of learners mastering German with our simplified, dual-language approach. No hidden fees, ever.</p>
          <Link href="/login" className="group relative inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl overflow-hidden shadow-2xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all">
            <span className="relative z-10">Create Free Account</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
          </Link>
        </div>
      </section>

    </div>
  );
}
