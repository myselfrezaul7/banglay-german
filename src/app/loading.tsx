export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="relative w-16 h-16">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>
                {/* Spinning part */}
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
            </div>
            <p className="mt-6 text-slate-500 dark:text-slate-400 animate-pulseSubtle font-bengali">
                লোড হচ্ছে...
            </p>
        </div>
    );
}
