'use client';

import { useState, useEffect } from 'react';

interface GrammarRule {
    id: string;
    title: string;
    titleBn: string;
    explanation: string;
    examples: { german: string; english: string; bangla: string }[];
    level: 'a1' | 'a2' | 'b1' | 'b2';
}

const grammarRules: GrammarRule[] = [
    // A1 Level
    {
        id: 'a1-1', level: 'a1', title: 'Present Tense (Präsens)', titleBn: 'বর্তমান কাল', explanation: 'German verbs change their endings based on the subject. The stem is the infinitive minus -en.', examples: [
            { german: 'ich lerne', english: 'I learn', bangla: 'আমি শিখি' },
            { german: 'du lernst', english: 'you learn', bangla: 'তুমি শেখ' },
            { german: 'er/sie lernt', english: 'he/she learns', bangla: 'সে শেখে' },
        ]
    },
    {
        id: 'a1-2', level: 'a1', title: 'Articles (der, die, das)', titleBn: 'আর্টিকেল', explanation: 'German has 3 genders: masculine (der), feminine (die), neuter (das). Plural always uses "die".', examples: [
            { german: 'der Mann', english: 'the man', bangla: 'পুরুষ' },
            { german: 'die Frau', english: 'the woman', bangla: 'মহিলা' },
            { german: 'das Kind', english: 'the child', bangla: 'শিশু' },
        ]
    },
    {
        id: 'a1-3', level: 'a1', title: 'Basic Word Order', titleBn: 'শব্দ ক্রম', explanation: 'In German statements, the verb is always in second position (V2 rule).', examples: [
            { german: 'Ich gehe heute.', english: 'I go today.', bangla: 'আমি আজ যাই।' },
            { german: 'Heute gehe ich.', english: 'Today I go.', bangla: 'আজ আমি যাই।' },
        ]
    },
    {
        id: 'a1-4', level: 'a1', title: 'Negation (nicht, kein)', titleBn: 'নেতিবাচক', explanation: '"Nicht" negates verbs/adjectives. "Kein" negates nouns with ein/eine.', examples: [
            { german: 'Ich verstehe nicht.', english: 'I don\'t understand.', bangla: 'আমি বুঝি না।' },
            { german: 'Das ist kein Buch.', english: 'That is not a book.', bangla: 'এটা বই না।' },
        ]
    },
    // A2 Level
    {
        id: 'a2-1', level: 'a2', title: 'Perfect Tense (Perfekt)', titleBn: 'পারফেক্ট কাল', explanation: 'For past actions: haben/sein + past participle. Most verbs use haben.', examples: [
            { german: 'Ich habe gegessen.', english: 'I have eaten.', bangla: 'আমি খেয়েছি।' },
            { german: 'Er ist gegangen.', english: 'He has gone.', bangla: 'সে গেছে।' },
        ]
    },
    {
        id: 'a2-2', level: 'a2', title: 'Modal Verbs', titleBn: 'মোডাল ক্রিয়া', explanation: 'können (can), müssen (must), wollen (want), sollen (should), dürfen (may), mögen (like).', examples: [
            { german: 'Ich kann schwimmen.', english: 'I can swim.', bangla: 'আমি সাঁতার কাটতে পারি।' },
            { german: 'Du musst lernen.', english: 'You must learn.', bangla: 'তোমাকে শিখতে হবে।' },
        ]
    },
    {
        id: 'a2-3', level: 'a2', title: 'Accusative Case', titleBn: 'অ্যাকুজেটিভ কেস', explanation: 'Direct objects take accusative. Only masculine changes: der→den, ein→einen.', examples: [
            { german: 'Ich sehe den Mann.', english: 'I see the man.', bangla: 'আমি লোকটিকে দেখি।' },
            { german: 'Ich kaufe einen Apfel.', english: 'I buy an apple.', bangla: 'আমি একটা আপেল কিনি।' },
        ]
    },
    {
        id: 'a2-4', level: 'a2', title: 'Dative Case', titleBn: 'ডেটিভ কেস', explanation: 'Indirect objects take dative. der→dem, die→der, das→dem.', examples: [
            { german: 'Ich gebe dem Mann.', english: 'I give to the man.', bangla: 'আমি লোকটিকে দিই।' },
            { german: 'mit der Frau', english: 'with the woman', bangla: 'মহিলার সাথে' },
        ]
    },
    // B1 Level
    {
        id: 'b1-1', level: 'b1', title: 'Subordinate Clauses', titleBn: 'অধীন বাক্য', explanation: 'In subordinate clauses (weil, dass, wenn), verb goes to end.', examples: [
            { german: 'Ich weiß, dass er kommt.', english: 'I know that he comes.', bangla: 'আমি জানি যে সে আসবে।' },
            { german: 'Weil ich müde bin...', english: 'Because I am tired...', bangla: 'কারণ আমি ক্লান্ত...' },
        ]
    },
    {
        id: 'b1-2', level: 'b1', title: 'Konjunktiv II (Subjunctive)', titleBn: 'কনজুঙ্কটিভ', explanation: 'For wishes, hypotheticals, polite requests. würde + infinitive or special forms.', examples: [
            { german: 'Ich würde gern...', english: 'I would like to...', bangla: 'আমি চাইতাম...' },
            { german: 'Wenn ich reich wäre...', english: 'If I were rich...', bangla: 'যদি আমি ধনী হতাম...' },
        ]
    },
    {
        id: 'b1-3', level: 'b1', title: 'Relative Clauses', titleBn: 'সম্পর্কসূচক বাক্য', explanation: 'der/die/das as relative pronouns. Verb at end.', examples: [
            { german: 'Der Mann, der dort steht...', english: 'The man who stands there...', bangla: 'যে লোকটি সেখানে দাঁড়িয়ে...' },
        ]
    },
    {
        id: 'b1-4', level: 'b1', title: 'Passive Voice', titleBn: 'কর্মবাচ্য', explanation: 'werden + past participle. Focus on the action, not the doer.', examples: [
            { german: 'Das Buch wird gelesen.', english: 'The book is being read.', bangla: 'বইটি পড়া হচ্ছে।' },
        ]
    },
    // B2 Level
    {
        id: 'b2-1', level: 'b2', title: 'Genitive Case', titleBn: 'জেনিটিভ কেস', explanation: 'Shows possession. des/der + noun. Masculine/neuter nouns add -s or -es.', examples: [
            { german: 'das Buch des Mannes', english: 'the book of the man', bangla: 'লোকটির বই' },
            { german: 'während des Tages', english: 'during the day', bangla: 'দিনের সময়' },
        ]
    },
    {
        id: 'b2-2', level: 'b2', title: 'Konjunktiv I (Reported Speech)', titleBn: 'কনজুঙ্কটিভ ১', explanation: 'For indirect/reported speech. sei, habe, könne etc.', examples: [
            { german: 'Er sagt, er sei krank.', english: 'He says he is sick.', bangla: 'সে বলে সে অসুস্থ।' },
        ]
    },
    {
        id: 'b2-3', level: 'b2', title: 'Extended Adjective Constructions', titleBn: 'বিশেষণ বিস্তার', explanation: 'Adjectives before nouns can be modified by entire phrases.', examples: [
            { german: 'der in Berlin lebende Mann', english: 'the man living in Berlin', bangla: 'বার্লিনে বসবাসকারী লোকটি' },
        ]
    },
    {
        id: 'b2-4', level: 'b2', title: 'Infinitive Clauses (um...zu)', titleBn: 'অসীম বাক্য', explanation: 'um...zu (in order to), ohne...zu (without), anstatt...zu (instead of).', examples: [
            { german: 'Ich lerne, um zu arbeiten.', english: 'I learn in order to work.', bangla: 'আমি কাজ করতে শিখি।' },
        ]
    },
];

