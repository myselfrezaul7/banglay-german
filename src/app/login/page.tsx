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
        <div className="min-h-screen flex items-center justify-center px-4 py-12">
            <div className="glass-card p-6 md:p-8 w-full max-w-md">
                <div className="text-center mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent-gold)] flex items-center justify-center text-white font-bold">DE</div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">Banglay German</h1>
                    </Link>
                    <h1 className="text-2xl font-bold">{isSignup ? 'Create Account' : 'Welcome Back'}</h1>
                    <p className="text-[var(--text-secondary)] font-bengali">{isSignup ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'আবার স্বাগতম'}</p>
                </div>

                {error && <div className="mb-4 p-3 rounded-lg bg-[var(--error)] bg-opacity-20 text-[var(--error)] text-sm">{error}</div>}

                <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 p-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)] transition-all mb-4">
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    <span>Continue with Google</span>
                </button>

                <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 h-px bg-[var(--border-color)]"></div>
                    <span className="text-sm text-[var(--text-muted)]">or</span>
                    <div className="flex-1 h-px bg-[var(--border-color)]"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {isSignup && (
                        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required
                            className="w-full p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--primary)] outline-none" />
                    )}
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required
                        className="w-full p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--primary)] outline-none" />
                    <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required
                        className="w-full p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--primary)] outline-none" />
                    <button type="submit" className="w-full btn-primary py-3 justify-center">
                        {isSignup ? 'Sign Up' : 'Log In'}
                    </button>
                </form>

                <p className="text-center mt-6 text-sm text-[var(--text-secondary)]">
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button onClick={() => setIsSignup(!isSignup)} className="text-[var(--primary)] hover:underline">
                        {isSignup ? 'Log In' : 'Sign Up'}
                    </button>
                </p>
            </div>
        </div>
    );
}
