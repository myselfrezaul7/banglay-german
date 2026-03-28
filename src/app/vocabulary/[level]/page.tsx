'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import WordCard from '@/components/ui/WordCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { getWordsByLevel } from '@/data/vocabulary';
import { Word, Level } from '@/types';
import { Search, Filter, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

const levelInfo: Record<string, { title: string; titleBn: string; colorFrom: string; colorTo: string; textColor: string }> = {
    a1: { title: 'A1 - Beginner', titleBn: 'প্রাথমিক', colorFrom: 'from-emerald-400', colorTo: 'to-teal-500', textColor: 'text-emerald-500' },
    a2: { title: 'A2 - Elementary', titleBn: 'প্রাথমিক+', colorFrom: 'from-blue-400', colorTo: 'to-indigo-500', textColor: 'text-blue-500' },
    b1: { title: 'B1 - Intermediate', titleBn: 'মধ্যম', colorFrom: 'from-orange-400', colorTo: 'to-rose-500', textColor: 'text-orange-500' },
    b2: { title: 'B2 - Upper Int.', titleBn: 'উন্নত', colorFrom: 'from-purple-400', colorTo: 'to-pink-500', textColor: 'text-purple-500' },
};

const levelOrder = ['a1', 'a2', 'b1', 'b2'];

export default function VocabularyLevelPage() {
    const params = useParams();
    const level = params.level as Level;
    const [mounted, setMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [words, setWords] = useState<Word[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setMounted(true);
        setIsLoading(true);
        const levelWords = getWordsByLevel(level);

        // Simulate a brief loading state for the skeleton effect
        const timer = setTimeout(() => {
            setWords(levelWords);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-opacity duration-500 relative overflow-x-hidden">

            {/* Ambient Level Glows */}
            <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${info.colorFrom} ${info.colorTo} opacity-10 blur-[150px] pointer-events-none`}></div>
            <div className={`absolute top-40 left-0 w-[400px] h-[400px] bg-gradient-to-bl ${info.colorFrom} ${info.colorTo} opacity-10 blur-[100px] pointer-events-none`}></div>

            {/* Header Section */}
            <section className="relative pt-12 pb-8 md:pt-16 md:pb-12 z-10 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                            <Link href="/vocabulary" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Library</Link>
                            <span>/</span>
                            <span className={info.textColor}>Level {level.toUpperCase()}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-poppins flex items-center gap-4">
                            <span className={`text-transparent bg-clip-text bg-gradient-to-br ${info.colorFrom} ${info.colorTo}`}>
                                {level.toUpperCase()}
                            </span>
                            <span className="text-slate-400 dark:text-slate-500 font-light hidden sm:inline">|</span>
                            <span className="text-slate-700 dark:text-slate-200">{info.title.split('-')[1].trim()}</span>
                        </h1>
                        <p className="text-lg font-bengali text-slate-500 dark:text-slate-400 mt-2 font-medium">{info.titleBn} শব্দভাণ্ডার</p>
                    </div>

                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-slate-200/50 dark:border-slate-800/50 shadow-lg flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.colorFrom} ${info.colorTo} opacity-20 flex items-center justify-center`}>
                        </div>
                        <div className="absolute ml-3 text-slate-900 dark:text-white">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-3xl font-black text-slate-900 dark:text-white leading-none">{words.length}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Total Words</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Sticky Search Bar */}
            <section className="sticky top-20 z-40 px-6 py-4">
                <ScrollReveal direction="up" delay={0}>
                    <div className="max-w-4xl mx-auto bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-200/20 dark:shadow-none rounded-[1.5rem] p-3 flex flex-col md:flex-row gap-3 transition-all duration-300">

                        <div className="relative flex-1 group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                                <Search className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search in English, German, or বাংলা..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-100/50 dark:bg-slate-800/50 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl py-3 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 outline-none transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide md:border-l border-slate-200 dark:border-slate-700 pl-0 md:pl-3">
                            <div className="hidden md:flex items-center justify-center p-2 text-slate-400">
                                <Filter className="w-5 h-5" />
                            </div>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 shadow-sm
                                    ${selectedCategory === cat
                                            ? `bg-slate-900 dark:bg-white text-white dark:text-slate-900`
                                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        }`
                                    }
                                >
                                    {cat === 'all' ? 'All Origins' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Vocabulary Grid */}
            <section className="pt-8 md:pt-12 px-6 max-w-7xl mx-auto relative z-10">
                {filteredWords.length === 0 ? (
                    <div className="text-center py-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[3rem] border border-slate-200/50 dark:border-slate-800/50">
                        <div className="w-24 h-24 mx-auto bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                            <Search className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 font-poppins">No words found</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-lg">We couldn't find anything matching your search criteria.</p>
                        <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="mt-8 px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg">
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                                Showing {filteredWords.length} of {words.length}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {isLoading ? (
                                Array(8).fill(0).map((_, i) => (
                                    <div key={i} className="animate-pulse bg-white/60 dark:bg-slate-900/60 rounded-[2rem] h-[280px] border border-slate-200/50 dark:border-slate-800 flex flex-col p-6 shadow-sm">
                                        <div className="flex justify-between mb-6">
                                            <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
                                            <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                        </div>
                                        <div className="h-8 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg mb-4"></div>
                                        <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md mb-2"></div>
                                        <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-800 rounded-md mb-6"></div>
                                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50">
                                            <div className="h-10 w-full bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                filteredWords.map((word, i) => (
                                    <ScrollReveal key={word.id} direction="up" delay={Math.min(i * 0.05, 0.5)}>
                                        <WordCard word={word} />
                                    </ScrollReveal>
                                ))
                            )}
                        </div>
                    </>
                )}
            </section>

            {/* Pagination / Level Navigation Footer */}
            <section className="py-16 mt-12 px-6 max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 md:p-10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">

                    {prevLevel ? (
                        <Link href={`/vocabulary/${prevLevel}`} className="group flex items-center gap-4 px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all shadow-sm w-full sm:w-auto">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 group-hover:-translate-x-1 transition-transform">
                                <ArrowLeft className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Previous</div>
                                <div className="font-bold text-slate-900 dark:text-white font-poppins text-lg">Level {prevLevel.toUpperCase()}</div>
                            </div>
                        </Link>
                    ) : (
                        <div className="hidden sm:block"></div>
                    )}

                    {nextLevel ? (
                        <Link href={`/vocabulary/${nextLevel}`} className="group flex items-center gap-4 px-6 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/20 dark:shadow-white/10 w-full sm:w-auto ml-auto text-right">
                            <div>
                                <div className="text-xs font-bold opacity-70 uppercase tracking-widest mb-1">Next Up</div>
                                <div className="font-bold font-poppins text-lg">Level {nextLevel.toUpperCase()}</div>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-white/20 dark:bg-slate-900/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                <ArrowRight className="w-5 h-5" />
                            </div>
                        </Link>
                    ) : (
                        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-2xl text-center flex-1 ml-auto">
                            <p className="text-amber-600 dark:text-amber-500 font-bold mb-1">End of current modules</p>
                            <span className="text-amber-500/70 dark:text-amber-400/70 text-sm">C1 & C2 coming soon!</span>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
