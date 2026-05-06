'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, CheckCircle, Lightbulb, ChevronDown, Check, GraduationCap } from 'lucide-react';
import ScrollReveal from '@/components/animations/ScrollReveal';

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

const levelColors: Record<string, { from: string, to: string, text: string, bg: string, border: string }> = {
    a1: { from: 'from-emerald-400', to: 'to-teal-500', text: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800' },
    a2: { from: 'from-blue-400', to: 'to-indigo-500', text: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
    b1: { from: 'from-orange-400', to: 'to-rose-500', text: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-800' },
    b2: { from: 'from-purple-400', to: 'to-pink-500', text: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-200 dark:border-purple-800' },
};

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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-opacity duration-500 relative overflow-x-hidden">

            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-40 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header Section */}
            <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 z-10 px-6 max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold tracking-widest uppercase border border-indigo-200 dark:border-indigo-800/50 shadow-sm">
                    <BookOpen className="w-4 h-4" />
                    Interactive Guide
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white font-poppins mb-6">
                    Master German <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Grammar</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-2">
                    Visual guides to simplify the structure of the language.
                </p>
                <p className="font-bengali text-slate-500 text-lg">
                    সহজ এবং বিস্তারিত ব্যাকরণ গাইড
                </p>
            </section>

            {/* Sticky Filter Bar */}
            <ScrollReveal direction="down" delay={0.2}>
                <section className="sticky top-20 z-40 px-6 py-4">
                    <div className="max-w-3xl mx-auto bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-2xl shadow-slate-200/20 dark:shadow-none rounded-[1.5rem] p-2 flex overflow-x-auto justify-start md:justify-center scrollbar-hide snap-x gap-2 transition-all duration-300">
                        <button
                            onClick={() => setSelectedLevel('all')}
                            className={`px-5 py-2.5 md:px-6 md:py-2.5 rounded-[1.25rem] text-sm font-bold transition-all duration-300 shadow-sm flex-shrink-0 snap-start
                            ${selectedLevel === 'all'
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                    : 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`
                            }
                        >
                            All Levels
                        </button>
                        {['a1', 'a2', 'b1', 'b2'].map(level => {
                            const colors = levelColors[level];
                            const isActive = selectedLevel === level;
                            return (
                                <button
                                    key={level}
                                    onClick={() => setSelectedLevel(level)}
                                    className={`px-5 py-2.5 md:px-6 md:py-2.5 rounded-[1.25rem] text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-sm flex items-center gap-2 flex-shrink-0 snap-start
                                    ${isActive
                                            ? `bg-gradient-to-r ${colors.from} ${colors.to} text-white shadow-lg`
                                            : 'bg-transparent text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
                                        }`
                                    }
                                >
                                    {isActive && <Check className="w-4 h-4" />}
                                    {level}
                                </button>
                            );
                        })}
                    </div>
                </section>
            </ScrollReveal>

            {/* Content Grid */}
            <div className="max-w-4xl mx-auto px-6 py-12 space-y-6 relative z-10">
                {filtered.map((guide, i) => {
                    const isExpanded = expandedIds.has(guide.id);
                    const colors = levelColors[guide.level];

                    return (
                        <ScrollReveal key={guide.id} direction="up" delay={Math.min(i * 0.05, 0.5)}>
                            <div
                                className={`overflow-hidden transition-all duration-500 rounded-[2rem] border bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-xl
                                ${isExpanded
                                        ? guide.level === 'a1' ? 'border-emerald-400/50 dark:border-emerald-500/50 shadow-emerald-900/10' :
                                          guide.level === 'a2' ? 'border-blue-400/50 dark:border-blue-500/50 shadow-blue-900/10' :
                                          guide.level === 'b1' ? 'border-orange-400/50 dark:border-orange-500/50 shadow-orange-900/10' :
                                          'border-purple-400/50 dark:border-purple-500/50 shadow-purple-900/10'
                                        : 'border-slate-200/50 dark:border-slate-800/50 shadow-slate-200/20 dark:shadow-none hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900'
                                    }`}
                            >
                                {/* Summary / Header */}
                                <button
                                    onClick={() => toggleExpand(guide.id)}
                                    className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-6 group"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest ${colors.bg} ${colors.text} border ${colors.border}`}>
                                                {guide.level}
                                            </span>
                                        </div>
                                        <h3 className={`text-xl md:text-2xl font-bold font-poppins mb-1 transition-colors ${isExpanded ? colors.text : 'text-slate-900 dark:text-white group-hover:text-blue-500'}`}>
                                            {guide.title}
                                        </h3>
                                        <p className="font-bengali text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
                                            {guide.titleBn}
                                        </p>
                                    </div>
                                    <div className={`w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500
                                    ${isExpanded
                                            ? `bg-gradient-to-br ${colors.from} ${colors.to} text-white shadow-lg rotate-180`
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                                        }`}
                                    >
                                        <ChevronDown className="w-6 h-6" />
                                    </div>
                                </button>

                                {/* Expanded Content */}
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-6 md:px-8 md:pb-10 pt-2 border-t border-slate-100 dark:border-slate-800/50">

                                                <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6 md:mb-8">
                                                    {guide.description}
                                                </p>

                                                {/* Structure / Formula */}
                                                {guide.structure && (
                                                    <div className="mb-8 relative overflow-hidden rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800/50 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/10">
                                                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                                            <Sparkles className="w-16 h-16 text-indigo-500" />
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs uppercase font-bold text-indigo-600 dark:text-indigo-400 tracking-widest mb-3">
                                                            <GraduationCap className="w-4 h-4" />
                                                            Formula
                                                        </div>
                                                        <div className="overflow-x-auto scrollbar-hide pb-2">
                                                            <code className="text-lg md:text-2xl font-mono font-bold text-indigo-900 dark:text-indigo-200 whitespace-nowrap">
                                                                {guide.structure}
                                                            </code>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="grid md:grid-cols-2 gap-8 mb-8">
                                                    {/* Key Points */}
                                                    <div className="space-y-4">
                                                        <div className="text-xs uppercase font-bold text-slate-400 tracking-widest flex items-center gap-2">
                                                            How it works
                                                        </div>
                                                        <ul className="space-y-3">
                                                            {guide.points.map((point, idx) => (
                                                                <li key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300">
                                                                    <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors.text}`} />
                                                                    <span className="leading-relaxed">{point}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Pro Tip */}
                                                    {guide.tip && (
                                                        <div className="h-full rounded-2xl p-6 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/10 border border-amber-200/50 dark:border-amber-800/50">
                                                            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-3">
                                                                <Lightbulb className="w-4 h-4" />
                                                                Pro Tip
                                                            </div>
                                                            <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                                                                "{guide.tip}"
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Examples */}
                                                <div>
                                                    <div className="text-xs uppercase font-bold text-slate-400 tracking-widest mb-4">Examples in context</div>
                                                    <div className="grid sm:grid-cols-2 gap-4">
                                                        {guide.examples.map((ex, i) => (
                                                            <div key={i} className="group p-4 md:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors shadow-sm">
                                                                <div className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                                    "{ex.german}"
                                                                </div>
                                                                <div className="text-slate-600 dark:text-slate-400 text-sm mb-2">{ex.english}</div>
                                                                <div className="font-bengali text-sm text-slate-500 dark:text-slate-500 leading-relaxed shadow-sm font-medium">{ex.bangla}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </ScrollReveal>
                    );
                })}
            </div>

            <div className="text-center pb-24 opacity-50 font-bold uppercase tracking-widest text-xs text-slate-500">
                More guides added continuously
            </div>
        </div>
    );
}
