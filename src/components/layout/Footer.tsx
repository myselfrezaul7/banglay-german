import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 pt-20 pb-12 overflow-hidden relative">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
                    <div className="col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6 group inline-flex">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">বG</div>
                            <div>
                                <div className="font-extrabold text-xl font-poppins text-slate-900 dark:text-white tracking-tight">Banglay German</div>
                                <div className="text-sm font-bengali text-slate-500 dark:text-slate-400">বাংলায় জার্মান</div>
                            </div>
                        </Link>
                        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">
                            Master the German language through intuitive lessons, practical vocabulary, and native Bengali translations.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-wider text-sm font-poppins">Learn</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/vocabulary" className="group text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Vocabulary</span></Link></li>
                            <li><Link href="/grammar" className="group text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Grammar</span></Link></li>
                            <li><Link href="/sentences" className="group text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Sentences</span></Link></li>
                            <li><Link href="/sentence-builder" className="group text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Sentence Builder</span></Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-wider text-sm font-poppins">Practice</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/practice" className="group text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Speed Quiz</span></Link></li>
                            <li><Link href="/progress" className="group text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Progress</span></Link></li>
                            <li><Link href="/profile" className="group text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Profile</span></Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold mb-6 text-slate-900 dark:text-white uppercase tracking-wider text-sm font-poppins">Levels</h3>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/vocabulary/a1" className="group text-emerald-600/80 dark:text-emerald-500/80 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors inline-block"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1">A1 - Beginner</span></Link></li>
                            <li><Link href="/vocabulary/a2" className="group text-blue-600/80 dark:text-blue-500/80 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1">A2 - Elementary</span></Link></li>
                            <li><Link href="/vocabulary/b1" className="group text-orange-600/80 dark:text-orange-500/80 hover:text-orange-600 dark:hover:text-orange-400 transition-colors inline-block"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1">B1 - Intermediate</span></Link></li>
                            <li><Link href="/vocabulary/b2" className="group text-pink-600/80 dark:text-pink-500/80 hover:text-pink-600 dark:hover:text-pink-400 transition-colors inline-block"><span className="inline-block transition-transform duration-300 group-hover:translate-x-1">B2 - Upper Int.</span></Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200/50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
                    <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                        &copy; {new Date().getFullYear()} <span className="text-slate-900 dark:text-white">Banglay German</span>. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
