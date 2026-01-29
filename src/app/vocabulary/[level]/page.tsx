'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import WordCard from '@/components/ui/WordCard';
import { getWordsByLevel } from '@/data/vocabulary';
import { Word, Level } from '@/types';

const levelInfo: Record<string, { title: string; titleBn: string; color: string }> = {
    a1: { title: 'A1 - Beginner', titleBn: 'প্রাথমিক', color: 'var(--level-a1)' },
    a2: { title: 'A2 - Elementary', titleBn: 'প্রাথমিক+', color: 'var(--level-a2)' },
    b1: { title: 'B1 - Intermediate', titleBn: 'মধ্যম', color: 'var(--level-b1)' },
    b2: { title: 'B2 - Upper Intermediate', titleBn: 'মধ্যম+', color: 'var(--level-b2)' },
};

const levelOrder = ['a1', 'a2', 'b1', 'b2'];

export default function VocabularyLevelPage() {
    const params = useParams();
    const level = params.level as Level;
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [words, setWords] = useState<Word[]>([]);

    useEffect(() => {
        setMounted(true);
        const levelWords = getWordsByLevel(level);
        setWords(levelWords);
    }, [level]);

    const categories = useMemo(() => {
        const cats = new Set(words.map(w => w.category));
        return ['all', ...Array.from(cats)];
    }, [words]);

    const filteredWords = useMemo(() => {
        return words.filter(word => {
            const q = searchQuery.toLowerCase();
            const matchesSearch = word.german.toLowerCase().includes(q) || word.english.toLowerCase().includes(q) || word.bangla.includes(searchQuery);
            const matchesCategory = selectedCategory === 'all' || word.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [words, searchQuery, selectedCategory]);

    const info = levelInfo[level] || levelInfo.a1;
    const currentIndex = levelOrder.indexOf(level);
    const prevLevel = currentIndex > 0 ? levelOrder[currentIndex - 1] : null;
    const nextLevel = currentIndex < levelOrder.length - 1 ? levelOrder[currentIndex + 1] : null;

    if (!mounted) return null;

    return (
        <div className="page-transition">
            <section className="py-12 md:py-16 bg-[var(--bg-secondary)]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-4">
                        <Link href="/vocabulary" className="hover:text-[var(--primary)]">Vocabulary</Link>
                        <span>/</span>
                        <span style={{ color: info.color }}>{level.toUpperCase()}</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-2">
                                <span style={{ color: info.color }}>{level.toUpperCase()}</span>
                                <span className="text-[var(--text-secondary)] text-xl md:text-2xl ml-3">{info.title}</span>
                            </h1>
                            <p className="font-bengali text-[var(--text-muted)]">{info.titleBn}</p>
                        </div>
                        <div className="text-2xl md:text-3xl font-bold" style={{ color: info.color }}>{words.length} words</div>
                    </div>
                </div>
            </section>

            <section className="py-4 border-b border-[var(--border-color)] sticky top-16 md:top-20 bg-[var(--bg-primary)] z-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="relative flex-1">
                            <input type="text" placeholder="Search (German, English, বাংলা)..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 pl-11 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--primary)] outline-none text-sm" />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2">🔍</span>
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                            {categories.map(cat => (
                                <button key={cat} onClick={() => setSelectedCategory(cat)}
                                    className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]'}`}>
                                    {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4">
                    {filteredWords.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-5xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold mb-2">No words found</h3>
                            <p className="text-[var(--text-secondary)]">Try a different search or category.</p>
                        </div>
                    ) : (
                        <>
                            <p className="text-sm text-[var(--text-muted)] mb-4">Showing {filteredWords.length} of {words.length}</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredWords.map((word, i) => (
                                    <div key={word.id} style={{ animationDelay: `${Math.min(i * 0.03, 0.3)}s` }} className="page-transition">
                                        <WordCard word={word} />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            <section className="py-8 bg-[var(--bg-secondary)]">
                <div className="max-w-7xl mx-auto px-4 flex justify-between">
                    {prevLevel ? (
                        <Link href={`/vocabulary/${prevLevel}`} className="btn-secondary">← {prevLevel.toUpperCase()}</Link>
                    ) : <div />}
                    {nextLevel ? (
                        <Link href={`/vocabulary/${nextLevel}`} className="btn-primary">{nextLevel.toUpperCase()} →</Link>
                    ) : (
                        <span className="text-[var(--text-muted)]">🚧 C1 coming soon</span>
                    )}
                </div>
            </section>
        </div>
    );
}
