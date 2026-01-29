'use client';

import { useEffect } from 'react';

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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Something went wrong!</h2>
            <p className="mb-8 text-slate-600 dark:text-slate-400">We apologize for the inconvenience.</p>
            <button
                onClick={() => reset()}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
