'use client';

import { useState, useEffect } from 'react';

interface GrammarGuide {
    id: string;
    level: 'a1' | 'a2' | 'b1' | 'b2';
    title: string;
    titleBn: string;
    description: string;
    structure?: string;
    points: string[];
    tip?: string;
    examples: { german: string; english: string; bangla: string }[];
}

const grammarGuides: GrammarGuide[] = [
    // A1 Level
    {
        id: 'a1-1',
        level: 'a1',
        title: 'The Present Tense (Präsens)',
        titleBn: 'বর্তমান কাল',
        description: 'Used to talk about facts, present actions, and the future.',
        structure: 'Stem + Ending (e, st, t, en, t, en)',
        points: [
            'Verbs change based on the person (I, you, he/she).',
            'Remove "-en" from the infinitive to get the stem.',
            'Add endings: ich -e, du -st, er/sie -t, wir -en, ihr -t, sie -en.'
        ],
        tip: 'Think of the endings as a rhyme: "e-st-t-en-t-en".',
        examples: [
            { german: 'Ich lerne Deutsch.', english: 'I am learning German.', bangla: 'আমি জার্মান শিখছি।' },
            { german: 'Du wohnst hier.', english: 'You live here.', bangla: 'আপনি এখানে থাকেন।' },
        ]
    },
    {
        id: 'a1-2',
        level: 'a1',
        title: 'Articles (Der, Die, Das)',
        titleBn: 'আর্টিকেল (লিঙ্গ)',
        description: 'Everything in German has a gender: Masculine, Feminine, or Neuter.',
        structure: 'Der (M) | Die (F) | Das (N) | Die (Plural)',
        points: [
            'Masculine nouns use "Der" (e.g., Mann).',
            'Feminine nouns use "Die" (e.g., Frau).',
            'Neuter nouns use "Das" (e.g., Kind).',
            'ALL plurals use "Die".'
        ],
        tip: 'Always learn the article together with the noun! Not just "Tisch", but "der Tisch".',
        examples: [
            { german: 'Der Tisch ist groß.', english: 'The table is big.', bangla: 'টেবিলটি বড়।' },
            { german: 'Das Mädchen spielt.', english: 'The girl is playing.', bangla: 'মেয়েটি খেলছে।' },
        ]
    },
    {
        id: 'a1-3',
        level: 'a1',
        title: 'Word Order (V2 Rule)',
        titleBn: 'বাক্য গঠন (দ্বিতীয় অবস্থান)',
        description: 'The golden rule of German sentences.',
        structure: 'Subject/Time + Verb + Object',
        points: [
            'In a normal statement, the verb MUST be in position 2.',
            'The subject often comes first, but time can also come first.',
            'If you start with time ("Heute"), the verb stays 2nd, and subject moves to 3rd.'
        ],
        examples: [
            { german: 'Ich gehe heute ins Kino.', english: 'I go to cinema today.', bangla: 'আমি আজ সিনেমা হলে যাচ্ছি।' },
            { german: 'Heute gehe ich ins Kino.', english: 'Today I go to cinema.', bangla: 'আজকে আমি সিনেমা হলে যাচ্ছি।' },
        ]
    },

    // A2 Level
    {
        id: 'a2-1',
        level: 'a2',
        title: 'Perfect Tense (Das Perfekt)',
        titleBn: 'অতীত কাল (কথ্য)',
        description: 'The most common way to speak about the past.',
        structure: 'Haben/Sein (Position 2) + ... + Participle (End)',
        points: [
            'Use "haben" for most verbs.',
            'Use "sein" for movement (gehen, fahren) or change of state.',
            'The main verb becomes a participle (ge-___-t/en) and goes to the VERY END.'
        ],
        tip: 'Imagine a clamp structure. Helper verb sends the main verb to the end!',
        examples: [
            { german: 'Ich habe einen Apfel gegessen.', english: 'I ate an apple.', bangla: 'আমি একটি আপেল খেয়েছি।' },
            { german: 'Er ist nach Berlin gefahren.', english: 'He drove to Berlin.', bangla: 'সে বার্লিন গিয়েছে।' },
        ]
    },
    {
        id: 'a2-2',
        level: 'a2',
        title: 'Modal Verbs',
        titleBn: 'মোডাল ক্রিয়া',
        description: 'Verbs that express ability, permission, or necessity.',
        structure: 'Modal Verb (Pos 2) + ... + Infinitive (End)',
        points: [
            'können (can), müssen (must), dürfen (allowed to), wollen (want).',
            'Conjugate the modal verb.',
            'Put the real action verb at the end in its original form.'
        ],
        examples: [
            { german: 'Ich kann gut schwimmen.', english: 'I can swim well.', bangla: 'আমি ভালো সাঁতার কাটতে পারি।' },
            { german: 'Wir müssen lernen.', english: 'We must learn.', bangla: 'আমাদের শিখতে হবে।' },
        ]
    },

    // B1 Level
    {
        id: 'b1-1',
        level: 'b1',
        title: 'Subordinate Clauses (Nebensätze)',
        titleBn: 'অধীন বাক্য',
        description: 'Sentences connected by words like "weil" or "dass".',
        structure: 'Connector + Subject + ... + Verb (End)',
        points: [
            'Words like weil (because), dass (that), wenn (if) are "Kickers".',
            'They kick the verb to the very end of the sentence.',
        ],
        tip: 'Normal: "Ich bin müde." With Weil: "..., weil ich müde BIN."',
        examples: [
            { german: 'Ich lerne, weil es Spaß macht.', english: 'I learn because it is fun.', bangla: 'আমি শিখি কারণ এটা মজার।' },
            { german: 'Er sagt, dass er kommt.', english: 'He says that he is coming.', bangla: 'সে বলছে যে সে আসছে।' },
        ]
    },
    {
        id: 'b1-2',
        level: 'b1',
        title: 'Passive Voice',
        titleBn: 'কর্মবাচ্য',
        description: 'Focusing on the action, not the person doing it.',
        structure: 'Werden + Participle',
        points: [
            'Use "werden" (to become) as the helper verb.',
            'The main verb becomes a participle at the end.',
        ],
        examples: [
            { german: 'Das Auto wird repariert.', english: 'The car is being repaired.', bangla: 'গাড়িটি মেরামত করা হচ্ছে।' },
            { german: 'Der Brief wurde geschrieben.', english: 'The letter was written.', bangla: 'চিঠিটি লেখা হয়েছিল।' },
        ]
    },

    // B2 Level
    {
        id: 'b2-1',
        level: 'b2',
        title: 'Genitive Case',
        titleBn: 'জেনিটিভ (সম্বন্ধ পদ)',
        description: 'Showing possession or "of" relationships.',
        structure: 'Noun + Article (des/der) + Noun (+s/es)',
        points: [
            'Masculine/Neuter nouns take "des" and add "-s" to the noun.',
            'Feminine/Plural nouns take "der" (no noun change).',
            'Used often in formal writing instead of "von".'
        ],
        examples: [
            { german: 'Das Auto des Vaters.', english: 'The father\'s car.', bangla: 'বাবার গাড়ি।' },
            { german: 'Die Farbe der Blume.', english: 'The color of the flower.', bangla: 'ফুলের রং।' },
        ]
    },
    {
        id: 'b2-2',
        level: 'b2',
        title: 'Relative Clauses',
        titleBn: 'সম্পর্কসূচক বাক্য',
        description: 'Adding more detail to a noun using a sub-sentence.',
        structure: 'Noun, + Relative Pronoun + ... + Verb (End)',
        points: [
            'The relative pronoun (der/die/das) matches the gender of the noun.',
            'The case depends on its role in the OWN clause.',
            'Verb goes to the end.'
        ],
        examples: [
            { german: 'Der Mann, der dort steht, ist mein Freund.', english: 'The man who stands there is my friend.', bangla: 'যে লোকটি সেখানে দাঁড়িয়ে, সে আমার বন্ধু।' },
        ]
    }
];

