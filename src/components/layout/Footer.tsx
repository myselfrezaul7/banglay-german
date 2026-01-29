import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent-gold)] flex items-center justify-center text-white font-bold">DE</div>
                            <div>
                                <div className="font-bold">German Shikhi</div>
                                <div className="text-xs font-bengali text-[var(--text-muted)]">জার্মান শিখি</div>
                            </div>
                        </Link>
                        <p className="text-sm text-[var(--text-secondary)]">Learn German with English explanations and Bangla translations.</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Learn</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/vocabulary" className="text-[var(--text-secondary)] hover:text-[var(--primary)]">Vocabulary</Link></li>
                            <li><Link href="/grammar" className="text-[var(--text-secondary)] hover:text-[var(--primary)]">Grammar</Link></li>
                            <li><Link href="/sentences" className="text-[var(--text-secondary)] hover:text-[var(--primary)]">Sentences</Link></li>
                            <li><Link href="/sentence-builder" className="text-[var(--text-secondary)] hover:text-[var(--primary)]">Sentence Builder</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Practice</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/practice" className="text-[var(--text-secondary)] hover:text-[var(--primary)]">Quiz</Link></li>
                            <li><Link href="/progress" className="text-[var(--text-secondary)] hover:text-[var(--primary)]">Progress</Link></li>
                            <li><Link href="/profile" className="text-[var(--text-secondary)] hover:text-[var(--primary)]">Profile</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Levels</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/vocabulary/a1" className="text-[var(--text-secondary)] hover:text-[var(--level-a1)]">A1 - Beginner</Link></li>
                            <li><Link href="/vocabulary/a2" className="text-[var(--text-secondary)] hover:text-[var(--level-a2)]">A2 - Elementary</Link></li>
                            <li><Link href="/vocabulary/b1" className="text-[var(--text-secondary)] hover:text-[var(--level-b1)]">B1 - Intermediate</Link></li>
                            <li><Link href="/vocabulary/b2" className="text-[var(--text-secondary)] hover:text-[var(--level-b2)]">B2 - Upper Int.</Link></li>
                            <li className="text-[var(--text-muted)]">C1 & C2 - Coming Soon</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-800 mt-8 pt-8">
                    <div className="text-center text-slate-500 dark:text-slate-400 text-sm font-medium">
                        &copy; 2026 Banglay German. All right reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
