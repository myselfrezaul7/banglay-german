'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { challenges, SentenceChallenge } from '@/data/sentence-challenges';
import { HelpCircle, RefreshCcw, CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react';

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

        // Add subtle haptic/visual pop
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(20);
        }

        if (fromSelected) {
            setSelectedWords(prev => prev.filter((w, i) => !(w === word && i === prev.indexOf(word))));
            setAvailableWords(prev => [...prev, word]);
        } else {
            setAvailableWords(prev => {
                const idx = prev.indexOf(word);
                return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
            });
            setSelectedWords(prev => [...prev, word]);
        }
    };

    const checkAnswer = () => {
        if (selectedWords.length === 0) return;
        const correct = JSON.stringify(selectedWords) === JSON.stringify(current.correctOrder);
        setIsCorrect(correct);
        if (correct) {
            setScore(s => s + 10); // Give more points for gamification feel
            // Add success vibration if supported
            if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate([30, 50, 30]);
            }
        } else {
            // Error vibration
            if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(100);
            }
        }
    };

    const nextChallenge = () => {
        setCurrentIndex(i => i + 1);
    };

    const resetCurrent = () => {
        setAvailableWords([...current.shuffledWords]);
        setSelectedWords([]);
        setIsCorrect(null);
        setShowHint(false);
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header Area */}
            <section className="relative pt-24 pb-12 text-center max-w-4xl mx-auto px-6 z-10">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-bold tracking-widest uppercase border border-indigo-200 dark:border-indigo-800/50 shadow-sm">
                    <span>🧩</span> Interactive Practice
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 dark:text-white font-poppins tracking-tight drop-shadow-sm">Sentence Builder</h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                    Arrange the tactile blocks to form correct German sentences. <br />
                    <span className="font-bengali text-slate-500 font-medium mt-1 inline-block">শব্দগুলো সাজিয়ে সঠিক জার্মান বাক্য তৈরি করুন</span>
                </p>
            </section>

            {/* Main Interactive Workspace */}
            <section className="max-w-3xl mx-auto px-4 relative z-10">

                {/* Score & Level Control Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    {/* Level Selector Pills */}
                    <div className="flex bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
                        {['all', 'a1', 'a2', 'b1'].map(l => (
                            <button key={l} onClick={() => { setLevel(l as typeof level); setCurrentIndex(0); }}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${level === l
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-100'
                                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 scale-95'
                                    }`}>
                                {l === 'all' ? 'Mixed' : l.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Floating Score Tracker */}
                    <div className="flex items-center gap-3 bg-gradient-to-r from-amber-400 to-orange-500 p-[2px] rounded-2xl shadow-lg shadow-orange-500/20 transform hover:scale-105 transition-transform">
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-[14px] h-full font-bold text-slate-900 dark:text-white">
                            <Trophy className="w-5 h-5 text-orange-500" />
                            <span>{score} XP</span>
                        </div>
                    </div>
                </div>

                {/* The Board */}
                <div className={`relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 border shadow-2xl transition-all duration-500 ${isCorrect === true ? 'border-emerald-400 shadow-emerald-500/20' :
                        isCorrect === false ? 'border-rose-400 shadow-rose-500/20' :
                            'border-slate-200/50 dark:border-slate-700/50 shadow-slate-200/50 dark:shadow-none'
                    }`}>

                    {/* Current Level Tag */}
                    <div className={`absolute -top-4 -right-2 md:top-6 md:right-6 md:absolute px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg transform rotate-[-5deg] ${current.level === 'a1' ? 'bg-emerald-500 text-white shadow-emerald-500/30' :
                            current.level === 'a2' ? 'bg-blue-500 text-white shadow-blue-500/30' :
                                'bg-orange-500 text-white shadow-orange-500/30'
                        }`}>
                        {current.level.toUpperCase()}
                    </div>

                    {/* Translation Prompt */}
                    <div className="mb-10 pr-0 md:pr-16 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 font-bengali">
                            <span className="w-8 h-[2px] bg-slate-200 dark:bg-slate-700 rounded-full inline-block"></span>
                            অনুবাদ করুন
                        </div>
                        <p className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2 leading-tight font-poppins">{current.english}</p>
                        <p className="font-bengali text-lg md:text-xl font-medium text-slate-500 dark:text-slate-400">{current.bangla}</p>
                    </div>

                    {/* Action Hub (Hint / Reset) */}
                    <div className="flex justify-between items-end mb-4">
                        <div className="flex-1">
                            {showHint && (
                                <div className="animate-fadeIn p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm flex items-start sm:items-center gap-3 backdrop-blur-sm">
                                    <div className="p-1.5 bg-blue-100 dark:bg-blue-800 rounded-lg"><HelpCircle className="w-5 h-5" /></div>
                                    <div>
                                        <span className="font-bengali font-semibold mr-2 opacity-80">সঠিক উত্তর:</span>
                                        <span className="font-medium text-base">{current.correctOrder.join(' ')}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex gap-2 ml-4">
                            <button onClick={resetCurrent} disabled={selectedWords.length === 0 || isCorrect !== null} className="p-2.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed" title="Reset Blocks">
                                <RefreshCcw className="w-5 h-5" />
                            </button>
                            <button onClick={() => setShowHint(true)} disabled={showHint || isCorrect !== null} className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed" title="Show Hint">
                                <HelpCircle className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* The Drop Zone (Selected Words) */}
                    <div className={`min-h-[140px] p-5 rounded-[2rem] border-2 border-dashed transition-all duration-300 flex flex-wrap gap-3 items-start content-start mb-10 ${isCorrect === true ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-400/50' :
                            isCorrect === false ? 'bg-rose-50/50 dark:bg-rose-900/10 border-rose-400/50' :
                                'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700'
                        }`}>
                        {selectedWords.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                                <span className="font-bengali text-slate-400 font-medium">নিচের শব্দগুলোতে ট্যাপ করে এখানে সাজান...</span>
                            </div>
                        )}

                        {selectedWords.map((word, i) => (
                            <button key={i} onClick={() => handleWordClick(word, true)}
                                className={`px-5 py-3 rounded-2xl font-bold text-lg shadow-[0_4px_0_0] active:shadow-[0_0px_0_0] active:translate-y-1 transition-all origin-center animate-fadeIn ${isCorrect === true ? 'bg-emerald-500 text-white shadow-emerald-700 hover:bg-emerald-400' :
                                        isCorrect === false ? 'bg-rose-500 text-white shadow-rose-700 hover:bg-rose-400' :
                                            'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200/50 dark:border-slate-700 shadow-slate-200 dark:shadow-slate-950 hover:border-blue-400 dark:hover:border-blue-500'
                                    }`}>
                                {word}
                            </button>
                        ))}
                    </div>

                    {/* Available Words Bank */}
                    <div className="flex flex-wrap gap-4 mb-10 justify-center min-h-[100px]">
                        {availableWords.map((word, i) => (
                            <button key={i} onClick={() => handleWordClick(word, false)}
                                className="px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-lg border border-slate-200/80 dark:border-slate-700 shadow-[0_4px_0_0] shadow-slate-200 dark:shadow-slate-950 active:shadow-[0_0px_0_0] active:translate-y-1 transition-all hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 animate-fadeIn">
                                {word}
                            </button>
                        ))}
                    </div>

                    {/* Primary Action Button (Check / Next) */}
                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80">
                        {isCorrect === null ? (
                            <button onClick={checkAnswer} disabled={selectedWords.length === 0}
                                className="w-full relative group overflow-hidden rounded-2xl bg-blue-600 text-white font-bold text-xl py-5 shadow-[0_6px_0_0] shadow-blue-800 active:shadow-[0_0px_0_0] active:translate-y-1.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-1.5">
                                <span className="relative z-10 font-poppins tracking-wide">Check Answer</span>
                                <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                            </button>
                        ) : (
                            <div className="animate-fadeInUp">
                                {isCorrect ? (
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 mb-4">
                                        <div className="flex items-center gap-3 text-emerald-700 dark:text-emerald-400 font-bold text-lg">
                                            <CheckCircle2 className="w-8 h-8" />
                                            Excellent! +10 XP
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 mb-4">
                                        <div className="flex flex-col text-rose-700 dark:text-rose-400">
                                            <div className="flex items-center gap-2 font-bold text-lg mb-1"><XCircle className="w-6 h-6" /> Incorrect</div>
                                            <span className="text-sm font-medium opacity-80 pl-8">Tap arrow to try again or see hint.</span>
                                        </div>
                                    </div>
                                )}

                                <button onClick={isCorrect ? nextChallenge : resetCurrent}
                                    className={`w-full flex items-center justify-center gap-2 rounded-2xl font-bold text-xl py-5 shadow-[0_6px_0_0] active:shadow-[0_0px_0_0] active:translate-y-1.5 transition-all
                                        ${isCorrect
                                            ? 'bg-emerald-600 text-white shadow-emerald-800 hover:bg-emerald-500'
                                            : 'bg-rose-600 text-white shadow-rose-800 hover:bg-rose-500'
                                        }`}>
                                    {isCorrect ? 'Next Challenge' : 'Try Again'}
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </div>
    );
}
