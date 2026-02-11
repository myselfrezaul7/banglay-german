'use client';

import { useEffect, useState, useMemo } from 'react';
import { allWords } from '@/data/vocabulary';
import { Word, Level } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import PronunciationCoach from '@/components/shared/PronunciationCoach';

type QuizMode = 'de-to-en' | 'en-to-de' | 'de-to-bn' | 'bn-to-de' | 'speaking';

export default function PracticePage() {
    const { addXP, incrementStreak } = useAuth();
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
                case 'speaking':
                    question = word.german;
                    correct = word.german; // For speaking, the answer is the word itself
                    options = []; // No options for speaking
                    break;
                default:
                    question = word.german;
                    correct = word.english;
                    options = [];
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
            addXP(10); // 10 XP per correct answer
        }
    };

    const handleSpeakingSuccess = () => {
        if (showResult) return;
        setShowResult(true);
        setScore(s => s + 1);
        addXP(20); // 20 XP for speaking!
        // Auto advance after a delay or let user click next? Let's show success state first.
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(c => c + 1);
            setSelectedAnswer(null);
            setShowResult(false);
        } else {
            setQuizComplete(true);
            incrementStreak();
            addXP(50); // Bonus for completion
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <section className="py-16 bg-slate-100/50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                        <span className="gradient-text">অনুশীলন</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-2">
                        Test your German vocabulary knowledge
                    </p>
                    <p className="text-lg font-bengali text-slate-500 dark:text-slate-500">
                        আপনার জার্মান শব্দ জ্ঞান যাচাই করুন
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {!quizStarted ? (
                        /* Quiz Setup */
                        <div className="glass-card p-8">
                            <h2 className="text-2xl font-bold mb-6 text-center text-slate-900 dark:text-white">আপনার কুইজ নির্বাচন করুন</h2>

                            {/* Level Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">লেভেল নির্বাচন করুন</label>
                                <div className="flex flex-wrap gap-2">
                                    {['all', 'a1', 'a2', 'b1'].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setSelectedLevel(level as Level | 'all')}
                                            className={`px-4 py-2 rounded-lg transition-all ${selectedLevel === level
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                                                }`}
                                        >
                                            {level === 'all' ? 'All Levels' : level.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quiz Mode Selection */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium mb-3 text-slate-700 dark:text-slate-300">কুইজের ধরন</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { mode: 'de-to-en', label: 'German → English', labelBn: 'জার্মান → ইংরেজি' },
                                        { mode: 'en-to-de', label: 'English → German', labelBn: 'ইংরেজি → জার্মান' },
                                        { mode: 'de-to-bn', label: 'German → বাংলা', labelBn: 'জার্মান → বাংলা' },
                                        { mode: 'bn-to-de', label: 'বাংলা → German', labelBn: 'বাংলা → জার্মান' },
                                        { mode: 'speaking', label: '🎙️ Speaking Practice', labelBn: 'উচ্চারণ অনুশীলন' },
                                    ].map(({ mode, label, labelBn }) => (
                                        <button
                                            key={mode}
                                            onClick={() => setQuizMode(mode as QuizMode)}
                                            className={`p-4 rounded-xl text-left transition-all ${quizMode === mode
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
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
                                কুইজ শুরু করুন (১০টি প্রশ্ন)
                            </button>
                        </div>
                    ) : quizComplete ? (
                        /* Quiz Complete */
                        <div className="glass-card p-8 text-center">
                            <div className="text-6xl mb-4">
                                {score >= 8 ? '🎉' : score >= 5 ? '👍' : '📚'}
                            </div>
                            <h2 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">কুইজ শেষ!</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-6 font-bengali">আপনার ফলাফল দেখুন!</p>

                            <div className={`text-6xl font-bold mb-4 ${score >= 8 ? 'text-green-500' : score >= 5 ? 'text-amber-500' : 'text-red-500'}`}>
                                {score}/১০
                            </div>
                            <div className="mb-6 text-yellow-500 font-bold text-xl">
                                +{score * (quizMode === 'speaking' ? 20 : 10) + 50} XP Earned!
                            </div>

                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 font-bengali">
                                {score >= 8 ? 'দারুণ! চালিয়ে যান!' :
                                    score >= 5 ? 'ভালো হয়েছে! আরও অনুশীলন করুন!' :
                                        'চিন্তা নেই! আরেকবার চেষ্টা করুন!'}
                            </p>

                            <div className="flex gap-4 justify-center">
                                <button onClick={startQuiz} className="btn-primary">
                                    আবার চেষ্টা করুন
                                </button>
                                <button onClick={resetQuiz} className="btn-secondary">
                                    নতুন কুইজ
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* Quiz Question */
                        <div className="glass-card p-8">
                            {/* Progress */}
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-slate-500 dark:text-slate-400">
                                    প্রশ্ন {currentQuestion + 1}/{questions.length}
                                </span>
                                <span className="text-blue-600 dark:text-blue-400 font-bold">স্কোর: {score}</span>
                            </div>

                            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full mb-8">
                                <div
                                    className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all"
                                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                                />
                            </div>

                            {/* Question */}
                            <div className="text-center mb-8">
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                                    {quizMode === 'speaking' ? 'Speak the word:' : 'এর মানে কী:'}
                                </p>
                                <h3 className={`text-4xl font-bold text-slate-900 dark:text-white ${quizMode.startsWith('bn') ? 'font-bengali' : ''}`}>
                                    {questions[currentQuestion]?.question}
                                </h3>
                                {quizMode === 'speaking' && (
                                    <p className="text-lg text-slate-500 mt-2 font-bengali">
                                        ({questions[currentQuestion]?.word.bangla})
                                    </p>
                                )}
                            </div>

                            {/* Options or Coach */}
                            {quizMode === 'speaking' ? (
                                <PronunciationCoach
                                    targetText={questions[currentQuestion]?.correct}
                                    onSuccess={handleSpeakingSuccess}
                                />
                            ) : (
                                <div className="grid grid-cols-1 gap-3">
                                    {questions[currentQuestion]?.options.map((option, index) => {
                                        let className = 'p-4 rounded-xl border-2 transition-all text-left ';
                                        if (showResult) {
                                            if (option === questions[currentQuestion].correct) {
                                                className += 'border-green-500 bg-green-500/20 text-green-700 dark:text-green-300';
                                            } else if (option === selectedAnswer) {
                                                className += 'border-red-500 bg-red-500/20 text-red-700 dark:text-red-300';
                                            } else {
                                                className += 'border-slate-200 dark:border-slate-700 opacity-50 text-slate-600 dark:text-slate-400';
                                            }
                                        } else {
                                            className += 'border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-300';
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
                            )}

                            {/* Next Button */}
                            {showResult && (
                                <button
                                    onClick={handleNext}
                                    className="w-full btn-primary mt-6 py-4 justify-center"
                                >
                                    {currentQuestion < questions.length - 1 ? 'পরের প্রশ্ন' : 'ফলাফল দেখুন'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
