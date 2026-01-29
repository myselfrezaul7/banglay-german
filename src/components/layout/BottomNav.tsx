'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

    const navItems = [
        { href: '/', label: 'Home', icon: '🏠' },
        { href: '/vocabulary', label: 'Learn', icon: '📚' },
        { href: '/practice', label: 'Practice', icon: '🎯' },
        { href: '/profile', label: 'Profile', icon: '👤' },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe md:hidden z-50 transition-colors duration-300">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${isActive(item.href)
                                ? 'text-blue-500 font-semibold'
                                : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'
                            }`}
                    >
                        <span className="text-xl mb-1">{item.icon}</span>
                        <span className="text-[10px] uppercase tracking-wide">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
