'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
    { href: '/vocabulary', label: 'Vocabulary' },
    { href: '/grammar', label: 'Grammar' },
    { href: '/sentences', label: 'Sentences' },
    { href: '/sentence-builder', label: 'Builder' },
    { href: '/practice', label: 'Practice' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [theme, setTheme] = useState('light'); // Default to light
    const { user } = useAuth();

    useEffect(() => {
        const saved = localStorage.getItem('theme') || 'light';
        setTheme(saved);
        document.documentElement.setAttribute('data-theme', saved);

        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg shadow-blue-500/20">DE</div>
                        <span className="text-lg md:text-xl font-bold text-slate-800 dark:text-white hidden sm:block font-poppins">German Shikhi</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-poppins">{link.label}</Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <button onClick={toggleTheme} className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-600 dark:text-slate-300" aria-label="Toggle theme">
                            {theme === 'dark' ? <span>☀️</span> : <span>🌙</span>}
                        </button>

                        {user ? (
                            <Link href="/profile" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-light)] flex items-center justify-center text-white text-xs font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{user.name}</span>
                            </Link>
                        ) : (
                            <Link href="/login" className="px-5 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--primary-dark)] transition-all shadow-lg shadow-blue-500/20 font-poppins">Login</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
