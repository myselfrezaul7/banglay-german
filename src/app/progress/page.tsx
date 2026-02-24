'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { a1Words, a2Words, b1Words } from '@/data/vocabulary';

export default function ProgressPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalWords = a1Words.length + a2Words.length + b1Words.length;

    if (!mounted) return null;

    return (
        <div className="page-transition min-h-screen">
            {/* Header */}
            <section className="py-16 bg-[var(--bg-secondary)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Progress</span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] mb-2">
                        Track your German learning journey
                    </p>
                    <p className="text-lg font-bengali text-[var(--text-muted)]">
                        আপনার জার্মান শেখার যাত্রা ট্র্যাক করুন
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Streak Card */}
                    <div className="glass-card p-10 mb-8 text-center relative overflow-hidden group hover:border-orange-500/50 transition-colors duration-500">
                        {/* Animated Glow Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-orange-500/20 to-rose-500/20 rounded-full blur-[80px] -z-10 group-hover:scale-150 transition-transform duration-700"></div>

                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-rose-500"></div>
                        <div className="text-7xl mb-6 animate-pulseSubtle drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">🔥</div>
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 font-poppins">Start Your Streak!</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
                            Practice daily to build your learning streak and unlock special rewards.
                        </p>
                        <Link href="/practice" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-orange-500/20 active:scale-95">
                            <span>Start Learning Today</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="glass-card p-6 text-center">
                            <div className="text-3xl font-bold text-[var(--primary)] mb-1">{totalWords}</div>
                            <div className="text-sm text-[var(--text-secondary)]">Total Words</div>
                        </div>
                        <div className="glass-card p-6 text-center">
                            <div className="text-3xl font-bold text-[var(--success)] mb-1">0</div>
                            <div className="text-sm text-[var(--text-secondary)]">Learned</div>
                        </div>
                        <div className="glass-card p-6 text-center">
                            <div className="text-3xl font-bold text-[var(--warning)] mb-1">0</div>
                            <div className="text-sm text-[var(--text-secondary)]">Favorites</div>
                        </div>
                        <div className="glass-card p-6 text-center">
                            <div className="text-3xl font-bold text-[var(--info)] mb-1">0</div>
                            <div className="text-sm text-[var(--text-secondary)]">Quizzes</div>
                        </div>
                    </div>

                    {/* Level Progress (SVG Rings) */}
                    <div className="glass-card p-8 mb-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-poppins">Level Mastery</h3>
                            <div className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-widest">
                                CEFR Standard
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { level: 'A1', title: 'Beginner', words: a1Words.length, color: '#10b981', glow: 'shadow-emerald-500/20' },
                                { level: 'A2', title: 'Elementary', words: a2Words.length, color: '#3b82f6', glow: 'shadow-blue-500/20' },
                                { level: 'B1', title: 'Intermediate', words: b1Words.length, color: '#f97316', glow: 'shadow-orange-500/20' },
                                { level: 'B2', title: 'Upper Int.', words: 500, color: '#ec4899', glow: 'shadow-pink-500/20' }, // Hardcoded 500 for missing array
                            ].map((item) => {
                                const progress = 0; // Replace with actual progress logic later
                                const radius = 40;
                                const circumference = 2 * Math.PI * radius;
                                const strokeDashoffset = circumference - (progress / 100) * circumference;

                                return (
                                    <div key={item.level} className="flex flex-col items-center p-6 bg-slate-50/50 dark:bg-slate-800/30 rounded-[2rem] border border-slate-100 dark:border-slate-700/50 hover:-translate-y-1 transition-transform duration-300">
                                        <div className="relative w-32 h-32 mb-4">
                                            {/* Background Ring */}
                                            <svg className="w-full h-full transform -rotate-90">
                                                <circle
                                                    cx="64"
                                                    cy="64"
                                                    r={radius}
                                                    stroke="currentColor"
                                                    strokeWidth="8"
                                                    fill="transparent"
                                                    className="text-slate-200 dark:text-slate-700"
                                                />
                                                {/* Animated Progress Ring */}
                                                <circle
                                                    cx="64"
                                                    cy="64"
                                                    r={radius}
                                                    stroke={item.color}
                                                    strokeWidth="8"
                                                    fill="transparent"
                                                    strokeDasharray={circumference}
                                                    strokeDashoffset={strokeDashoffset}
                                                    strokeLinecap="round"
                                                    className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(0,0,0,0.3)]"
                                                    style={{ filter: `drop-shadow(0 0 6px ${item.color}40)` }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-2xl font-black" style={{ color: item.color }}>{progress}%</span>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-extrabold text-xl text-slate-900 dark:text-white font-poppins">{item.level}</div>
                                            <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-2">{item.title}</div>
                                            <div className="text-xs text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">0 / {item.words} learned</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Getting Started */}
                    <div className="glass-card p-8 text-center">
                        <h3 className="text-xl font-bold mb-4">Ready to Learn?</h3>
                        <p className="text-[var(--text-secondary)] mb-6">
                            Start with A1 vocabulary and work your way up!
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link href="/vocabulary/a1" className="btn-primary">
                                Start with A1
                            </Link>
                            <Link href="/practice" className="btn-secondary">
                                Take a Quiz
                            </Link>
                        </div>
                    </div>

                    {/* Coming Soon */}
                    <div className="mt-8 text-center">
                        <p className="text-[var(--text-muted)]">
                            📱 Sign in to save your progress across devices - Coming soon!
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
