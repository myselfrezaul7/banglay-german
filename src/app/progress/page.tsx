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
                    <div className="glass-card p-8 mb-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--accent-gold)]"></div>
                        <div className="text-6xl mb-4">🔥</div>
                        <h2 className="text-4xl font-bold mb-2">Start Your Streak!</h2>
                        <p className="text-[var(--text-secondary)] mb-6">
                            Practice daily to build your learning streak
                        </p>
                        <Link href="/practice" className="btn-primary inline-flex">
                            <span>Start Learning</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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

                    {/* Level Progress */}
                    <div className="glass-card p-8 mb-8">
                        <h3 className="text-xl font-bold mb-6">Level Progress</h3>
                        <div className="space-y-6">
                            {[
                                { level: 'A1', words: a1Words.length, color: 'var(--level-a1)' },
                                { level: 'A2', words: a2Words.length, color: 'var(--level-a2)' },
                                { level: 'B1', words: b1Words.length, color: 'var(--level-b1)' },
                            ].map((item) => (
                                <div key={item.level}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold" style={{ color: item.color }}>{item.level}</span>
                                        <span className="text-sm text-[var(--text-muted)]">0 / {item.words} words</span>
                                    </div>
                                    <div className="h-3 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{ background: item.color, width: '0%' }}
                                        />
                                    </div>
                                </div>
                            ))}
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
