'use client';

import { useState, useEffect } from 'react';

interface SentenceChallenge {
    id: string;
    english: string;
    bangla: string;
    correctOrder: string[];
    shuffledWords: string[];
    level: 'a1' | 'a2' | 'b1';
}

const challenges: SentenceChallenge[] = [
    // A1 Level
    { id: '1', english: 'I am learning German.', bangla: 'আমি জার্মান শিখছি।', correctOrder: ['Ich', 'lerne', 'Deutsch'], shuffledWords: ['Deutsch', 'Ich', 'lerne'], level: 'a1' },
    { id: '2', english: 'Good morning!', bangla: 'সুপ্রভাত!', correctOrder: ['Guten', 'Morgen'], shuffledWords: ['Morgen', 'Guten'], level: 'a1' },
    { id: '3', english: 'My name is...', bangla: 'আমার নাম...', correctOrder: ['Ich', 'heiße'], shuffledWords: ['heiße', 'Ich'], level: 'a1' },
    { id: '4', english: 'I drink water.', bangla: 'আমি পানি পান করি।', correctOrder: ['Ich', 'trinke', 'Wasser'], shuffledWords: ['Wasser', 'trinke', 'Ich'], level: 'a1' },
    { id: '5', english: 'Where is the station?', bangla: 'স্টেশন কোথায়?', correctOrder: ['Wo', 'ist', 'der', 'Bahnhof'], shuffledWords: ['Bahnhof', 'ist', 'Wo', 'der'], level: 'a1' },
    { id: '6', english: 'I eat bread.', bangla: 'আমি রুটি খাই।', correctOrder: ['Ich', 'esse', 'Brot'], shuffledWords: ['esse', 'Brot', 'Ich'], level: 'a1' },
    { id: '7', english: 'Thank you very much.', bangla: 'অনেক ধন্যবাদ।', correctOrder: ['Vielen', 'Dank'], shuffledWords: ['Dank', 'Vielen'], level: 'a1' },
    { id: '8', english: 'How are you?', bangla: 'আপনি কেমন আছেন?', correctOrder: ['Wie', 'geht', 'es', 'Ihnen'], shuffledWords: ['es', 'Ihnen', 'Wie', 'geht'], level: 'a1' },
    // A2 Level
    { id: '9', english: 'I work in an office.', bangla: 'আমি অফিসে কাজ করি।', correctOrder: ['Ich', 'arbeite', 'im', 'Büro'], shuffledWords: ['Büro', 'arbeite', 'im', 'Ich'], level: 'a2' },
    { id: '10', english: 'The train is late.', bangla: 'ট্রেন দেরি করছে।', correctOrder: ['Der', 'Zug', 'hat', 'Verspätung'], shuffledWords: ['hat', 'Zug', 'Verspätung', 'Der'], level: 'a2' },
    { id: '11', english: 'I need a doctor.', bangla: 'আমার ডাক্তার দরকার।', correctOrder: ['Ich', 'brauche', 'einen', 'Arzt'], shuffledWords: ['einen', 'Arzt', 'Ich', 'brauche'], level: 'a2' },
    { id: '12', english: 'Can I pay by card?', bangla: 'কার্ডে দিতে পারি?', correctOrder: ['Kann', 'ich', 'mit', 'Karte', 'zahlen'], shuffledWords: ['zahlen', 'Karte', 'ich', 'mit', 'Kann'], level: 'a2' },
    // B1 Level
    { id: '13', english: 'I would like to book a room.', bangla: 'আমি একটি রুম বুক করতে চাই।', correctOrder: ['Ich', 'möchte', 'ein', 'Zimmer', 'buchen'], shuffledWords: ['buchen', 'Zimmer', 'möchte', 'ein', 'Ich'], level: 'b1' },
    { id: '14', english: 'Could you help me please?', bangla: 'আপনি কি আমাকে সাহায্য করতে পারবেন?', correctOrder: ['Könnten', 'Sie', 'mir', 'bitte', 'helfen'], shuffledWords: ['helfen', 'mir', 'Sie', 'bitte', 'Könnten'], level: 'b1' },
    { id: '15', english: 'I am applying for this job.', bangla: 'আমি এই চাকরির জন্য আবেদন করছি।', correctOrder: ['Ich', 'bewerbe', 'mich', 'für', 'diese', 'Stelle'], shuffledWords: ['Stelle', 'mich', 'bewerbe', 'diese', 'für', 'Ich'], level: 'b1' },
];

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
        <div className="page-transition min-h-screen">
            <section className="py-12 md:py-16 bg-[var(--bg-secondary)]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3"><span className="gradient-text">Sentence Builder</span></h1>
                    <p className="text-lg text-[var(--text-secondary)]">Arrange words to form correct German sentences</p>
                    <p className="font-bengali text-[var(--text-muted)]">সঠিক জার্মান বাক্য তৈরি করতে শব্দগুলো সাজান</p>
                </div>
            </section>

            <section className="py-6 border-b border-[var(--border-color)] sticky top-16 md:top-20 bg-[var(--bg-primary)] z-40">
                <div className="max-w-4xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
                    {['all', 'a1', 'a2', 'b1'].map(l => (
                        <button key={l} onClick={() => { setLevel(l as typeof level); setCurrentIndex(0); }}
                            className={`px-4 py-2 rounded-lg transition-all ${level === l ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]'}`}>
                            {l === 'all' ? 'All' : l.toUpperCase()}
                        </button>
                    ))}
                    <div className="ml-auto text-[var(--primary)] font-bold">Score: {score}</div>
                </div>
            </section>

            <section className="py-8 md:py-12">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="glass-card p-6 md:p-8">
                        <span className={`badge badge-${current.level} mb-4`}>{current.level.toUpperCase()}</span>

                        <div className="mb-6">
                            <p className="text-sm text-[var(--text-muted)] mb-1">Translate to German:</p>
                            <p className="text-xl md:text-2xl font-semibold mb-2">{current.english}</p>
                            <p className="font-bengali text-[var(--text-secondary)]">{current.bangla}</p>
                        </div>

                        {showHint && (
                            <div className="mb-4 p-3 rounded-lg bg-[var(--info)] bg-opacity-20 text-sm">
                                💡 Hint: {current.correctOrder.join(' ')}
                            </div>
                        )}

                        <div className="min-h-[60px] md:min-h-[80px] p-4 rounded-xl border-2 border-dashed border-[var(--border-color)] mb-6 flex flex-wrap gap-2">
                            {selectedWords.length === 0 && <span className="text-[var(--text-muted)]">Tap words below...</span>}
                            {selectedWords.map((word, i) => (
                                <button key={i} onClick={() => handleWordClick(word, true)}
                                    className={`px-3 md:px-4 py-2 rounded-lg font-medium transition-all ${isCorrect === true ? 'bg-[var(--success)] text-white' : isCorrect === false ? 'bg-[var(--error)] text-white' : 'bg-[var(--primary)] text-white hover:scale-105'}`}>
                                    {word}
                                </button>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6 justify-center">
                            {availableWords.map((word, i) => (
                                <button key={i} onClick={() => handleWordClick(word, false)}
                                    className="px-3 md:px-4 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] transition-all hover:scale-105 active:scale-95">
                                    {word}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            {isCorrect === null ? (
                                <>
                                    <button onClick={checkAnswer} disabled={selectedWords.length === 0}
                                        className="flex-1 btn-primary py-3 justify-center disabled:opacity-50">Check</button>
                                    <button onClick={() => setShowHint(true)} className="btn-secondary py-3">💡 Hint</button>
                                </>
                            ) : (
                                <button onClick={nextChallenge} className="flex-1 btn-primary py-3 justify-center">
                                    {isCorrect ? '✓ Next' : 'Try Next'} →
                                </button>
                            )}
                        </div>

                        {isCorrect !== null && (
                            <div className={`mt-4 p-4 rounded-lg text-center ${isCorrect ? 'bg-[var(--success)] bg-opacity-20' : 'bg-[var(--error)] bg-opacity-20'}`}>
                                {isCorrect ? '🎉 Correct!' : `❌ Correct: ${current.correctOrder.join(' ')}`}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