export default function GrammarPage() {
    const [mounted, setMounted] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<string>('all');
    const [expandedId, setExpandedId] = useState<string | null>(null);

    useEffect(() => { setMounted(true); }, []);

    const filtered = selectedLevel === 'all' ? grammarRules : grammarRules.filter(r => r.level === selectedLevel);

    if (!mounted) return null;

    return (
        <div className="page-transition min-h-screen">
            <section className="py-12 md:py-16 bg-[var(--bg-secondary)]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-3xl md:text-5xl font-bold mb-3"><span className="gradient-text">Grammar</span></h1>
                    <p className="text-lg text-[var(--text-secondary)]">Essential German grammar rules for each level</p>
                    <p className="font-bengali text-[var(--text-muted)]">প্রতিটি স্তরের জন্য প্রয়োজনীয় জার্মান ব্যাকরণ</p>
                </div>
            </section>

            <section className="py-6 border-b border-[var(--border-color)] sticky top-16 md:top-20 bg-[var(--bg-primary)] z-40">
                <div className="max-w-4xl mx-auto px-4 flex flex-wrap gap-2 justify-center">
                    {['all', 'a1', 'a2', 'b1', 'b2'].map(l => (
                        <button key={l} onClick={() => setSelectedLevel(l)}
                            className={`px-4 py-2 rounded-lg transition-all ${selectedLevel === l ? 'bg-[var(--primary)] text-white' : 'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]'}`}>
                            {l === 'all' ? 'All' : l.toUpperCase()}
                        </button>
                    ))}
                </div>
            </section>

            <section className="py-8 md:py-12">
                <div className="max-w-4xl mx-auto px-4 space-y-4">
                    {filtered.map(rule => (
                        <div key={rule.id} className="glass-card overflow-hidden">
                            <button onClick={() => setExpandedId(expandedId === rule.id ? null : rule.id)} className="w-full p-4 md:p-6 text-left flex items-center justify-between gap-4">
                                <div>
                                    <span className={`badge badge-${rule.level} mb-2`}>{rule.level.toUpperCase()}</span>
                                    <h3 className="text-lg md:text-xl font-semibold">{rule.title}</h3>
                                    <p className="text-sm font-bengali text-[var(--text-muted)]">{rule.titleBn}</p>
                                </div>
                                <span className={`text-2xl transition-transform ${expandedId === rule.id ? 'rotate-180' : ''}`}>⌄</span>
                            </button>

                            {expandedId === rule.id && (
                                <div className="px-4 md:px-6 pb-6 border-t border-[var(--border-color)] pt-4">
                                    <p className="text-[var(--text-secondary)] mb-4">{rule.explanation}</p>
                                    <div className="space-y-3">
                                        {rule.examples.map((ex, i) => (
                                            <div key={i} className="p-3 rounded-lg bg-[var(--bg-tertiary)]">
                                                <div className="font-semibold text-[var(--primary)]">{ex.german}</div>
                                                <div className="text-sm text-[var(--text-secondary)]">{ex.english}</div>
                                                <div className="text-sm font-bengali text-[var(--text-muted)]">{ex.bangla}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="text-center py-8 text-[var(--text-muted)]">
                        <p>🚧 C1 & C2 grammar coming soon!</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
