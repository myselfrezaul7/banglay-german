'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const [isSignup, setIsSignup] = useState(false);
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
        } catch {
            setError('Google login failed. Please use manual email/password instead.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-slate-950 px-4 py-12">

            {/* Ambient Background Blur */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulseSubtle"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulseSubtle" style={{ animationDelay: '1s' }}></div>

            <div className="w-full max-w-[420px] relative z-10 animate-fadeInUp">

                {/* Logo & Header Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex flex-col items-center group">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-xl shadow-blue-500/30 mb-4 group-hover:scale-110 transition-transform duration-500">
                            বG
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-poppins tracking-tight mb-1">
                            {isSignup ? 'Join Banglay German' : 'Welcome back'}
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            {isSignup ? 'Start your language learning journey today.' : 'Please enter your details to sign in.'}
                        </p>
                    </Link>
                </div>

                {/* Glassmorphic Auth Card */}
                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border border-white/50 dark:border-slate-800/50 rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">

                    {/* Subtle internal glow */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-3 animate-fadeIn">
                            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                        {isSignup && (
                            <div className="relative group">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder=" "
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                    className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                />
                                <label htmlFor="name" className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 pointer-events-none">
                                    Full Name
                                </label>
                            </div>
                        )}

                        <div className="relative group">
                            <input
                                type="email"
                                id="email"
                                placeholder=" "
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                            />
                            <label htmlFor="email" className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 pointer-events-none">
                                Email Address
                            </label>
                        </div>

                        <div className="relative group">
                            <input
                                type="password"
                                id="password"
                                placeholder=" "
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                className="peer w-full px-4 pt-6 pb-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                            />
                            <label htmlFor="password" className="absolute text-sm text-slate-500 dark:text-slate-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-600 dark:peer-focus:text-blue-400 pointer-events-none">
                                Password
                            </label>
                        </div>

                        {!isSignup && (
                            <div className="flex justify-end pt-1">
                                <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">Forgot password?</a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full relative group overflow-hidden bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3.5 rounded-xl font-bold transition-all active:scale-[0.98] mt-4 shadow-xl shadow-slate-900/20 dark:shadow-white/10"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isSignup ? 'Create Account' : 'Sign In'}
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {/* In dark mode, change the hover gradient to something lighter so text remains readable if white */}
                            <div className="absolute inset-0 bg-blue-50 dark:bg-slate-200 opacity-0 group-hover:opacity-100 dark:text-slate-900 transition-opacity duration-300"></div>
                        </button>
                    </form>

                    <div className="relative flex items-center py-4 mb-2">
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                        <span className="flex-shrink-0 mx-4 text-xs font-medium text-slate-400 uppercase tracking-widest">Or continue with</span>
                        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                    </div>

                    <button
                        onClick={handleGoogle}
                        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all active:scale-[0.98] shadow-sm"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                        <span>Google</span>
                    </button>
                </div>

                <p className="text-center mt-8 text-sm font-medium text-slate-600 dark:text-slate-400">
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setError('');
                        }}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-all font-bold"
                    >
                        {isSignup ? 'Sign In' : 'Sign Up'}
                    </button>
                    {isSignup && <span className="block mt-2 text-xs font-normal text-slate-400">By organizing an account, you agree to the Terms of Service.</span>}
                </p>

            </div>
        </div>
    );
}
