'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Sun, Moon, Flame, Zap, User } from 'lucide-react';

const navLinks = [
    { href: '/vocabulary', label: 'Vocabulary' },
    { href: '/grammar', label: 'Grammar' },
    { href: '/sentences', label: 'Sentences' },
    { href: '/sentence-builder', label: 'Builder' },
    { href: '/practice', label: 'Practice' },
    { href: '/leaderboard', label: 'Leaderboard' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const [theme, setTheme] = useState('light');
    const lastScrollY = useRef(0);
    const scrollTimer = useRef<NodeJS.Timeout | null>(null);
    const { user } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        const saved = localStorage.getItem('theme') || 'light';
        setTheme(saved);
        if (saved === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        const handleScroll = () => {
            const currentY = window.scrollY;
            setIsScrolled(currentY > 20);

            // Always show at top of page
            if (currentY <= 20) {
                setIsHeaderVisible(true);
            } else if (currentY > lastScrollY.current && currentY > 60) {
                // Scrolling DOWN past threshold -> hide
                setIsHeaderVisible(false);
            } else if (currentY < lastScrollY.current) {
                // Scrolling UP -> show
                setIsHeaderVisible(true);
            }

            lastScrollY.current = currentY;

            // Idle timer: reappear when scrolling stops
            if (scrollTimer.current) clearTimeout(scrollTimer.current);
            scrollTimer.current = setTimeout(() => {
                setIsHeaderVisible(true);
            }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimer.current) clearTimeout(scrollTimer.current);
        };
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${isScrolled ? 'py-2 md:py-3' : 'py-4 md:py-6'} ${isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className={`flex items-center justify-between transition-all duration-500 rounded-[2rem] px-4 md:px-6 h-16 md:h-20 ${isScrolled
                    ? 'bg-white/60 dark:bg-slate-900/60 backdrop-blur-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-white/50 dark:border-slate-800/50'
                    : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none border border-slate-200/50 dark:border-slate-800/50 md:border-transparent md:dark:border-transparent'
                    }`}>

                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-3 relative group">
                        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/20 z-0"></div>
                            <Image
                                src="/logo.png"
                                alt="Banglay German Logo"
                                fill
                                className="object-cover relative z-10"
                            />
                        </div>
                        <span className={`text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white font-poppins tracking-tight flex items-center transition-all duration-700 ease-in-out overflow-hidden whitespace-nowrap ${isScrolled ? 'max-w-0 opacity-0 md:max-w-[200px] md:opacity-100 md:gap-1.5' : 'max-w-[300px] opacity-100 gap-1.5'}`}>
                            Banglay<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">German</span>
                        </span>
                    </Link>

                    {/* Central Navigation (Desktop) */}
                    <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-2xl backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 shadow-inner">
                        {navLinks.map(link => {
                            const isActive = pathname?.startsWith(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 font-poppins overflow-hidden ${isActive
                                        ? 'text-blue-700 dark:text-blue-300 bg-white dark:bg-slate-700 shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions Area */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-700/50 shadow-sm"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* User / Login */}
                        {user ? (
                            <Link href="/profile" className="hidden lg:flex items-center gap-4 pl-4 pr-2 py-1.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all group">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="flex items-center gap-1 text-orange-500 font-bold bg-orange-50 dark:bg-orange-900/20 px-2 py-1 rounded-lg" title="Day Streak">
                                        <Flame className="w-4 h-4" />
                                        <span>{user.streak}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg" title="Total XP">
                                        <Zap className="w-4 h-4 text-yellow-500" />
                                        <span>{user.xp}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-3">
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 hidden xl:block">{(user?.name || 'User').split(' ')[0]}</span>
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform">
                                        <User className="w-5 h-5" />
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <Link href="/login" className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-900/20 dark:shadow-white/20 font-poppins relative overflow-hidden group">
                                <span className="relative z-10">Log in</span>
                                <div className="absolute inset-0 bg-blue-600 dark:bg-slate-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                                <span className="relative z-10 hidden group-hover:inline ml-1">→</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
