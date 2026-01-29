'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { challenges, SentenceChallenge } from '@/data/sentence-challenges';


export default function SentenceBuilderPage() {
    const [mounted, setMounted] = useState(false);
    const [level, setLevel] = useState<'a1' | 'a2' | 'b1' | 'all'>('all');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [availableWords, setAvailableWords] = useState<string[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);

    const filteredChallenges = level === 'all' ? challenges : challenges.filter(c => c.level === level);
    const current = filteredChallenges[currentIndex % filteredChallenges.length];

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (current) {
            setAvailableWords([...current.shuffledWords]);
            setSelectedWords([]);
            setIsCorrect(null);
            setShowHint(false);
        }
    }, [currentIndex, level]);

    const handleWordClick = (word: string, fromSelected: boolean) => {
        if (isCorrect !== null) return;
        if (fromSelected) {
            setSelectedWords(prev => prev.filter((w, i) => !(w === word && i === prev.indexOf(word))));
            setAvailableWords(prev => [...prev, word]);
        } else {
            setAvailableWords(prev => { const idx = prev.indexOf(word); return [...prev.slice(0, idx), ...prev.slice(idx + 1)]; });
            setSelectedWords(prev => [...prev, word]);
        }
    };

    const checkAnswer = () => {
        const correct = JSON.stringify(selectedWords) === JSON.stringify(current.correctOrder);
        setIsCorrect(correct);
        if (correct) setScore(s => s + 1);
    };

    const nextChallenge = () => {
        setCurrentIndex(i => i + 1);
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen pb-20 page-transition bg-slate-50 dark:bg-slate-950">
            <section className="py-12 md:py-16 text-center max-w-4xl mx-auto px-6">
                <div className="inline-block mb-3 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-xs font-bold tracking-widest uppercase">
                    Practice Mode
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">Sentence Builder</h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                    Arrange words to form correct German sentences. <br />
                    <span className="font-bengali text-slate-500">সঠিক জার্মান বাক্য তৈরি করতে শব্দগুলো সাজান</span>
                </p>
            </section>

            <section className="sticky top-20 z-30 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm py-4 border-b border-slate-200 dark:border-slate-800 mb-8">
                <div className="max-w-4xl mx-auto px-4 flex flex-wrap gap-2 justify-center items-center">
                    {['all', 'a1', 'a2', 'b1'].map(l => (
                        <button key={l} onClick={() => { setLevel(l as typeof level); setCurrentIndex(0); }}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${level === l
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                                }`}>
                            {l === 'all' ? 'All' : l.toUpperCase()}
                        </button>
                    ))}
                    <div className="ml-auto px-4 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-full font-bold text-sm">
                        Score: {score}
                    </div>
                </div>
            </section>

            <section className="pb-20 max-w-2xl mx-auto px-4">
                <div className="clean-card p-6 md:p-10 relative">
                    <div className={`absolute top-6 right-6 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${current.level === 'a1' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                        current.level === 'a2' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                            'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                        }`}>
                        Level {current.level.toUpperCase()}
                    </div>

                    <div className="mb-8 pr-12">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Translate this</p>
                        <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">{current.english}</p>
                        <p className="font-bengali text-lg text-slate-500 dark:text-slate-400">{current.bangla}</p>
                    </div>

                    {showHint && (
                        <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-800 text-sm flex items-center gap-2">
                            <span>💡</span> Hint: <span className="font-mono font-bold">{current.correctOrder.join(' ')}</span>
                        </div>
                    )}

                    <div className="min-h-[100px] p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-700 mb-8 flex flex-wrap gap-2 items-start content-start">
                        {selectedWords.length === 0 && <span className="text-slate-400 w-full text-center py-4">Tap words below to build sentence...</span>}
                        {selectedWords.map((word, i) => (
                            <button key={i} onClick={() => handleWordClick(word, true)}
                                className={`px-4 py-2 rounded-xl font-bold text-lg shadow-sm transition-all transform hover:scale-105 active:scale-95 ${isCorrect === true ? 'bg-green-500 text-white hover:bg-green-600' :
                                    isCorrect === false ? 'bg-red-500 text-white hover:bg-red-600' :
                                        'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-blue-500'
                                    }`}>
                                {word}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3 mb-8 justify-center">
                        {availableWords.map((word, i) => (
                            <button key={i} onClick={() => handleWordClick(word, false)}
                                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95 shadow-sm">
                                {word}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        {isCorrect === null ? (
                            <>
                                <button onClick={checkAnswer} disabled={selectedWords.length === 0}
                                    className="flex-1 btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                                    Check Answer
                                </button>
                                <button onClick={() => setShowHint(true)} className="px-6 py-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                    ?
                                </button>
                            </>
                        ) : (
                            <button onClick={nextChallenge} className={`flex-1 py-4 rounded-xl font-bold text-lg shadow-lg text-white transition-all transform hover:scale-[1.02] ${isCorrect ? 'bg-green-600 hover:bg-green-500 shadow-green-900/20' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/20'}`}>
                                {isCorrect ? '🎉 Correct! Next Challenge →' : 'Try Next Challenge →'}
                            </button>
                        )}
                    </div>

                    {isCorrect === false && (
                        <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-center">
                            <p className="text-red-600 dark:text-red-400 font-medium">Not quite! The correct order is:</p>
                            <p className="text-lg font-bold text-red-700 dark:text-red-300 mt-1">{current.correctOrder.join(' ')}</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
