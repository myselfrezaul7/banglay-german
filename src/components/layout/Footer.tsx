import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">বG</div>
                            <div>
                                <div className="font-bold text-slate-900 dark:text-white">Banglay German</div>
                                <div className="text-xs font-bengali text-slate-500 dark:text-slate-400">বাংলায় জার্মান</div>
                            </div>
                        </Link>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Learn German with English explanations and Bangla translations.</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Learn</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/vocabulary" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Vocabulary</Link></li>
                            <li><Link href="/grammar" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Grammar</Link></li>
                            <li><Link href="/sentences" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sentences</Link></li>
                            <li><Link href="/sentence-builder" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sentence Builder</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Practice</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/practice" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Quiz</Link></li>
                            <li><Link href="/progress" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Progress</Link></li>
                            <li><Link href="/profile" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Profile</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">Levels</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/vocabulary/a1" className="text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">A1 - Beginner</Link></li>
                            <li><Link href="/vocabulary/a2" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">A2 - Elementary</Link></li>
                            <li><Link href="/vocabulary/b1" className="text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">B1 - Intermediate</Link></li>
                            <li><Link href="/vocabulary/b2" className="text-slate-600 dark:text-slate-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors">B2 - Upper Int.</Link></li>
                            <li className="text-slate-400 dark:text-slate-500">C1 & C2 - Coming Soon</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8">
                    <div className="text-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                        &copy; 2026 Banglay German. All right reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
