'use client';

import { useEffect, useState, useMemo } from 'react';
import { allWords } from '@/data/vocabulary';
import { Word, Level } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import PronunciationCoach from '@/components/shared/PronunciationCoach';
import { Zap, Timer, Trophy, ArrowRight, RefreshCcw, Medal } from 'lucide-react';

type QuizMode = 'de-to-en' | 'en-to-de' | 'de-to-bn' | 'bn-to-de' | 'speaking';

export default function PracticePage() {
    const { addXP, incrementStreak } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<Level | 'all'>('all');
    const [quizMode, setQuizMode] = useState<QuizMode>('de-to-en');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [streakCount, setStreakCount] = useState(0);
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
                    correct = word.german;
                    options = [];
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

        const isCorrect = answer === questions[currentQuestion].correct;

        if (isCorrect) {
            setScore(s => s + 1);
            setStreakCount(s => s + 1);
            addXP(10 + (streakCount > 2 ? 5 : 0)); // Bonus XP for streaks

            // Success Haptic
            if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate([30, 50, 30]);
            }
        } else {
            setStreakCount(0);
            // Error Haptic
            if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                window.navigator.vibrate(100);
            }
        }
    };

    const handleSpeakingSuccess = () => {
        if (showResult) return;
        setShowResult(true);
        setScore(s => s + 1);
        setStreakCount(s => s + 1);
        addXP(20); // 20 XP for speaking!
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
        setStreakCount(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setQuizComplete(false);
    };

    const resetQuiz = () => {
        setQuizStarted(false);
        setQuizComplete(false);
        setCurrentQuestion(0);
        setScore(0);
        setStreakCount(0);
    };

    if (!mounted) return null;

    // Dynamic background based on result state
    const bgClass = showResult
        ? selectedAnswer === questions[currentQuestion]?.correct || selectedAnswer === null
            ? 'bg-emerald-50 dark:bg-emerald-950/20'
            : 'bg-rose-50 dark:bg-rose-950/20'
        : 'bg-slate-50 dark:bg-slate-950';

    return (
        <div className={`min-h-screen pb-24 transition-colors duration-500 overflow-hidden relative ${bgClass}`}>

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            {!quizStarted && !quizComplete && (
                <section className="relative pt-24 pb-12 text-center max-w-4xl mx-auto px-6 z-10">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-bold tracking-widest uppercase border border-orange-200 dark:border-orange-800/50 shadow-sm">
                        <Zap className="w-4 h-4" /> Speed Quiz
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-slate-900 dark:text-white font-poppins tracking-tight drop-shadow-sm">Practice Arena</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                        Test your speed, accuracy, and vocabulary recall under pressure. <br />
                        <span className="font-bengali text-slate-500 font-medium mt-1 inline-block">আপনার জার্মান শব্দ জ্ঞান যাচাই করুন</span>
                    </p>
                </section>
            )}

            <section className="max-w-3xl mx-auto px-4 relative z-10 pt-8">
                {!quizStarted ? (
                    /* Quiz Setup Dashboard */
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-200/50 dark:shadow-none animate-fadeInUp">

                        {/* Level Selection */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">1</div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-poppins">Select Level</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {['all', 'a1', 'a2', 'b1', 'b2'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setSelectedLevel(level as Level | 'all')}
                                        className={`px-6 py-3 border rounded-2xl font-bold text-sm transition-all duration-300 hover:-translate-y-1 ${selectedLevel === level
                                            ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/30'
                                            : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400'
                                            }`}
                                    >
                                        {level === 'all' ? 'Mixed Levels' : `Level ${level.toUpperCase()}`}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quiz Mode Selection */}
                        <div className="mb-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400 font-bold">2</div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-poppins">Select Challenge</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[
                                    { mode: 'de-to-en', label: 'German → English', icon: '🇩🇪' },
                                    { mode: 'en-to-de', label: 'English → German', icon: '🇬🇧' },
                                    { mode: 'de-to-bn', label: 'German → বাংলা', icon: '🇧🇩' },
                                    { mode: 'bn-to-de', label: 'বাংলা → German', icon: '🔄' },
                                    { mode: 'speaking', label: 'Speaking', icon: '🎙️' },
                                ].map(({ mode, label, icon }) => (
                                    <button
                                        key={mode}
                                        onClick={() => setQuizMode(mode as QuizMode)}
                                        className={`p-5 rounded-[1.5rem] border-2 text-left transition-all duration-300 hover:-translate-y-1 ${quizMode === mode
                                            ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 text-orange-700 dark:text-orange-300 shadow-lg shadow-orange-500/10'
                                            : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-orange-300'
                                            }`}
                                    >
                                        <div className="text-2xl mb-2">{icon}</div>
                                        <div className="font-bold">{label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Start Button */}
                        <button
                            onClick={startQuiz}
                            className="w-full relative group overflow-hidden rounded-[1.5rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xl py-5 shadow-[0_6px_0_0] shadow-slate-700 dark:shadow-slate-300 active:shadow-[0_0px_0_0] active:translate-y-1.5 transition-all outline-none"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2 font-poppins tracking-wide">
                                <Zap className="w-6 h-6" /> Start Quiz
                            </span>
                            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                        </button>
                    </div>
                ) : quizComplete ? (
                    /* Quiz Complete Dashboard */
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-slate-200/50 dark:border-slate-700/50 shadow-2xl text-center animate-fadeInUp">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full"></div>
                            <div className="relative w-full h-full bg-gradient-to-br from-yellow-300 to-orange-500 rounded-[2rem] flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-12 transition-transform duration-500">
                                <Medal className="w-16 h-16 text-white" />
                            </div>
                        </div>

                        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white font-poppins mb-2">Quiz Complete!</h2>
                        <p className="text-slate-500 dark:text-slate-400 font-bengali text-lg mb-8">দারুণ অনুশীলন হয়েছে!</p>

                        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-10">
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[1.5rem] p-6 border border-slate-100 dark:border-slate-700">
                                <div className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-1">Score</div>
                                <div className={`text-4xl font-black ${score >= 8 ? 'text-emerald-500' : score >= 5 ? 'text-orange-500' : 'text-rose-500'}`}>
                                    {score}/10
                                </div>
                            </div>
                            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-[1.5rem] p-6 border border-amber-100 dark:border-amber-900/50">
                                <div className="text-sm text-amber-600 dark:text-amber-500 font-bold uppercase tracking-widest mb-1">XP Earned</div>
                                <div className="text-4xl font-black text-amber-500">
                                    +{score * (quizMode === 'speaking' ? 20 : 10) + 50}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <button onClick={startQuiz} className="flex-1 flex justify-center items-center gap-2 py-4 rounded-2xl font-bold text-lg shadow-[0_4px_0_0] active:shadow-[0_0px_0_0] active:translate-y-1 transition-all bg-blue-600 text-white shadow-blue-800 hover:bg-blue-500">
                                <RefreshCcw className="w-5 h-5" /> Play Again
                            </button>
                            <button onClick={resetQuiz} className="flex-1 py-4 rounded-2xl font-bold text-lg shadow-[0_4px_0_0] active:shadow-[0_0px_0_0] active:translate-y-1 transition-all bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-slate-300 dark:shadow-slate-950 hover:bg-slate-300 dark:hover:bg-slate-700">
                                Change Settings
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Active Quiz Board */
                    <div className="animate-slideInRight">

                        {/* Floating Status Bar */}
                        <div className="flex justify-between items-center bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-4 rounded-[1.5rem] border border-slate-200/50 dark:border-slate-700/50 shadow-sm mb-6 sticky top-24 z-20">
                            <div className="flex items-center gap-3">
                                <div className="hidden sm:flex w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 items-center justify-center text-slate-500"><Timer className="w-5 h-5" /></div>
                                <div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question</div>
                                    <div className="font-bold text-slate-900 dark:text-white">{currentQuestion + 1} of 10</div>
                                </div>
                            </div>

                            {/* Animated Progress Bar */}
                            <div className="flex-1 max-w-[200px] mx-4 hidden sm:block">
                                <div className="h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full transition-all duration-500 ease-out" style={{ width: `${((currentQuestion) / 10) * 100}%` }}></div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="text-right">
                                    <div className="text-xs font-bold text-orange-400 uppercase tracking-widest">XP Combo</div>
                                    <div className="font-bold text-orange-500 flex items-center justify-end gap-1">
                                        <Zap className="w-4 h-4 fill-orange-500" /> {streakCount}x
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quiz Question Card */}
                        <div className={`bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 border shadow-2xl transition-all duration-500 ${showResult
                            ? selectedAnswer === questions[currentQuestion]?.correct || selectedAnswer === null
                                ? 'border-emerald-400 shadow-emerald-500/20'
                                : 'border-rose-400 shadow-rose-500/20'
                            : 'border-slate-200/50 dark:border-slate-700/50 shadow-slate-200/50 dark:shadow-none'
                            }`}>

                            {/* The Question prompt */}
                            <div className="mb-10 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                                    <span className="w-8 h-[2px] bg-slate-200 dark:bg-slate-700 rounded-full inline-block"></span>
                                    {quizMode === 'speaking' ? 'Speak Aloud' : 'Translate'}
                                </div>
                                <h3 className={`text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight font-poppins mb-2 ${quizMode.startsWith('bn') ? 'font-bengali' : ''}`}>
                                    {questions[currentQuestion]?.question}
                                </h3>
                                {quizMode === 'speaking' && (
                                    <p className="text-xl text-slate-500 mt-2 font-bengali font-medium">
                                        ({questions[currentQuestion]?.word.bangla})
                                    </p>
                                )}
                            </div>

                            {/* Answer Options */}
                            {quizMode === 'speaking' ? (
                                <PronunciationCoach
                                    targetText={questions[currentQuestion]?.correct}
                                    onSuccess={handleSpeakingSuccess}
                                />
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    {questions[currentQuestion]?.options.map((option, index) => {
                                        const isCorrectAnswer = option === questions[currentQuestion].correct;
                                        const isSelected = option === selectedAnswer;

                                        let btnClass = "w-full text-left px-6 py-5 rounded-[1.5rem] font-bold text-lg border-2 shadow-[0_4px_0_0] transition-all origin-center ";

                                        if (showResult) {
                                            if (isCorrectAnswer) {
                                                btnClass += "bg-emerald-500 border-emerald-600 text-white shadow-emerald-700 transform scale-[1.02] z-10";
                                            } else if (isSelected) {
                                                btnClass += "bg-rose-500 border-rose-600 text-white shadow-none translate-y-1 opacity-80";
                                            } else {
                                                btnClass += "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 shadow-none opacity-50";
                                            }
                                        } else {
                                            btnClass += "bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200 shadow-slate-200 dark:shadow-slate-950 active:shadow-[0_0px_0_0] active:translate-y-1 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400";
                                        }

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswer(option)}
                                                disabled={showResult}
                                                className={btnClass + (quizMode.endsWith('bn') || quizMode.startsWith('bn') ? ' font-bengali' : '')}
                                            >
                                                {option}
                                                {showResult && isCorrectAnswer && <span className="float-right">💪</span>}
                                                {showResult && isSelected && !isCorrectAnswer && <span className="float-right">❌</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Action Area (Next Button) */}
                            {showResult && (
                                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 animate-fadeInUp">
                                    <button
                                        onClick={handleNext}
                                        className={`w-full flex items-center justify-center gap-2 rounded-2xl font-bold text-xl py-5 shadow-[0_6px_0_0] active:shadow-[0_0px_0_0] active:translate-y-1.5 transition-all text-white
                                            ${selectedAnswer === questions[currentQuestion]?.correct || selectedAnswer === null
                                                ? 'bg-emerald-600 shadow-emerald-800 hover:bg-emerald-500'
                                                : 'bg-rose-600 shadow-rose-800 hover:bg-rose-500'
                                            }
                                        `}
                                    >
                                        {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
                                        <ArrowRight className="w-6 h-6" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
