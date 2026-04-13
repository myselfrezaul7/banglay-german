'use client';

import { useState } from 'react';
import { Word } from '@/types';

interface WordCardProps {
    word: Word;
    onFavorite?: (id: string) => void;
    onLearn?: (id: string) => void;
}

export default function WordCard({ word, onFavorite, onLearn }: WordCardProps) {
    const [isFavorite, setIsFavorite] = useState(word.isFavorite || false);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleFavorite = () => {
        setIsFavorite(!isFavorite);
        onFavorite?.(word.id);
    };

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            setIsPlaying(true);
            const utterance = new SpeechSynthesisUtterance(word.german);
            utterance.lang = 'de-DE';
            utterance.rate = 0.8;
            utterance.onend = () => setIsPlaying(false);
            speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="word-card group relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Header: Level Badge & Favorite */}
            <div className="flex justify-between items-start mb-4">
                <span
                    className={`px-3 py-1 rounded-full text-[10px] md:text-xs font-bold shadow-sm text-white bg-gradient-to-r ${word.level === 'a1' ? 'from-emerald-400 to-teal-500' : word.level === 'a2' ? 'from-blue-400 to-indigo-500' : word.level === 'b1' ? 'from-orange-400 to-rose-500' : 'from-purple-400 to-pink-500'}`}
                >
                    {word.level.toUpperCase()}
                </span>

                <button
                    onClick={handleFavorite}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all opacity-100 group-hover:opacity-100 focus:opacity-100 active:scale-90"
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <svg
                        className={`w-5 h-5 transition-colors ${isFavorite ? 'text-amber-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-amber-400'}`}
                        fill={isFavorite ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                </button>
            </div>

            {/* German Word */}
            <div className="mb-2">
                {word.article && (
                    <span className="text-slate-400 dark:text-slate-500 text-sm mr-2 font-medium">{word.article}</span>
                )}
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white inline leading-tight">{word.german}</h3>
            </div>

            {/* Translations */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-bold border border-cyan-200/50 dark:border-cyan-800/50">EN</span>
                    <span className="text-slate-600 dark:text-slate-400 font-medium">{word.english}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold font-bengali border border-amber-200/50 dark:border-amber-800/50">বাং</span>
                    <span className="text-slate-600 dark:text-slate-400 font-bengali font-medium">{word.bangla}</span>
                </div>
            </div>

            {/* Category */}
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                <button
                    onClick={handleSpeak}
                    disabled={isPlaying}
                    className={`relative w-full sm:flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2.5 md:py-3 rounded-xl transition-all duration-300 active:scale-95 border ${isPlaying
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200/50 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 hover:text-blue-600 dark:hover:text-blue-400 text-slate-600 dark:text-slate-400'
                        }`}
                >
                    {isPlaying && (
                        <span className="absolute inset-0 bg-blue-500 rounded-xl animate-ping opacity-40 -z-10" />
                    )}
                    <svg className={`w-4 h-4 md:w-5 md:h-5 ${isPlaying ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    <span className="text-xs md:text-sm font-bold tracking-wide">{isPlaying ? 'Playing...' : 'Listen'}</span>
                </button>
                <button
                    onClick={() => onLearn?.(word.id)}
                    className="w-full sm:flex-1 flex items-center justify-center gap-1.5 md:gap-2 py-2.5 md:py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-800 hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-600 dark:text-slate-400 transition-all active:scale-95"
                >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs md:text-sm font-bold tracking-wide">Learned</span>
                </button>
            </div>
        </div>
    );
}
