'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/animations/ScrollReveal';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
            <ScrollReveal direction="up" delay={0.1}>
                <div>
                    <div className="text-6xl mb-6">⚠️</div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">কিছু একটা সমস্যা হয়েছে!</h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">Something went wrong.</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mb-8 max-w-md mx-auto">
                        আমরা এই বিষয়ে অবগত এবং সমাধান করার চেষ্টা করছি।
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => reset()}
                            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors hover-lift"
                        >
                            আবার চেষ্টা করুন
                        </button>
                        <Link
                            href="/"
                            className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
                        >
                            হোম পেজে যান
                        </Link>
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
}
