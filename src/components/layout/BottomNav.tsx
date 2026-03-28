'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Target, User } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    const navItems = [
        { href: '/', label: 'Home', icon: Home },
        { href: '/vocabulary', label: 'Learn', icon: BookOpen },
        { href: '/practice', label: 'Practice', icon: Target },
        { href: '/profile', label: 'Profile', icon: User },
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-auto z-50 md:hidden pointer-events-none">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-full shadow-2xl shadow-blue-900/10 pointer-events-auto px-4 py-2">
                <div className="flex justify-around items-center h-14 gap-2">
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
                                className={`relative flex flex-col items-center justify-center w-14 h-full rounded-full transition-all duration-300 active:scale-90 active:bg-blue-50/50 dark:active:bg-blue-900/10 ${active
                                    ? 'text-blue-600 dark:text-blue-400'
                                    : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                                    }`}
                            >
                                {active && (
                                    <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-full -z-10 animate-fadeIn" />
                                )}
                                <Icon className={`w-5 h-5 mb-1 transition-transform duration-300 ${active ? 'scale-110' : ''}`} strokeWidth={active ? 2.5 : 2} />
                                <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
