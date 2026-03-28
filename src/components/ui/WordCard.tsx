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

    const getLevelColor = () => {
        switch (word.level) {
            case 'a1': return 'var(--level-a1)';
            case 'a2': return 'var(--level-a2)';
            case 'b1': return 'var(--level-b1)';
            default: return 'var(--primary)';
        }
    };

    return (
        <div className="word-card group relative flex flex-col h-full bg-white dark:bg-slate-900 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 dark:border-slate-800 p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
            {/* Header: Level Badge & Favorite */}
            <div className="flex justify-between items-start mb-4">
                <span
                    className="badge text-xs font-bold"
                    style={{ background: getLevelColor(), color: 'white' }}
                >
                    {word.level.toUpperCase()}
                </span>

                <button
                    onClick={handleFavorite}
                    className="p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--primary)] hover:text-white transition-all opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100 active:scale-90"
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <svg
                        className={`w-5 h-5 transition-colors ${isFavorite ? 'text-[var(--accent-gold)]' : 'text-[var(--text-muted)] group-hover:text-white'}`}
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
                    <span className="text-[var(--text-muted)] text-sm mr-2 font-medium">{word.article}</span>
                )}
                <h3 className="text-2xl font-bold text-[var(--text-primary)] inline leading-tight">{word.german}</h3>
            </div>

            {/* Translations */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--info)] text-white">EN</span>
                    <span className="text-[var(--text-secondary)]">{word.english}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-[var(--accent-gold)] text-black font-bengali">বাং</span>
                    <span className="text-[var(--text-secondary)] font-bengali">{word.bangla}</span>
                </div>
            </div>

            {/* Category */}
            <div className="text-xs text-[var(--text-muted)] capitalize mb-4">
                📂 {word.category}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-[var(--border-color)]">
                <button
                    onClick={handleSpeak}
                    disabled={isPlaying}
                    className={`relative flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all duration-300 active:scale-[0.98] ${isPlaying
                        ? 'bg-[var(--primary)] text-white shadow-lg shadow-[var(--primary)]/30'
                        : 'bg-[var(--bg-tertiary)] hover:bg-[var(--primary)] hover:text-white'
                        }`}
                >
                    {isPlaying && (
                        <span className="absolute inset-0 bg-[var(--primary)] rounded-lg animate-ping opacity-40 -z-10" />
                    )}
                    <svg className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    <span className="text-sm font-semibold">{isPlaying ? 'Playing...' : 'Listen'}</span>
                </button>
                <button
                    onClick={() => onLearn?.(word.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--success)] hover:text-white transition-all"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm">Learned</span>
                </button>
            </div>
        </div>
    );
}
