'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { a1Words, a2Words, b1Words, b2Words } from '@/data/vocabulary';
import { BookOpen, Layers, Award, Headphones, ArrowRight, Sparkles } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const levels = [
    { level: 'a1', title: 'A1 - Beginner', titleBn: 'একদম শুরু', description: 'Basic greetings, numbers, food, family, and everyday vocabulary.', colorFrom: 'from-emerald-400', colorTo: 'to-teal-500', words: a1Words },
    { level: 'a2', title: 'A2 - Elementary', titleBn: 'প্রাথমিক', description: 'Work, home, health, and travel vocabulary for conversations.', colorFrom: 'from-blue-400', colorTo: 'to-indigo-500', words: a2Words },
    { level: 'b1', title: 'B1 - Intermediate', titleBn: 'মাঝামাঝি', description: 'Advanced work, travel, and abstract vocabulary.', colorFrom: 'from-orange-400', colorTo: 'to-rose-500', words: b1Words },
    { level: 'b2', title: 'B2 - Upper Int.', titleBn: 'উন্নত', description: 'Academic, professional, society, and complex topics.', colorFrom: 'from-purple-400', colorTo: 'to-pink-500', words: b2Words },
];

export default function VocabularyPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const totalWords = a1Words.length + a2Words.length + b1Words.length + b2Words.length;

    return (
        <div className={`min-h-screen pb-24 bg-slate-50 dark:bg-slate-950 transition-opacity duration-500 overflow-hidden relative ${mounted ? 'opacity-100' : 'opacity-0'}`}>

            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header Section */}
            <section className="relative pt-24 pb-12 text-center max-w-5xl mx-auto px-6 z-10">
                <ScrollReveal direction="up">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold tracking-widest uppercase border border-blue-200 dark:border-blue-800/50 shadow-sm">
                        <BookOpen className="w-4 h-4" /> Word Library
                    </div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.1}>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 dark:text-white font-poppins tracking-tight">
                        Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Vocabulary.</span>
                    </h1>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2}>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Explore over {totalWords} words carefully categorized by CEFR levels.
                        <br />
                        <span className="font-bengali text-slate-500 font-medium mt-1 inline-block">ইংরেজি আর বাংলায় অর্থ সহ জার্মান শব্দ শিখুন</span>
                    </p>
                </ScrollReveal>
            </section>

            {/* Floating Stats Bar */}
            <ScrollReveal direction="up" delay={0.3}>
                <section className="max-w-4xl mx-auto px-6 relative z-20 -mt-2">
                    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2rem] p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-blue-900/5 flex flex-wrap justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-[1rem] flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Layers className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-slate-900 dark:text-white">{totalWords}</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Words</div>
                            </div>
                        </div>

                        <div className="w-px h-12 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-[1rem] flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-slate-900 dark:text-white">4</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">CEFR Levels</div>
                            </div>
                        </div>

                        <div className="w-px h-12 bg-slate-200 dark:bg-slate-800 hidden md:block"></div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-[1rem] flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <Headphones className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-3xl font-black text-slate-900 dark:text-white">100%</div>
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Audio Included</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Level Cards Grid */}
                <section className="max-w-6xl mx-auto px-6 pt-16 relative z-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {levels.map((level, i) => (
                            <ScrollReveal key={level.level} direction="up" delay={0.4 + (i * 0.1)}>
                                <Link
                                    href={`/vocabulary/${level.level}`}
                                    className="group relative block flex flex-col h-full overflow-hidden rounded-3xl md:rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 md:p-6 hover:border-transparent transition-all duration-500 hover:-translate-y-2 shadow-xl shadow-slate-200/20 dark:shadow-none"
                                >
                                    {/* Hover Gradient Background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${level.colorFrom} ${level.colorTo} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-10 transition-opacity duration-500`}></div>

                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4 md:mb-6">
                                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[1rem] md:rounded-[1.2rem] bg-gradient-to-br ${level.colorFrom} ${level.colorTo} flex items-center justify-center text-white text-lg md:text-2xl font-black shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                                                {level.level.toUpperCase()}
                                            </div>
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:-rotate-45">
                                                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                                            </div>
                                        </div>

                                        <h2 className="text-xl md:text-2xl font-extrabold mb-1 md:mb-1.5 text-slate-900 dark:text-white font-poppins tracking-tight">{level.title}</h2>
                                        <p className="text-[11px] md:text-sm font-bengali font-bold text-slate-500 dark:text-slate-400 mb-3 md:mb-4">{level.titleBn}</p>

                                        <p className="text-[12px] md:text-sm text-slate-600 dark:text-slate-400 mb-4 md:mb-6 flex-grow leading-relaxed hidden sm:block">
                                            {level.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400">
                                                <BookOpen className="w-3.5 h-3.5" />
                                                {level.words.length} Words
                                            </div>
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hidden sm:inline-flex">
                                                <Layers className="w-3.5 h-3.5" />
                                                {new Set(level.words.map(w => w.category)).size} Categories
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal direction="up" delay={0.8}>
                        <div className="mt-16 text-center">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                <span>C1 and C2 advanced levels are currently in development.</span>
                            </div>
                        </div>
                    </ScrollReveal>
                </section>
            </ScrollReveal>
        </div>
    );
}

