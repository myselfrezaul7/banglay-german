'use client';

import { useEffect, useState } from 'react';
import { Sentence } from '@/types';

import { sentences } from '@/data/sentences';

export default function SentencesPage() {
    const [mounted, setMounted] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<string>('all');

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredSentences = selectedLevel === 'all'
        ? sentences
        : sentences.filter(s => s.level === selectedLevel);

    const handleSpeak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'de-DE';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    };

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <section className="py-16 bg-slate-100/50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                        <span className="gradient-text">বাক্য</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
                        Learn German through practical sentences
                    </p>
                    <p className="text-lg font-bengali text-slate-500 dark:text-slate-500">
                        দৈনন্দিন কাজে লাগে এমন বাক্য শিখুন
                    </p>
                </div>
            </section>

            {/* Filter */}
            <section className="py-6 border-b border-slate-200 dark:border-slate-800 sticky top-20 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm z-40">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-2 justify-center">
                        {['all', 'a1', 'a2', 'b1', 'b2'].map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={`px-4 py-2 rounded-lg transition-all duration-300 active:scale-95 ${selectedLevel === level
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-700'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {level === 'all' ? 'সব লেভেল' : level.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sentences */}
            <section className="py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                    {filteredSentences.map((sentence) => (
                        <div
                            key={sentence.id}
                            className="glass-card overflow-hidden"
                        >
                            {/* Main Sentence */}
                            <div className="p-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        {/* Level Badge */}
                                        <span className={`badge badge-${sentence.level} mb-3 inline-block`}>
                                            {sentence.level.toUpperCase()}
                                        </span>

                                        {/* German */}
                                        <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">{sentence.german}</h3>

                                        {/* Translations */}
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs px-2 py-0.5 rounded bg-cyan-500 text-white">EN</span>
                                                <span className="text-slate-600 dark:text-slate-400">{sentence.english}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs px-2 py-0.5 rounded bg-amber-500 text-black font-bengali">বাং</span>
                                                <span className="text-slate-600 dark:text-slate-400 font-bengali">{sentence.bangla}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => handleSpeak(sentence.german)}
                                            className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-all text-slate-600 dark:text-slate-300"
                                            title="শুনুন"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setExpandedId(expandedId === sentence.id ? null : sentence.id)}
                                            className={`p-3 rounded-lg transition-all ${expandedId === sentence.id
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
                                                }`}
                                            title="শব্দ বিশ্লেষণ"
                                        >
                                            <svg className={`w-5 h-5 transition-transform ${expandedId === sentence.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Word Breakdown (Expandable) */}
                            <div className={`grid transition-all duration-400 ease-in-out ${expandedId === sentence.id && sentence.wordBreakdown ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-900/50 p-6">
                                        <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">শব্দে শব্দে অর্থ</h4>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {sentence.wordBreakdown?.map((word, index) => (
                                                <div
                                                    key={index}
                                                    className="p-3 rounded-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:-translate-y-1 transition-transform"
                                                >
                                                    <div className="font-semibold text-blue-600 dark:text-blue-400">{word.german}</div>
                                                    <div className="text-sm text-slate-600 dark:text-slate-400">{word.english}</div>
                                                    <div className="text-sm text-slate-500 dark:text-slate-500 font-bengali">{word.bangla}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
