'use client';

import { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Trophy, Medal, Star, Crown } from 'lucide-react';

interface LeaderboardUser {
    id: string;
    name: string;
    xp: number;
    level: number;
    avatar?: string;
}

export default function LeaderboardPage() {
    const { user: currentUser } = useAuth();
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchLeaderboard = async () => {
            try {
                const q = query(collection(db, 'users'), orderBy('xp', 'desc'), limit(50));
                const querySnapshot = await getDocs(q);
                const fetchedUsers: LeaderboardUser[] = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    fetchedUsers.push({
                        id: doc.id,
                        name: data.name || 'Anonymous',
                        xp: data.xp || 0,
                        level: data.level || 1,
                        avatar: data.avatar,
                    });
                });
                if (isMounted) {
                    setUsers(fetchedUsers);
                    setFetchError(false);
                }
            } catch (error) {
                console.error("Error fetching leaderboard: ", error);
                if (isMounted) setFetchError(true);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchLeaderboard();
        return () => { isMounted = false; };
    }, []);

    const getRankIcon = (index: number) => {
        switch (index) {
            case 0: return <Crown className="w-6 h-6 text-yellow-500 drop-shadow-md" />;
            case 1: return <Medal className="w-6 h-6 text-slate-400 drop-shadow-md" />;
            case 2: return <Medal className="w-6 h-6 text-amber-700 drop-shadow-md" />;
            default: return <span className="text-lg font-bold text-slate-400 w-6 text-center">{index + 1}</span>;
        }
    };

    return (
        <div className="min-h-screen pb-32 transition-colors duration-500 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 pt-24 md:pt-32 relative z-10">
                <ScrollReveal direction="up" className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl shadow-amber-500/20 mb-6 transform rotate-3">
                        <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-poppins tracking-tight mb-4">Global Leaderboard</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                        See how you stack up against the top German learners around the world.
                    </p>
                </ScrollReveal>

                <div className="glass-panel rounded-[2rem] overflow-hidden border border-white/40 dark:border-slate-800/60 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    {fetchError && (
                        <div className="p-6 text-center text-rose-600 dark:text-rose-400 font-semibold bg-rose-50/50 dark:bg-rose-900/20">
                            Unable to load leaderboard. Please check your network connection.
                        </div>
                    )}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {users.map((user, index) => {
                                const isCurrentUser = currentUser?.id === user.id;
                                
                                return (
                                    <ScrollReveal 
                                        direction="up" 
                                        delay={index * 0.05} 
                                        key={user.id}
                                    >
                                        <div className={`flex items-center gap-4 md:gap-6 p-4 md:p-6 transition-colors ${isCurrentUser ? 'bg-amber-50 dark:bg-amber-900/10' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'}`}>
                                            
                                            <div className="flex items-center justify-center w-8 md:w-12 flex-shrink-0">
                                                {getRankIcon(index)}
                                            </div>

                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full flex-shrink-0 flex items-center justify-center text-xl font-bold text-white shadow-inner bg-gradient-to-br from-slate-400 to-slate-600">
                                                {(user.name || 'Anonymous').charAt(0).toUpperCase()}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h3 className={`text-base md:text-lg font-bold truncate ${isCurrentUser ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                                                        {user.name}
                                                    </h3>
                                                    {isCurrentUser && (
                                                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-full border border-amber-200 dark:border-amber-800">
                                                            You
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Level {user.level}</p>
                                            </div>

                                            <div className="text-right">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100/50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl font-bold">
                                                    <Star className="w-4 h-4 fill-amber-500" />
                                                    {user.xp} <span className="hidden md:inline">XP</span>
                                                </div>
                                            </div>

                                        </div>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
