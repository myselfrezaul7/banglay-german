'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
    const searchParams = useSearchParams();
    const [isSignup, setIsSignup] = useState(false);
    
    useEffect(() => {
        if (searchParams.get('action') === 'signup') {
            setIsSignup(true);
        }
    }, [searchParams]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login, loginWithGoogle, signup } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            if (isSignup) {
                await signup(email, password, name);
            } else {
                await login(email, password);
            }
            router.push('/profile');
        } catch {
            setError('Authentication failed. Please try again.');
        }
    };

    const handleGoogle = async () => {
        try {
            await loginWithGoogle();
            router.push('/profile');
        } catch (err: any) {
            console.error("Google login error:", err);
            setError(`Google login failed: ${err.message || err.code || 'Unknown error'}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

            <ScrollReveal direction="up" duration={0.8} className="w-full max-w-md relative z-10">
                <div className="glass-panel p-8 md:p-10">
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">বG</div>
                            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 font-poppins tracking-tight">Banglay German</h1>
                        </Link>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isSignup ? 'signup-title' : 'login-title'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{isSignup ? 'Create your account' : 'Welcome back'}</h2>
                                <p className="text-slate-500 font-bengali text-sm">{isSignup ? 'নতুন অ্যাকাউন্ট তৈরি করে শিখতে শুরু করুন' : 'আপনার অ্যাকাউন্টে লগইন করে চালিয়ে যান'}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <ScrollReveal delay={0.1} direction="up">
                        {error && (
                            <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-medium flex items-center gap-2">
                                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {error}
                            </div>
                        )}

                        <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-[1.25rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 mb-6 group active:scale-[0.98] shadow-sm hover:shadow-md">
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                            <span className="font-semibold text-slate-700 dark:text-slate-200">Continue with Google</span>
                        </button>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">or sign in with email</span>
                            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800"></div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {isSignup && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: -10 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -10 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-1">
                                            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required
                                                className="w-full px-4 py-4 rounded-[1.25rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400" />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div layout>
                                <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required
                                    className="w-full px-4 py-4 rounded-[1.25rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400" />
                            </motion.div>
                            <motion.div layout>
                                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
                                    className="w-full px-4 py-4 rounded-[1.25rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-slate-900 dark:text-white placeholder:text-slate-400" />
                            </motion.div>

                            <motion.div layout className="pt-2">
                                <button type="submit" className="w-full px-4 py-4 rounded-[1.25rem] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 active:scale-[0.97]">
                                    {isSignup ? 'Create Account' : 'Sign In'}
                                </button>
                            </motion.div>
                        </form>

                        <p className="text-center mt-8 text-base font-medium text-slate-500 dark:text-slate-400">
                            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button type="button" onClick={() => setIsSignup(!isSignup)} className="inline-block p-2 -m-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold hover:underline transition-colors">
                                {isSignup ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </ScrollReveal>
                </div>
            </ScrollReveal>
        </div>
    );
}
