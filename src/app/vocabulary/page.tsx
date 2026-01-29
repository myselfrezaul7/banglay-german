'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { a1Words, a2Words, b1Words, b2Words } from '@/data/vocabulary';

const levels = [
    { level: 'a1', title: 'A1 - Beginner', titleBn: 'একদম শুরু', description: 'Basic greetings, numbers, food, family, and everyday vocabulary.', color: 'bg-green-500', words: a1Words },
    { level: 'a2', title: 'A2 - Elementary', titleBn: 'প্রাথমিক', description: 'Work, home, health, and travel vocabulary for conversations.', color: 'bg-blue-500', words: a2Words },
    { level: 'b1', title: 'B1 - Intermediate', titleBn: 'মাঝামাঝি', description: 'Advanced work, travel, and abstract vocabulary.', color: 'bg-orange-500', words: b1Words },
    { level: 'b2', title: 'B2 - Upper Intermediate', titleBn: 'উন্নত', description: 'Academic, professional, society, and complex topics.', color: 'bg-pink-500', words: b2Words },
];

export default function VocabularyPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const totalWords = a1Words.length + a2Words.length + b1Words.length + b2Words.length;

    return (
        <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <section className="py-12 md:py-16 bg-slate-100/50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3 text-slate-900 dark:text-white"><span className="gradient-text">শব্দভান্ডার</span></h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">Learn German words with English and Bangla translations</p>
                    <p className="font-bengali text-slate-500 dark:text-slate-500">ইংরেজি আর বাংলায় অর্থ সহ জার্মান শব্দ শিখুন</p>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {levels.map((level, i) => (
                            <Link key={level.level} href={`/vocabulary/${level.level}`}
                                className="glass-card p-6 group hover:scale-[1.02] transition-all relative overflow-hidden"
                                style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className={`absolute top-0 left-0 w-full h-1 ${level.color}`} />
                                <div className={`text-4xl md:text-5xl font-bold mb-3 ${level.color.replace('bg-', 'text-')}`}>{level.level.toUpperCase()}</div>
                                <h2 className="text-lg font-semibold mb-1 text-slate-900 dark:text-white">{level.title}</h2>
                                <p className="text-sm font-bengali text-slate-500 dark:text-slate-400 mb-3">{level.titleBn}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{level.description}</p>
                                <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
                                    <span>{level.words.length}টি শব্দ</span>
                                    <span>{new Set(level.words.map(w => w.category)).size}টি ক্যাটাগরি</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center text-slate-400 dark:text-slate-500">
                        <p>🚧 C1 আর C2 লেভেল শীঘ্রই আসছে!</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                        <div className="glass-card p-4 text-center">
                            <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">{totalWords}</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">মোট শব্দ</div>
                        </div>
                        <div className="glass-card p-4 text-center">
                            <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">4</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">লেভেল</div>
                        </div>
                        <div className="glass-card p-4 text-center">
                            <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">15+</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">ক্যাটাগরি</div>
                        </div>
                        <div className="glass-card p-4 text-center">
                            <div className="text-2xl md:text-3xl font-bold text-cyan-600 dark:text-cyan-400">🔊</div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">অডিও</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

