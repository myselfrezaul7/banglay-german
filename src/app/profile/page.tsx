'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { allWords } from '@/data/vocabulary';

const achievements = [
    { id: 'first-login', name: 'Welcome!', icon: '🎉', desc: 'Created your account' },
    { id: 'first-word', name: 'First Step', icon: '📚', desc: 'Learned your first word' },
    { id: 'ten-words', name: 'Getting Started', icon: '🌱', desc: 'Learned 10 words' },
    { id: 'fifty-words', name: 'Vocabulary Builder', icon: '📖', desc: 'Learned 50 words' },
    { id: 'hundred-words', name: 'Word Master', icon: '🏆', desc: 'Learned 100 words' },
    { id: 'first-quiz', name: 'Quiz Taker', icon: '🎯', desc: 'Completed your first quiz' },
    { id: 'perfect-quiz', name: 'Perfect Score', icon: '⭐', desc: 'Got 100% on a quiz' },
    { id: 'streak-3', name: 'On Fire', icon: '🔥', desc: '3 day streak' },
    { id: 'streak-7', name: 'Week Warrior', icon: '💪', desc: '7 day streak' },
    { id: 'streak-30', name: 'Dedicated', icon: '👑', desc: '30 day streak' },
    { id: 'a1-complete', name: 'A1 Master', icon: '🥉', desc: 'Completed A1 level' },
    { id: 'a2-complete', name: 'A2 Master', icon: '🥈', desc: 'Completed A2 level' },
    { id: 'b1-complete', name: 'B1 Master', icon: '🥇', desc: 'Completed B1 level' },
    { id: 'b2-complete', name: 'B2 Master', icon: '💎', desc: 'Completed B2 level' },
];

export default function ProfilePage() {
    const { user, logout, loading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading, router]);

    if (!mounted || loading || !user) return null;

    const xpToNext = 100 - (user.xp % 100);
    const xpProgress = (user.xp % 100);

    return (
        <div className="page-transition min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Profile Header */}
                <div className="glass-card p-6 md:p-8 mb-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent-gold)] flex items-center justify-center text-4xl font-bold text-white">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-2xl font-bold">{user.name}</h1>
                            <p className="text-[var(--text-secondary)]">{user.email}</p>
                            <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                                <span className="text-[var(--accent-gold)]">⭐ Level {user.level}</span>
                                <span className="text-[var(--primary)]">🔥 {user.streak} day streak</span>
                            </div>
                        </div>
                        <button onClick={logout} className="btn-secondary">Logout</button>
                    </div>

                    {/* XP Progress */}
                    <div className="mt-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span>XP: {user.xp}</span>
                            <span>{xpToNext} XP to Level {user.level + 1}</span>
                        </div>
                        <div className="h-3 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent-gold)] transition-all" style={{ width: `${xpProgress}%` }} />
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="glass-card p-4 text-center">
                        <div className="text-3xl font-bold text-[var(--primary)]">{user.learnedWords.length}</div>
                        <div className="text-sm text-[var(--text-secondary)]">Words Learned</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <div className="text-3xl font-bold text-[var(--accent-gold)]">{user.favorites.length}</div>
                        <div className="text-sm text-[var(--text-secondary)]">Favorites</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <div className="text-3xl font-bold text-[var(--success)]">{user.achievements.length}</div>
                        <div className="text-sm text-[var(--text-secondary)]">Achievements</div>
                    </div>
                    <div className="glass-card p-4 text-center">
                        <div className="text-3xl font-bold text-[var(--info)]">{allWords.length}</div>
                        <div className="text-sm text-[var(--text-secondary)]">Total Words</div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="glass-card p-6 md:p-8 mb-6">
                    <h2 className="text-xl font-bold mb-4">🏆 Achievements</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {achievements.map(a => {
                            const unlocked = user.achievements.includes(a.id);
                            return (
                                <div key={a.id} className={`p-4 rounded-xl text-center transition-all ${unlocked ? 'bg-[var(--bg-tertiary)]' : 'bg-[var(--bg-secondary)] opacity-50'}`}>
                                    <div className="text-3xl mb-2">{a.icon}</div>
                                    <div className="font-medium text-sm">{a.name}</div>
                                    <div className="text-xs text-[var(--text-muted)]">{a.desc}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6">
                    <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/vocabulary" className="btn-primary">📚 Vocabulary</Link>
                        <Link href="/practice" className="btn-secondary">🎯 Practice Quiz</Link>
                        <Link href="/sentence-builder" className="btn-secondary">✍️ Sentence Builder</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
