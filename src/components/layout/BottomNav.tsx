'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Target, User, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    const navItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/vocabulary', label: 'Learn', icon: BookOpen },
        { href: '/practice', label: 'Practice', icon: Target },
        { href: '/leaderboard', label: 'Top', icon: Trophy },
        { href: '/profile', label: 'Profile', icon: User },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[98vw] max-w-[400px] z-50 md:hidden pointer-events-none will-change-transform px-2">
            <div className="bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-full shadow-2xl shadow-blue-900/10 pointer-events-auto px-2 sm:px-4 py-2 w-full">
                <div className="flex justify-around items-center h-14 gap-1 sm:gap-3">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => {
                                    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
                                        window.navigator.vibrate(30);
                                    }
                                }}
                                className={`relative flex flex-col items-center justify-center w-14 h-full rounded-full transition-colors duration-300 ${active
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                                    }`}
                            >
                                <Icon className={`w-[22px] h-[22px] mb-1 transition-transform duration-300 ${active ? 'scale-110 -translate-y-0.5' : ''}`} strokeWidth={active ? 2.5 : 2} />
                                <span className={`text-[11px] font-semibold tracking-wide transition-all ${active ? 'opacity-100' : 'opacity-70'}`}>{item.label}</span>
                                
                                {active && (
                                    <motion.div
                                        layoutId="activeTabBadge"
                                        className="absolute -bottom-1 w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
