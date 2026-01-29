'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { a1Words, a2Words, b1Words, b2Words } from '@/data/vocabulary';

const levels = [
    { level: 'a1', title: 'A1 - Beginner', titleBn: 'প্রাথমিক', description: 'Basic greetings, numbers, food, family, and everyday vocabulary.', color: 'var(--level-a1)', words: a1Words },
    { level: 'a2', title: 'A2 - Elementary', titleBn: 'প্রাথমিক+', description: 'Work, home, health, and travel vocabulary for conversations.', color: 'var(--level-a2)', words: a2Words },
    { level: 'b1', title: 'B1 - Intermediate', titleBn: 'মধ্যম', description: 'Advanced work, travel, and abstract vocabulary.', color: 'var(--level-b1)', words: b1Words },
    { level: 'b2', title: 'B2 - Upper Intermediate', titleBn: 'মধ্যম+', description: 'Academic, professional, society, and complex topics.', color: 'var(--level-b2)', words: b2Words },
];

export default function VocabularyPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const totalWords = a1Words.length + a2Words.length + b1Words.length + b2Words.length;

    return (
        <div className={`page-transition ${mounted ? '' : 'opacity-0'}`}>
            <section className="py-12 md:py-16 bg-[var(--bg-secondary)]">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3"><span className="gradient-text">Vocabulary</span></h1>
                    <p className="text-lg text-[var(--text-secondary)]">Learn German words with English and Bangla translations</p>
                    <p className="font-bengali text-[var(--text-muted)]">ইংরেজি এবং বাংলা অনুবাদ সহ জার্মান শব্দ শিখুন</p>
                </div>
            </section>

            <section className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {levels.map((level, i) => (
                            <Link key={level.level} href={`/vocabulary/${level.level}`}
                                className="glass-card p-6 group hover:scale-[1.02] transition-all relative overflow-hidden"
                                style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="absolute top-0 left-0 w-full h-1" style={{ background: level.color }} />
                                <div className="text-4xl md:text-5xl font-bold mb-3" style={{ color: level.color }}>{level.level.toUpperCase()}</div>
                                <h2 className="text-lg font-semibold mb-1">{level.title}</h2>
                                <p className="text-sm font-bengali text-[var(--text-muted)] mb-3">{level.titleBn}</p>
                                <p className="text-sm text-[var(--text-secondary)] mb-4">{level.description}</p>
                                <div className="flex justify-between text-xs text-[var(--text-muted)]">
                                    <span>{level.words.length} words</span>
                                    <span>{new Set(level.words.map(w => w.category)).size} categories</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 text-center text-[var(--text-muted)]">
                        <p>🚧 C1 & C2 levels coming soon!</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                        <div className="glass-card p-4 text-center">
                            <div className="text-2xl md:text-3xl font-bold text-[var(--primary)]">{totalWords}</div>
                            <div className="text-sm text-[var(--text-secondary)]">Total Words</div>
                        </div>
                        <div className="glass-card p-4 text-center">
                            <div className="text-2xl md:text-3xl font-bold text-[var(--accent-gold)]">4</div>
                            <div className="text-sm text-[var(--text-secondary)]">Levels</div>
                        </div>
                        <div className="glass-card p-4 text-center">
                            <div className="text-2xl md:text-3xl font-bold text-[var(--success)]">15+</div>
                            <div className="text-sm text-[var(--text-secondary)]">Categories</div>
                        </div>
                        <div className="glass-card p-4 text-center">
                            <div className="text-2xl md:text-3xl font-bold text-[var(--info)]">🔊</div>
                            <div className="text-sm text-[var(--text-secondary)]">Audio</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
