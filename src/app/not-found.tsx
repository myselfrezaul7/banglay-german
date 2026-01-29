import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">404</h2>
            <p className="text-xl md:text-2xl mb-8">Page Not Found</p>
            <p className="mb-8 text-slate-600 dark:text-slate-400">Could not find requested resource</p>
            <Link href="/" className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
                Return Home
            </Link>
        </div>
    );
}