export default function GrammarPage() {
    const [mounted, setMounted] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<string>('all');
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    useEffect(() => { setMounted(true); }, []);

    const toggleExpand = (id: string) => {
        const newSet = new Set(expandedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setExpandedIds(newSet);
    };

    const filtered = selectedLevel === 'all' ? grammarGuides : grammarGuides.filter(r => r.level === selectedLevel);

    if (!mounted) return null;

    return (
        <div className="min-h-screen pb-20 page-transition bg-slate-50 dark:bg-slate-950">
            {/* Header */}
            <section className="pt-24 pb-12 px-6 text-center max-w-4xl mx-auto">
                <div className="inline-block mb-3 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-bold tracking-widest uppercase">
                    Study Guide
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">German Grammar Rules</h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                    Simplified guides to master the structure of the language. <br />
                    <span className="font-bengali text-slate-500">সহজ এবং বিস্তারিত ব্যাকরণ গাইড</span>
                </p>
            </section>

            {/* Filter */}
            <section className="sticky top-20 z-30 bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-sm py-4 border-b border-slate-200 dark:border-slate-800 mb-8">
                <div className="flex justify-center gap-2 px-4 flex-wrap">
                    {['all', 'a1', 'a2', 'b1', 'b2'].map(level => (
                        <button
                            key={level}
                            onClick={() => setSelectedLevel(level)}
                            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedLevel === level
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                                }`}
                        >
                            {level.toUpperCase()}
                        </button>
                    ))}
                </div>
            </section>

            {/* Content Grid */}
            <div className="max-w-3xl mx-auto px-4 space-y-6">
                {filtered.map(guide => {
                    const isExpanded = expandedIds.has(guide.id);
                    return (
                        <div key={guide.id} className="clean-card overflow-hidden group border-l-4"
                            style={{ borderLeftColor: `var(--level-${guide.level})` }}>

                            {/* Summary / Header (Always Visible) */}
                            <button
                                onClick={() => toggleExpand(guide.id)}
                                className="w-full text-left p-6 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-widest border border-slate-200 dark:border-slate-700`}>
                                            Level {guide.level.toUpperCase()}
                                        </span>
                                        {isExpanded && <span className="text-xs text-blue-500 font-bold">Read Guide</span>}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-blue-600 transition-colors">{guide.title}</h3>
                                    <p className="font-bengali text-slate-500 dark:text-slate-400 text-sm">{guide.titleBn}</p>
                                </div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 transition-transform duration-300 ${isExpanded ? 'rotate-180 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : ''}`}>
                                    ▼
                                </div>
                            </button>

                            {/* Expanded Content (The Guide) */}
                            {isExpanded && (
                                <div className="px-6 pb-8 animate-slideUp">
                                    <hr className="border-slate-100 dark:border-slate-800 mb-6" />

                                    {/* Description */}
                                    <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                                        {guide.description}
                                    </p>

                                    {/* Structure / Formula */}
                                    {guide.structure && (
                                        <div className="mb-6 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                                            <div className="text-xs uppercase font-bold text-blue-500 mb-2 tracking-widest">📐 Formula</div>
                                            <code className="text-lg font-mono font-bold text-blue-700 dark:text-blue-300">{guide.structure}</code>
                                        </div>
                                    )}

                                    {/* Key Points */}
                                    <div className="mb-6 space-y-3">
                                        <div className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-1">How it works</div>
                                        {guide.points.map((point, idx) => (
                                            <div key={idx} className="flex gap-3">
                                                <span className="text-green-500 font-bold">✓</span>
                                                <span className="text-slate-600 dark:text-slate-300">{point}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Pro Tip */}
                                    {guide.tip && (
                                        <div className="mb-8 flex gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-100 dark:border-yellow-800">
                                            <span className="text-2xl">💡</span>
                                            <div>
                                                <span className="block text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-widest mb-1">Pro Tip</span>
                                                <p className="text-sm text-slate-700 dark:text-slate-300 italic">{guide.tip}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Examples */}
                                    <div>
                                        <div className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-3">Examples</div>
                                        <div className="grid gap-3">
                                            {guide.examples.map((ex, i) => (
                                                <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-blue-200 transition-colors">
                                                    <div className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-1">{ex.german}</div>
                                                    <div className="text-slate-500 dark:text-slate-400 mb-1">{ex.english}</div>
                                                    <div className="font-bengali text-sm text-slate-400">{ex.bangla}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="text-center mt-12 mb-8">
                <p className="text-slate-400 text-sm">More guides are added weekly!</p>
            </div>
        </div>
    );
}
