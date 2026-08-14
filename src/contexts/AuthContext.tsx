'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth, db } from '@/lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import LevelUpModal from '@/components/ui/LevelUpModal';

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

const STORAGE_KEY = 'banglay-german-storage';

const normalizeUser = (data: any): User => ({
    id: data?.id || '',
    name: data?.name || 'User',
    email: data?.email || '',
    avatar: data?.avatar || '',
    xp: typeof data?.xp === 'number' ? data.xp : 0,
    streak: typeof data?.streak === 'number' ? data.streak : 0,
    level: typeof data?.level === 'number' ? data.level : 1,
    achievements: Array.isArray(data?.achievements) ? data.achievements : [],
    learnedWords: Array.isArray(data?.learnedWords) ? data.learnedWords : [],
    favorites: Array.isArray(data?.favorites) ? data.favorites : [],
    joinedAt: data?.joinedAt || new Date().toISOString(),
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLevelUpModal, setShowLevelUpModal] = useState(false);
    const [newLevel, setNewLevel] = useState(1);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                setUser(normalizeUser(JSON.parse(saved)));
            }
        } catch (e) {
            console.error('Failed to parse saved user:', e);
            localStorage.removeItem(STORAGE_KEY);
        }

        let snapshotUnsubscribe: (() => void) | undefined;

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (snapshotUnsubscribe) {
                snapshotUnsubscribe();
                snapshotUnsubscribe = undefined;
            }

            if (firebaseUser) {
                const userRef = doc(db, 'users', firebaseUser.uid);
                snapshotUnsubscribe = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const u = normalizeUser(docSnap.data());
                        setUser(u);
                        try {
                            localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
                        } catch {}
                    }
                }, (err) => {
                    console.error("Firestore onSnapshot error:", err);
                });
            } else {
                setUser(null);
                try {
                    localStorage.removeItem(STORAGE_KEY);
                } catch {}
            }
            setLoading(false);
        });

        return () => {
            unsubscribe();
            if (snapshotUnsubscribe) {
                snapshotUnsubscribe();
            }
        };
    }, []);

    const saveUser = (u: User) => {
        const normalized = normalizeUser(u);
        setUser(normalized);
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        } catch {}
        if (auth.currentUser) {
            setDoc(doc(db, 'users', normalized.id), normalized, { merge: true }).catch(console.error);
        }
    };

    const syncUserFromFirestore = async (uid: string, email: string, name: string) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                saveUser(normalizeUser(userSnap.data()));
            } else {
                const newUser: User = {
                    id: uid,
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
                await setDoc(userRef, newUser);
                saveUser(newUser);
            }
        } catch (err) {
            console.error("Error syncing user from Firestore:", err);
        }
    };

    const login = async (email: string, password: string) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        await syncUserFromFirestore(userCredential.user.uid, userCredential.user.email || email, userCredential.user.displayName || email.split('@')[0]);
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);
        await syncUserFromFirestore(userCredential.user.uid, userCredential.user.email || '', userCredential.user.displayName || 'Google User');
    };

    const signup = async (email: string, password: string, name: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await syncUserFromFirestore(userCredential.user.uid, email, name);
    };

    const logout = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (err) {
            console.error("Logout error:", err);
        }
        setUser(null);
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {}
    };

    const addXP = (amount: number) => {
        if (!user) return;
        const newXP = user.xp + amount;
        const calculatedLevel = Math.floor(newXP / 100) + 1;
        
        if (calculatedLevel > user.level) {
            setNewLevel(calculatedLevel);
            setShowLevelUpModal(true);
        }
        
        const updated = { ...user, xp: newXP, level: calculatedLevel };
        saveUser(updated);
    };

    const incrementStreak = () => {
        if (!user) return;
        const newStreak = user.streak + 1;
        const achievements = new Set(user.achievements || []);
        
        if (newStreak >= 3) achievements.add('streak-3');
        if (newStreak >= 7) achievements.add('streak-7');
        if (newStreak >= 30) achievements.add('streak-30');

        const updated = { ...user, streak: newStreak, achievements: Array.from(achievements) };
        saveUser(updated);
    };

    const addAchievement = (id: string) => {
        if (!user || user.achievements?.includes(id)) return;
        const updated = { ...user, achievements: [...(user.achievements || []), id] };
        saveUser(updated);
    };

    const toggleFavorite = (wordId: string) => {
        if (!user) return;
        const currentFavorites = user.favorites || [];
        const favorites = currentFavorites.includes(wordId)
            ? currentFavorites.filter(f => f !== wordId)
            : [...currentFavorites, wordId];
        const updated = { ...user, favorites };
        saveUser(updated);
    };

    const markWordLearned = (wordId: string) => {
        if (!user) return;
        const currentLearned = user.learnedWords || [];
        if (currentLearned.includes(wordId)) return;

        const newLearned = [...currentLearned, wordId];
        const achievements = new Set(user.achievements || []);

        if (newLearned.length >= 1) achievements.add('first-word');
        if (newLearned.length >= 10) achievements.add('ten-words');
        if (newLearned.length >= 50) achievements.add('fifty-words');
        if (newLearned.length >= 100) achievements.add('hundred-words');

        const updated = { ...user, learnedWords: newLearned, achievements: Array.from(achievements) };
        saveUser(updated);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, loginWithGoogle, signup, logout, addXP, incrementStreak, addAchievement, toggleFavorite, markWordLearned }}>
            {children}
            <LevelUpModal isOpen={showLevelUpModal} level={newLevel} onClose={() => setShowLevelUpModal(false)} />
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
