'use client';

import { useEffect, useState, useMemo } from 'react';
import { allWords } from '@/data/vocabulary';
import { Word, Level } from '@/types';

type QuizMode = 'de-to-en' | 'en-to-de' | 'de-to-bn' | 'bn-to-de';

export default function PracticePage() {
    const [mounted, setMounted] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
    const [quizMode, setQuizMode] = useState<QuizMode>('de-to-en');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizComplete, setQuizComplete] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const filteredWords = useMemo(() => {
        if (selectedLevel === 'all') return allWords;
        return allWords.filter(w => w.level === selectedLevel);
    }, [selectedLevel]);

    const questions = useMemo(() => {
        const shuffled = [...filteredWords].sort(() => Math.random() - 0.5).slice(0, 10);
        return shuffled.map(word => {
            const otherWords = filteredWords.filter(w => w.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3);

            let question: string, correct: string, options: string[];

            switch (quizMode) {
                case 'de-to-en':
                    question = word.german;
                    correct = word.english;
                    options = [word.english, ...otherWords.map(w => w.english)].sort(() => Math.random() - 0.5);
                    break;
                case 'en-to-de':
                    question = word.english;
                    correct = word.german;
                    options = [word.german, ...otherWords.map(w => w.german)].sort(() => Math.random() - 0.5);
                    break;
                case 'de-to-bn':
                    question = word.german;
                    correct = word.bangla;
                    options = [word.bangla, ...otherWords.map(w => w.bangla)].sort(() => Math.random() - 0.5);
                    break;
                case 'bn-to-de':
                    question = word.bangla;
                    correct = word.german;
                    options = [word.german, ...otherWords.map(w => w.german)].sort(() => Math.random() - 0.5);
                    break;
            }

            return { word, question, correct, options };
        });
    }, [filteredWords, quizMode]);

    const handleAnswer = (answer: string) => {
        if (showResult) return;
        setSelectedAnswer(answer);
        setShowResult(true);
        if (answer === questions[currentQuestion].correct) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(c => c + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setQuizComplete(true);
        }
    };

    const startQuiz = () => {
        setQuizStarted(true);
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setQuizComplete(false);
    };

    const resetQuiz = () => {
        setQuizStarted(false);
        setQuizComplete(false);
        setCurrentQuestion(0);
        setScore(0);
    };

    if (!mounted) return null;

    return (
        <div className="page-transition min-h-screen">
            {/* Header */}
            <section className="py-16 bg-[var(--bg-secondary)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">Practice</span>
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] mb-2">
                        Test your German vocabulary knowledge
                    </p>
                    <p className="text-lg font-bengali text-[var(--text-muted)]">
                        আপনার জার্মান শব্দভাণ্ডার জ্ঞান পরীক্ষা করুন
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {!quizStarted ? (
                        /* Quiz Setup */
                        <div className="glass-card p-8">
                            <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Quiz</h2>

                            {/* Level Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-3">Select Level</label>
                                <div className="flex flex-wrap gap-2">
                                    {['all', 'a1', 'a2', 'b1'].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setSelectedLevel(level as Level | 'all')}
                                            className={`px-4 py-2 rounded-lg transition-all ${selectedLevel === level
                                                    ? 'bg-[var(--primary)] text-white'
                                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                                                }`}
                                        >
                                            {level === 'all' ? 'All Levels' : level.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quiz Mode Selection */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium mb-3">Quiz Type</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { mode: 'de-to-en', label: 'German → English', labelBn: 'জার্মান → ইংরেজি' },
                                        { mode: 'en-to-de', label: 'English → German', labelBn: 'ইংরেজি → জার্মান' },
                                        { mode: 'de-to-bn', label: 'German → বাংলা', labelBn: 'জার্মান → বাংলা' },
                                        { mode: 'bn-to-de', label: 'বাংলা → German', labelBn: 'বাংলা → জার্মান' },
                                    ].map(({ mode, label, labelBn }) => (
                                        <button
                                            key={mode}
                                            onClick={() => setQuizMode(mode as QuizMode)}
                                            className={`p-4 rounded-xl text-left transition-all ${quizMode === mode
                                                    ? 'bg-[var(--primary)] text-white'
                                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                                                }`}
                                        >
                                            <div className="font-medium">{label}</div>
                                            <div className="text-sm opacity-70 font-bengali">{labelBn}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Start Button */}
                            <button
                                onClick={startQuiz}
                                className="w-full btn-primary text-lg py-4 justify-center"
                            >
                                Start Quiz (10 Questions)
                            </button>
                        </div>
                    ) : quizComplete ? (
                        /* Quiz Complete */
                        <div className="glass-card p-8 text-center">
                            <div className="text-6xl mb-4">
                                {score >= 8 ? '🎉' : score >= 5 ? '👍' : '📚'}
                            </div>
                            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
                            <p className="text-[var(--text-secondary)] mb-6 font-bengali">কুইজ শেষ!</p>

                            <div className="text-6xl font-bold mb-4" style={{
                                color: score >= 8 ? 'var(--success)' : score >= 5 ? 'var(--warning)' : 'var(--error)'
                            }}>
                                {score}/10
                            </div>

                            <p className="text-lg text-[var(--text-secondary)] mb-8">
                                {score >= 8 ? 'Excellent! Keep up the great work!' :
                                    score >= 5 ? 'Good job! Keep practicing!' :
                                        'Keep learning! You\'ll get better!'}
                            </p>

                            <div className="flex gap-4 justify-center">
                                <button onClick={startQuiz} className="btn-primary">
                                    Try Again
                                </button>
                                <button onClick={resetQuiz} className="btn-secondary">
                                    New Quiz
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Quiz Question */
                        <div className="glass-card p-8">
                            {/* Progress */}
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[var(--text-muted)]">
                                    Question {currentQuestion + 1} of {questions.length}
                                </span>
                                <span className="text-[var(--primary)] font-bold">Score: {score}</span>
                            </div>

                            <div className="h-2 bg-[var(--bg-tertiary)] rounded-full mb-8">
                                <div
                                    className="h-full bg-[var(--primary)] rounded-full transition-all"
                                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                />
                            </div>

                            {/* Question */}
                            <div className="text-center mb-8">
                                <p className="text-sm text-[var(--text-muted)] mb-2">What is the meaning of:</p>
                                <h3 className={`text-4xl font-bold ${quizMode.startsWith('bn') ? 'font-bengali' : ''}`}>
                                    {questions[currentQuestion]?.question}
                                </h3>
                            </div>

                            {/* Options */}
                            <div className="grid grid-cols-1 gap-3">
                                {questions[currentQuestion]?.options.map((option, index) => {
                                    let className = 'p-4 rounded-xl border-2 transition-all text-left ';
                                    if (showResult) {
                                        if (option === questions[currentQuestion].correct) {
                                            className += 'correct-answer border-[var(--success)] bg-[rgba(16,185,129,0.2)]';
                                        } else if (option === selectedAnswer) {
                                            className += 'incorrect-answer border-[var(--error)] bg-[rgba(239,68,68,0.2)]';
                                        } else {
                                            className += 'border-[var(--border-color)] opacity-50';
                                        }
                                    } else {
                                        className += 'border-[var(--border-color)] hover:border-[var(--primary)] hover:bg-[var(--bg-tertiary)] cursor-pointer';
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(option)}
                                            disabled={showResult}
                                            className={className + (quizMode.endsWith('bn') || quizMode.startsWith('bn') ? ' font-bengali' : '')}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Next Button */}
                            {showResult && (
                                <button
                                    onClick={handleNext}
                                    className="w-full btn-primary mt-6 py-4 justify-center"
                                >
                                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
