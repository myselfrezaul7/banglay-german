'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    xp: number;
    streak: number;
    level: number;
    achievements: string[];
    learnedWords: string[];
    favorites: string[];
    joinedAt: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    signup: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    addXP: (amount: number) => void;
    incrementStreak: () => void;
    addAchievement: (id: string) => void;
    toggleFavorite: (wordId: string) => void;
    markWordLearned: (wordId: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('german-shikhi-user');
        if (saved) setUser(JSON.parse(saved));
        setLoading(false);
    }, []);

    const saveUser = (u: User) => {
        setUser(u);
        localStorage.setItem('german-shikhi-user', JSON.stringify(u));
    };

    const login = async (email: string, password: string) => {
        // Firebase integration placeholder
        const mockUser: User = {
            id: 'user-' + Date.now(),
            name: email.split('@')[0],
            email,
            xp: 0,
            streak: 0,
            level: 1,
            achievements: ['first-login'],
            learnedWords: [],
            favorites: [],
            joinedAt: new Date().toISOString(),
        };
        saveUser(mockUser);
    };

    const loginWithGoogle = async () => {
        // Firebase Google Auth placeholder
        const mockUser: User = {
            id: 'google-' + Date.now(),
            name: 'Google User',
            email: 'user@gmail.com',
            xp: 0,
            streak: 0,
            level: 1,
            achievements: ['first-login'],
            learnedWords: [],
            favorites: [],
            joinedAt: new Date().toISOString(),
        };
        saveUser(mockUser);
    };

    const signup = async (email: string, password: string, name: string) => {
        const newUser: User = {
            id: 'user-' + Date.now(),
            name,
            email,
            xp: 0,
            streak: 0,
            level: 1,
            achievements: ['first-login'],
            learnedWords: [],
            favorites: [],
            joinedAt: new Date().toISOString(),
        };
        saveUser(newUser);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('german-shikhi-user');
    };

    const addXP = (amount: number) => {
        if (!user) return;
        const newXP = user.xp + amount;
        const newLevel = Math.floor(newXP / 100) + 1;
        saveUser({ ...user, xp: newXP, level: newLevel });
    };

    const incrementStreak = () => {
        if (!user) return;
        saveUser({ ...user, streak: user.streak + 1 });
    };

    const addAchievement = (id: string) => {
        if (!user || user.achievements.includes(id)) return;
        saveUser({ ...user, achievements: [...user.achievements, id] });
    };

    const toggleFavorite = (wordId: string) => {
        if (!user) return;
        const favorites = user.favorites.includes(wordId)
            ? user.favorites.filter(f => f !== wordId)
            : [...user.favorites, wordId];
        saveUser({ ...user, favorites });
    };

    const markWordLearned = (wordId: string) => {
        if (!user || user.learnedWords.includes(wordId)) return;
        saveUser({ ...user, learnedWords: [...user.learnedWords, wordId] });
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, signup, logout, addXP, incrementStreak, addAchievement, toggleFavorite, markWordLearned }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
