'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { allWords } from '@/data/vocabulary';
import { Trophy, Flame, Star, BookOpen, Target, LogOut, Medal, Crown, Zap, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

const achievementsData = [
    { id: 'first-login', name: 'Welcome!', icon: '🎉', desc: 'Created your account', color: 'bg-emerald-500' },
    { id: 'first-word', name: 'First Step', icon: '📚', desc: 'Learned your first word', color: 'bg-blue-500' },
    { id: 'ten-words', name: 'Getting Started', icon: '🌱', desc: 'Learned 10 words', color: 'bg-teal-500' },
    { id: 'fifty-words', name: 'Vocab Builder', icon: '📖', desc: 'Learned 50 words', color: 'bg-indigo-500' },
    { id: 'hundred-words', name: 'Word Master', icon: '🏆', desc: 'Learned 100 words', color: 'bg-purple-500' },
    { id: 'first-quiz', name: 'Quiz Taker', icon: '🎯', desc: 'Completed your first quiz', color: 'bg-orange-500' },
    { id: 'perfect-quiz', name: 'Perfect Score', icon: '⭐', desc: 'Got 100% on a quiz', color: 'bg-yellow-400' },
    { id: 'streak-3', name: 'On Fire', icon: '🔥', desc: '3 day streak', color: 'bg-rose-500' },
    { id: 'streak-7', name: 'Week Warrior', icon: '💪', desc: '7 day streak', color: 'bg-red-500' },
    { id: 'streak-30', name: 'Dedicated', icon: '👑', desc: '30 day streak', color: 'bg-amber-500' },
    { id: 'a1-complete', name: 'A1 Master', icon: '🥉', desc: 'Completed A1 level', color: 'bg-stone-500' },
    { id: 'a2-complete', name: 'A2 Master', icon: '🥈', desc: 'Completed A2 level', color: 'bg-slate-400' },
    { id: 'b1-complete', name: 'B1 Master', icon: '🥇', desc: 'Completed B1 level', color: 'bg-yellow-500' },
    { id: 'b2-complete', name: 'B2 Master', icon: '💎', desc: 'Completed B2 level', color: 'bg-cyan-500' },
];

export default function ProfilePage() {
    const { user, logout, loading } = useAuth();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    if (!mounted || loading) return null;

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors duration-500 relative flex flex-col items-center justify-center p-6 text-center overflow-x-hidden">
                {/* Ambient Background Glows */}
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

                <ScrollReveal direction="up" className="relative z-10 max-w-lg w-full flex flex-col items-center">
                    <div className="glass-panel p-10 md:p-14 rounded-[3rem] w-full">
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 mx-auto rounded-[2rem] flex items-center justify-center mb-8 border-4 border-white dark:border-slate-800 shadow-xl transform rotate-3 hover:rotate-12 transition-transform">
                            <Crown className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white font-poppins mb-4 tracking-tight drop-shadow-sm">
                            Your Learning Hub
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Track your progress, earn exclusive badges, build streaks, and unlock a personalized German learning experience.
                        </p>

                        <Link href="/login" className="flex items-center justify-center gap-3 w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xl py-5 rounded-[1.5rem] shadow-[0_6px_0_0] shadow-slate-700 dark:shadow-slate-300 active:shadow-[0_0px_0_0] active:translate-y-1.5 transition-all group outline-none">
                            Sign up to unlock
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </ScrollReveal>
            </div>
        );
    }

    const currentLevelXP = user.level * 100;
    const nextLevelXP = (user.level + 1) * 100;
    const xpProgress = ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    const xpToNext = nextLevelXP - user.xp;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-opacity duration-500 relative overflow-x-hidden">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-6 pt-24 md:pt-32 relative z-10">

                {/* Hero Profile Card */}
                <ScrollReveal direction="up">
                    <div className="glass-panel rounded-[3rem] p-8 md:p-12 shadow-indigo-900/5 mb-8">
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

                            {/* Avatar with Circular SVG Progress Ring */}
                            <div className="relative">
                                <svg className="w-40 h-40 transform -rotate-90">
                                    <circle
                                        className="text-slate-100 dark:text-slate-800"
                                        strokeWidth="8"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="74"
                                        cx="80"
                                        cy="80"
                                    />
                                    <circle
                                        className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-1000 ease-out"
                                        strokeWidth="8"
                                        strokeDasharray={465}
                                        strokeDashoffset={465 - (465 * xpProgress) / 100}
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="74"
                                        cx="80"
                                        cy="80"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center p-4">
                                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-5xl font-black text-white shadow-inner">
                                        {(user.name || 'User').charAt(0).toUpperCase()}
                                    </div>
                                </div>

                                {/* Floating Level Badge */}
                                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-2xl px-4 py-1.5 font-black text-lg shadow-lg border-2 border-white dark:border-slate-900 transform rotate-12 hover:rotate-0 transition-transform">
                                    Lvl {user.level || 1}
                                </div>
                            </div>

                            <div className="text-center md:text-left flex-1">
                                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white font-poppins tracking-tight mb-2">
                                    {user.name || 'Learner'}
                                </h1>
                                <p className="text-lg text-slate-500 dark:text-slate-400 mb-6">{user.email}</p>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-bold rounded-xl border border-amber-200 dark:border-amber-800/50">
                                        <Zap className="w-5 h-5 fill-amber-500" />
                                        {user.xp} XP Total
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold rounded-xl border border-orange-200 dark:border-orange-800/50">
                                        <Flame className="w-5 h-5 fill-orange-500" />
                                        {user.streak} Day Streak
                                    </div>
                                </div>
                            </div>

                            <button onClick={logout} className="absolute top-8 right-8 md:static p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors shadow-sm focus:outline-none">
                                <LogOut className="w-6 h-6" />
                            </button>
                        </div>

                        {/* XP Progress Bar for Mobile (Hidden on Desktop where Circle is clear) */}
                        <div className="mt-8 md:hidden">
                            <div className="flex justify-between text-sm font-bold text-slate-500 mb-2">
                                <span>Level {user.level}</span>
                                <span>{xpToNext} XP to Level {user.level + 1}</span>
                            </div>
                            <div className="h-4 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ease-out relative" style={{ width: `${Math.max(xpProgress, 5)}%` }}>
                                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Key Statistics Grid */}
                <ScrollReveal direction="up" delay={0.1}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                        <div className="glass-panel p-6 rounded-[2rem] text-center hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900/40 rounded-[1rem] flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">{(user.learnedWords || []).length}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Words Learned</div>
                        </div>
                        <div className="glass-panel p-6 rounded-[2rem] text-center hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 mx-auto bg-emerald-100 dark:bg-emerald-900/40 rounded-[1rem] flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                                <Medal className="w-6 h-6" />
                            </div>
                            <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">{(user.achievements || []).length}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Achievements</div>
                        </div>
                        <div className="glass-panel p-6 rounded-[2rem] text-center hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 mx-auto bg-amber-100 dark:bg-amber-900/40 rounded-[1rem] flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                                <Star className="w-6 h-6 fill-amber-500" />
                            </div>
                            <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">{(user.favorites || []).length}</div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Favorites</div>
                        </div>
                        <div className="glass-panel p-6 rounded-[2rem] text-center hover:-translate-y-1 transition-transform">
                            <div className="w-12 h-12 mx-auto bg-purple-100 dark:bg-purple-900/40 rounded-[1rem] flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                                <Target className="w-6 h-6" />
                            </div>
                            <div className="text-4xl font-black text-slate-900 dark:text-white mb-1">
                                {Math.round((((user.learnedWords || []).length) / allWords.length) * 100)}%
                            </div>
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mastery</div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Achievements Showcase */}
                <ScrollReveal direction="up" delay={0.2}>
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <Trophy className="w-8 h-8 text-amber-500" />
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-poppins tracking-tight">Trophy Room</h2>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                            {achievementsData.map((a) => {
                                const unlocked = (user.achievements || []).includes(a.id);
                                return (
                                    <div
                                        key={a.id}
                                        className={`relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-6 text-center border transition-all duration-300
                                        ${unlocked
                                                ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2'
                                                : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-100 dark:border-slate-800/50 grayscale opacity-60 hover:grayscale-0 hover:opacity-100'
                                            }`
                                        }
                                    >
                                        {unlocked && (
                                            <div className={`absolute -top-10 -right-10 w-24 h-24 md:w-32 md:h-32 rounded-full ${a.color} opacity-10 blur-xl md:blur-2xl`}></div>
                                        )}
                                        <div className="text-4xl md:text-5xl mb-2 md:mb-4 drop-shadow-md relative z-10">{a.icon}</div>
                                        <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-1 font-poppins relative z-10 leading-tight">{a.name}</h3>
                                        <p className="text-[10px] md:text-xs font-semibold text-slate-500 dark:text-slate-400 relative z-10">{a.desc}</p>

                                        {!unlocked && (
                                            <div className="absolute inset-0 bg-slate-900/5 backdrop-blur-[1px] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-[2rem]">
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Quick Actions Panel */}
                <ScrollReveal direction="up" delay={0.3}>
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

                        <h2 className="text-3xl font-extrabold mb-8 font-poppins relative z-10">Continue Your Journey</h2>

                        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                            <Link href="/vocabulary" className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl p-6 font-bold text-lg border border-white/20 hover:border-white/40 shadow-lg transition-all flex items-center justify-center gap-3 group">
                                <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                <span>Library</span>
                            </Link>
                            <Link href="/practice" className="flex-1 bg-white hover:bg-slate-50 text-indigo-700 rounded-2xl p-6 font-bold text-lg shadow-[0_4px_0_0_rgba(255,255,255,0.3)] active:shadow-[0_0px_0_0_rgba(255,255,255,0.3)] active:translate-y-1 transition-all flex items-center justify-center gap-3">
                                <Target className="w-6 h-6" />
                                <span>Speed Quiz</span>
                            </Link>
                            <Link href="/sentence-builder" className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-2xl p-6 font-bold text-lg border border-white/20 hover:border-white/40 shadow-lg transition-all flex items-center justify-center gap-3 group">
                                <Crown className="w-6 h-6 group-hover:scale-110 object-transform" />
                                <span>Builder</span>
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </div>
    );
}
