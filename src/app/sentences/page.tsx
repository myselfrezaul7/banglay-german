'use client';

import { useEffect, useState } from 'react';
import { Sentence } from '@/types';

const sentences: Sentence[] = [
    // A1 Level Sentences
    {
        id: 's1', german: 'Guten Tag! Wie geht es Ihnen?', english: 'Good day! How are you?', bangla: 'শুভ দিন! আপনি কেমন আছেন?', level: 'a1', wordBreakdown: [
            { german: 'Guten', english: 'Good', bangla: 'শুভ' },
            { german: 'Tag', english: 'day', bangla: 'দিন' },
            { german: 'Wie', english: 'How', bangla: 'কেমন' },
            { german: 'geht', english: 'goes', bangla: 'যায়' },
            { german: 'es', english: 'it', bangla: 'এটা' },
            { german: 'Ihnen', english: 'you (formal)', bangla: 'আপনি' },
        ]
    },
    {
        id: 's2', german: 'Ich möchte einen Kaffee, bitte.', english: 'I would like a coffee, please.', bangla: 'আমি একটা কফি চাই, প্লিজ।', level: 'a1', wordBreakdown: [
            { german: 'Ich', english: 'I', bangla: 'আমি' },
            { german: 'möchte', english: 'would like', bangla: 'চাই' },
            { german: 'einen', english: 'a (masc.)', bangla: 'একটা' },
            { german: 'Kaffee', english: 'coffee', bangla: 'কফি' },
            { german: 'bitte', english: 'please', bangla: 'প্লিজ' },
        ]
    },
    {
        id: 's3', german: 'Wo ist der Bahnhof?', english: 'Where is the train station?', bangla: 'রেলস্টেশন কোথায়?', level: 'a1', wordBreakdown: [
            { german: 'Wo', english: 'Where', bangla: 'কোথায়' },
            { german: 'ist', english: 'is', bangla: 'আছে' },
            { german: 'der', english: 'the (masc.)', bangla: '' },
            { german: 'Bahnhof', english: 'train station', bangla: 'রেলস্টেশন' },
        ]
    },
    {
        id: 's4', german: 'Wie viel kostet das?', english: 'How much does it cost?', bangla: 'এটার দাম কত?', level: 'a1', wordBreakdown: [
            { german: 'Wie viel', english: 'How much', bangla: 'কত' },
            { german: 'kostet', english: 'costs', bangla: 'দাম' },
            { german: 'das', english: 'that', bangla: 'এটা' },
        ]
    },
    // A2 Level Sentences
    {
        id: 's5', german: 'Ich arbeite bei einer großen Firma.', english: 'I work at a large company.', bangla: 'আমি একটা বড় কোম্পানিতে কাজ করি।', level: 'a2', wordBreakdown: [
            { german: 'Ich', english: 'I', bangla: 'আমি' },
            { german: 'arbeite', english: 'work', bangla: 'কাজ করি' },
            { german: 'bei', english: 'at', bangla: '-তে' },
            { german: 'einer', english: 'a (fem.)', bangla: 'একটা' },
            { german: 'großen', english: 'large', bangla: 'বড়' },
            { german: 'Firma', english: 'company', bangla: 'কোম্পানি' },
        ]
    },
    {
        id: 's6', german: 'Wann fährt der nächste Zug nach Berlin?', english: 'When does the next train to Berlin leave?', bangla: 'বার্লিনে পরের ট্রেন কখন ছাড়বে?', level: 'a2', wordBreakdown: [
            { german: 'Wann', english: 'When', bangla: 'কখন' },
            { german: 'fährt', english: 'leaves/drives', bangla: 'ছাড়বে' },
            { german: 'der nächste', english: 'the next', bangla: 'পরের' },
            { german: 'Zug', english: 'train', bangla: 'ট্রেন' },
            { german: 'nach', english: 'to', bangla: '-তে' },
            { german: 'Berlin', english: 'Berlin', bangla: 'বার্লিন' },
        ]
    },
    {
        id: 's7', german: 'Ich habe Kopfschmerzen. Haben Sie Tabletten?', english: 'I have a headache. Do you have tablets?', bangla: 'আমার মাথা ব্যথা করছে। আপনার কাছে ট্যাবলেট আছে?', level: 'a2', wordBreakdown: [
            { german: 'Ich habe', english: 'I have', bangla: 'আমার' },
            { german: 'Kopfschmerzen', english: 'headache', bangla: 'মাথা ব্যথা' },
            { german: 'Haben Sie', english: 'Do you have', bangla: 'আপনার কাছে আছে' },
            { german: 'Tabletten', english: 'tablets', bangla: 'ট্যাবলেট' },
        ]
    },
    // B1 Level Sentences
    {
        id: 's8', german: 'Ich würde gerne ein Zimmer für zwei Nächte reservieren.', english: 'I would like to book a room for two nights.', bangla: 'আমি দুই রাতের জন্য একটা রুম বুক করতে চাই।', level: 'b1', wordBreakdown: [
            { german: 'Ich würde', english: 'I would', bangla: 'আমি চাই' },
            { german: 'gerne', english: 'like to', bangla: '' },
            { german: 'ein Zimmer', english: 'a room', bangla: 'একটা রুম' },
            { german: 'für', english: 'for', bangla: 'জন্য' },
            { german: 'zwei Nächte', english: 'two nights', bangla: 'দুই রাত' },
            { german: 'reservieren', english: 'to book', bangla: 'বুক করতে' },
        ]
    },
    {
        id: 's9', german: 'Könnten Sie mir bitte den Weg zum Museum erklären?', english: 'Could you please explain the way to the museum?', bangla: 'আপনি কি প্লিজ জাদুঘরে যাওয়ার পথ বলতে পারবেন?', level: 'b1', wordBreakdown: [
            { german: 'Könnten Sie', english: 'Could you', bangla: 'আপনি কি পারবেন' },
            { german: 'mir', english: 'me', bangla: 'আমাকে' },
            { german: 'bitte', english: 'please', bangla: 'প্লিজ' },
            { german: 'den Weg', english: 'the way', bangla: 'পথ' },
            { german: 'zum Museum', english: 'to the museum', bangla: 'জাদুঘরে' },
            { german: 'erklären', english: 'explain', bangla: 'বলতে' },
        ]
    },
    {
        id: 's10', german: 'Ich möchte mich für die Stelle als Praktikant bewerben.', english: 'I would like to apply for the position as an intern.', bangla: 'আমি ইন্টার্ন পদের জন্য আবেদন করতে চাই।', level: 'b1', wordBreakdown: [
            { german: 'Ich möchte', english: 'I would like', bangla: 'আমি চাই' },
            { german: 'mich bewerben', english: 'to apply', bangla: 'আবেদন করতে' },
            { german: 'für', english: 'for', bangla: 'জন্য' },
            { german: 'die Stelle', english: 'the position', bangla: 'পদ' },
            { german: 'als', english: 'as', bangla: 'হিসেবে' },
            { german: 'Praktikant', english: 'intern', bangla: 'ইন্টার্ন' },
        ]
    },
];

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
                        দৈনন্দিন কাজে লাগে এমন বাক্য শিখো
                    </p>
                </div>
            </section>

            {/* Filter */}
            <section className="py-6 border-b border-slate-200 dark:border-slate-800 sticky top-20 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm z-40">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-2 justify-center">
                        {['all', 'a1', 'a2', 'b1'].map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={`px-4 py-2 rounded-lg transition-all ${selectedLevel === level
                                    ? 'bg-blue-600 text-white'
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
                                            title="শোনো"
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
                                            title="শব্দ ভাঙ্গন"
                                        >
                                            <svg className={`w-5 h-5 transition-transform ${expandedId === sentence.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Word Breakdown (Expandable) */}
                            {expandedId === sentence.id && sentence.wordBreakdown && (
                                <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-900/50 p-6">
                                    <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">শব্দে শব্দে অর্থ</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {sentence.wordBreakdown.map((word, index) => (
                                            <div
                                                key={index}
                                                className="p-3 rounded-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
                                            >
                                                <div className="font-semibold text-blue-600 dark:text-blue-400">{word.german}</div>
                                                <div className="text-sm text-slate-600 dark:text-slate-400">{word.english}</div>
                                                <div className="text-sm text-slate-500 dark:text-slate-500 font-bengali">{word.bangla}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
