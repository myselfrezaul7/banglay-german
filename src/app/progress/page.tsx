'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { a1Words, a2Words, b1Words, b2Words } from '@/data/vocabulary';
import { useAuth } from '@/contexts/AuthContext';

export default function ProgressPage() {
    const { user } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalWords = a1Words.length + a2Words.length + b1Words.length + b2Words.length;
    const learnedCount = user?.learnedWords?.length || 0;
    const favoritesCount = user?.favorites?.length || 0;
    const streakCount = user?.streak || 0;
    const levelCount = user?.level || 1;

    const calculateLevelProgress = (lvlWords: { id: string }[]) => {
        if (!user || !user.learnedWords || lvlWords.length === 0) return 0;
        const lvlWordIds = new Set(lvlWords.map(w => w.id));
        const learnedInLvl = user.learnedWords.filter(id => lvlWordIds.has(id)).length;
        return Math.min(100, Math.round((learnedInLvl / lvlWords.length) * 100));
    };

    if (!mounted) return null;

    return (
        <div className="page-transition min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header */}
            <section className="relative pt-24 pb-12 bg-transparent z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-bold tracking-widest uppercase border border-orange-200 dark:border-orange-800/50 shadow-sm">
                        <span>📈</span> Live Tracking
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-poppins tracking-tight text-slate-900 dark:text-white drop-shadow-sm">
                        Progress
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-2 leading-relaxed max-w-xl mx-auto">
                        Track your German learning journey
                    </p>
                    <p className="text-lg font-bengali text-slate-500 dark:text-slate-500 font-medium">
                        আপনার জার্মান শেখার যাত্রা ট্র্যাক করুন
                    </p>
                </div>
            </section>

            <section className="relative py-12 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Streak Card */}
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-8 md:p-10 mb-8 rounded-[2rem] text-center relative overflow-hidden group hover:border-orange-500/50 transition-colors duration-500">
                        {/* Animated Glow Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-orange-500/20 to-rose-500/20 rounded-full blur-[80px] -z-10 group-hover:scale-150 transition-transform duration-700"></div>

                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-rose-500"></div>
                        <div className="text-6xl md:text-7xl mb-4 md:mb-6 animate-pulseSubtle drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">🔥</div>
                        <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-slate-900 dark:text-white font-poppins tracking-tight">
                            {streakCount > 0 ? `${streakCount} Day Streak!` : 'Start Your Streak!'}
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                            Practice daily to build your learning streak and unlock special rewards.
                        </p>
                        <Link href="/practice" className="group inline-flex items-center justify-center gap-2 px-6 py-4 md:px-8 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-[1.5rem] md:rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-orange-500/30 active:scale-95 w-full sm:w-auto">
                            <span>Start Learning Today</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg hover:shadow-xl p-6 rounded-[1.5rem] md:rounded-[2rem] text-center transition-all hover:-translate-y-1">
                            <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">{totalWords}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Total Words</div>
                        </div>
                        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg hover:shadow-xl p-6 rounded-[1.5rem] md:rounded-[2rem] text-center transition-all hover:-translate-y-1">
                            <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mb-1">{learnedCount}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Learned</div>
                        </div>
                        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg hover:shadow-xl p-6 rounded-[1.5rem] md:rounded-[2rem] text-center transition-all hover:-translate-y-1">
                            <div className="text-3xl font-black text-amber-500 mb-1">{favoritesCount}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Favorites</div>
                        </div>
                        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg hover:shadow-xl p-6 rounded-[1.5rem] md:rounded-[2rem] text-center transition-all hover:-translate-y-1">
                            <div className="text-3xl font-black text-cyan-600 dark:text-cyan-400 mb-1">Level {levelCount}</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Current Level</div>
                        </div>
                    </div>

                    {/* Level Progress (SVG Rings) */}
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-6 md:p-8 mb-8 rounded-[1.5rem] md:rounded-[2rem]">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white font-poppins">Level Mastery</h3>
                            <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/50 text-xs font-bold rounded-full uppercase tracking-widest">
                                CEFR Standard
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { level: 'A1', title: 'Beginner', list: a1Words, color: '#10b981', glow: 'shadow-emerald-500/20' },
                                { level: 'A2', title: 'Elementary', list: a2Words, color: '#3b82f6', glow: 'shadow-blue-500/20' },
                                { level: 'B1', title: 'Intermediate', list: b1Words, color: '#f97316', glow: 'shadow-orange-500/20' },
                                { level: 'B2', title: 'Upper Int.', list: b2Words, color: '#ec4899', glow: 'shadow-pink-500/20' },
                            ].map((item) => {
                                const progress = calculateLevelProgress(item.list);
                                const desktopOffset = 251.2 - (251.2 * progress) / 100;
                                const mobileOffset = 188.5 - (188.5 * progress) / 100;

                                return (
                                    <div key={item.level} className="flex flex-col items-center p-6 bg-slate-50/50 dark:bg-slate-800/30 rounded-[2rem] border border-slate-100 dark:border-slate-700/50 hover:-translate-y-1 transition-transform duration-300">
                                        <div className="relative w-24 h-24 md:w-32 md:h-32 mb-4 flex items-center justify-center">
                                            {/* Background Ring */}
                                            <svg className="w-full h-full transform -rotate-90 md:block hidden absolute inset-0">
                                                <circle cx="64" cy="64" r={40} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-slate-700" />
                                                {/* Animated Progress Ring */}
                                                <circle cx="64" cy="64" r={40} stroke={item.color} strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={desktopOffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" style={{ filter: `drop-shadow(0 0 6px ${item.color}40)` }} />
                                            </svg>
                                            
                                            {/* Mobile Sized SVG */}
                                            <svg className="w-full h-full transform -rotate-90 md:hidden block absolute inset-0">
                                                <circle cx="48" cy="48" r={30} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-slate-700" />
                                                <circle cx="48" cy="48" r={30} stroke={item.color} strokeWidth="8" fill="transparent" strokeDasharray={188.5} strokeDashoffset={mobileOffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                                            </svg>
                                            
                                            <span className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white z-10 font-poppins">
                                                {progress}%
                                            </span>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-extrabold text-lg md:text-xl text-slate-900 dark:text-white font-poppins mb-1">{item.level}</div>
                                            <div className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">{item.title}</div>
                                            <div className="text-[10px] md:text-xs font-bold text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 uppercase tracking-widest whitespace-nowrap">
                                                {user?.learnedWords ? user.learnedWords.filter(id => item.list.some(w => w.id === id)).length : 0} / {item.list.length} learned
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Getting Started */}
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800/30 p-8 rounded-[2rem] text-center mb-24 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                        <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2 font-poppins">Ready to Learn?</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-sm mx-auto">
                            Start with A1 vocabulary and work your way up!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <Link href="/vocabulary/a1" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all">
                                Start with A1
                            </Link>
                            <Link href="/practice" className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all">
                                Take a Quiz
                            </Link>
                        </div>
                    </div>

                    <div className="text-center pb-12 opacity-50 font-bold uppercase tracking-widest text-xs text-slate-500">
                        📱 Sign in to save your progress across devices - Coming soon!
                    </div>
                </div>
            </section>
        </div>
    );
}
