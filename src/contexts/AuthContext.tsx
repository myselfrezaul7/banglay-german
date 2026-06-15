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

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [showLevelUpModal, setShowLevelUpModal] = useState(false);
    const [newLevel, setNewLevel] = useState(1);

    const STORAGE_KEY = 'banglay-german-storage';

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setUser(JSON.parse(saved));
        }

        let snapshotUnsubscribe: (() => void) | undefined;

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Attach real-time listener to sync XP, streak, etc. across tabs/devices
                const userRef = doc(db, 'users', firebaseUser.uid);
                snapshotUnsubscribe = onSnapshot(userRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const u = docSnap.data() as User;
                        setUser(u);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
                    }
                });
            } else {
                // User is signed out of Firebase
                setUser(null);
                localStorage.removeItem(STORAGE_KEY);
                if (snapshotUnsubscribe) {
                    snapshotUnsubscribe();
                }
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
        // Optimistic UI update
        setUser(u);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        if (auth.currentUser) {
            setDoc(doc(db, 'users', u.id), u, { merge: true }).catch(console.error);
        }
    };

    const syncUserFromFirestore = async (uid: string, email: string, name: string) => {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            saveUser(userSnap.data() as User);
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
        await firebaseSignOut(auth);
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    const addXP = (amount: number) => {
        if (!user) return;
        const newXP = user.xp + amount;
        const calculatedLevel = Math.floor(newXP / 100) + 1;
        
        if (calculatedLevel > user.level) {
            setNewLevel(calculatedLevel);
            setShowLevelUpModal(true);
        }
        
        saveUser({ ...user, xp: newXP, level: calculatedLevel });
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
            <LevelUpModal isOpen={showLevelUpModal} level={newLevel} onClose={() => setShowLevelUpModal(false)} />
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};
